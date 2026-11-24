'use strict';
const $=id=>document.getElementById(id);
const owner='Nikoju1977/';
function githubLink(a,url){const u=new URL(url);if(u.origin!=='https://github.com')throw Error('Invalid proof link');a.href=u.href;}
async function start(){
 const res=await fetch('./provenance-snapshot.json',{cache:'no-store'});
 if(!res.ok)throw Error('HTTP '+res.status);
 const d=await res.json();
 if(!Array.isArray(d.repositories)||d.repositories.length!==d.registered||new Set(d.repositories.map(x=>x.repository)).size!==d.registered)throw Error('Invalid snapshot');
 for(const x of d.repositories){if(!/^Nikoju1977\/[A-Za-z0-9_.-]+$/.test(x.repository)||!(/^[a-f0-9]{40}$/).test(x.metadata_commit))throw Error('Invalid reference');}
 $('date').textContent='Instantané de référence du '+d.date+' · '+d.total+' dépôts publics';
 $('registered').textContent=d.registered;$('notices').textContent=d.notice_count;$('licenses').textContent=d.existing_license_count;$('excluded').textContent=d.excluded.length;
 $('digest').textContent=d.sha256;$('ots').textContent=d.ots_status;
 githubLink($('registry'),'https://github.com/Nikoju1977/Nikoju1977/blob/'+d.registry_commit+'/provenance/registry-2026-11-24.json');
 githubLink($('audit'),d.audit_run);githubLink($('timestamp'),d.ots_run);
 for(const x of d.excluded){const li=document.createElement('li');li.textContent=x.name+' — '+x.reason;$('excluded-list').append(li);}
 function render(){const q=$('search').value.trim().toLowerCase();const rows=d.repositories.filter(x=>x.repository.toLowerCase().includes(q));$('list').replaceChildren();$('count').textContent=rows.length+' références affichées';for(const x of rows){const li=document.createElement('li'),a=document.createElement('a'),small=document.createElement('small');a.textContent=x.repository.slice(owner.length);githubLink(a,'https://github.com/'+x.repository+'/blob/'+x.metadata_commit+'/STUDIO-NIKO-METADATA.json');small.textContent='Commit '+x.metadata_commit;li.append(a,small);$('list').append(li);}}
 $('search').addEventListener('input',render);render();
}
start().catch(()=>{$('error').textContent='Le registre local est indisponible ou invalide. Consultez le registre GitHub.';});
