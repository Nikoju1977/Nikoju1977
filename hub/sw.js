'use strict';
const CACHE='studio-niko-hub-v22-documentation-20261125';
const ASSETS=['./','./index.html','./pilotage.html','./provenance.html','./quality.html','./quality.css','./quality-evidence.json','./provenance.js','./provenance-snapshot.json','./pilotage-workspace.js','./styles.css','./app.js','./workspace.js','./workspace.css','./catalog.json','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./install.js','./guide.js','./guides.json'];
const SCOPE=new URL(self.registration.scope);
const INDEX=new URL('./index.html',SCOPE).href;
const ALLOWED=new Set(ASSETS.map(p=>new URL(p,SCOPE).href));
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('studio-niko-hub-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method!=='GET'||url.origin!==SCOPE.origin||!url.pathname.startsWith(SCOPE.pathname)||!ALLOWED.has(url.href))return;
 // Diagnostics, query strings and other applications must reach the network directly.
 const networkFirst=req.mode==='navigate'||url.href===new URL('./catalog.json',SCOPE).href||req.cache==='no-store';
 event.respondWith((async()=>{
   let cache;
   try{cache=await caches.open(CACHE);}catch(_){}
   if(!networkFirst&&cache){try{const hit=await cache.match(req);if(hit)return hit;}catch(_){}}
   try{
     const res=await fetch(req);
     if(networkFirst&&cache&&res.ok&&!res.redirected){try{await cache.put(req,res.clone());}catch(_){}}
     return res;
   }catch(_){
     if(cache){try{
       const hit=await cache.match(req);if(hit)return hit;
       if(req.mode==='navigate')return await cache.match(INDEX)||Response.error();
     }catch(_){}}
     return Response.error();
   }
 })());
});
