(function () {
  'use strict';
  let sources=[];
  let lastReport=null;
  const $=(id)=>document.getElementById(id);
  const toast=(message)=>{const el=$('toast');el.textContent=message;el.hidden=false;clearTimeout(toast._timer);toast._timer=setTimeout(()=>{el.hidden=true;},3600);};
  const make=(tag, cls, text)=>{const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node;};
  document.querySelectorAll('.tab').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(t=>{t.classList.toggle('active',t===button);t.removeAttribute('aria-current');});
    button.setAttribute('aria-current','page');
    document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===button.dataset.tab));
  }));
  function invalidate(){lastReport=null;$('exportBtn').disabled=true;$('results').replaceChildren();
    const container=make('div','result-placeholder');container.append(make('div','placeholder-graphic','⊞'),make('h3',null,'Aucune analyse en cours'),make('p',null,'Une modification du texte ou du corpus nécessite une nouvelle analyse.'));$('results').append(container);}
  function renderSources(){
    $('sourceCount').textContent=`${sources.length} document${sources.length>1?'s':''}`;
    const list=$('sourceList');list.replaceChildren();
    if(!sources.length){list.append(make('p','empty-mini','Aucune référence. Une réponse ne peut pas être autorisée sans corpus.'));return;}
    sources.forEach((s,i)=>{
      const item=make('div','source-item'), head=make('div','source-item-top'),info=make('div');
      info.append(make('strong',null,s.title),make('p',null,`${s.version} · Relecture déclarée : ${s.reviewer}`),make('p',null,`${s.content.length.toLocaleString('fr-FR')} caractères de texte`));
      const remove=make('button',null,'Retirer');remove.type='button';remove.setAttribute('aria-label',`Retirer ${s.title}`);
      remove.addEventListener('click',()=>{sources.splice(i,1);renderSources();invalidate();});
      head.append(info,remove);item.append(head);list.append(item);
    });
  }
  $('sourceFile').addEventListener('change',async(e)=>{
    const f=e.target.files?.[0];if(!f)return;
    if(!/\.(txt|md)$/i.test(f.name)){toast('Seuls les fichiers texte .txt et .md sont acceptés.');e.target.value='';return;}
    if(f.size>600000){toast('Fichier trop volumineux : limite 300 000 caractères.');e.target.value='';return;}
    const text=await f.text();if(text.length>300000){toast('Limite 300 000 caractères dépassée.');return;}
    $('srcText').value=text;$('fileInfo').textContent=f.name;
    if(!$('srcTitle').value)$('srcTitle').value=f.name.replace(/\.(txt|md)$/i,'');
    toast('Texte importé localement. Complétez les métadonnées et confirmez la relecture.');
  });
  $('sourceForm').addEventListener('submit',(e)=>{
    e.preventDefault();if(sources.length>=30){toast('30 documents au maximum.');return;}
    if(!$('sourceForm').reportValidity())return;
    const s={id:`doc-${Date.now()}-${sources.length}`,title:$('srcTitle').value.trim(),version:$('srcVersion').value.trim(),
      reviewer:$('srcReviewer').value.trim(),source_url:$('srcUrl').value.trim(),content:$('srcText').value,reviewed:$('srcReviewed').checked};
    if(!s.content.trim()){toast('Le contenu de référence est vide.');return;}
    sources.push(s);$('sourceForm').reset();$('fileInfo').textContent='Aucune pièce jointe';$('sourceFile').value='';renderSources();invalidate();toast('Source ajoutée. Sa provenance reste déclarative.');
  });
  $('answerText').addEventListener('input',()=>{$('charCounter').textContent=`${$('answerText').value.length.toLocaleString('fr-FR')} / 100 000 caractères`;invalidate();});
  $('exampleBtn').addEventListener('click',()=>{
    sources=[{id:'example-synthetic',title:'Référentiel FICTIF de démonstration',version:'Exemple 1.0',reviewer:'Relecteur fictif (démo)',reviewed:true,source_url:'',
      content:'Le matériel fictif A doit être contrôlé avant utilisation.\nNe pas utiliser le dispositif fictif B.\nLa mesure fictive attendue est de 5 unités.'}];
    $('answerText').value='Le matériel fictif A doit être contrôlé avant utilisation.\nLe dispositif fictif B peut être utilisé sans vérification.\nLa mesure fictive attendue est de 50 unités.';
    $('charCounter').textContent=`${$('answerText').value.length} / 100 000 caractères`;
    renderSources();invalidate();toast('Exemple fictif chargé : les erreurs doivent être bloquées.');
  });
  $('resetBtn').addEventListener('click',()=>{
    if((sources.length||$('answerText').value) && !confirm('Effacer tout le contenu de cette session ?'))return;
    sources=[];$('sourceForm').reset();$('sourceFile').value='';$('fileInfo').textContent='Aucune pièce jointe';$('answerText').value='';$('charCounter').textContent='0 / 100 000 caractères';renderSources();invalidate();toast('Session effacée de cette page.');
  });
  $('checkBtn').addEventListener('click',async()=>{
    const btn=$('checkBtn');btn.disabled=true;btn.textContent='Analyse en cours…';
    try {lastReport=await MedGuardEngine.check($('answerText').value,sources);renderResults(lastReport);$('exportBtn').disabled=false;}
    catch(err){toast(`Erreur : ${err.message}`);}
    finally{btn.disabled=false;btn.replaceChildren(document.createTextNode('Analyser & décider '),make('span',null,'↗'));}
  });
  function renderResults(r){
    const root=$('results');root.replaceChildren();
    const head=make('div','result-head'),info=make('div'),decision=make('div',`decision ${r.decision==='BLOCKED'?'blocked':'review'}`,r.decision==='BLOCKED'?'SORTIE BLOQUÉE':'REVUE HUMAINE OBLIGATOIRE');
    info.append(decision,make('div','decision-help',r.reason));head.append(info,make('div','decision-icon',r.decision==='BLOCKED'?'×':'!'));root.append(head);
    if(r.privacy_flags.length) root.append(make('div','privacy-warn',r.privacy_flags.join(' · ')));
    const stats=make('div','stats');
    [[r.summary.total,'Affirmations'],[r.summary.text_matches,'Textes retrouvés'],[r.summary.unverified,'Non étayées']].forEach(([v,l])=>{const s=make('div','stat');s.append(make('strong',null,String(v)),make('span',null,l));stats.append(s);});root.append(stats);
    root.append(make('div','result-section-title','DÉTAIL DES AFFIRMATIONS'));
    if(!r.claims.length)root.append(make('div','finding','Aucun texte à examiner.'));
    r.claims.forEach(c=>{
      const block=make('article','finding'),top=make('div','finding-top');
      const label=c.status==='TEXT_MATCH'?'TEXTE IDENTIQUE':c.status==='SOURCE_DISAGREEMENT'?'DÉSACCORD ENTRE SOURCES':c.status==='POSSIBLE_CONFLICT'?'ÉCART POSSIBLE':'NON ÉTAYÉ';
      top.append(make('span',c.status==='TEXT_MATCH'?'match-label':['POSSIBLE_CONFLICT','SOURCE_DISAGREEMENT'].includes(c.status)?'conflict-label':'unverified-label',`${String(c.index).padStart(2,'0')}  ${label}`));
      if(c.risk_flag)top.append(make('span','riskflag','SENSIBLE'));
      block.append(top,make('p',null,c.claim));
      if(c.evidence){const desc=c.status==='TEXT_MATCH'?'Phrase identique dans une source déclarée revue :':'Source ressemblante pour comparaison uniquement, sans valeur probante :';block.append(make('div','explanation',desc));const q=make('blockquote',null,c.evidence.text);block.append(q,make('small',null,c.evidence.source_title));}
      else block.append(make('div','explanation','Aucune phrase de référence correspondante retrouvée.'));
      if(c.conflicting_source){block.append(make('div','explanation','Une autre source du corpus semble présenter une valeur ou une négation différente :'));block.append(make('blockquote',null,c.conflicting_source.text),make('small',null,c.conflicting_source.source_title));}
      if(c.status==='TEXT_MATCH')block.append(make('div','explanation','Correspondance textuelle ≠ validité médicale ; contexte à examiner.'));
      root.append(block);
    });
    const foot=make('div','result-foot',`Corpus accepté : ${r.summary.accepted_sources} source(s) déclarée(s) revue(s) · ${r.summary.excluded_sources} exclue(s) · ${r.summary.risk_flags} drapeau(x) de vigilance · Contrôle conservateur, sans certification.`);root.append(foot);
    root.scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  $('exportBtn').addEventListener('click',()=>{
    if(!lastReport)return;
    const summary={product:'MEDGUARD CLINIQUE v2.0 (prototype)', exported_at:new Date().toISOString(),
      clinical_validation:false, rgpd_certified:false, medical_device_certified:false,
      local_report_only:true, report_policy:'Aucun texte source, affirmation, nom, URL ou identifiant exporté.',
      engine:lastReport.engine, decision:lastReport.decision,
      counts:{...lastReport.summary}, privacy_alert_count:lastReport.privacy_flags.length,
      statuses:lastReport.claims.reduce((out,c)=>{out[c.status]=(out[c.status]||0)+1;return out;}, {})};
    saveJSON(summary,`medguard-bilan-technique-${new Date().toISOString().slice(0,10)}.json`);
  });
  function saveJSON(value,filename){
    const blob=new Blob([JSON.stringify(value,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),2500);
  }
  // "Prêt" here is a personal plan marker, NOT proof of compliance, legal clearance,
  // identity verification or medical sign-off. No storage between sessions.
  const requirements=[
    ['RGPD','Définir finalité, responsabilité de traitement et bases juridiques (art. 6 et 9).'],
    ['RGPD','Établir le registre, la notice d’information et la gestion des droits.'],
    ['RGPD','Évaluer le risque et produire une AIPD si nécessaire avec le DPO.'],
    ['Sécurité','Définir les flux et décider si un hébergement externe certifié HDS est requis.'],
    ['Sécurité','Documenter chiffrement, habilitations, sauvegardes, journalisation et réponse aux incidents.'],
    ['Identités','Étudier Pro Santé Connect / RPPS et les rôles professionnels vérifiés.'],
    ['Qualité','Définir la destination d’usage et statuer sur la qualification MDR avec un spécialiste.'],
    ['Qualité','Préparer analyse de risques, maîtrise des versions et assurance qualité du logiciel.'],
    ['Clinique','Constituer un comité médical indépendant et des sources authentifiées, datées, révisées.'],
    ['Clinique','Définir un protocole d’essais indépendant incluant faux positifs, erreurs et cas limites.'],
    ['Validation','Faire auditer sécurité, conformité, documentation et résultats avant toute mise en soins.']
  ];
  const done=new Set();
  function updateGov(){ $('govCount').textContent=`${done.size} / ${requirements.length}`; }
  const govRoot=$('govItems');
  requirements.forEach(([group,description],i)=>{
    const wrap=make('label','gov-item'),input=make('input');input.type='checkbox';input.setAttribute('aria-label',`${group} : ${description}`);
    input.addEventListener('change',()=>{input.checked?done.add(i):done.delete(i);updateGov();});
    const content=make('span');content.append(make('small',null,group),make('strong',null,description));
    wrap.append(input,content);govRoot.append(wrap);
  });
  $('govReset').addEventListener('click',()=>{done.clear();govRoot.querySelectorAll('input').forEach(i=>{i.checked=false;});updateGov();});
  $('govExport').addEventListener('click',()=>{
    saveJSON({product:'MEDGUARD CLINIQUE v2.0', status:'PLAN_INTERNE_NON_VERIFIE', exported_at:new Date().toISOString(),
      notice:'Les cases renseignées sont des déclarations locales et non des attestations de conformité.',
      actions:requirements.map(([categorie,description],i)=>({categorie,description, marque_prepare:done.has(i)}))},
      `medguard-plan-conformite-${new Date().toISOString().slice(0,10)}.json`);
  });
  if('serviceWorker' in navigator && location.protocol==='https:') navigator.serviceWorker.register('./sw.js').catch(()=>{});
  renderSources();
})();
