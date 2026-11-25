'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const dir=__dirname;
const app=fs.readFileSync(path.join(dir,'app.js'),'utf8');
const index=fs.readFileSync(path.join(dir,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(dir,'sw.js'),'utf8');
const cat=JSON.parse(fs.readFileSync(path.join(dir,'catalog.json'),'utf8'));
assert(Array.isArray(cat),'Public catalog required');
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
assert(cat.length===registry.public_repositories,'Landing catalog includes all '+registry.public_repositories+' public repositories');
const registryNames=new Set(registry.repositories.map(x=>x.name));
const catalogNames=new Set(cat.map(x=>x.repoUrl.split('/').at(-1)));
assert(catalogNames.size===registryNames.size,'Catalog identities are unique');
for(const name of registryNames)assert(catalogNames.has(name),'Missing public repository in landing catalog '+name);
for(const name of catalogNames)assert(registryNames.has(name),'Unregistered or private repository in landing catalog '+name);

assert(snapshot.private_repositories_omitted===registry.private_repositories_omitted,'Private repository count stays hidden');
for(const repo of registry.repositories){
  const item=snapshot.repositories.find(x=>x.name===repo.name);
  assert(item,'Hub snapshot includes '+repo.name);
  if(repo.preview_deployment){
    assert(item.preview_deployment?.commit===repo.preview_deployment.commit,'Preview commit matches '+repo.name);
    assert(item.preview_deployment?.verification==='build_ready_only','Preview evidence never claims runtime validation '+repo.name);
    assert(new URL(item.preview_deployment.url).hostname.endsWith('.vercel.app'),'Preview URL is Vercel '+repo.name);
  }
  if(repo.production_deployment){
    assert(item.production_deployment?.commit===repo.production_deployment.commit,'Production commit matches '+repo.name);
    assert(item.production_deployment.state==='READY','Production is READY '+repo.name);
    assert(['http_assets_only','deployment_ready_ci_only'].includes(item.production_deployment.verification),
      'Recognized evidence scope only '+repo.name);
    assert(/^[0-9a-f]{40}$/.test(item.production_deployment.commit),'Exact commit required '+repo.name);
    assert(/^20[0-9]{2}-[0-9]{2}-[0-9]{2}$/.test(item.production_deployment.checked_on),
      'Timestamp of inspected production required '+repo.name);
    const url=new URL(item.production_deployment.url);
    assert(url.protocol==='https:'&&url.hostname.endsWith('.vercel.app'),'Production link is HTTPS Vercel '+repo.name);
  }
}
assert(pilotage.includes('var httpVerified='),'Dashboard separates verified HTTP from CI-only READY');
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
assert(guides.length===cat.length&&new Set(guides.map(g=>g.slug)).size===cat.length
  &&cat.every(x=>guides.some(g=>g.slug===x.slug)),'All public applications documented uniquely');
new Function(fs.readFileSync(path.join(dir,'guide.js'),'utf8'));
console.log('PASS catalog='+cat.length+' launchUrls='+cat.filter(x=>x.demoUrl).length+' DOM bindings checked');

const evidence=JSON.parse(fs.readFileSync(path.join(dir,'quality-evidence.json'),'utf8'));
assert.equal(evidence.rows.length,cat.length);
assert.equal(new Set(evidence.rows.map(r=>r.repo)).size,cat.length);
for(const r of evidence.rows){assert(registry.repositories.some(x=>x.full_name===r.repo));assert(r.commit===null||/^[a-f0-9]{40}$/.test(r.commit));assert.equal(r.functionalTests,false);}
assert.equal(evidence.rows.reduce((n,r)=>n+r.files,0),evidence.totals.files);
assert.equal(evidence.rows.reduce((n,r)=>n+r.batches,0),evidence.totals.batches);
assert.equal(evidence.rows.filter(r=>r.docker==='passed').length,evidence.totals.dockerPassed);
assert.equal(evidence.fixes.length,4);
for(const file of ['quality.html','quality.css','quality-evidence.json']){assert(fs.existsSync(path.join(dir,file)));assert(sw.includes("'./"+file+"'"));}
assert(index.includes('href="./quality.html"'));
console.log('PASS quality evidence references and counts');


require('node:child_process').execFileSync(process.execPath,[path.join(dir,'workspace-regression.cjs')],{stdio:'inherit'});

const releases=evidence.releaseSnapshot;
assert.equal(releases.rows.length,4);
assert.equal(new Set(releases.rows.map(r=>r.repo)).size,releases.rows.length);
for(const r of releases.rows){assert(evidence.fixes.some(f=>f.repo===r.repo));assert(/^[a-f0-9]{40}$/.test(r.commit));assert(Number.isSafeInteger(r.ci)&&r.ci>0);assert(r.pages===null||Number.isSafeInteger(r.pages)&&r.pages>0);assert(r.incident===null||Number.isSafeInteger(r.incident)&&r.incident>0);if(r.url){assert.equal(new URL(r.url).origin,'https://nikoju1977.github.io');assert(r.pages!==null)}}
const qualityHtml=fs.readFileSync(path.join(dir,'quality.html'),'utf8');
for(const r of releases.rows){assert(qualityHtml.includes('/commit/'+r.commit));assert(qualityHtml.includes('/actions/runs/'+r.ci));if(r.pages)assert(qualityHtml.includes('/actions/runs/'+r.pages));if(r.incident)assert(qualityHtml.includes('/actions/runs/'+r.incident));}
console.log('PASS release evidence references');
