(function(root,factory){
 const api=factory();
 if(typeof module==='object'&&module.exports)module.exports=api;else root.QualityCore=api;
})(typeof globalThis==='object'?globalThis:this,function(){
 'use strict';
 const scopes={http_assets_only:'HTTP historique',deployment_ready_ci_only:'READY + CI historique'};
 const states={reachable:'HTTP 2xx',restricted:'Accès protégé',unavailable:'HTTP en erreur',redirected:'Redirection',unknown:'Non concluant',untested:'Non contrôlé',no_url:'Sans accès'};
 function buildRows(catalog,snapshot){
  if(!Array.isArray(catalog)||!snapshot||!Array.isArray(snapshot.repositories))throw Error('Données du catalogue invalides');
  const map=new Map(snapshot.repositories.map(r=>[r.name,r]));
  if(map.size!==snapshot.repositories.length||catalog.length!==map.size)throw Error('Registre et catalogue désynchronisés');
  const names=new Set(),slugs=new Set();
  return catalog.map(c=>{
   const name=new URL(c.repoUrl).pathname.split('/').filter(Boolean).at(-1),r=map.get(name);
   if(!r||names.has(name)||slugs.has(c.slug))throw Error('Identité incohérente : '+name);
   names.add(name);slugs.add(c.slug);
   const p=r.production_deployment;
   return {slug:c.slug,name:c.name,category:c.category,demoUrl:c.demoUrl||null,repoUrl:c.repoUrl,priority:r.priority||'—',production:p?{scope:scopes[p.verification]||'Périmètre non reconnu',commit:p.commit,date:p.checked_on,ci:p.ci||null}:null,probe:{state:c.demoUrl?'untested':'no_url'}};
  });
 }
 function normalizeProbe(raw,slug){
  if(!raw||raw.slug!==slug||typeof raw.checkedAt!=='string'||!Number.isFinite(Date.parse(raw.checkedAt)))return {state:'unknown',reason:'Réponse API invalide'};
  const code=raw.httpStatus;
  const expected=code===null?'unknown':!Number.isInteger(code)?null:code===401||code===403?'restricted':code>=200&&code<300?'reachable':code>=300&&code<400?'redirected':code>=400&&code<=599?'unavailable':null;
  if(!expected||expected!==raw.state)return {state:'unknown',reason:'Statut API incohérent'};
  return {state:expected,httpStatus:code,checkedAt:raw.checkedAt,latencyMs:Number.isFinite(raw.latencyMs)&&raw.latencyMs>=0?raw.latencyMs:null};
 }
 function filterRows(rows,query,filter){
  const q=String(query||'').toLowerCase().trim();
  return rows.filter(r=>(!q||[r.name,r.category,r.slug,r.priority].some(v=>String(v).toLowerCase().includes(q)))&&(!filter||filter==='all'||r.probe.state===filter||(filter==='issues'&&['restricted','unavailable','redirected','unknown'].includes(r.probe.state))));
 }
 function summarize(rows){const counts={};for(const r of rows)counts[r.probe.state]=(counts[r.probe.state]||0)+1;return counts;}
 function report(rows,now){return {schema:'studio-niko-quality/1',exportedAt:now,scope:'HTTP access only; historical deployment evidence is not a live audit; functional/device tests not performed',rows:rows.map(r=>({slug:r.slug,priority:r.priority,production:r.production,probe:r.probe}))};}
 return {buildRows,normalizeProbe,filterRows,summarize,report,states};
});
