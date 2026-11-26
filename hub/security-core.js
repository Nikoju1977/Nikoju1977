(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.SecurityCore=api;})(globalThis,function(){
'use strict';
const MAX_BYTES=1024*1024;
// High-signal signatures only. Never return the matching text or credential.
const rules=[
 ['private-key','critical',/-----BEGIN (?:RSA |EC |DSA |OPENSSH |ENCRYPTED )?PRIVATE KEY-----/],
 ['github-token','high',/\b(?:gh[pousr]_[A-Za-z0-9]{36,255}|github_pat_[A-Za-z0-9_]{50,255})\b/],
 ['aws-key-id','high',/\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/],
 ['stripe-live-secret','high',/\bsk_live_[A-Za-z0-9]{20,255}\b/],
 ['openai-project-key','high',/\bsk-proj-[A-Za-z0-9_-]{40,255}\b/],
 ['slack-token','high',/\bxox[baprs]-[A-Za-z0-9-]{20,255}\b/]
];
function scan(text){if(typeof text!=='string')throw TypeError('Text required');const out=[];let line=0;for(const row of text.split(/\r\n|\n|\r/)){line++;for(const [rule,severity,re] of rules)if(re.test(row))out.push({rule,severity,line});}return out;}
function isBinary(bytes){return bytes.includes(0);}
function summarize(files){return {files:files.length,scanned:files.filter(f=>f.status==='scanned').length,skipped:files.filter(f=>f.status!=='scanned').length,findings:files.reduce((n,f)=>n+f.findings.length,0)};}
function report(files,scope,checkedAt){return {schema:'studio-niko-security/1',scope,checkedAt,limits:'Signature heuristics only; no secret verification, history scan, dependency CVE scan or security certification',summary:summarize(files),files:files.map(f=>({file:f.file,status:f.status,findings:f.findings.map(({rule,severity,line})=>({rule,severity,line}))}))};}
return {MAX_BYTES,scan,isBinary,summarize,report};
});
