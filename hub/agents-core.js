(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.AgentCore=api;})(globalThis,function(){
'use strict';
const modes=['quality','release','security','general'];
const priorities={P0:0,P1:1,P2:2};
const sha=x=>typeof x==='string'&&/^[0-9a-f]{40}$/.test(x);
const repoName=x=>typeof x==='string'&&/^[A-Za-z0-9_.-]{1,100}$/.test(x);
function buildProjects(catalog,snapshot,observations,provenance){
 if(!Array.isArray(catalog)||!Array.isArray(snapshot?.repositories)||!Array.isArray(observations?.rows)||!Array.isArray(provenance?.repositories))throw Error('Sources agentiques invalides');
 const reg=new Map(snapshot.repositories.map(r=>[r.name,r])),deploy=new Map(observations.rows.map(r=>[r.repo,r])),prov=new Map(provenance.repositories.map(r=>[r.repository,r]));
 const seen=new Set();
 const projects=catalog.map(c=>{
  const u=new URL(c.repoUrl),name=u.pathname.split('/').filter(Boolean).at(-1),r=reg.get(name);
  if(u.origin!=='https://github.com'||u.pathname!=='/Nikoju1977/'+name||!repoName(name)||!r||seen.has(name))throw Error('Identité projet invalide');
  seen.add(name);
  return {name,slug:c.slug,category:c.category,priority:r.priority||'P2',domain:r.domain||'unknown',hasUrl:!!c.demoUrl,core:r.core_integration||'unknown',production:r.production_deployment||null,observation:deploy.get(name)||null,observationDate:observations.checkedOn||null,provenance:prov.get('Nikoju1977/'+name)||null,provenanceDate:provenance.date||null};
 });
 if(seen.size!==reg.size)throw Error('Inventaire incomplet');return projects;
}
function evidence(project,raw){
 const live=raw?.http,head=raw?.head,ci=raw?.ci;
 const http=live&&live.slug===project.slug&&typeof live.checkedAt==='string'&&Number.isFinite(Date.parse(live.checkedAt))&&['reachable','restricted','unavailable','redirected','unknown'].includes(live.state)?live:null;
 const git=head&&sha(head.sha)&&Number.isFinite(Date.parse(head.at))?{sha:head.sha,at:head.at}:null;
 // CI data must be bound to the inspected head, not merely to the project.
 const workflow=git&&ci&&ci.sha===git.sha&&['success','failure','in_progress','queued','cancelled','unknown'].includes(ci.state)&&Number.isFinite(Date.parse(ci.at))?ci:null;
 return {http,git,workflow};
}
const task=(id,agent,priority,title,reason,action,proof)=>({id,agent,priority,title,reason,action,proof});
function analyze(project,mode='general',raw={},now=new Date().toISOString()){
 if(!project||!repoName(project.name)||!modes.includes(mode))throw Error('Mission invalide');
 const ev=evidence(project,raw),tasks=[],trace=[];
 const add=(id,agent,priority,title,reason,action,proof)=>tasks.push(task(id,agent,priority,title,reason,action,proof));
 const run=(agent,fn)=>{const n=tasks.length;fn();trace.push({agent,added:tasks.length-n,state:'completed'});};
 run('ARCHITECT',()=>{
  if(project.core!=='committed')add('architecture','ARCHITECT','P2','Cartographier le socle','Intégration déclarée : '+project.core,'Lire les points d’entrée et dépendances, établir les modules et leurs contrats.','Inventaire versionné des modules et dépendances.');
 });
 run('DEBUGGER',()=>{
  if(ev.http?.state==='unavailable')add('http-error','DEBUGGER','P0','Diagnostiquer la réponse HTTP','Le diagnostic a enregistré HTTP '+ev.http.httpStatus+' à '+ev.http.checkedAt,'Consulter les logs du déploiement et reproduire la requête sur la route exacte.','Requête datée, logs et cause racine.');
  else if(ev.http&&ev.http.state!=='reachable')add('http-review','DEBUGGER','P1','Examiner l’accès','Diagnostic : '+ev.http.state+' à '+ev.http.checkedAt,'Vérifier authentification, redirection ou connectivité selon le résultat.','Requête indépendante et cause documentée.');
  if(ev.workflow?.state==='failure')add('ci-failure','DEBUGGER','P0','Isoler le job CI en échec','Échec observé sur '+ev.workflow.sha,'Lire le job et ses annotations ; reproduire la commande fautive sur une branche.','Journal du job et reproduction avant correction.');
 });
 run('SECURITY',()=>{
  if(!project.provenance)add('provenance','SECURITY','P1','Examiner la provenance','Pas de référence dans le relevé de provenance chargé.','Vérifier le statut fork, la licence et les notices avant tout changement.','Licence ou justification d’exclusion documentée.');
  add('security-review','SECURITY','P1','Vérifier le périmètre de sécurité','Aucun audit de sécurité de ce dépôt n’a été exécuté par cette mission.','Lancer un scan des fichiers suivis, de l’historique et des dépendances ; traiter les alertes sans publier les valeurs.','Rapport daté, SHA, périmètre et exclusions.');
 });
 run('DEVOPS',()=>{
  const o=project.observation;
  if(!o)add('production-check','DEVOPS','P1','Établir la preuve de production','Aucun relevé Vercel associé ; cela ne prouve pas une absence de déploiement.','Vérifier la plateforme, le domaine, la cible et le SHA.','Identifiant de déploiement, alias, état et date.');
  else if(ev.git&&o.commit!==ev.git.sha)add('release-diff','DEVOPS','P1','Examiner la divergence de versions','Le HEAD GitHub récent diffère du SHA Vercel relevé le '+project.observationDate+'.','Actualiser Vercel et comparer l’ascendance des commits avant toute publication.','Relevé Vercel frais et comparaison Git.');
  else if(o.commit!==o.head)add('release-diff','DEVOPS','P1','Examiner les SHA différents au relevé','Divergence constatée dans le relevé du '+project.observationDate+'.','Comparer les commits et vérifier la production actuelle.','Comparaison Git et déploiement actuel.');
  if(!ev.workflow)add('ci-check','DEVOPS','P1','Établir la CI de la révision','Aucune CI contemporaine liée au HEAD n’est confirmée par cette mission.','Consulter les runs du SHA précis.','Run, job et conclusion associés au SHA.');
 });
 run('QUALITY',()=>{
  if(project.hasUrl&&!ev.http)add('http-check','QUALITY','P1','Contrôler l’accès HTTP','Aucune mesure HTTP de cette mission.','Lancer le diagnostic HTTP à la demande.','État HTTP, horodatage et route.');
  if(!project.hasUrl)add('launch-url','QUALITY','P2','Documenter un accès utilisable','Le catalogue ne fournit pas de lien de lancement.','Déterminer si le projet est une bibliothèque, une application locale ou un site à publier.','Mode de lancement ou URL confirmée.');
  add('runtime','QUALITY',project.priority==='P0'?'P1':'P2','Valider les fonctions métier','Ni HTTP ni CI ne certifient le fonctionnement complet.','Définir et exécuter un parcours métier avec un résultat attendu sur une révision précise.','Résultat reproductible et erreurs éventuelles.');
 });
 run('CODER',()=>{
  if(tasks.some(t=>t.id==='ci-failure'||t.id==='http-error'))add('patch-plan','CODER','P1','Préparer un correctif minimal','Une anomalie a été signalée ; la cause exacte et les fichiers ne sont pas encore établis.','Après reproduction, produire un diff ciblé et un test de régression négatif. Aucun patch automatique.','Diff relu, test avant/après et CI du nouveau SHA.');
 });
 run('DESIGNER',()=>add('device-review','DESIGNER','P2','Vérifier l’ergonomie multiplateforme','Aucune mesure d’interface ou capture réelle n’est fournie.','Tester navigation, clavier, tactile, contraste et largeur 390 px puis appareils physiques.','Captures et résultats par appareil.'));
 run('MEMORY',()=>{});
 const focus={quality:['QUALITY','DEBUGGER','CODER'],release:['DEVOPS','QUALITY'],security:['SECURITY'],general:[]}[mode];
 tasks.sort((a,b)=>priorities[a.priority]-priorities[b.priority]||Number(focus.includes(b.agent))-Number(focus.includes(a.agent))||a.id.localeCompare(b.id));
 return {schema:'studio-niko-agent-plan/1',project:project.name,mode,createdAt:now,engine:'deterministic-local-rules',trace:[{agent:'ORCHESTRATOR',state:'completed',added:0},...trace],tasks,evidence:{http:ev.http?{state:ev.http.state,httpStatus:ev.http.httpStatus,checkedAt:ev.http.checkedAt}:null,git:ev.git,ci:ev.workflow?{state:ev.workflow.state,sha:ev.workflow.sha,at:ev.workflow.at}:null,production:project.observation?{commit:project.observation.commit,checkedOn:project.observationDate}:null,provenance:project.provenance?{checkedOn:project.provenanceDate}:null},limits:'Plan local fondé sur règles. Aucun LLM, aucun changement de dépôt, aucun test métier ou de sécurité exécuté par les agents.'};
}
function decisions(plan,selected){return plan.tasks.filter(t=>selected.includes(t.id)).map(t=>({id:t.id,agent:t.agent,title:t.title,state:'accepted_for_review'}));}
function readJournal(raw){if(!Array.isArray(raw))return [];return raw.filter(x=>x&&repoName(x.project)&&typeof x.at==='string'&&Number.isFinite(Date.parse(x.at))&&Array.isArray(x.actions)).slice(-50).map(x=>({project:x.project,at:x.at,actions:x.actions.filter(a=>a&&typeof a.id==='string'&&/^[a-z-]{1,40}$/.test(a.id)).slice(0,30).map(a=>({id:a.id,agent:String(a.agent||'').slice(0,30),title:String(a.title||'').slice(0,140),state:'accepted_for_review'}))}));}
return {modes,buildProjects,analyze,decisions,readJournal};
});
