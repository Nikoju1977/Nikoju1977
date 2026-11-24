(()=>{'use strict';
const $=id=>document.getElementById(id),core=globalThis.QualityCore;
let rows=[],active=null,loaded=false;
function element(tag,text,cls){const n=document.createElement(tag);n.textContent=text;if(cls)n.className=cls;return n;}
function link(label,href){try{const url=new URL(href);if(url.protocol!=='https:'||url.username||url.password)return null;const a=element('a',label);a.href=url.href;a.target='_blank';a.rel='noopener noreferrer';return a;}catch{return null;}}
function visible(){return core.filterRows(rows,$('search').value,$('filter').value);}
function render(){
 const c=core.summarize(rows),shown=visible();
 $('total').textContent=rows.length;$('ok').textContent=c.reachable||0;$('issues').textContent=['restricted','unavailable','redirected','unknown'].reduce((n,s)=>n+(c[s]||0),0);$('pending').textContent=c.untested||0;
 $('count').textContent=shown.length+' / '+rows.length+' projets';$('run').disabled=!loaded||!!active||!shown.some(r=>r.demoUrl);$('cancel').disabled=!active;$('export').disabled=!loaded||!!active;
 const fragment=document.createDocumentFragment();
 for(const r of shown){const card=element('article','','project');card.dataset.state=r.probe.state;
 card.append(element('small',r.priority+' · '+r.category),element('h2',r.name),element('p',core.states[r.probe.state]+(r.probe.httpStatus?' · '+r.probe.httpStatus:'')+(r.probe.latencyMs!=null?' · '+r.probe.latencyMs+' ms':''),'state'));
 if(r.probe.checkedAt)card.append(element('p','Contrôle serveur : '+r.probe.checkedAt));
 if(r.probe.reason)card.append(element('p',r.probe.reason));
 card.append(element('p',r.production?'Production historique : '+r.production.scope+' · '+r.production.date+' · '+String(r.production.commit).slice(0,8)+(r.production.ci?' · CI '+r.production.ci:''):'Production : preuve non enregistrée'),element('p','Fonctions et appareils : non contrôlés par ce moteur.'));
 for(const a of [link('Code GitHub',r.repoUrl),r.demoUrl&&link('Ouvrir',r.demoUrl)])if(a)card.append(a);fragment.append(card);}
 $('rows').replaceChildren(fragment);
}
async function probe(r,signal){const ctrl=new AbortController(),stop=()=>ctrl.abort();signal.addEventListener('abort',stop,{once:true});if(signal.aborted)stop();const timeout=setTimeout(stop,9000);
 try{const response=await fetch('./api/health?slug='+encodeURIComponent(r.slug),{cache:'no-store',signal:ctrl.signal});if(!response.ok)return {state:'unknown',reason:'API diagnostic HTTP '+response.status};return core.normalizeProbe(await response.json(),r.slug);}catch{return {state:'unknown',reason:'API indisponible, hors ligne ou délai dépassé'};}finally{clearTimeout(timeout);signal.removeEventListener('abort',stop);}}
async function run(){if(active||!loaded)return;const queue=visible().filter(r=>r.demoUrl);if(!queue.length)return;const controller=new AbortController();active=controller;const total=queue.length;let done=0;$('progress').max=total;$('progress').value=0;$('status').textContent='Diagnostic 0 / '+total;render();
 try{await Promise.all(Array.from({length:Math.min(3,total)},async()=>{while(queue.length&&!controller.signal.aborted){const r=queue.shift(),result=await probe(r,controller.signal);if(controller.signal.aborted)break;r.probe=result;done++;$('progress').value=done;$('status').textContent='Diagnostic '+done+' / '+total;render();}}));}
 finally{active=null;$('status').textContent=(controller.signal.aborted?'Annulé : ':'Terminé : ')+done+' / '+total+' contrôles. Aucun test fonctionnel effectué.';render();}}
function download(){const data=core.report(rows,new Date().toISOString());const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='studio-niko-quality-'+Date.now()+'.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
$('search').addEventListener('input',render);$('filter').addEventListener('change',render);$('run').addEventListener('click',run);$('cancel').addEventListener('click',()=>active?.abort());$('export').addEventListener('click',download);
(async()=>{try{const [a,b]=await Promise.all([fetch('./catalog.json',{cache:'no-store'}),fetch('./pilotage.html',{cache:'no-store'})]);if(!a.ok||!b.ok)throw Error('Ressources indisponibles');const doc=new DOMParser().parseFromString(await b.text(),'text/html'),snapshot=doc.getElementById('repository-snapshot');if(!snapshot)throw Error('Snapshot absent');rows=core.buildRows(await a.json(),JSON.parse(snapshot.textContent));loaded=true;$('status').textContent='Catalogue chargé. Aucun contrôle HTTP lancé.';render();}catch(e){$('status').textContent='Chargement impossible : '+e.message;}})();
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
})();
