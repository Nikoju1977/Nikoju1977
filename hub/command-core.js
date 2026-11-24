(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.CommandCore=api;})(globalThis,function(){
'use strict';
const rank={P0:0,P1:1,P2:2};
const modules=[
 ['quality.html','Quality Engine','Contrôles HTTP à la demande'],
 ['deployments.html','Deployment Manager','SHA GitHub et relevés Vercel'],
 ['security.html','Security Center','Signatures de secrets et audit Git'],
 ['agents.html','Agent Studio','Plans à règles et décisions locales'],
 ['devices.html','Device Lab','Capacités et essais déclarés'],
 ['recovery.html','Recovery Center','Sauvegarde et restauration locales'],
 ['pilotage.html','Pilotage','Versions, blocages et actions'],
 ['provenance.html','Provenance','Licences et références historiques'],
 ['index.html#atelier','Atelier','Projets et tâches locales']
];
const priority=p=>Object.hasOwn(rank,p)?p:'P2';
const clean=(s,n)=>typeof s==='string'?s.trim().slice(0,n):'';
function compose(projects,deployments,locals){
 if(!Array.isArray(projects)||!Array.isArray(deployments)||projects.length!==deployments.length)throw Error('Inventaires incompatibles');
 const dm=new Map(deployments.map(d=>[d.name,d]));
 if(dm.size!==deployments.length||new Set(projects.map(p=>p.name)).size!==projects.length)throw Error('Identités en double');
 const tracking=locals.tracking?.schema==='studio-niko-tracking-v1'&&locals.tracking.projects&&typeof locals.tracking.projects==='object'&&!Array.isArray(locals.tracking.projects)?locals.tracking.projects:{};
 const reports=Array.isArray(locals.devices)?locals.devices:[];
 const journal=Array.isArray(locals.agents)?locals.agents:[];
 const rows=projects.map(p=>{
  const d=dm.get(p.name);if(!d)throw Error('Projet absent du relevé');
  const t=Object.hasOwn(tracking,p.name)?tracking[p.name]:null;
  const blocker=clean(t?.blocker,1200),next=clean(t?.nextAction,1200);
  const dev=reports.filter(r=>r.project===p.name&&r.source==='manual_self_report'&&r.certification===false);
  const actions=journal.filter(r=>r.project===p.name).flatMap(r=>Array.isArray(r.actions)?r.actions:[]).filter(a=>a.state==='accepted_for_review');
  const failures=dev.reduce((n,r)=>n+r.tests.filter(t=>t.result==='fail').length,0);
  const alerts=[];
  if(blocker)alerts.push({kind:'blocker',label:'Blocage déclaré',priority:priority(p.priority),route:'pilotage.html'});
  if(failures)alerts.push({kind:'device',label:'Échec(s) déclaré(s) : '+failures,priority:'P1',route:'devices.html'});
  if(d.status==='different')alerts.push({kind:'release',label:'SHA différents au relevé',priority:'P1',route:'deployments.html'});
  if(!d.observation)alerts.push({kind:'gap',label:'Relevé Vercel absent',priority:'P2',route:'deployments.html'});
  if(!p.provenance)alerts.push({kind:'provenance',label:'Référence de provenance absente',priority:'P2',route:'provenance.html'});
  return {name:p.name,category:p.category,priority:priority(p.priority),hasUrl:p.hasUrl===true,release:d.status,checkedOn:d.checkedOn,provenance:!!p.provenance,deviceReports:dev.length,deviceFailures:failures,agentDecisions:actions.length,blocker,next,alerts};
 });
 rows.sort((a,b)=>rank[a.priority]-rank[b.priority]||a.name.localeCompare(b.name,'fr'));
 return rows;
}
function summarize(rows){return {total:rows.length,p0:rows.filter(r=>r.priority==='P0').length,launch:rows.filter(r=>r.hasUrl).length,aligned:rows.filter(r=>r.release==='aligned').length,missing:rows.filter(r=>r.release==='no_record').length,blockers:rows.filter(r=>r.blocker).length,deviceReports:rows.reduce((n,r)=>n+r.deviceReports,0),decisions:rows.reduce((n,r)=>n+r.agentDecisions,0)};}
function filter(rows,q,mode){q=clean(q,200).toLowerCase();return rows.filter(r=>(!q||[r.name,r.category,r.priority].some(s=>String(s).toLowerCase().includes(q)))&&(mode==='all'||mode===r.priority||(mode==='blocker'&&!!r.blocker)||(mode==='gap'&&r.alerts.some(a=>a.kind==='gap'||a.kind==='provenance'))||(mode==='device'&&r.deviceFailures>0)));}
function notifications(rows){return rows.flatMap(r=>r.alerts.map(a=>({...a,project:r.name}))).sort((a,b)=>rank[a.priority]-rank[b.priority]||a.project.localeCompare(b.project,'fr'));}
function report(rows,now,availability){return {schema:'studio-niko-command/1',createdAt:now,scope:'Historical registered evidence and local self-reports only; no live HTTP, device certification, or automatic release',localAvailability:availability,summary:summarize(rows),projects:rows.map(({blocker,next,...r})=>({...r,hasDeclaredBlocker:!!blocker,hasDeclaredNextAction:!!next}))};}
return {modules,compose,summarize,filter,notifications,report};
});
