'use strict';
const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
(async()=>{
 const source=fs.readFileSync(path.join(__dirname,'sw.js'),'utf8'),scope='https://example.test/hub/';
 const name=source.match(/^const CACHE='(studio-niko-hub-[^']+)';$/m)?.[1];
 assert.ok(name,'Expected a versioned Hub cache name');
 const old='studio-niko-hub-obsolete-test-cache',foreign='neural-art-v22-5-isolated-shell';
 assert.notEqual(name,old);
 const handlers={},deleted=[],data=new Map(),keys=[name,old,foreign];let calls=0,offline=false,quota=false,claims=0;
 const response={ok:true,redirected:false,clone(){return 'new';}};
 const cache={addAll:async list=>{for(const p of list)data.set(new URL(p,scope).href,'cached:'+p);},match:async req=>data.get(typeof req==='string'?req:req.url),put:async(req,r)=>{if(quota)throw Error('quota');data.set(req.url,r);}};
 vm.runInNewContext(source,{URL,Set,Promise,Response:{error:()=> 'network-error'},self:{registration:{scope},addEventListener:(n,f)=>handlers[n]=f,skipWaiting:async()=>{},clients:{claim:async()=>claims++}},caches:{open:async n=>{assert.equal(n,name);return cache;},keys:async()=>keys,delete:async k=>deleted.push(k),match:()=>{throw Error('global cache forbidden');}},fetch:async()=>{calls++;if(offline)throw Error('offline');return response;}});
 for(const n of ['install','activate']){let p;handlers[n]({waitUntil:t=>p=t});await p;}
 assert.deepEqual(deleted,[old]);assert.equal(claims,1);
 function request(url,mode='cors',cacheMode='default',method='GET'){let p;handlers.fetch({request:{url,mode,cache:cacheMode,method},respondWith:t=>p=t});return p;}
 for(const u of ['https://example.test/other/index.html',scope+'api/health?slug=x',scope+'catalog.json?x=1','https://external.test/index.html',scope+'unlisted.js'])assert.equal(request(u),undefined);
 assert.equal(request(scope+'index.html','navigate','default','POST'),undefined);assert.equal(calls,0);
 assert.equal(await request(scope+'styles.css'),'cached:./styles.css');assert.equal(calls,0);
 assert.equal(await request(scope+'catalog.json'),response);assert.equal(calls,1);
 assert.equal(await request(scope+'guides.json','cors','no-store'),response);assert.equal(calls,2);
 quota=true;assert.equal(await request(scope+'index.html','navigate'),response);
 offline=true;assert.equal(await request(scope+'catalog.json'),'new');assert.equal(await request(scope+'guides.json','cors','no-store'),'new');
 data.delete(scope+'quality.css');assert.equal(await request(scope+'quality.css'),'network-error');
 console.log('PASS Hub isolated shell, sibling cache preserved, uncached health API, fresh catalog and guides, quota-safe response');
})().catch(e=>{console.error(e);process.exitCode=1;});
