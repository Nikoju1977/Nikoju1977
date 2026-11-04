'use strict';
/* URL reachability audit. HTTP is not a substitute for interactive E2E tests. */
const fs=require('node:fs');
const path=require('node:path');
const rows=JSON.parse(fs.readFileSync(path.join(__dirname,'catalog.json'),'utf8')).filter(x=>x.demoUrl);
const approved=host=>host==='nikoju1977.github.io'||host.endsWith('.vercel.app');
async function probe(item){
  const u=new URL(item.demoUrl);
  if(u.protocol!=='https:'||!approved(u.hostname))return{slug:item.slug,status:'SKIP',reason:'not on HTTP audit allowlist'};
  try{
    const start=Date.now();
    const r=await fetch(u.href,{method:'GET',redirect:'manual',signal:AbortSignal.timeout(9000),headers:{'User-Agent':'StudioNikoHub-QualityAudit/1.0'}});
    if(r.body)await r.body.cancel().catch(()=>{});
    return {slug:item.slug,status:r.status>=200&&r.status<300?'OK':r.status===401||r.status===403?'AUTH':r.status>=300&&r.status<400?'REDIRECT':'HTTP_ERROR',
      code:r.status,ms:Date.now()-start};
  }catch(error){return{slug:item.slug,status:'NETWORK_ERROR',reason:error?.cause?.code||error?.name||'unknown'};}
}
(async()=>{
 const queue=[...rows];
 const results=[];
 const workers=Array.from({length:Math.min(4,queue.length)},async()=>{while(queue.length){results.push(await probe(queue.shift()));}});
 await Promise.all(workers);
 results.sort((a,b)=>a.slug.localeCompare(b.slug,'fr'));
 const ok=results.filter(x=>x.status==='OK').length;
 console.log(JSON.stringify({checkedAt:new Date().toISOString(),ok,total:results.length,results},null,2));
 const summary=['## Studio Niko Hub — disponibilité HTTP',
 'Pages HTTP 2xx : **'+ok+'/'+results.length+'**. Un résultat favorable ne garantit pas que la génération IA, les fonctions audio, les API ou les connexions fonctionnent.',
 '', '| Application | État | HTTP |', '|---|---|---|',...results.map(r=>'| '+r.slug.replace(/\|/g,'')+' | '+r.status+' | '+(r.code||r.reason||'—')+' |')].join('\n');
 if(process.env.GITHUB_STEP_SUMMARY)fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,summary+'\n');
 // Keep audits non-blocking because third-party outages and anti-bot layers cause false negatives.
 if(results.length!==rows.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
