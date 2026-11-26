(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.RecoveryCore=api;})(globalThis,function(){
'use strict';
const modules=[
{id:'favorites',key:'studio-niko-hub-favorites-v1',label:'Favoris du catalogue'},
{id:'workspace',key:'studio-niko-workspace-v1',label:'Atelier créatif'},
{id:'tracking',key:'studio-niko-project-tracking:v1',label:'Suivi des projets'},
{id:'agents',key:'studio-niko-agent-journal-v1',label:'Journal Agent Studio'},
{id:'devices',key:'studio-niko-device-reports-v1',label:'Rapports Device Lab'},
{id:'design',key:'studio-niko-design-v1',label:'Préférences graphiques'}
];
const MAX=4*1024*1024, MAX_ENTRY=2*1024*1024;
const bytes=s=>new TextEncoder().encode(s).length;
const plain=x=>x!==null&&typeof x==='object'&&!Array.isArray(x)&&Object.getPrototypeOf(x)===Object.prototype;
function safeTree(x,depth=0){if(depth>16)throw Error('Structure trop profonde');if(x&&typeof x==='object'){for(const k of Object.keys(x)){if(['__proto__','prototype','constructor'].includes(k))throw Error('Clé interdite');safeTree(x[k],depth+1);}}}
function validate(id,raw){
 if(typeof raw!=='string'||bytes(raw)>MAX_ENTRY)throw Error('Donnée trop volumineuse ou invalide : '+id);
 let x;try{x=JSON.parse(raw);}catch{throw Error('JSON invalide : '+id);}safeTree(x);
 const str=(v,n)=>typeof v==='string'&&v.length<=n;
 const array=(v,n,p)=>Array.isArray(v)&&v.length<=n&&v.every(p);
 const obj=plain;
 let ok=false;
 if(id==='favorites')ok=array(x,500,v=>str(v,150));
 if(id==='workspace')ok=obj(x)&&array(x.projects,40,p=>obj(p)&&str(p.id,150)&&str(p.title,100)&&str(p.category,100)&&str(p.notes,5000)&&array(p.tasks,80,t=>obj(t)&&str(t.id,150)&&str(t.text,160)&&typeof t.done==='boolean'))&&(x.selected===null||str(x.selected,150));
 if(id==='tracking')ok=obj(x)&&x.schema==='studio-niko-tracking-v1'&&obj(x.projects)&&Object.keys(x.projects).length<=500&&Object.entries(x.projects).every(([k,p])=>/^[A-Za-z0-9_.-]{1,100}$/.test(k)&&obj(p)&&array(p.modules,24,m=>obj(m)&&str(m.name,120)&&str(m.state,30)&&str(m.evidence,900))&&array(p.history,24,h=>obj(h)&&str(h.at,32)&&str(h.decision,1200)));
 if(id==='agents')ok=array(x,50,r=>obj(r)&&str(r.project,100)&&str(r.at,40)&&array(r.actions,30,a=>obj(a)&&str(a.id,40)&&str(a.title,140)&&a.state==='accepted_for_review'));
 if(id==='devices')ok=array(x,80,r=>obj(r)&&str(r.project,100)&&str(r.at,40)&&r.source==='manual_self_report'&&r.certification===false&&array(r.tests,6,t=>obj(t)&&str(t.id,40)&&['pass','fail','blocked','not_tested'].includes(t.result)&&str(t.note,600))&&r.tests.length===6);
 if(id==='design')ok=obj(x)&&['studio','graphite','midnight'].includes(x.theme)&&['compact','comfortable'].includes(x.density)&&Object.keys(x).length===2;
 if(!ok)throw Error('Schéma incompatible : '+id);
 return raw;
}
function snapshot(storage,ids=modules.map(m=>m.id)){
 return modules.filter(m=>ids.includes(m.id)).flatMap(m=>{const raw=storage.getItem(m.key);return raw===null?[]:[{id:m.id,raw:validate(m.id,raw)}];});
}
async function digest(text,cryptoImpl=globalThis.crypto){if(!cryptoImpl?.subtle)throw Error('SHA-256 indisponible : contexte HTTPS requis');return Array.from(new Uint8Array(await cryptoImpl.subtle.digest('SHA-256',new TextEncoder().encode(text))),x=>x.toString(16).padStart(2,'0')).join('');}
function checkPayload(p){if(!plain(p)||p.schema!=='studio-niko-recovery/1'||typeof p.createdAt!=='string'||!Number.isFinite(Date.parse(p.createdAt))||!Array.isArray(p.entries)||!p.entries.length||p.entries.length>modules.length)throw Error('Format de sauvegarde incompatible');const ids=new Set();for(const e of p.entries){if(!plain(e)||!modules.some(m=>m.id===e.id)||ids.has(e.id))throw Error('Module inconnu ou doublon');ids.add(e.id);validate(e.id,e.raw);}return p;}
async function create(entries,now=new Date().toISOString(),cryptoImpl){const payload=JSON.stringify(checkPayload({schema:'studio-niko-recovery/1',createdAt:now,entries}));const file=JSON.stringify({format:'studio-niko-backup/1',algorithm:'SHA-256',payload,digest:await digest(payload,cryptoImpl)});if(bytes(file)>MAX)throw Error('Sauvegarde supérieure à 4 Mio');return file;}
async function verify(file,cryptoImpl){if(typeof file!=='string'||bytes(file)>MAX)throw Error('Fichier trop volumineux');let e;try{e=JSON.parse(file);}catch{throw Error('Fichier JSON illisible');}if(!plain(e)||e.format!=='studio-niko-backup/1'||e.algorithm!=='SHA-256'||typeof e.payload!=='string'||!/^[a-f0-9]{64}$/.test(e.digest))throw Error('Enveloppe incompatible');if(await digest(e.payload,cryptoImpl)!==e.digest)throw Error('Empreinte SHA-256 différente : restauration refusée');return checkPayload(JSON.parse(e.payload));}
function preview(storage,payload){return checkPayload(payload).entries.map(e=>{const m=modules.find(m=>m.id===e.id),old=storage.getItem(m.key);return {id:e.id,label:m.label,bytes:bytes(e.raw),state:old===null?'new':old===e.raw?'same':'conflict',old};});}
function restore(storage,payload,selected,expected,overwrite=false){
 const p=checkPayload(payload),ids=new Set(selected);if(!ids.size||[...ids].some(id=>!p.entries.some(e=>e.id===id)))throw Error('Sélection invalide');
 const changes=preview(storage,p).filter(e=>ids.has(e.id));
 for(const c of changes){if(!Object.hasOwn(expected,c.id)||expected[c.id]!==c.old)throw Error('Données modifiées depuis l’aperçu : recommencer');if(c.state==='conflict'&&!overwrite)throw Error('Écrasement non autorisé');}
 const written=[];
 try{for(const c of changes){if(c.state==='same')continue;const key=modules.find(m=>m.id===c.id).key,raw=p.entries.find(e=>e.id===c.id).raw;written.push({key,old:c.old});storage.setItem(key,raw);if(storage.getItem(key)!==raw)throw Error('Écriture non vérifiée');}}
 catch(e){let failed=false;for(const w of written.reverse()){try{if(w.old===null)storage.removeItem(w.key);else storage.setItem(w.key,w.old);if(storage.getItem(w.key)!==w.old)failed=true;}catch{failed=true;}}throw Error(failed?'Restauration interrompue ; retour arrière incomplet. Utilisez la copie de secours.':'Restauration interrompue ; retour arrière effectué.');}
 return {written:written.length,unchanged:changes.length-written.length};
}
return {modules,MAX,validate,snapshot,digest,create,verify,preview,restore};
});
