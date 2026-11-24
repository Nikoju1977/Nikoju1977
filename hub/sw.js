'use strict';
const CACHE='studio-niko-hub-v23-ultimate-20261124';
const ASSETS=['./','./index.html','./pilotage.html','./quality.html','./quality.css','./quality-core.js','./quality.js','./deployments.html','./deployments.js','./deployments-core.js','./deployment-observations.json','./security.html','./security.js','./security-core.js','./agents.html','./agents.js','./agents-core.js','./devices.html','./devices.js','./devices-core.js','./recovery.html','./recovery.js','./recovery-core.js','./command.html','./command.js','./command-core.js','./command.css','./design.css','./design-core.js','./design.js','./offline.html','./provenance.html','./provenance.js','./provenance-snapshot.json','./pilotage-workspace.js','./styles.css','./app.js','./workspace.js','./workspace.css','./catalog.json','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./install.js','./guide.js','./guides.json'];
const scope=self.registration.scope;
const known=new Set(ASSETS.map(p=>new URL(p,scope).href));
const cacheKey=url=>{const u=new URL(url);u.search='';u.hash='';return u.href;};
self.addEventListener('install',event=>{event.waitUntil((async()=>{
 const cache=await caches.open(CACHE);
 try{await cache.addAll(ASSETS.map(p=>new Request(new URL(p,scope),{cache:'reload'})));}
 catch(e){await caches.delete(CACHE);throw e;}
})());});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{
 await Promise.all((await caches.keys()).filter(k=>k.startsWith('studio-niko-hub-')&&k!==CACHE).map(k=>caches.delete(k)));
 await self.clients.claim();
})());});
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE_UPDATE')event.waitUntil(self.skipWaiting());});
self.addEventListener('fetch',event=>{
 const req=event.request,u=new URL(req.url);
 if(req.method!=='GET'||u.origin!==self.location.origin||!u.href.startsWith(scope))return;
 // All API routes bypass the service worker; no stale diagnostic or API response.
 if(u.pathname.startsWith(new URL('api/',scope).pathname))return;
 const key=cacheKey(u.href);
 if(known.has(key)){
  event.respondWith((async()=>{const cache=await caches.open(CACHE),hit=await cache.match(key);if(hit)return hit;return fetch(req);})());
 }else if(req.mode==='navigate'){
  event.respondWith(fetch(req).catch(async()=>{const cache=await caches.open(CACHE);return (await cache.match(new URL('offline.html',scope).href))||Response.error();}));
 }
});
