(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.DesignCore=api;})(globalThis,function(){
'use strict';
const themes=['studio','graphite','midnight'];
const modules=[
['command.html','Command Center','Cockpit supervision priorités'],
['index.html','Portail','Accueil catalogue applications'],
['pilotage.html','Pilotage','Projets versions décisions'],
['quality.html','Quality Engine','Qualité diagnostic HTTP'],
['deployments.html','Deployment Manager','Vercel GitHub publication'],
['security.html','Security Center','Sécurité audit secrets'],
['agents.html','Agent Studio','Agents recommandations'],
['devices.html','Device Lab','Appareils tests navigateur'],
['recovery.html','Recovery Center','Sauvegardes restauration'],
['provenance.html','Provenance','Licences intégrité'],
['index.html#atelier','Atelier créatif','Création notes tâches']
];
function normalize(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();}
function preferences(x){return {theme:themes.includes(x?.theme)?x.theme:'studio',density:x?.density==='compact'?'compact':'comfortable'};}
function search(q,catalog=[]){const terms=normalize(q).split(/\s+/).filter(Boolean);const match=s=>terms.every(t=>normalize(s).includes(t));const rows=modules.filter(m=>match(m.join(' '))).map(([url,title,desc])=>({url,title,desc,kind:'module'}));if(terms.length&&Array.isArray(catalog)){for(const c of catalog){if(typeof c?.name!=='string'||typeof c?.slug!=='string'||!match(c.name+' '+c.slug+' '+c.category))continue;rows.push({url:'index.html?q='+encodeURIComponent(c.name.slice(0,200))+'#catalogue',title:c.name,desc:String(c.category||''),kind:'project'});if(rows.length>=30)break;}}return rows;}
function current(path,hash=''){const page=String(path).split('/').pop()||'index.html';return page==='index.html'&&hash==='#atelier'?'index.html#atelier':page;}
return {themes,modules,preferences,search,current};
});
