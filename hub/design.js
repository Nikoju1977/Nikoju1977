(()=>{'use strict';
const core=globalThis.DesignCore;if(!core||!('HTMLDialogElement'in window)||typeof HTMLDialogElement.prototype.showModal!=='function')return;
const key='studio-niko-design-v1';let prefs=core.preferences(null),catalog=[],catalogState='not_loaded',lastFocus=null;
try{prefs=core.preferences(JSON.parse(localStorage.getItem(key)||'null'));}catch{}
const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text)n.textContent=text;if(cls)n.className=cls;return n;};
const button=(text,fn)=>{const b=el('button',text,'sn-button');b.type='button';b.addEventListener('click',fn);return b;};
const root=document.documentElement;
function apply(){root.dataset.snTheme=prefs.theme;root.dataset.snDensity=prefs.density;try{localStorage.setItem(key,JSON.stringify(prefs));}catch{}}
apply();
const bar=el('div','','sn-bar'),brand=el('a','N✦  STUDIO NIKO','sn-brand');brand.href='./command.html';const title=el('span','INTELLIGENCE OS','sn-caption');
const dialog=el('dialog','','sn-dialog');dialog.setAttribute('aria-label','Navigation et commandes Studio Niko');
const search=el('input','','sn-search');search.type='search';search.placeholder='Rechercher un module ou un projet…';search.setAttribute('aria-label','Recherche globale');search.maxLength=200;
const list=el('nav','','sn-links');list.setAttribute('aria-label','Modules et projets');const status=el('p','','sn-status');status.setAttribute('role','status');
const settings=el('div','','sn-settings'),theme=el('select'),density=el('select');theme.setAttribute('aria-label','Thème');density.setAttribute('aria-label','Densité');
for(const [value,label] of [['studio','Studio · turquoise'],['graphite','Graphite · or'],['midnight','Midnight · violet']]){const o=el('option',label);o.value=value;theme.append(o);}theme.value=prefs.theme;
for(const [value,label] of [['comfortable','Confortable'],['compact','Compact']]){const o=el('option',label);o.value=value;density.append(o);}density.value=prefs.density;
theme.addEventListener('change',()=>{prefs=core.preferences({...prefs,theme:theme.value});apply();});density.addEventListener('change',()=>{prefs=core.preferences({...prefs,density:density.value});apply();});
const close=button('Fermer ×',()=>dialog.close());const head=el('div','','sn-dialog-head');head.append(el('strong','Navigation Studio Niko'),close);
function render(){const rows=core.search(search.value,catalog),frag=document.createDocumentFragment(),current=core.current(location.pathname,location.hash);for(const r of rows){const a=el('a','','sn-item');a.href='./'+r.url;a.append(el('strong',r.title),el('small',r.desc));if(r.kind==='module'&&r.url===current)a.setAttribute('aria-current','page');frag.append(a);}if(!rows.length)frag.append(el('p','Aucun résultat.'));list.replaceChildren(frag);status.textContent=rows.length+' résultat(s)'+(catalogState==='loading'?' · catalogue en chargement':catalogState==='unavailable'?' · catalogue indisponible, modules accessibles':'');}
async function loadCatalog(){if(catalogState==='loaded'||catalogState==='loading')return;catalogState='loading';render();try{const r=await fetch('./catalog.json',{cache:'no-store',signal:AbortSignal.timeout(8000)});if(!r.ok)throw Error('HTTP');const j=await r.json();if(!Array.isArray(j))throw Error('Format');catalog=j;catalogState='loaded';}catch{catalogState='unavailable';}render();}
function open(){if(dialog.open)return;if(document.querySelector('dialog[open]'))return;lastFocus=document.activeElement;search.value='';render();dialog.showModal();search.focus();loadCatalog();}
const menu=button('☰  Modules',open),palette=button('⌕  Recherche',open);menu.setAttribute('aria-haspopup','dialog');palette.setAttribute('aria-haspopup','dialog');
const fs=button('Plein écran',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await root.requestFullscreen();}catch{barStatus.textContent='Plein écran indisponible dans ce contexte.';}});fs.hidden=!(document.fullscreenEnabled&&root.requestFullscreen);document.addEventListener('fullscreenchange',()=>{fs.textContent=document.fullscreenElement?'Quitter plein écran':'Plein écran';});
const barStatus=el('span','','sn-bar-status');barStatus.setAttribute('role','status');
settings.append(el('span','Thème'),theme,el('span','Densité'),density);dialog.append(head,search,status,list,settings);
bar.append(brand,title,menu,palette,fs,barStatus);document.body.prepend(bar);document.body.append(dialog);root.classList.add('sn-enhanced');
search.addEventListener('input',render);dialog.addEventListener('close',()=>{if(lastFocus?.isConnected)lastFocus.focus();});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'&&!e.altKey&&!e.shiftKey&&!document.querySelector('dialog[open]:not(.sn-dialog)')){e.preventDefault();e.stopImmediatePropagation();open();}},true);
window.addEventListener('storage',e=>{if(e.key===key){try{prefs=core.preferences(JSON.parse(e.newValue||'null'));}catch{prefs=core.preferences(null);}root.dataset.snTheme=prefs.theme;root.dataset.snDensity=prefs.density;theme.value=prefs.theme;density.value=prefs.density;}});
})();
