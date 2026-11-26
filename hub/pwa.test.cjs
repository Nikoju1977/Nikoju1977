'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function harness(){const events={},store=new Map(),cache={addAll:async reqs=>{for(const r of reqs)store.set(new URL(r,self.registration.scope).href,new Response('cached '+new URL(r,self.registration.scope).href));},match:async k=>store.get(typeof k==='string'?k:k.url)},self={registration:{scope:'https://example.test/hub/'},location:{origin:'https://example.test'},clients:{claim:async()=>{}},skipWaiting:async()=>{},addEventListener:(n,f)=>events[n]=f};vm.runInNewContext(fs.readFileSync(__dirname+'/sw.js','utf8'),{self,URL,Request,Response,Set,caches:{open:async()=>cache,keys:async()=>[],delete:async()=>true},fetch:async()=>{throw Error('offline');}});return {events,store};}
async function init(h){let p;h.events.install({waitUntil:v=>p=v});await p;}
function request(h,url,mode='navigate'){let p;h.events.fetch({request:{url,method:'GET',mode},respondWith:v=>p=v});return p;}
test('install caches known shell',async()=>{const h=harness();await init(h);assert(h.store.has('https://example.test/hub/command.html'));});
test('query navigation bypasses the cache',()=>assert.equal(request(harness(),'https://example.test/hub/index.html?q=alpha'),undefined));
test('API always bypassed',()=>assert.equal(request(harness(),'https://example.test/hub/api/health?slug=alpha','cors'),undefined));
test('unknown page bypasses the cache',()=>assert.equal(request(harness(),'https://example.test/hub/missing.html'),undefined));
test('external and outside scope bypassed',()=>{const h=harness();assert.equal(request(h,'https://example.test/other'),undefined);assert.equal(request(h,'https://another.test/hub/'),undefined);});
