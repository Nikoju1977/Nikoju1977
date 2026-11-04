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
assert(sw.includes('studio-niko-hub-v3'),'Service worker cache bumped');
assert(index.includes('id="atelier"'),'Workspace section');
assert(fs.existsSync(path.join(dir,'workspace.js')),'Workspace JS');
assert(fs.existsSync(path.join(dir,'workspace.css')),'Workspace CSS');
new Function(fs.readFileSync(path.join(dir,'workspace.js'),'utf8'));
console.log('PASS catalog='+cat.length+' launchUrls='+cat.filter(x=>x.demoUrl).length+' DOM bindings checked');
