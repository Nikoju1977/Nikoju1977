import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const manifest=JSON.parse(await readFile(new URL('./release.json',import.meta.url),'utf8'));
const bytes=await readFile(new URL('./niko-precision-core.mjs',import.meta.url));
const sha=createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex');
assert.equal(sha,manifest.source.gitBlob,'Module differs from reviewed source blob');
assert.equal(manifest.clinicalValidation,false);
console.log(JSON.stringify({version:manifest.version,gitBlob:sha,sha256:createHash('sha256').update(bytes).digest('hex'),clinicalValidation:false}));
