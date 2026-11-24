'use strict';
const {execFileSync}=require('node:child_process'),fs=require('node:fs'),core=require('./security-core.js');
const git=(args,opts={})=>execFileSync('git',args,{maxBuffer:32*1024*1024,...opts});
const rev=git(['rev-parse','HEAD'],{encoding:'utf8'}).trim();
const entries=git(['ls-tree','-r','-z','-l',rev],{encoding:'utf8'}).split('\0').filter(Boolean);
const files=[];
for(const e of entries){const tab=e.indexOf('\t'),[mode,type,oid,size]=e.slice(0,tab).trim().split(/\s+/),file=e.slice(tab+1);
 let status='scanned',findings=[];
 if(type!=='blob'||!['100644','100755'].includes(mode))status='non-regular';
 else if(Number(size)>core.MAX_BYTES)status='too-large';
 else{try{const bytes=git(['cat-file','blob',oid]);if(core.isBinary(bytes))status='binary';else{let decoded;try{decoded=new TextDecoder('utf-8',{fatal:true}).decode(bytes);}catch{status='non-utf8';}if(status==='scanned')findings=core.scan(decoded);}}catch{status='read-error';}}
 files.push({file,status,findings});
}
const report=core.report(files,'Git tracked blobs at '+rev,new Date().toISOString());
// Only rule IDs, paths and line numbers are emitted; never matching values or source lines.
const safePath=s=>s.replace(/[\x00-\x1f\x7f]/g,'?').replace(/[^A-Za-z0-9_./ -]/g,'?').slice(0,240);
console.log(JSON.stringify({...report,files:report.files.map(f=>({...f,file:safePath(f.file)}))},null,2));
const counts=report.summary;
if(process.env.GITHUB_STEP_SUMMARY)fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,'## Security Center — tracked files\n\nCommit: '+rev+'\n\nScanned: '+counts.scanned+' / '+counts.files+'; skipped: '+counts.skipped+'; heuristic findings: '+counts.findings+'.\n\nNo secret values printed. No vulnerability database or history scan. Findings require review.\n');
if(files.some(f=>f.status==='read-error'))process.exitCode=2;
else if(counts.findings)process.exitCode=1;
