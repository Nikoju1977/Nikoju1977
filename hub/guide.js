(()=>{
'use strict';
const $=id=>document.getElementById(id);
const dialog=$('user-guide-dialog');const close=$('user-guide-close');
let payload=null,loading=null,previousFocus=null;
async function getGuides(){
 if(payload)return payload;
 if(loading)return loading;
 loading=fetch('./guides.json',{cache:'no-store'}).then(async r=>{
   if(!r.ok)throw new Error('Erreur HTTP '+r.status);
   const data=await r.json();
   if(!data||!Array.isArray(data.guides))throw new Error('Guides indisponibles');
   payload=data.guides;return payload;
 }).finally(()=>{loading=null;});
 return loading;
}
function show(){
 previousFocus=document.activeElement;
 if(typeof dialog.showModal==='function'){if(!dialog.open)dialog.showModal();}
 else dialog.setAttribute('open','');
}
function hide(){
 if(typeof dialog.close==='function'&&dialog.open)dialog.close();
 else dialog.removeAttribute('open');
 if(previousFocus&&typeof previousFocus.focus==='function')previousFocus.focus();
}
async function open(slug){
 $('user-guide-title').textContent='Chargement du mode d’emploi…';
 $('user-guide-description').textContent='';$('user-guide-steps').replaceChildren();
 $('user-guide-preparation').textContent='';$('user-guide-caution').hidden=true;
 $('user-guide-troubleshooting').textContent='';
 $('user-guide-source').hidden=true;$('user-guide-launch').hidden=true;
 show();
 try{
  const list=await getGuides(),guide=list.find(x=>x.slug===slug);
  if(!guide)throw new Error('Notice non trouvée');
  $('user-guide-title').textContent=guide.title;
  $('user-guide-description').textContent=guide.description;
  for(const line of guide.steps){
   const item=document.createElement('li');item.textContent=line;$('user-guide-steps').appendChild(item);
  }
  $('user-guide-preparation').textContent=guide.preparation;
  $('user-guide-troubleshooting').textContent=guide.troubleshooting;
  if(guide.caution){$('user-guide-caution').hidden=false;$('user-guide-caution').textContent=guide.caution;}
  const github=new URL(guide.repoUrl);
  if(github.protocol==='https:'&&github.hostname==='github.com'){
   $('user-guide-source').href=github.href;$('user-guide-source').hidden=false;
  }
  if(guide.launchUrl){
   const url=new URL(guide.launchUrl);
   if(url.protocol==='https:'){$('user-guide-launch').href=url.href;$('user-guide-launch').hidden=false;}
  }
 }catch{
  $('user-guide-title').textContent='Mode d’emploi indisponible';
  $('user-guide-description').textContent='Vérifiez votre connexion ou la disponibilité du cache hors ligne. Le code et les instructions restent accessibles depuis le dépôt de l’application.';
 }
}
close.addEventListener('click',hide);
dialog.addEventListener('click',e=>{if(e.target===dialog)hide();});
dialog.addEventListener('close',()=>{if(previousFocus&&typeof previousFocus.focus==='function')previousFocus.focus();});
window.StudioNikoGuide={open};
})();
