'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {validateDeployment}=require('./evidence.cjs');
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
const snapshotNames=new Set(snapshot.repositories.map(x=>x.name));
assert.equal(registryNames.size,registry.repositories.length,'Registry identities are unique');
assert.equal(snapshotNames.size,snapshot.repositories.length,'Snapshot identities are unique');
assert.deepEqual(snapshotNames,registryNames,'Snapshot contains exactly the public registry identities');
const catalogNames=new Set(cat.map(x=>x.repoUrl.split('/').at(-1)));
assert(catalogNames.size===registryNames.size,'Catalog identities are unique');
for(const name of registryNames)assert(catalogNames.has(name),'Missing public repository in landing catalog '+name);
for(const name of catalogNames)assert(registryNames.has(name),'Unregistered or private repository in landing catalog '+name);

assert(snapshot.private_repositories_omitted===registry.private_repositories_omitted,'Private repository count stays hidden');
for(const repo of registry.repositories){
  const item=snapshot.repositories.find(x=>x.name===repo.name);
  assert(item,'Hub snapshot includes '+repo.name);
  validateDeployment(repo.preview_deployment,item.preview_deployment,'preview',repo.name);
  validateDeployment(repo.production_deployment,item.production_deployment,'production',repo.name);
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
const quality=fs.readFileSync(path.join(dir,'diagnostics.html'),'utf8');
const qualityJs=fs.readFileSync(path.join(dir,'quality.js'),'utf8');
for(const match of qualityJs.matchAll(/\$\('([^']+)'\)/g))assert(quality.includes('id="'+match[1]+'"'),'Quality DOM id '+match[1]);
for(const asset of ['diagnostics.html','diagnostics.css','quality-core.js','quality.js'])assert(sw.includes("'./"+asset+"'"),'Quality offline asset '+asset);
assert(index.includes('href="./quality.html"')&&pilotage.includes('href="./quality.html"'),'Quality navigation');
const deploymentPage=fs.readFileSync(path.join(dir,'deployments.html'),'utf8');
const deploymentJs=fs.readFileSync(path.join(dir,'deployments.js'),'utf8');
for(const match of deploymentJs.matchAll(/\$\('([^']+)'\)/g))assert(deploymentPage.includes('id="'+match[1]+'"'),'Deployment DOM id '+match[1]);
for(const asset of ['deployments.html','deployments.js','deployments-core.js','deployment-observations.json'])assert(sw.includes("'./"+asset+"'"),'Deployment offline asset '+asset);
require('./deployments-core.js').buildRows(snapshot,JSON.parse(fs.readFileSync(path.join(dir,'deployment-observations.json'),'utf8')));
const securityPage=fs.readFileSync(path.join(dir,'security.html'),'utf8');
const securityJs=fs.readFileSync(path.join(dir,'security.js'),'utf8');
for(const match of securityJs.matchAll(/\$\('([^']+)'\)/g))assert(securityPage.includes('id="'+match[1]+'"'),'Security DOM id '+match[1]);
for(const asset of ['security.html','security.js','security-core.js'])assert(sw.includes("'./"+asset+"'"),'Security offline asset '+asset);
assert(index.includes('href="./security.html"'),'Security navigation');
const agentPage=fs.readFileSync(path.join(dir,'agents.html'),'utf8');
const agentJs=fs.readFileSync(path.join(dir,'agents.js'),'utf8');
for(const match of agentJs.matchAll(/\$\('([^']+)'\)/g))assert(agentPage.includes('id="'+match[1]+'"'),'Agent DOM id '+match[1]);
for(const asset of ['agents.html','agents.js','agents-core.js'])assert(sw.includes("'./"+asset+"'"),'Agent offline asset '+asset);
assert(index.includes('href="./agents.html"'),'Agent navigation');
require('./agents-core.js').buildProjects(cat,snapshot,JSON.parse(fs.readFileSync(path.join(dir,'deployment-observations.json'),'utf8')),JSON.parse(fs.readFileSync(path.join(dir,'provenance-snapshot.json'),'utf8')));
const devicePage=fs.readFileSync(path.join(dir,'devices.html'),'utf8');
const deviceJs=fs.readFileSync(path.join(dir,'devices.js'),'utf8');
for(const match of deviceJs.matchAll(/\$\('([^']+)'\)/g))assert(devicePage.includes('id="'+match[1]+'"'),'Device DOM id '+match[1]);
for(const asset of ['devices.html','devices.js','devices-core.js'])assert(sw.includes("'./"+asset+"'"),'Device offline asset '+asset);
assert(index.includes('href="./devices.html"')&&pilotage.includes('href="./devices.html"'),'Device navigation');
const recoveryPage=fs.readFileSync(path.join(dir,'recovery.html'),'utf8');
const recoveryJs=fs.readFileSync(path.join(dir,'recovery.js'),'utf8');
for(const match of recoveryJs.matchAll(/\$\('([^']+)'\)/g))assert(recoveryPage.includes('id="'+match[1]+'"'),'Recovery DOM id '+match[1]);
for(const asset of ['recovery.html','recovery.js','recovery-core.js'])assert(sw.includes("'./"+asset+"'"),'Recovery offline asset '+asset);
assert(index.includes('href="./recovery.html"')&&pilotage.includes('href="./recovery.html"'),'Recovery navigation');
const commandPage=fs.readFileSync(path.join(dir,'command.html'),'utf8');
const commandJs=fs.readFileSync(path.join(dir,'command.js'),'utf8');
for(const match of commandJs.matchAll(/\$\('([^']+)'\)/g))assert(commandPage.includes('id="'+match[1]+'"'),'Command DOM id '+match[1]);
for(const asset of ['command.html','command.js','command-core.js','command.css'])assert(sw.includes("'./"+asset+"'"),'Command offline asset '+asset);
assert(index.includes('href="./command.html"')&&pilotage.includes('href="./command.html"'),'Command navigation');
for(const page of ['index','pilotage','quality','diagnostics','deployments','security','agents','devices','recovery','command','provenance']){const html=fs.readFileSync(path.join(dir,page+'.html'),'utf8');for(const asset of ['design.css','design-core.js','design.js'])assert(html.includes('./'+asset),'Shared design '+page+' '+asset);}
for(const asset of ['design.css','design-core.js','design.js'])assert(sw.includes("'./"+asset+"'"),'Design offline asset '+asset);
const precache=sw.match(/const ASSETS=\[(.*?)\];/s);assert(precache,'PWA precache manifest');
const entries=[...precache[1].matchAll(/'([^']+)'/g)].map(x=>x[1]);assert.equal(new Set(entries).size,entries.length,'Unique precache entries');for(const asset of entries)assert(fs.existsSync(path.join(dir,asset)),'Existing precache asset '+asset);
for(const shortcut of manifest.shortcuts||[])assert(entries.includes(shortcut.url),'Offline shortcut '+shortcut.url);
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
assert.equal(releases.rows.length,5);
assert.equal(new Set(releases.rows.map(r=>r.repo)).size,releases.rows.length);
for(const r of releases.rows){assert(evidence.fixes.some(f=>f.repo===r.repo)||r.repo===evidence.followup.oracle.repo);assert(/^[a-f0-9]{40}$/.test(r.commit));assert(Number.isSafeInteger(r.ci)&&r.ci>0);assert(r.pages===null||Number.isSafeInteger(r.pages)&&r.pages>0);assert(r.incident===null||Number.isSafeInteger(r.incident)&&r.incident>0);if(r.url){assert.equal(new URL(r.url).origin,'https://nikoju1977.github.io');assert(r.pages!==null)}}
const qualityHtml=fs.readFileSync(path.join(dir,'quality.html'),'utf8');
for(const r of releases.rows){assert(qualityHtml.includes('/commit/'+r.commit));assert(qualityHtml.includes('/actions/runs/'+r.ci));if(r.pages)assert(qualityHtml.includes('/actions/runs/'+r.pages));if(r.incident)assert(qualityHtml.includes('/actions/runs/'+r.incident));}
console.log('PASS release evidence references');

assert.equal(evidence.followup.oracle.productionRuntimeVerified,false);
assert.equal(evidence.followup.wan.gpuTested,false);
assert.equal(evidence.followup.wan.merged,false);
assert.equal(releases.rows.find(r=>r.repo===evidence.followup.oracle.repo).commit,evidence.followup.oracle.main);
assert(qualityHtml.includes('/actions/runs/'+evidence.followup.oracle.preMerge.run));
assert(qualityHtml.includes('/actions/runs/'+evidence.followup.wan.run));
console.log('PASS scoped follow-up evidence');

const distribution=evidence.distributionFollowup;
const medical=distribution.medical,music=distribution.music;
assert.equal(medical.httpStatus,200);
for(const hash of [medical.sourceSha256,medical.distSha256,medical.publicSha256])assert(/^[0-9a-f]{64}$/.test(hash));
assert.equal(medical.distSha256,medical.publicSha256);assert.notEqual(medical.sourceSha256,medical.distSha256);
assert.equal(medical.fullRevisionVerified,false);assert.equal(medical.clinicalValidation,false);assert.equal(medical.customWorkflowRetained,true);
assert.equal(music.customDeploy,'skipped');assert.equal(music.source,'legacy-main-root-confirmed');assert.equal(music.httpBytesVerified,false);assert.equal(music.physicalDevicesVerified,false);
assert(/^[0-9a-f]{40}$/.test(music.commit));assert(/^[0-9a-f]{40}$/.test(medical.checkedCommit));
for(const run of [medical.run,music.ci,music.route,music.pages]){assert(Number.isSafeInteger(run)&&run>0);assert(qualityHtml.includes('/actions/runs/'+run));}
assert(qualityHtml.includes(medical.publicSha256));assert(qualityHtml.includes('/commit/'+music.commit));
console.log('PASS distribution evidence and limits');

const http=evidence.staticHttpSnapshot;
assert.equal(http.productionRuntimeVerified,false);
assert.equal(http.rows.length,7);assert.equal(http.counts.match,7);assert.equal(http.counts.mismatch,0);assert.equal(http.counts.unavailable,0);
assert.equal(new Set(http.rows.map(r=>r.repo+'/'+r.path)).size,7);
assert.equal(http.rows.filter(r=>r.repo==='the-lovestronautes-machine').length,4);assert.equal(http.rows.filter(r=>r.repo==='oracle-du-jardinier').length,3);
for(const r of http.rows){assert.equal(r.status,'match');assert.equal(r.sourceStatus,200);assert.equal(r.publicStatus,200);assert.equal(r.sourceSha256,r.publicSha256);assert(/^[0-9a-f]{64}$/.test(r.publicSha256));assert(/^[0-9a-f]{40}$/.test(r.commit));assert.equal(r.sourceBytes,r.publicBytes);assert(Number.isSafeInteger(r.sourceBytes)&&r.sourceBytes>0);assert(qualityHtml.includes(r.publicSha256));assert(qualityHtml.includes('/commit/'+r.commit));}
assert(qualityHtml.includes('/actions/runs/'+http.run));
console.log('PASS seven static HTTP file evidence records');

require('node:child_process').execFileSync(process.execPath,[path.join(dir,'cache-isolation.cjs')],{stdio:'inherit'});
