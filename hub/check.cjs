'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const dir=__dirname;
const app=fs.readFileSync(path.join(dir,'app.js'),'utf8');
const index=fs.readFileSync(path.join(dir,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(dir,'sw.js'),'utf8');
const cat=JSON.parse(fs.readFileSync(path.join(dir,'catalog.json'),'utf8'));
assert(Array.isArray(cat)&&cat.length===47,'47 public projects');
assert(new Set(cat.map(x=>x.slug)).size===cat.length,'No duplicate slugs');
for (const x of cat){
 assert(x.slug&&x.name&&x.category&&x.description&&x.repoUrl,'Required fields '+x.slug);
 assert(new URL(x.repoUrl).hostname==='github.com','GitHub source '+x.slug);
 if(x.demoUrl){let u=new URL(x.demoUrl);assert(u.protocol==='https:','HTTPS '+x.slug);}
 if(x.pageCheckedOn){assert(x.demoUrl,'Checked project must have launch URL '+x.slug);}
}
assert(!cat.some(x=>['ron','Angie-local-commander','medvisionproai','galerie-niko-repo','le-s-raphin-livre'].includes(x.slug)),'No private repos');
for(const match of app.matchAll(/byId\(['"]([^'"]+)['"]\)/g))assert(index.includes('id="'+match[1]+'"'),'DOM id '+match[1]);
assert(index.includes('id="check-all"'),'Diagnostic button exists');
const cacheMatch=sw.match(/const CACHE=['"]([^'"]+)['"]/);
assert(cacheMatch && /^studio-niko-hub-v[0-9]+(?:-[a-z0-9-]+)?$/.test(cacheMatch[1]),'Service worker has a versioned cache');
assert(sw.includes("'./pilotage.html'"),'Dashboard in PWA offline asset list');
const registry=JSON.parse(fs.readFileSync(path.join(dir,'..','studio-niko-core','registry.json'),'utf8'));
const pilotage=fs.readFileSync(path.join(dir,'pilotage.html'),'utf8');
const snapshotStartTag='<script id="repository-snapshot" type="application/json">';
const snapshotStart=pilotage.indexOf(snapshotStartTag);
assert(snapshotStart>=0,'Pilotage snapshot exists');
const payloadStart=snapshotStart+snapshotStartTag.length;
const payloadEnd=pilotage.indexOf('</script>',payloadStart);
assert(payloadEnd>payloadStart,'Pilotage snapshot is closed');
const snapshot=JSON.parse(pilotage.slice(payloadStart,payloadEnd));
assert(snapshot.repositories.length===registry.public_repositories,'Public registry count matches dashboard');
assert(snapshot.private_repositories_omitted===registry.private_repositories_omitted,'Private repository count stays hidden');
for(const repo of registry.repositories){
  const item=snapshot.repositories.find(x=>x.name===repo.name);
  assert(item,'Hub snapshot includes '+repo.name);
  if(repo.preview_deployment){
    assert(item.preview_deployment?.commit===repo.preview_deployment.commit,'Preview commit matches '+repo.name);
    assert(item.preview_deployment?.verification==='build_ready_only','Preview evidence never claims runtime validation '+repo.name);
    assert(new URL(item.preview_deployment.url).hostname.endsWith('.vercel.app'),'Preview URL is Vercel '+repo.name);
  }
}
assert(index.includes('id="atelier"'),'Workspace section');
assert(fs.existsSync(path.join(dir,'workspace.js')),'Workspace JS');
assert(fs.existsSync(path.join(dir,'workspace.css')),'Workspace CSS');
new Function(fs.readFileSync(path.join(dir,'workspace.js'),'utf8'));
assert(fs.existsSync(path.join(dir,'install.js')),'PWA install handler');
assert(index.includes('id="pwa-install"'),'PWA install button');
const manifest=JSON.parse(fs.readFileSync(path.join(dir,'manifest.webmanifest'),'utf8'));
for(const size of ['192x192','512x512'])assert(manifest.icons.some(x=>x.sizes===size&&x.type==='image/png'),'PWA icon '+size);
assert(index.includes('id="user-guide-dialog"'),'Help dialog');
assert(fs.existsSync(path.join(dir,'guide.js')),'Help JS');
const guides=JSON.parse(fs.readFileSync(path.join(dir,'guides.json'),'utf8')).guides;
assert(guides.length===cat.length&&cat.every(x=>guides.some(g=>g.slug===x.slug)),'All public applications documented');
new Function(fs.readFileSync(path.join(dir,'guide.js'),'utf8'));
console.log('PASS catalog='+cat.length+' launchUrls='+cat.filter(x=>x.demoUrl).length+' DOM bindings checked');
