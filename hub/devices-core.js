(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.DeviceCore=api;})(globalThis,function(){
'use strict';
const platforms=['Windows','macOS','Android','iPhone','iPad','Tablette Android','Linux','Autre'];
const contexts=['physical','emulated','unknown'];
const outcomes=['pass','fail','blocked','not_tested'];
const protocols=[
 {id:'launch',title:'Ouverture',steps:'Ouvrir la version indiquée ; vérifier que l’écran principal apparaît sans erreur.',expected:'Écran principal utilisable.'},
 {id:'layout',title:'Affichage et rotation',steps:'Tester portrait/paysage ou redimensionner ; parcourir les panneaux.',expected:'Aucun contrôle masqué, aucun débordement horizontal bloquant.'},
 {id:'input',title:'Interactions',steps:'Utiliser clavier, souris ou tactile ; parcourir les commandes et le focus.',expected:'Les commandes répondent ; navigation et focus utilisables.'},
 {id:'workflow',title:'Parcours métier',steps:'Exécuter une fonction réelle du projet, définir le résultat attendu dans les notes.',expected:'Résultat métier conforme au scénario documenté.'},
 {id:'recovery',title:'Reprise après interruption',steps:'Sur des données de test, interrompre puis reprendre le parcours ou recharger.',expected:'État récupéré ou message clair, sans perte inattendue.'},
 {id:'offline',title:'Hors connexion / PWA',steps:'Si applicable, charger puis couper le réseau et réouvrir ; rétablir ensuite le réseau.',expected:'Fonctions locales accessibles ; fonctions réseau signalées indisponibles.'}
];
const bounded=(v,n)=>typeof v==='string'?v.trim().slice(0,n):'';
const sha=v=>typeof v==='string'&&/^[a-f0-9]{40}$/.test(v);
function normalizeReport(input){
 if(!input||typeof input!=='object')throw Error('Rapport invalide');
 const project=bounded(input.project,100),revision=bounded(input.revision,40),platform=input.platform,context=input.context,browser=bounded(input.browser,100),device=bounded(input.device,100);
 if(!/^[A-Za-z0-9_.-]{1,100}$/.test(project)||!platforms.includes(platform)||!contexts.includes(context)||!browser||!device)throw Error('Projet, appareil, navigateur et contexte requis.');
 if(revision&&!sha(revision))throw Error('SHA complet de 40 caractères ou champ vide.');
 if(typeof input.at!=='string'||!Number.isFinite(Date.parse(input.at)))throw Error('Date invalide.');
 if(!Array.isArray(input.tests)||input.tests.length!==protocols.length||new Set(input.tests.map(t=>t?.id)).size!==protocols.length)throw Error('Protocole incomplet.');
 const tests=protocols.map(p=>{const t=input.tests.find(x=>x.id===p.id);if(!t||!outcomes.includes(t.result))throw Error('Résultat invalide');const note=bounded(t.note,600);if(t.result!=='not_tested'&&!note)throw Error('Observation requise : '+p.title);if(t.result==='pass'&&!revision)throw Error('SHA exact requis pour déclarer un résultat réussi.');return {id:p.id,result:t.result,note};});
 return {project,revision:revision||null,platform,context,browser,device,at:input.at,tests,source:'manual_self_report',certification:false};
}
function summarize(report){const counts={pass:0,fail:0,blocked:0,not_tested:0};for(const t of report.tests)counts[t.result]++;return counts;}
function readJournal(raw,allowed){if(!Array.isArray(raw))return [];const output=[];for(const item of raw.slice(-80)){try{const r=normalizeReport(item);if(!allowed||allowed.includes(r.project))output.push(r);}catch{}}return output;}
function capabilities(env){return [{id:'secure',label:'Contexte sécurisé',state:env.secure===true?'available':'unavailable'},{id:'sw',label:'API Service Worker',state:env.sw?'available':'unavailable'},{id:'storage',label:'Écriture stockage local',state:env.storage?'available':'unavailable'},{id:'webgl',label:'Création de contexte WebGL',state:env.webgl?'available':'unavailable'},{id:'audio',label:'API Web Audio',state:env.audio?'available':'unavailable'},{id:'touch',label:'Points tactiles annoncés',state:Number(env.touch)>0?'available':'unavailable'},{id:'network',label:'Indication réseau navigateur',state:env.online===true?'reported_online':env.online===false?'reported_offline':'unknown'}];}
function exportReport(reports,now){return {schema:'studio-niko-device-lab/1',exportedAt:now,scope:'manual device reports; self-reported, not independently certified; capability probes refer only to the current Hub browser',reports:readJournal(reports)};}
return {platforms,contexts,outcomes,protocols,normalizeReport,summarize,readJournal,capabilities,exportReport};
});
