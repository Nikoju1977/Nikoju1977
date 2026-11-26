'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),q=require('./recovery-core.js'),crypto=require('node:crypto').webcrypto;
const at='2026-11-24T00:00:00Z',key=q.modules[0].key,entry={id:'favorites',raw:'["one"]'},payload={schema:'studio-niko-recovery/1',createdAt:at,entries:[entry]};
function store(initial={}){const m=new Map(Object.entries(initial));return{getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,v),removeItem:k=>m.delete(k)};}
test('SHA256 round trip',async()=>assert.deepEqual(await q.verify(await q.create([entry],at,crypto),crypto),payload));
test('tampered payload refused',async()=>{const f=JSON.parse(await q.create([entry],at,crypto));f.payload=f.payload.replace('one','two');await assert.rejects(q.verify(JSON.stringify(f),crypto),/Empreinte/);});
test('unknown module refused',async()=>await assert.rejects(q.create([{id:'token',raw:'{}'}],at,crypto),/inconnu/));
test('duplicate module refused',async()=>await assert.rejects(q.create([entry,entry],at,crypto),/doublon/));
test('unsafe object keys refused',()=>assert.throws(()=>q.validate('workspace','{"__proto__":{}}'),/interdite/));
test('malformed known schema refused',()=>assert.throws(()=>q.validate('favorites','{"x":1}'),/Schéma/));
test('only allowlisted storage read',()=>assert.deepEqual(q.snapshot(store({[key]:entry.raw,unknown:'secret'})),[entry]));
test('new module restores with no overwrite',()=>{const s=store();assert.equal(q.restore(s,payload,['favorites'],{favorites:null}).written,1);assert.equal(s.getItem(key),entry.raw);});
test('conflict blocked by default',()=>{const s=store({[key]:'["old"]'});assert.throws(()=>q.restore(s,payload,['favorites'],{favorites:'["old"]'}),/Écrasement/);assert.equal(s.getItem(key),'["old"]');});
test('explicit overwrite and exact preview required',()=>{const s=store({[key]:'["old"]'});assert.throws(()=>q.restore(s,payload,['favorites'],{favorites:null},true),/modifiées/);assert.equal(q.restore(s,payload,['favorites'],{favorites:'["old"]'},true).written,1);});
test('identical entry stays unchanged',()=>assert.deepEqual(q.restore(store({[key]:entry.raw}),payload,['favorites'],{favorites:entry.raw}),{written:0,unchanged:1}));
test('unselected modules untouched',()=>{const other=q.modules[1].key,s=store({[other]:'keep'});q.restore(s,payload,['favorites'],{favorites:null});assert.equal(s.getItem(other),'keep');});
test('failed write rolls back earlier module',()=>{const other=q.modules[1].key,s=store({[key]:'["old"]'}),set=s.setItem; s.setItem=(k,v)=>{if(k===other)throw Error('quota');set(k,v);};const p={...payload,entries:[entry,{id:'workspace',raw:'{"projects":[],"selected":null}'}]};assert.throws(()=>q.restore(s,p,['favorites','workspace'],{favorites:'["old"]',workspace:null},true),/retour arrière effectué/);assert.equal(s.getItem(key),'["old"]');assert.equal(s.getItem(other),null);});
test('oversized file refused',async()=>await assert.rejects(q.verify('x'.repeat(q.MAX+1),crypto),/volumineux/));

test('graphic preferences round trip and invalid theme rejected',async()=>{const e={id:'design',raw:'{"theme":"midnight","density":"compact"}'};assert.equal((await q.verify(await q.create([e],at,crypto),crypto)).entries[0].raw,e.raw);assert.throws(()=>q.validate('design','{"theme":"bad","density":"compact"}'),/Schéma/);});
