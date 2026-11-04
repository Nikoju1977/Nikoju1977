(() => {
'use strict';
const byId = id => document.getElementById(id);
const categories = {
  'Cinéma & Image':'CI','Musique & Audio':'AU','Intelligence & Agents':'IA','Art & 3D':'3D',
  'Business & Services':'BS','Santé & Bien-être':'SV','Cartographie & Nature':'CN',
  'Arts & Symbolique':'AR','Jeux & Expériences':'JE','Sécurité & Outils':'SO',
  'Archives & Variantes':'AV','Studio & Portfolio':'SN'
};
let data = [], filterMode='all', category='all', query='';
const health = new Map();
let checking = false;
const favoritesKey='studio-niko-hub-favorites-v1';
const getFavs=()=>{try {const v=JSON.parse(localStorage.getItem(favoritesKey)||'[]');return Array.isArray(v)?new Set(v):new Set();}catch{return new Set();}};
let favorites=getFavs();
function safeText(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function validUrl(s){try{const u=new URL(s);return u.protocol==='https:'?u.href:null;}catch{return null;}}
function updateFilterButtons(){document.querySelectorAll('[data-mode]').forEach(b=>{const active=b.dataset.mode===filterMode;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});}
function render(){
  const normalized=query.trim().toLocaleLowerCase('fr');
  let shown=data.filter(item=>(category==='all'||item.category===category)&&
    (filterMode==='all'||(filterMode==='demo'&&item.demoUrl)||(filterMode==='needs'&&(!item.demoUrl||item.deployment?.access==='protected'))||(filterMode==='favs'&&favorites.has(item.slug)))&&
    (!normalized||(item.name+' '+item.category+' '+item.description).toLocaleLowerCase('fr').includes(normalized)));
  const order=byId('sort').value;
  shown.sort((a,b)=>order==='name'?a.name.localeCompare(b.name,'fr'):order==='category'?a.category.localeCompare(b.category,'fr')||a.name.localeCompare(b.name,'fr'):(Number(b.featured)-Number(a.featured)||a.name.localeCompare(b.name,'fr')));
  const grid=byId('cards');
  byId('results-count').textContent=shown.length+' / '+data.length+' projets';
  if(!shown.length){grid.innerHTML='<p class="empty-state">Aucun résultat. Essayez un autre mot-clé ou réinitialisez vos filtres.</p>';return;}
  grid.innerHTML=shown.map(item=>{
    const demo=validUrl(item.demoUrl);
    const repo=validUrl(item.repoUrl);
    const isFav=favorites.has(item.slug);
    const statusInfo=health.get(item.slug);
    const state=item.status==='planned'?'EN PRÉPARATION':
      item.status==='deployment-error'?'DÉPLOIEMENT EN ERREUR':
      demo && item.pageCheckedOn?'PAGE ACCESSIBLE · HTTP 200':
      demo && item.deployment?.access==='public'?'VERCEL · PRÊT':
      demo?'DÉMO À VÉRIFIER':
      item.status==='access-protected'?'ACCÈS PROTÉGÉ':'CODE SOURCE';
    const healthState=statusInfo?'<div class="health-badge '+safeText(statusInfo.state)+'" role="status">'+safeText(statusInfo.message)+'</div>':'';
    return '<article class="app-card" data-group="'+safeText(item.category)+'">'+
      '<div class="card-top"><div class="app-icon" aria-hidden="true">'+safeText(categories[item.category]||'SN')+'</div>'+
      '<button type="button" class="favorite" data-favorite="'+safeText(item.slug)+'" aria-label="'+(isFav?'Retirer des favoris : ':'Ajouter aux favoris : ')+safeText(item.name)+'" aria-pressed="'+isFav+'" title="Gérer mes favoris">'+(isFav?'★':'☆')+'</button></div>'+
      '<span class="card-state">'+state+'</span><div class="app-category">'+safeText(item.category)+'</div>'+
      '<h3>'+safeText(item.name)+'</h3><p>'+safeText(item.description)+'</p>'+
      (item.requirements?'<details class="requirements"><summary>Conditions et limites</summary><p>'+safeText(item.requirements)+'</p></details>':'')+
      healthState+
      '<div class="card-links">'+(demo?'<a class="card-link primary" href="'+safeText(demo)+'" target="_blank" rel="noopener noreferrer" aria-label="Ouvrir l’application '+safeText(item.name)+'">Lancer ↗</a>':'')+
      (demo?'<button class="card-link check-link" data-check="'+safeText(item.slug)+'" type="button" aria-label="Vérifier l’accès à '+safeText(item.name)+'" '+(checking?'disabled':'')+'>Tester</button>':'')+
      (repo?'<a class="card-link" href="'+safeText(repo)+'" target="_blank" rel="noopener noreferrer" aria-label="Voir le code de '+safeText(item.name)+'">Code ↗</a>':'')+'</div></article>';
  }).join('');
}

async function checkApp(item){
  if(!item||!item.demoUrl)return {state:'unknown',message:'Aucun accès disponible'};
  try{
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),9000);
    let response;
    try{response=await fetch('./api/health?slug='+encodeURIComponent(item.slug),{cache:'no-store',signal:controller.signal});}
    finally{clearTimeout(timer);}
    if(!response.ok)throw Error('Diagnostic indisponible ('+response.status+')');
    const result=await response.json();
    const labels={
      reachable:'Accès HTTP OK · fonctions à valider',
      restricted:'Authentification requise',
      unavailable:'Page indisponible (HTTP '+(result.httpStatus||'?')+')',
      redirected:'Redirection à vérifier',
      unknown:'Contrôle non concluant'
    };
    return {state:result.state in labels?result.state:'unknown',message:labels[result.state]||'Contrôle non concluant'};
  }catch(e){
    return {state:'unknown',message:'Diagnostic impossible · vérifier manuellement'};
  }
}
async function checkOne(slug){
  if(checking)return;
  const item=data.find(x=>x.slug===slug);if(!item||!item.demoUrl)return;
  checking=true;
  byId('health-summary').textContent='Contrôle de '+item.name+'…';render();
  try{
    const result=await checkApp(item);health.set(slug,result);
    byId('health-summary').textContent=item.name+' : '+result.message;
  }finally{checking=false;render();}
}
async function checkAll(){
  if(checking)return;checking=true;const items=data.filter(x=>!!x.demoUrl);
  const button=byId('check-all');button.disabled=true;
  let done=0;
  let ok=0,unavailable=0,restricted=0,unknown=0;
  byId('health-summary').textContent='Diagnostic 0 / '+items.length;
  render();
  const pool=Array.from({length:Math.min(3,items.length)},async()=>{
    while(items.length){
      const item=items.shift();
      const result=await checkApp(item);health.set(item.slug,result);
      if(result.state==='reachable')ok++;
      else if(result.state==='restricted')restricted++;
      else if(result.state==='unavailable')unavailable++;
      else unknown++;
      done++;
      byId('health-summary').textContent='Contrôle '+done+' / '+data.filter(x=>!!x.demoUrl).length+' · HTTP OK : '+ok+' · problèmes : '+(unavailable+restricted+unknown);
      render();
    }
  });
  try{await Promise.all(pool);}
  finally{
    checking=false;button.disabled=false;render();
    byId('health-summary').textContent='Accès HTTP OK : '+ok+' · indisponibles : '+unavailable+' · protégés : '+restricted+' · indéterminés : '+unknown+'. Tests fonctionnels propres à chaque application non effectués.';
  }
}

function chooseCategory(next){category=next;byId('category').value=next;filterMode='all';updateFilterButtons();render();byId('catalogue').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
function notify(message){const node=byId('toast');node.textContent=message;node.hidden=false;clearTimeout(notify.timer);notify.timer=setTimeout(()=>node.hidden=true,2600);}
function validateCatalog(d){return Array.isArray(d)&&d.every(x=>x && typeof x.name==='string'&&typeof x.slug==='string'&&typeof x.category==='string'&&typeof x.description==='string');}
async function init(){
  try{
    const res=await fetch('./catalog.json',{cache:'no-store'});if(!res.ok)throw new Error('HTTP '+res.status);
    const json=await res.json();if(!validateCatalog(json))throw new Error('Catalogue invalide');
    data=json;const cats=[...new Set(data.map(d=>d.category))].sort((a,b)=>a.localeCompare(b,'fr'));
    for(const c of cats){const o=document.createElement('option');o.value=c;o.textContent=c;byId('category').appendChild(o);}
    byId('repo-count').textContent=data.length.toString().padStart(2,'0');
    byId('universe-count').textContent=cats.length.toString().padStart(2,'0');
    byId('demo-count').textContent=data.filter(x=>!!x.demoUrl).length.toString().padStart(2,'0');
    render();
  }catch(err){byId('cards').innerHTML='<p class="empty-state">Le catalogue ne peut pas être chargé. Réessayez en ligne ou consultez <a href="https://github.com/Nikoju1977" target="_blank" rel="noopener noreferrer">les dépôts GitHub ↗</a>.</p>';byId('results-count').textContent='Catalogue indisponible';}
}
byId('check-all').addEventListener('click',checkAll);
byId('search').addEventListener('input',e=>{query=e.target.value;render();});
byId('category').addEventListener('change',e=>{category=e.target.value;render();});
byId('sort').addEventListener('change',render);
document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{filterMode=button.dataset.mode;updateFilterButtons();render();}));
document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>chooseCategory(button.dataset.category)));
byId('cards').addEventListener('click',e=>{
 const check=e.target.closest('[data-check]');
 if(check){checkOne(check.dataset.check);return;}
 const btn=e.target.closest('[data-favorite]');if(!btn)return;
 const name=btn.dataset.favorite;favorites.has(name)?favorites.delete(name):favorites.add(name);
 try{localStorage.setItem(favoritesKey,JSON.stringify([...favorites]));}catch{notify('Stockage local indisponible : favoris temporaires.');}
 render();
});
byId('search-shortcut').addEventListener('click',()=>{byId('catalogue').scrollIntoView();byId('search').focus();});
document.addEventListener('keydown',e=>{
 if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();byId('catalogue').scrollIntoView();byId('search').focus();}
 if(e.key==='Escape'&&document.activeElement===byId('search')){byId('search').value='';query='';render();byId('search').blur();}
});
byId('year').textContent=String(new Date().getFullYear());
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}),{once:true});}
init();
})();
