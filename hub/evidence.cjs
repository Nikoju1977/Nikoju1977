'use strict';
const assert=require('node:assert/strict');

const scopes={
  preview:['build_ready_only'],
  production:['http_assets_only','deployment_ready_ci_only']
};

// Validate claims, not availability. No network or device tests are performed here.
function validateDeployment(source, snapshot, environment, name){
  assert(Object.hasOwn(scopes,environment),'Unknown environment');
  const label=environment+' '+name;
  if(source==null){
    assert(snapshot==null,'Unexpected deployment in snapshot '+label);
    return;
  }
  assert(source && typeof source==='object' && !Array.isArray(source),'Invalid registry record '+label);
  assert(snapshot && typeof snapshot==='object' && !Array.isArray(snapshot),'Missing deployment in snapshot '+label);
  assert.deepEqual(snapshot,source,'Deployment evidence mismatch '+label);
  assert.equal(snapshot.provider,'Vercel','Unexpected provider '+label);
  assert.equal(snapshot.environment,environment,'Wrong environment '+label);
  assert.equal(snapshot.state,'READY','Deployment is not READY '+label);
  assert(scopes[environment].includes(snapshot.verification),'Unrecognized evidence scope '+label);
  assert(typeof snapshot.commit==='string' && /^[0-9a-f]{40}$/.test(snapshot.commit),'Exact commit required '+label);
  const date=snapshot.checked_on;
  assert(typeof date==='string' && /^20[0-9]{2}-[0-9]{2}-[0-9]{2}$/.test(date),'Evidence date required '+label);
  const parsed=new Date(date+'T00:00:00.000Z');
  assert(Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0,10)===date,'Invalid evidence date '+label);
  assert(typeof snapshot.url==='string','Deployment URL required '+label);
  const url=new URL(snapshot.url);
  assert(url.protocol==='https:' && url.hostname.endsWith('.vercel.app') && !url.username && !url.password && !url.port,'Unsafe Vercel URL '+label);
  if(environment==='production'){
    assert(typeof snapshot.evidence==='string' && snapshot.evidence.trim().length>0,'Production evidence required '+label);
    if(snapshot.verification==='deployment_ready_ci_only')assert.equal(snapshot.ci,'success','CI success required '+label);
  }
}
module.exports={validateDeployment};
