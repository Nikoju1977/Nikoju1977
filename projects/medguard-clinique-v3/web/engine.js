/* MEDGUARD strict-v1 — Browser mirror of backend engine. No remote requests. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.MedGuardEngine = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const MAX_ANSWER_CHARS = 100000;
  const MAX_SOURCES = 30;
  const MAX_SOURCE_CHARS = 300000;
  const MAX_CLAIMS = 300;
  const MAX_CORPUS_SENTENCES = 4000;
  const RISK_TERMS = ['posologie','dose','dosage','mg','µg','microgram','insuline','inject','prescri','traitement','therap','medicament','antibiotique','contre-indic','diagnostic','diagnosti','symptome','choc','urgence','convulsion','hemorrag','suicide','automutil','arret cardiaque','douleur thoracique','avc','treatment','medication','diagnos','prescription','emergency','insulin','pregnan','allerg','renal','hepatic','kidney','cardiac'];
  const NEGATIONS = new Set(['ne','pas','jamais','aucun','sans','interdit','not','never','no','contraindique']);
  const STOPWORDS = new Set(['le','la','les','de','du','des','un','une','et','en','est','au','aux','que','qui','a','il','elle','dans','pour','the','and','is','of','to','on','with']);
  function normalize(value) {
    return String(value || '').normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().replace(/’/g, "'").replace(/\u00a0/g, ' ')
      .replace(/^\s*(?:[-*•]|\d+[.)])\s*/u, '')
      .replace(/[^\p{L}\p{N}_\s.,/%+°µ'-]/gu, ' ')
      .replace(/\s+/g, ' ').replace(/^[\s.,;:!?"']+|[\s.,;:!?"']+$/g, '');
  }
  function statements(value) {
    return String(value || '').split(/(?:\r?\n)+|(?<=[.!?])\s+(?=[\p{L}\p{N}"“'(-])/u)
      .map(s => s.trim().replace(/^\s*(?:[-*•]|\d+[.)])\s*/u,'').trim()).filter(Boolean);
  }
  function terms(value) {
    return new Set((normalize(value).match(/[\p{L}\p{N}_]+(?:[.,][0-9]+)?/gu) || [])
      .filter(w => !STOPWORDS.has(w) && w.length > 1));
  }
  function numbers(value) {
    return normalize(value).match(/(?<!\w)\d+(?:[.,]\d+)?(?!\w)/g) || [];
  }
  function hasRisk(value) {const v=normalize(value);return RISK_TERMS.some(t=>v.includes(t));}
  function privacyFlags(value) {
    const a=[];
    if (/\b[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}\b/i.test(value)) a.push('Adresse électronique potentielle');
    if (/\b[12]\s?\d{2}\s?(?:0[1-9]|1[0-2])\s?\d{2}\s?\d{3}\s?\d{3}\s?\d{2}\b/.test(value)) a.push('Identifiant NIR potentiel');
    if (/\b(?:\+33\s?|0)[1-9](?:[ .-]?\d{2}){4}\b/.test(value)) a.push('Numéro de téléphone potentiel');
    return a;
  }
  async function sha256(content) {
    if (!globalThis.crypto?.subtle) return 'indisponible dans ce contexte';
    const digest = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(content));
    return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,'0')).join('');
  }
  function candidateMatch(claim, corpus) {
    const ts=terms(claim);
    let best=null, max=0;
    for(const c of corpus) {
      const other=terms(c.text); if(!other.size) continue;
      const overlap=[...ts].filter(t=>other.has(t)).length;
      const score=overlap/(ts.size+other.size-overlap);
      if(score>max) {max=score;best=c;}
    }
    return {best, similarity: Math.round(max*1000)/1000};
  }
  function potentialSourceConflict(matched, corpus) {
    const base=terms(matched.text);
    for(const other of corpus){
      if(other===matched || other.normalized===matched.normalized) continue;
      const ct=terms(other.text), intersection=[...base].filter(t=>ct.has(t)).length;
      const union=base.size+ct.size-intersection,sim=union?intersection/union:0;
      if(sim>=.58 && (numbers(matched.text).join('|')!==numbers(other.text).join('|') ||
        [...base].some(t=>NEGATIONS.has(t)) !== [...ct].some(t=>NEGATIONS.has(t)))) {
        return {source_id:other.source_id,source_title:other.source_title,text:other.text,source_sha256:other.source_sha256};
      }
    }
    return null;
  }
  async function check(answer, sources) {
    if(typeof answer!=='string') throw Error('La réponse doit être un texte.');
    if(!Array.isArray(sources)) throw Error('Les sources doivent former une liste.');
    if(answer.length>MAX_ANSWER_CHARS) throw Error('Réponse limitée à 100 000 caractères.');
    if(sources.length>MAX_SOURCES) throw Error('Maximum 30 documents.');
    const accepted=[], excluded=[], corpus=[];
    let sourcePrivateData=false;
    for(let i=0;i<sources.length;i++) {
      const s=sources[i];
      if(!s || typeof s!=='object') throw Error('Une source est invalide.');
      const content=String(s.content||'');
      if(content.length>MAX_SOURCE_CHARS) throw Error('Source limitée à 300 000 caractères.');
      const meta={id:String(s.id||`doc-${i+1}`).slice(0,80), title:String(s.title||'').trim().slice(0,200),
        version:String(s.version||'').trim().slice(0,80), reviewer:String(s.reviewer||'').trim().slice(0,120),
        reviewed:s.reviewed===true, source_url:String(s.source_url||'').slice(0,500), sha256:await sha256(content)};
      if(!meta.title || !meta.version || !meta.reviewer || !meta.reviewed || !content.trim()) {
        excluded.push({...meta, reason:'Métadonnées/texte incomplets ou source non revue (déclaration).'});
        continue;
      }
      accepted.push(meta);
      sourcePrivateData=sourcePrivateData || privacyFlags(content).length>0;
      statements(content).forEach(t=>corpus.push({source_id:meta.id, source_title:meta.title,text:t, normalized:normalize(t), source_sha256:meta.sha256}));
      if(corpus.length>MAX_CORPUS_SENTENCES) throw Error(`Corpus trop grand : maximum ${MAX_CORPUS_SENTENCES} phrases.`);
    }
    const splitAnswer=statements(answer);
    if(splitAnswer.length>MAX_CLAIMS) throw Error(`Réponse trop longue : maximum ${MAX_CLAIMS} phrases.`);
    const claims=[];
    splitAnswer.forEach((sentence,i)=>{
      const norm=normalize(sentence), enough=norm.length>=22 && norm.split(' ').length>=4;
      const matched=enough?corpus.find(c=>c.normalized===norm):null;
      let status,evidence,similarity,alternateConflict=null;
      if(matched) {
        alternateConflict=potentialSourceConflict(matched,corpus);
        status=alternateConflict?'SOURCE_DISAGREEMENT':'TEXT_MATCH';similarity=1;
        evidence={source_id:matched.source_id,source_title:matched.source_title,text:matched.text,source_sha256:matched.source_sha256};
      } else {
        const rec=candidateMatch(sentence,corpus); similarity=rec.similarity;
        const differs=Boolean(rec.best && similarity>=.48 && (
          numbers(sentence).join('|')!==numbers(rec.best.text).join('|') ||
          [...terms(sentence)].some(t=>NEGATIONS.has(t)) !== [...terms(rec.best.text)].some(t=>NEGATIONS.has(t))
        ));
        status=differs?'POSSIBLE_CONFLICT':'UNSUPPORTED';
        evidence=rec.best && similarity>=.28 ? {source_id:rec.best.source_id, source_title:rec.best.source_title,text:rec.best.text,source_sha256:rec.best.source_sha256}:null;
      }
      claims.push({index:i+1,claim:sentence,status,risk_flag:hasRisk(sentence),evidence,conflicting_source:alternateConflict,similarity_for_review_only:similarity});
    });
    const flags=privacyFlags(answer);
    if(sourcePrivateData) flags.push("Données personnelles potentielles dans le corpus documentaire");
    let decision='BLOCKED',reason;
    if(!claims.length) reason='Aucune affirmation à analyser.';
    else if(flags.length) reason='Identifiants personnels potentiels détectés : supprimer les données personnelles.';
    else if(claims.some(c=>c.status!=='TEXT_MATCH')) reason='Au moins une affirmation ne correspond pas textuellement à une source déclarée revue.';
    else {decision='HUMAN_REVIEW';reason='Correspondances textuelles uniquement : validation clinique humaine obligatoire.';}
    return {engine:'medguard-strict-v1',decision,reason,checked_at:new Date().toISOString(),
      limitations:'Correspondance littérale seulement ; ni authenticité des sources, ni véracité médicale, ni complétude, ni contradictions complexes ne sont garanties.',
      summary:{total:claims.length,text_matches:claims.filter(c=>c.status==='TEXT_MATCH').length,
        unverified:claims.filter(c=>c.status!=='TEXT_MATCH').length,risk_flags:claims.filter(c=>c.risk_flag).length,
        accepted_sources:accepted.length,excluded_sources:excluded.length},
      privacy_flags:flags,claims,accepted_sources:accepted,excluded_sources:excluded};
  }
  return {check,normalize,statements,privacyFlags};
});
