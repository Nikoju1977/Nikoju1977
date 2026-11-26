'use strict';
/* Studio Niko — read-only HTTPS baseline for deployed RAUSBEAT. Harness adapted from NikoAssist and OpenVita; GPL-3.0-or-later. */
// SPDX-License-Identifier: GPL-3.0-or-later
const assert=require('node:assert/strict');
const {spawn,execFileSync}=require('node:child_process');
const fs=require('node:fs/promises');
const os=require('node:os');
const path=require('node:path');

const root=path.resolve(__dirname,'..');
const base='https://rausbeat-2-0.vercel.app';
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function poll(fn,label,timeout=20000){
 const start=Date.now();let error;
 while(Date.now()-start<timeout){
  try{const result=await fn();if(result)return result;}catch(e){error=e;}
  await sleep(120);
 }
 throw new Error('Timeout '+label+(error?': '+error.message:''));
}
function chromeBinary(){
 if(process.env.CHROME_BIN)return process.env.CHROME_BIN;
 for(const candidate of ['google-chrome','google-chrome-stable','chromium','chromium-browser']){
  try{return execFileSync('which',[candidate],{encoding:'utf8'}).trim();}catch{}
 }
 throw Error('Chromium non disponible sur ce runner.');
}
async function main(){
 let server,chrome,ws;const pending=new Map(),browserErrors=[],httpPosts=[];
 const tmp=await fs.mkdtemp(path.join(os.tmpdir(),'rausbeat-production-'));
 let seq=0,diagnostics='';
 try{
  // Public deployed baseline only, never the unshipped RC1.2 archive.
  const http=await fetch(base+'/index.html',{redirect:'error',signal:AbortSignal.timeout(20000)});
  assert.equal(http.status,200,'Production entrypoint must answer HTTP 200');
  const body=Buffer.from(await http.arrayBuffer());
  const sha=require('node:crypto').createHash('sha1').update(body).digest('hex');
  console.log('RAUSBEAT HTTPS BASELINE: index sha1='+sha+' bytes='+body.length);
  assert.equal(sha,'469db947f9430e458c9d9df2fe44693b2ac4103c','Production revision changed: requalify expected source instead of comparing different revisions');
  chrome=spawn(chromeBinary(),['--headless=new','--autoplay-policy=no-user-gesture-required','--no-sandbox','--disable-gpu','--disable-dev-shm-usage',
   '--no-first-run','--no-default-browser-check','--disable-background-networking',
   '--remote-debugging-port=0','--remote-allow-origins=*',
   '--user-data-dir='+path.join(tmp,'chrome'),'about:blank'],{stdio:['ignore','ignore','pipe']});
  chrome.stderr.on('data',chunk=>diagnostics+=String(chunk).slice(-1000));
  const debuggerPort=await poll(async()=>{
   const raw=await fs.readFile(path.join(tmp,'chrome','DevToolsActivePort'),'utf8');
   return Number(raw.split('\n')[0]);
  },'Chrome DevTools');
  const tabs=await(await fetch('http://127.0.0.1:'+debuggerPort+'/json/list')).json();
  const tab=tabs.find(x=>x.type==='page');
  assert.ok(tab?.webSocketDebuggerUrl,'Chrome debugger page missing');
  ws=new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{
   ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true});
  });
  ws.addEventListener('message',event=>{
   const msg=JSON.parse(event.data);
   if(msg.method==='Runtime.exceptionThrown')browserErrors.push(msg.params?.exceptionDetails?.exception?.description||'Browser exception');
   if(msg.method==='Network.requestWillBeSent'&&msg.params?.request?.method==='POST')httpPosts.push(msg.params.request.url);
   if(!msg.id||!pending.has(msg.id))return;
   const p=pending.get(msg.id);pending.delete(msg.id);
   msg.error?p.reject(Error(JSON.stringify(msg.error))):p.resolve(msg.result);
  });
  function call(method,params={}){
   const id=++seq;
   return new Promise((resolve,reject)=>{
    const timer=setTimeout(()=>{pending.delete(id);reject(Error('DevTools timeout '+method));},12000);
    pending.set(id,{resolve:v=>{clearTimeout(timer);resolve(v);},reject:e=>{clearTimeout(timer);reject(e);}});
    ws.send(JSON.stringify({id,method,params}));
   });
  }
  async function evaluate(expression){
   const out=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
   if(out.exceptionDetails)throw Error('Browser JS: '+(out.exceptionDetails.exception?.description||out.exceptionDetails.text));
   return out.result?.value;
  }
  const wait=(expression,label)=>poll(()=>evaluate(expression),label,15000);
  await call('Page.enable');await call('Runtime.enable');await call('Network.enable');
  await call('Page.navigate',{url:base+'/'});
  await wait('document.readyState==="complete"&&!!window.__RAUSBEAT_DIAGNOSTICS__&&!!window.__RAUSBEAT_PRO__','production app initialized');
  assert.equal(await evaluate('location.origin'),base);
  assert.equal(await evaluate('isSecureContext'),true);
  // Fresh, disposable profile. Test real native OPFS with a synthetic file only.
  const native=await evaluate('('+async function(){
    const root=await navigator.storage.getDirectory();
    const name='studio-niko-qa-'+crypto.randomUUID()+'.txt';
    try{
      const handle=await root.getFileHandle(name,{create:true}),writer=await handle.createWritable();
      await writer.write('synthetic QA fixture');await writer.close();
      const text=await(await handle.getFile()).text();
      return {opfs:text==='synthetic QA fixture',worklet:typeof AudioWorkletNode==='function',sw:'serviceWorker' in navigator};
    }finally{await root.removeEntry(name).catch(()=>{});}
  }+')()');
  assert.ok(native.opfs&&native.worklet&&native.sw,'Native browser APIs unavailable');
  console.log('RAUSBEAT NATIVE HTTPS: '+JSON.stringify(native));
  const press=sel=>evaluate('document.querySelector('+JSON.stringify(sel)+').click()');
  const diag=()=>evaluate('(()=>{const d=window.__RAUSBEAT_DIAGNOSTICS__,p=window.__RAUSBEAT_PRO__;return {steps:d.scheduledSteps,schedulers:d.schedulerCount,voices:d.activeVoices,graphs:d.graphLive,recording:p.recording,mode:p.mode,storage:p.storageMode,frames:p.frames,stepFaults:d.scheduler?.stepFaults}})()');
  await press('#btn-play');
  await wait('window.__RAUSBEAT_DIAGNOSTICS__.scheduledSteps>3','actual audio transport');
  await evaluate('(()=>{const s=document.querySelector("#rb-capture-source"),b=document.querySelector("#rb-bit-depth");if(s)s.value="master";if(b)b.value="16";const original=URL.createObjectURL.bind(URL);URL.createObjectURL=blob=>{if(blob?.type?.includes("wav"))window.__qaWav=blob;return original(blob)};})()');
  await press('#rb-rec');
  await wait('window.__RAUSBEAT_PRO__.recording&&window.__RAUSBEAT_PRO__.frames>0','audio recorder receives PCM');
  await sleep(4000);
  const running=await diag();console.log('RAUSBEAT LIVE CAPTURE '+JSON.stringify(running));
  assert.equal(running.mode,'worklet','Actual app must use native AudioWorklet');
  assert.equal(running.storage,'opfs','Actual app must use progressive OPFS');
  await press('#rb-rec');
  await wait('!window.__RAUSBEAT_PRO__.recording&&!!window.__qaWav','capture finalized');
  const wav=await evaluate('('+async function(){
    const b=await window.__qaWav.arrayBuffer(),d=new DataView(b),str=(o,n)=>String.fromCharCode(...new Uint8Array(b,o,n));
    const size=d.getUint32(40,true),bits=d.getUint16(34,true),rate=d.getUint32(24,true),channels=d.getUint16(22,true);
    let sum=0,peak=0,n=0;
    if(bits===16)for(let i=44;i+1<b.byteLength;i+=2){const v=d.getInt16(i,true)/32768;sum+=v*v;peak=Math.max(peak,Math.abs(v));n++;}
    return {riff:str(0,4),wave:str(8,4),data:str(36,4),size,bytes:b.byteLength,bits,rate,channels,rms:n?Math.sqrt(sum/n):0,peak,seconds:size/(rate*channels*bits/8)};
  }+')()');
  assert.equal(wav.riff,'RIFF');assert.equal(wav.wave,'WAVE');assert.equal(wav.data,'data');
  assert.equal(wav.bits,16);assert.equal(wav.channels,2);assert.equal(wav.bytes,44+wav.size);assert.ok(wav.seconds>=3.5&&wav.seconds<=8);assert.ok(wav.rms>0.0001&&wav.peak<1);
  console.log('RAUSBEAT NATIVE WAV '+JSON.stringify(wav));
  await press('#btn-play');await sleep(1000);
  const stopped=await diag();console.log('RAUSBEAT STOP '+JSON.stringify(stopped));
  assert.equal(stopped.schedulers,0);assert.equal(stopped.voices,0);assert.equal(stopped.graphs,0);
  assert.deepEqual(browserErrors,[],'Uncaught browser exceptions');
  console.log('RAUSBEAT HTTPS BASELINE PASS: native OPFS, native worklet capture, actual PCM WAV, stop cleanup; existing production only, not RC1.2.');
 }catch(error){
  throw Error(error.message+(diagnostics?'\nBrowser diagnostics: '+diagnostics.slice(-1000):''));
 }finally{
  try{ws?.close();}catch{}
  try{chrome?.kill('SIGKILL');}catch{}
  try{server?.kill('SIGTERM');}catch{}
  await sleep(300);
  await fs.rm(tmp,{recursive:true,force:true,maxRetries:6,retryDelay:200}).catch(()=>{});
 }
}
main().catch(e=>{console.error(e.stack||e);process.exitCode=1;});
