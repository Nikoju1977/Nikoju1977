'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {validateDeployment}=require('./evidence.cjs');
const base={provider:'Vercel',project:'fixture',environment:'production',state:'READY',commit:'a'.repeat(40),url:'https://fixture.vercel.app/',checked_on:'2026-11-22',verification:'http_assets_only',ci:'success',evidence:'Synthetic test fixture; no actual HTTP audit.'};
const validate=(a,b=a,env='production')=>validateDeployment(a,b,env,'fixture');
test('accept HTTP-only evidence',()=>validate(base));
test('accept READY + CI-only evidence',()=>validate({...base,verification:'deployment_ready_ci_only'}));
test('accept preview build evidence only',()=>validate({...base,environment:'preview',verification:'build_ready_only'},undefined,'preview'));
test('accept absence of deployment',()=>validate(null,null));
test('reject invented deployment',()=>assert.throws(()=>validate(null,base),/Unexpected deployment/));
test('reject missing deployment',()=>assert.throws(()=>validate(base,null),/Missing deployment/));
test('reject divergent scope',()=>assert.throws(()=>validate(base,{...base,verification:'deployment_ready_ci_only'}),/evidence mismatch/));
test('reject divergent evidence text',()=>assert.throws(()=>validate(base,{...base,evidence:'other'}),/evidence mismatch/));
test('reject unsupported certification',()=>assert.throws(()=>validate({...base,verification:'device_certified'}),/Unrecognized evidence scope/));
test('reject CI-only without successful CI',()=>assert.throws(()=>validate({...base,verification:'deployment_ready_ci_only',ci:'failure'}),/CI success required/));
test('reject HTTP scope on preview',()=>assert.throws(()=>validate({...base,environment:'preview'},undefined,'preview'),/Unrecognized evidence scope/));
test('reject invalid calendar date',()=>assert.throws(()=>validate({...base,checked_on:'2026-02-30'}),/Invalid evidence date/));
test('reject abbreviated commit',()=>assert.throws(()=>validate({...base,commit:'abcdef0'}),/Exact commit required/));
test('reject deceptive or insecure URLs',()=>{
  for(const url of ['http://fixture.vercel.app','https://fixture.vercel.app.evil.example','https://user:pass@fixture.vercel.app','https://fixture.vercel.app:8443']){
    assert.throws(()=>validate({...base,url}),/Unsafe Vercel URL/);
  }
});
test('reject empty production evidence',()=>assert.throws(()=>validate({...base,evidence:' '}),/Production evidence required/));
test('reject wrong environment and state',()=>{
  assert.throws(()=>validate({...base,environment:'preview'}),/Wrong environment/);
  assert.throws(()=>validate({...base,state:'ERROR'}),/not READY/);
});
