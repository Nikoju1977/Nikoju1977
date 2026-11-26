(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.DeploymentCore=api;})(globalThis,function(){
'use strict';
const sha=s=>typeof s==='string'&&/^[0-9a-f]{40}$/.test(s);
const labels={aligned:'SHA identiques au relevé',different:'SHA différents · examiner',unknown:'Non confirmé',no_record:'Sans relevé'};
function classify(o,head){if(!o||o.target!=='production'||o.state!=='READY'||o.aliasConfirmed!==true||!sha(o.commit)||!sha(head))return 'unknown';return o.commit===head?'aligned':'different';}
function buildRows(snapshot,observations){
 if(!Array.isArray(snapshot?.repositories)||observations?.schema!=='studio-niko-deployments/1'||!Array.isArray(observations.rows)||!/^\d{4}-\d{2}-\d{2}$/.test(observations.checkedOn))throw Error('Relevé invalide');
 const map=new Map(),reg=new Map(snapshot.repositories.map(x=>[x.name,x]));
 for(const o of observations.rows){const p=reg.get(o.repo)?.production_deployment;
 if(!p||map.has(o.repo)||p.project!==o.project||new URL(p.url).hostname!==o.host||!/^dpl_[A-Za-z0-9]+$/.test(o.id)||!sha(o.commit)||!sha(o.head)||o.branch!=='main'||o.target!=='production'||o.state!=='READY'||o.aliasConfirmed!==true)throw Error('Observation non conforme : '+o.repo);
 map.set(o.repo,o);}
 return snapshot.repositories.map(r=>{const o=map.get(r.name)||null;return {name:r.name,priority:r.priority||'—',historical:r.production_deployment||null,observation:o,checkedOn:o?observations.checkedOn:null,status:o?classify(o,o.head):'no_record',headNow:null};});
}
function filter(rows,q,status){q=String(q||'').toLowerCase().trim();return rows.filter(r=>(!q||[r.name,r.priority,r.observation?.project].some(v=>String(v||'').toLowerCase().includes(q)))&&(status==='all'||r.status===status));}
return {buildRows,classify,filter,labels,sha};
});
