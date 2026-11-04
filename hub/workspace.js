(()=>{
'use strict';
const $=id=>document.getElementById(id);
const STORAGE='studio-niko-workspace-v1';
const LIMIT=40;
const TYPES=new Set(['Cinéma & Image','Musique & Audio','Art & 3D','Intelligence & Agents','Business & Services','Jeux & Expériences']);
const guid=()=>Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,9);
let state={projects:[],selected:null};
try{
 const raw=JSON.parse(localStorage.getItem(STORAGE)||'null');
 if(raw&&Array.isArray(raw.projects)){
  state.projects=raw.projects.slice(0,LIMIT).filter(p=>p&&typeof p.title==='string'&&TYPES.has(p.category)).map(p=>({
   id:String(p.id||guid()),title:p.title.slice(0,100),category:p.category,notes:String(p.notes||'').slice(0,5000),
   tasks:Array.isArray(p.tasks)?p.tasks.slice(0,80).filter(t=>t&&typeof t.text==='string').map(t=>({id:String(t.id||guid()),text:t.text.slice(0,160),done:!!t.done})):[],
   updatedAt:String(p.updatedAt||new Date().toISOString())
  }));
  state.selected=state.projects.some(p=>p.id===raw.selected)?raw.selected:(state.projects[0]?.id||null);
 }
}catch{}
function save(){
 try{localStorage.setItem(STORAGE,JSON.stringify(state));}
 catch{status('Le stockage navigateur est indisponible : les modifications ne seront pas conservées.');}
}
function status(msg){$('work-status').textContent=msg;}
function selected(){return state.projects.find(p=>p.id===state.selected);}
function refresh(){
 const list=$('work-list');list.replaceChildren();
 $('work-count').textContent=state.projects.length+' projet'+(state.projects.length>1?'s':'');
 if(!state.projects.length){const empty=document.createElement('p');empty.className='work-listempty';empty.textContent='Votre premier projet apparaîtra ici.';list.append(empty);}
 for(const p of state.projects){
  const btn=document.createElement('button');btn.type='button';btn.className='work-project'+(state.selected===p.id?' active':'');btn.dataset.project=p.id;
  const name=document.createElement('b');name.textContent=p.title;
  const sub=document.createElement('small');sub.textContent=p.category+' · '+p.tasks.filter(t=>t.done).length+'/'+p.tasks.length+' étapes';
  const arrow=document.createElement('span');arrow.textContent='↗';
  btn.append(name,sub,arrow);list.append(btn);
 }
 const p=selected();
 $('work-empty').hidden=!!p;$('work-detail').hidden=!p;
 if(!p)return;
 $('work-category').textContent=p.category;$('work-title-text').textContent=p.title;
 if(document.activeElement!==$('work-notes'))$('work-notes').value=p.notes;
 const tasks=$('work-tasks');tasks.replaceChildren();
 $('work-taskcount').textContent=p.tasks.filter(t=>t.done).length+'/'+p.tasks.length+' complétées';
 for(const task of p.tasks){
  const li=document.createElement('li');li.className=task.done?'done':'';
  const label=document.createElement('label');const check=document.createElement('input');check.type='checkbox';check.checked=task.done;check.dataset.taskId=task.id;
  const text=document.createElement('span');text.textContent=task.text;label.append(check,text);
  const del=document.createElement('button');del.type='button';del.dataset.deleteId=task.id;del.setAttribute('aria-label','Supprimer '+task.text);del.textContent='×';
  li.append(label,del);tasks.append(li);
 }
}
function touch(p){p.updatedAt=new Date().toISOString();save();refresh();}
$('work-create').addEventListener('submit',e=>{
 e.preventDefault();const title=$('work-name').value.trim().slice(0,100),category=$('work-type').value;
 if(!title||!TYPES.has(category))return;
 if(state.projects.length>=LIMIT){status('Limite de '+LIMIT+' projets locaux atteinte. Exportez un projet avant de le supprimer.');return;}
 const p={id:guid(),title,category,notes:'',tasks:[],updatedAt:new Date().toISOString()};state.projects.unshift(p);state.selected=p.id;
 $('work-name').value='';save();refresh();status('Projet « '+p.title+' » créé uniquement sur cet appareil.');
});
$('work-list').addEventListener('click',e=>{const btn=e.target.closest('[data-project]');if(!btn)return;state.selected=btn.dataset.project;save();refresh();});
$('work-notes').addEventListener('input',e=>{const p=selected();if(!p)return;p.notes=e.target.value.slice(0,5000);p.updatedAt=new Date().toISOString();save();});
$('work-taskform').addEventListener('submit',e=>{
 e.preventDefault();const p=selected(),val=$('work-taskinput').value.trim().slice(0,160);
 if(!p||!val)return;
 if(p.tasks.length>=80){status('Limite de 80 étapes par projet.');return;}
 p.tasks.push({id:guid(),text:val,done:false});$('work-taskinput').value='';touch(p);
});
$('work-tasks').addEventListener('change',e=>{
 if(!e.target.matches('[data-task-id]'))return;
 const p=selected(),task=p?.tasks.find(t=>t.id===e.target.dataset.taskId);
 if(task){task.done=e.target.checked;touch(p);}
});
$('work-tasks').addEventListener('click',e=>{
 const btn=e.target.closest('[data-delete-id]');if(!btn)return;
 const p=selected();if(p){p.tasks=p.tasks.filter(t=>t.id!==btn.dataset.deleteId);touch(p);}
});
$('work-delete').addEventListener('click',()=>{
 const p=selected();if(!p||!confirm('Supprimer le projet « '+p.title+' » de cet appareil ? Les notes et tâches locales seront perdues.'))return;
 state.projects=state.projects.filter(x=>x.id!==p.id);state.selected=state.projects[0]?.id||null;
 save();refresh();status('Projet supprimé de cet appareil.');
});
function download(p){
 const data=JSON.stringify({format:'studio-niko-project-v1',exportedAt:new Date().toISOString(),
  project:{title:p.title,category:p.category,notes:p.notes,tasks:p.tasks.map(x=>({text:x.text,done:x.done}))}},null,2);
 const url=URL.createObjectURL(new Blob([data],{type:'application/json'}));
 const a=document.createElement('a');a.href=url;a.download='studio-niko-projet.json';document.body.append(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(url),1000);
}
$('work-export').addEventListener('click',()=>{const p=selected();if(p){download(p);status('Projet exporté en JSON. Conservez-le dans un endroit sûr.');}});
$('work-import').addEventListener('change',async e=>{
 const file=e.target.files?.[0];e.target.value='';if(!file)return;
 if(file.size>150000){status('Fichier trop volumineux (maximum 150 Ko).');return;}
 if(state.projects.length>=LIMIT){status('Limite de projets atteinte.');return;}
 try{
  const raw=JSON.parse(await file.text());const x=raw.project;
  if(raw.format!=='studio-niko-project-v1'||!x||typeof x.title!=='string'||!TYPES.has(x.category))throw Error('Format non reconnu');
  const p={id:guid(),title:x.title.slice(0,100),category:x.category,notes:String(x.notes||'').slice(0,5000),
  tasks:Array.isArray(x.tasks)?x.tasks.slice(0,80).filter(t=>t&&typeof t.text==='string').map(t=>({id:guid(),text:t.text.slice(0,160),done:!!t.done})):[],
  updatedAt:new Date().toISOString()};
  state.projects.unshift(p);state.selected=p.id;save();refresh();status('Projet importé : '+p.title);
 }catch{status('Import impossible : sélectionnez un projet JSON exporté depuis Studio Niko Hub.');}
});
function encodeHandoff(payload){
 const bytes=new TextEncoder().encode(JSON.stringify(payload));
 if(bytes.length>4000)return null;
 let bin='';for(const byte of bytes)bin+=String.fromCharCode(byte);
 return btoa(bin).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
$('work-send').addEventListener('click',()=>{
 const p=selected();if(!p)return;
 if(!p.tasks.length){status('Ajoutez au moins une tâche avant le transfert.');return;}
 if(p.tasks.length>20){status('Pour ce transfert, utilisez au maximum 20 tâches (export JSON disponible pour le reste).');return;}
 const msg='Transmettre le nom du projet et '+p.tasks.length+' titre(s) de tâche à Nikoassist ? Les données seront ajoutées à l’application Nikoassist seulement si vous acceptez leur import sur sa page. N’envoyez pas de données de santé ou confidentielles.';
 if(!confirm(msg))return;
 const payload={format:'studio-niko-handoff-v1',project:p.title,tasks:p.tasks.map(t=>({text:t.text,done:t.done}))};
 const encoded=encodeHandoff(payload);
 if(!encoded){status('Données trop longues. Réduisez la longueur des tâches.');return;}
 window.open('https://nikoassist-pwa.vercel.app/#handoff='+encoded,'_blank','noopener,noreferrer');
 status('Nikoassist ouvert : confirmez l’import dans sa fenêtre. Le projet original reste sur cet appareil.');
});
refresh();
})();