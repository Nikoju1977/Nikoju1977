'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const src=fs.readFileSync(path.join(__dirname,'workspace.js'),'utf8');
function host(projects,fail=false){
 const nodes=new Map();function node(){return {value:'',textContent:'',dataset:{},listeners:{},children:[],replaceChildren(){this.children=[]},append(...x){this.children.push(...x)},setAttribute(){},addEventListener(k,f){this.listeners[k]=f}}}
 const get=id=>{if(!nodes.has(id))nodes.set(id,node());return nodes.get(id)};
 const doc={getElementById:get,createElement:node,activeElement:null};
 let stored={projects,selected:projects[0]?.id||null};
 vm.runInNewContext(src,{document:doc,localStorage:{getItem:()=>JSON.stringify(stored),setItem:(k,v)=>{if(fail)throw Error('quota');stored=JSON.parse(v)}},confirm:()=>true});
 return {get,stored:()=>stored};
}
const project=i=>({id:'p'+i,title:'Projet '+i,category:'Art & 3D',notes:'',tasks:[]});
const payload=JSON.stringify({format:'studio-niko-project-v1',project:{title:'Import',category:'Art & 3D',tasks:[]}});
(async()=>{
 const h=host(Array.from({length:39},(_,i)=>project(i)));
 let resolve;const delayed=new Promise(r=>resolve=r);
 const change=h.get('work-import').listeners.change;
 const one=change({target:{files:[{size:payload.length,text:()=>delayed}]}});
 await change({target:{files:[{size:payload.length,text:async()=>payload}]}});
 resolve(payload);await one;
 assert.equal(h.stored().projects.length,40);
 assert.match(h.get('work-status').textContent,/Limite de projets/);
 const bad=host([],true);
 bad.get('work-name').value='Test';bad.get('work-type').value='Art & 3D';
 bad.get('work-create').listeners.submit({preventDefault(){}});
 assert.match(bad.get('work-status').textContent,/ne seront pas conservées/);
 assert.equal(bad.get('work-count').textContent,'1 projet');
 await bad.get('work-import').listeners.change({target:{files:[{size:payload.length,text:async()=>payload}]}});
 assert.match(bad.get('work-status').textContent,/ne seront pas conservées/);
 console.log('PASS workspace concurrent import limit and truthful storage failure');
})().catch(e=>{console.error(e);process.exitCode=1;});
