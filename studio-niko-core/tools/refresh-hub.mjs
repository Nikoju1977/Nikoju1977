#!/usr/bin/env node
/**
 * Rebuild the public Studio Niko Hub dashboard snapshot from registry.json.
 * No HTTP, GitHub API, secrets, tests, deploys or git push.
 * Without --apply, performs a read-only comparison.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const registryPath=fileURLToPath(new URL('../registry.json',import.meta.url));
const dashboardPath=fileURLToPath(new URL('../../hub/pilotage.html',import.meta.url));
const apply=process.argv.includes('--apply');
const registry=JSON.parse(await readFile(registryPath,'utf8'));
if(registry.public_only!==true||!Array.isArray(registry.repositories))throw Error('Public registry required');
if(registry.repositories.some(r=>r.visibility!=='public'))throw Error('Private or unclassified repository in public source');
const names=registry.repositories.map(r=>r.name);
if(new Set(names).size!==names.length)throw Error('Duplicate repository names');
if(names.length!==registry.public_repositories)throw Error('Public repository count mismatch');
if(registry.total_repositories!==registry.public_repositories+registry.private_repositories_omitted)throw Error('Inventory mismatch');

const payload={
  schema_version:registry.schema_version,
  as_of:registry.as_of,
  total_repositories:registry.total_repositories,
  private_repositories_omitted:registry.private_repositories_omitted,
  repositories:registry.repositories.map(r=>({
    name:r.name,full_name:r.full_name,domain:r.domain,priority:r.priority,
    core_integration:r.core_integration,core_version:r.core_version||null,
    recovery_status:r.recovery_status||null,recovery_scope:r.recovery_scope||null,
    recovery_document:r.recovery_document||null
  }))
};
const serialized=JSON.stringify(payload).replace(/</g,'\\u003c');
const html=await readFile(dashboardPath,'utf8');
const re=/(<script id="repository-snapshot" type="application\/json">)([\s\S]*?)(<\/script>)/;
const match=html.match(re);
if(!match)throw Error('Dashboard data marker missing');
if(match[2]===serialized){
  process.stdout.write('UP_TO_DATE '+names.length+' public repositories\n');
}else if(!apply){
  process.stdout.write('WOULD_REFRESH '+names.length+' public repositories; rerun with --apply\n');
}else{
  await writeFile(dashboardPath,html.replace(re,(_all,start,_old,end)=>start+serialized+end),'utf8');
  process.stdout.write('UPDATED '+names.length+' public repositories; git commit and deployment still required\n');
}
