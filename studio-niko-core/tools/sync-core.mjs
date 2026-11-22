#!/usr/bin/env node
/**
 * Studio Niko Core sync (local cloned workspace only).
 * Default is inspect-only. Use --apply explicitly to copy the canonical file.
 * This does not deploy, execute apps, or run tests.
 */
import { readFile, writeFile, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const base=resolve(new URL('..',import.meta.url).pathname);
const argv=process.argv.slice(2);
const apply=argv.includes('--apply');
const workspaceArg=argv.find(a=>!a.startsWith('--'));
if(!workspaceArg){
  process.stderr.write('Usage: node tools/sync-core.mjs /path/to/cloned/repos [--apply]\n');
  process.exitCode=2;
}else{
  const workspace=resolve(workspaceArg);
  const registry=JSON.parse(await readFile(join(base,'registry.json'),'utf8'));
  const version=(await readFile(join(base,'VERSION'),'utf8')).trim();
  const source=await readFile(join(base,'v'+version,'core.js'),'utf8');
  const digest=s=>createHash('sha256').update(s,'utf8').digest('hex').slice(0,12);
  let changed=0,unavailable=0,untouched=0,conflicts=0;
  for(const entry of registry.repositories.filter(x=>x.core_integration==='committed')){
    if(!entry.core_asset||entry.core_version!==version){conflicts++;console.log('VERSION_MISMATCH',entry.name);continue;}
    const target=join(workspace,entry.name,entry.core_asset);
    if(!target.startsWith(workspace+'/')){conflicts++;console.log('UNSAFE_PATH',entry.name);continue;}
    let previous;
    try{await stat(target);previous=await readFile(target,'utf8');}
    catch(_){unavailable++;console.log('UNAVAILABLE',entry.name,target);continue;}
    if(previous===source){untouched++;console.log('UNCHANGED',entry.name,digest(previous));continue;}
    // Do not overwrite an unrelated or independently upgraded module.
    if(!previous.includes('Studio Niko Core v'+version)){
      conflicts++;console.log('VERSION_CONFLICT',entry.name);continue;
    }
    if(!apply){changed++;console.log('WOULD_UPDATE',entry.name,digest(previous),'->',digest(source));continue;}
    await writeFile(target,source,'utf8');
    changed++;console.log('UPDATED',entry.name,digest(source));
  }
  console.log(JSON.stringify({mode:apply?'copy':'inspect',changed,untouched,unavailable,conflicts}));
}
