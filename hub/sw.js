const CACHE='studio-niko-hub-v13-evidence-20261122';
const ASSETS=['./','./index.html','./pilotage.html','./pilotage-workspace.js','./styles.css','./app.js','./workspace.js','./workspace.css','./catalog.json','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./install.js','./guide.js','./guides.json'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
 if(req.mode==='navigate'){event.respondWith(fetch(req).then(res=>{if(res.ok){const copy=res.clone();event.waitUntil(caches.open(CACHE).then(c=>c.put(req,copy)));}return res;}).catch(async()=>{const hit=await caches.match(req);return hit||(await caches.match('./index.html'))||Response.error();}));return;}
 if(new URL(req.url).pathname.endsWith('catalog.json')){event.respondWith(fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));}return res;}).catch(()=>caches.match(req)));return;}
 event.respondWith(caches.match(req).then(cache=>cache||fetch(req)));
});