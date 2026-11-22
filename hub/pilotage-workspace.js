/* Studio Niko · Suivi local des projets v1
   Declarations manuelles exclusivement. Aucune requete reseau ni donnee testee automatiquement. */
(function () {
  'use strict';
  const snapshotEl = document.getElementById('repository-snapshot');
  const dialog = document.getElementById('tracking-dialog');
  if (!snapshotEl || !dialog) return;

  const snapshot = JSON.parse(snapshotEl.textContent);
  const known = new Map(snapshot.repositories.map(r => [r.name, r]));
  const KEY = 'studio-niko-project-tracking:v1';
  const SCHEMA = 'studio-niko-tracking-v1';
  const MAX_IMPORT_BYTES = 1048576;
  const MAX_MODULES = 24;
  const MAX_HISTORY = 24;
  const states = {
    unknown: 'Impossible à vérifier',
    defined: 'Défini',
    coded: 'Codé',
    connected: 'Connecté',
    deployed: 'Déployé (déclaré)',
    tested: 'Testé (déclaré)',
    stable: 'Stable (déclaré)',
    fix: 'À corriger',
    blocked: 'Bloqué'
  };
  const evidenceRequired = new Set(['deployed', 'tested', 'stable']);
  const $ = id => document.getElementById(id);
  const limit = (value, max) => String(value == null ? '' : value).trim().slice(0, max);
  let saved = {};
  let activeName = '';
  let persistAvailable = true;

  function notice(text, error) {
    const el = $('tracking-notice');
    if (el) {
      el.textContent = text;
      el.dataset.error = error ? 'true' : 'false';
    }
  }
  function normalizeProject(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
    const modules = Array.isArray(raw.modules) ? raw.modules.slice(0, MAX_MODULES) : [];
    const history = Array.isArray(raw.history) ? raw.history.slice(-MAX_HISTORY) : [];
    return {
      version: limit(raw.version, 64),
      nextAction: limit(raw.nextAction, 1200),
      blocker: limit(raw.blocker, 1200),
      reproduce: limit(raw.reproduce, 2200),
      decision: limit(raw.decision, 1200),
      modules: modules.filter(m => m && typeof m === 'object' && !Array.isArray(m)).map(m => ({
        name: limit(m.name, 120), version: limit(m.version, 64),
        state: Object.hasOwn(states, m.state) ? m.state : 'unknown',
        evidence: limit(m.evidence, 900)
      })).filter(m => m.name),
      history: history.filter(h => h && typeof h === 'object').map(h => ({
        at: limit(h.at, 32),
        version: limit(h.version, 64),
        decision: limit(h.decision, 1200)
      }))
    };
  }
  function normalizeStore(raw) {
    if (!raw || raw.schema !== SCHEMA || !raw.projects || typeof raw.projects !== 'object'
        || Array.isArray(raw.projects)) throw new Error('Format de suivi incompatible.');
    const result = {};
    for (const [name, project] of Object.entries(raw.projects)) {
      if (!known.has(name)) continue; // Never import records for private/unknown repositories.
      const clean = normalizeProject(project);
      if (clean) result[name] = clean;
    }
    return result;
  }
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) saved = normalizeStore(JSON.parse(raw));
  } catch (_) {
    persistAvailable = false;
    saved = {};
  }

  function persist() {
    try {
      localStorage.setItem(KEY, JSON.stringify({schema:SCHEMA, projects:saved}));
      persistAvailable = true;
      return true;
    } catch (_) {
      persistAvailable = false;
      notice('Enregistrement impossible dans ce navigateur. Exporte le JSON pour conserver ton travail.', true);
      return false;
    }
  }
  function text(parent, tag, value, className) {
    const el = document.createElement(tag);
    el.textContent = String(value);
    if (className) el.className = className;
    parent.appendChild(el);
    return el;
  }
  function setSummary() {
    const changed = Object.keys(saved).length;
    $('tracking-count').textContent = changed + ' fiche' + (changed > 1 ? 's' : '') + ' suivie' + (changed > 1 ? 's' : '') + ' localement';
    $('tracking-storage').textContent = persistAvailable
      ? 'Enregistrement local sur cet appareil (sans synchronisation).'
      : 'Stockage local indisponible : export JSON nécessaire.';
  }
  function refreshCards() {
    for (const card of document.querySelectorAll('#projects .card')) {
      const name = card.querySelector('h3')?.textContent;
      if (!known.has(name)) continue;
      const actions = card.querySelector('.actions');
      if (!actions || actions.querySelector('[data-track-name]')) continue;
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'track-button';
      button.dataset.trackName = name;
      button.textContent = saved[name] ? 'Modifier le suivi' : 'Suivre ce projet';
      actions.appendChild(button);
      if (saved[name]) {
        const existing = card.querySelector('.track-summary');
        if (!existing) {
          const summary = text(card, 'p', 'Suivi manuel : ' + saved[name].modules.length +
            ' module(s) · ' + (saved[name].version || 'version à renseigner'), 'track-summary');
          summary.title = 'Déclaration locale, sans vérification automatique';
        }
      }
    }
  }
  function newModuleLine(initial) {
    const parent = $('tracking-modules');
    if (parent.children.length >= MAX_MODULES) {
      notice('Maximum ' + MAX_MODULES + ' modules par projet.', true); return;
    }
    const row = document.createElement('fieldset');
    row.className = 'module-row';
    row.setAttribute('aria-label', 'Module suivi');
    const legend = document.createElement('legend');
    legend.textContent = 'Fonction / module';
    row.appendChild(legend);
    const columns = [
      {label:'Module',field:'name',placeholder:'Ex. Export WAV',max:120},
      {label:'Version',field:'version',placeholder:'Ex. v3.2',max:64},
      {label:'État déclaré',field:'state',select:true},
      {label:'Preuve / référence',field:'evidence',placeholder:'Commit, URL ou description datée',max:900}
    ];
    for (const col of columns) {
      const holder = document.createElement('label');
      holder.textContent = col.label;
      if (col.select) {
        const select = document.createElement('select');select.dataset.field = col.field;
        for (const [key, value] of Object.entries(states)) {
          const option = document.createElement('option');option.value=key;option.textContent=value;
          select.appendChild(option);
        }
        select.value = initial?.state && Object.hasOwn(states, initial.state) ? initial.state : 'unknown';
        holder.appendChild(select);
      } else {
        const input = document.createElement('input');
        input.type='text'; input.dataset.field=col.field;input.maxLength=col.max;
        input.placeholder=col.placeholder;
        input.value = initial?.[col.field] || '';
        holder.appendChild(input);
      }
      row.appendChild(holder);
    }
    const remove = document.createElement('button');
    remove.type='button';remove.className='track-remove';
    remove.textContent='Retirer ce module';remove.title='Retirer cette ligne du suivi local';
    remove.addEventListener('click',()=>row.remove());
    row.appendChild(remove);
    parent.appendChild(row);
  }
  function renderHistory(list) {
    const container = $('tracking-history');
    container.replaceChildren();
    if (!list.length) {text(container,'p','Aucune décision enregistrée dans cette fiche.','track-muted');return;}
    for (const item of [...list].reverse()) {
      const box=document.createElement('article');box.className='track-history-item';
      text(box,'strong',(item.version||'Sans version')+' · '+(item.at||'Date inconnue'));
      text(box,'p',item.decision||'Version enregistrée, sans décision détaillée');
      container.appendChild(box);
    }
  }
  function openProject(name) {
    if (!known.has(name)) return;
    activeName = name;
    const project = saved[name] || {version:'',nextAction:'',blocker:'',reproduce:'',decision:'',modules:[],history:[]};
    $('tracking-project').textContent = name;
    $('tracking-origin').textContent = 'Suivi manuel local — dépôt GitHub public, sans contrôle automatique du fonctionnement.';
    for (const field of ['version','nextAction','blocker','reproduce','decision']) {
      $('track-'+field).value = project[field] || '';
    }
    $('tracking-modules').replaceChildren();
    for (const module of project.modules) newModuleLine(module);
    renderHistory(project.history || []);
    notice('Chaque état est déclaratif. Pour « Déployé », « Testé » ou « Stable », indique une preuve ou référence précise.',false);
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open','');
  }
  function collect() {
    const modules = [];
    for (const row of $('tracking-modules').children) {
      const field = key => row.querySelector('[data-field="'+key+'"]');
      const entry = {
        name:limit(field('name').value,120),
        version:limit(field('version').value,64),
        state:field('state').value,
        evidence:limit(field('evidence').value,900)
      };
      if (!entry.name && !entry.version && !entry.evidence && entry.state==='unknown') continue;
      if (!entry.name) {field('name').focus();throw new Error('Chaque module doit avoir un nom.');}
      if (evidenceRequired.has(entry.state) && entry.evidence.length < 12) {
        field('evidence').focus();
        throw new Error('Une preuve explicite est obligatoire pour marquer ce module « '+states[entry.state]+' ».');
      }
      modules.push(entry);
    }
    return {
      version:limit($('track-version').value,64),
      nextAction:limit($('track-nextAction').value,1200),
      blocker:limit($('track-blocker').value,1200),
      reproduce:limit($('track-reproduce').value,2200),
      decision:limit($('track-decision').value,1200),
      modules
    };
  }
  function saveProject(event) {
    event.preventDefault();
    if (!known.has(activeName)) return;
    try {
      const clean = collect();
      const previous = saved[activeName];
      const history = previous?.history ? [...previous.history] : [];
      const changeDescription = clean.decision || 'Fiche de suivi mise à jour';
      const last = history[history.length-1];
      if (!last || last.decision !== changeDescription || last.version !== clean.version) {
        history.push({at:new Date().toISOString(),version:clean.version,decision:changeDescription});
      }
      clean.history = history.slice(-MAX_HISTORY);
      saved[activeName] = clean;
      const persisted = persist();
      setSummary();renderHistory(clean.history);
      notice(persisted ? 'Enregistré localement sur cet appareil.' :
        'Modifications en mémoire seulement : exporte ton suivi JSON.',!persisted);
      refreshCards();
      if (persisted) dialog.close();
    } catch (error) {
      notice(error.message || 'Saisie incorrecte.',true);
    }
  }
  function exportData() {
    const payload={schema:SCHEMA,exported_at:new Date().toISOString(),scope:'public-repositories-only',projects:saved};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json;charset=utf-8'});
    const url=URL.createObjectURL(blob);
    const link=document.createElement('a');link.href=url;
    link.download='studio-niko-suivi-local-'+new Date().toISOString().slice(0,10)+'.json';
    document.body.appendChild(link);link.click();link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),60000);
    notice('Export préparé. Vérifie le téléchargement dans ton navigateur.',false);
  }
  async function importData(event) {
    const file=event.target.files?.[0];
    event.target.value='';
    if (!file) return;
    if (file.size>MAX_IMPORT_BYTES) {notice('Import refusé : maximum 1 Mo.',true);return;}
    try {
      const result=normalizeStore(JSON.parse(await file.text()));
      if (!Object.keys(result).length) throw new Error('Aucune fiche publique reconnue dans le fichier.');
      if (!window.confirm('Importer '+Object.keys(result).length+
        ' fiches ? Les fiches portant le même nom seront remplacées sur cet appareil.')) return;
      saved={...saved,...result};
      const persisted=persist();
      setSummary();refreshCards();
      if (!persisted) {notice('Import en mémoire uniquement : stockage local indisponible.',true);return;}
      notice('Import terminé : '+Object.keys(result).length+' fiche(s) reconnue(s).',false);
    } catch (error) {notice('Import refusé : '+(error.message||'JSON invalide'),true);}
  }
  function deleteProject() {
    if (!saved[activeName]) {notice('Aucune fiche locale à supprimer.',false);return;}
    if (!window.confirm('Supprimer le suivi local de « '+activeName+' » sur cet appareil ?'))return;
    delete saved[activeName];persist();setSummary();
    dialog.close();
    for (const button of document.querySelectorAll('[data-track-name]')) {
      if(button.dataset.trackName===activeName)button.textContent='Suivre ce projet';
    }
    for(const card of document.querySelectorAll('#projects .card')){
      if(card.querySelector('h3')?.textContent===activeName)card.querySelector('.track-summary')?.remove();
    }
    notice('Fiche locale supprimée.',false);
  }
  document.getElementById('projects').addEventListener('click', event => {
    const button=event.target.closest('[data-track-name]');
    if(button)openProject(button.dataset.trackName);
  });
  for(const id of ['search','domain','priority','integration']) {
    const el=$(id); if(el)el.addEventListener(id==='search'?'input':'change',refreshCards);
  }
  $('reset').addEventListener('click',refreshCards);
  $('tracking-form').addEventListener('submit',saveProject);
  $('track-add').addEventListener('click',()=>newModuleLine());
  $('track-close').addEventListener('click',()=>dialog.close());
  $('track-delete').addEventListener('click',deleteProject);
  $('tracking-export').addEventListener('click',exportData);
  $('tracking-import').addEventListener('change',importData);
  setSummary();refreshCards();
})();
