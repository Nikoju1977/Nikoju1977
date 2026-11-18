const test=require('node:test');
const assert=require('node:assert/strict');
const {check,normalize}=require('../web/engine.js');
const source={id:'test',title:'Référentiel fictif',version:'1',reviewer:'Relecteur fictif',reviewed:true,content:'Ne pas utiliser le dispositif fictif Y.\nLe dispositif fictif X doit être contrôlé avant usage.\nLa valeur fictive prévue est de 5 mg.'};
test('Exact match cannot be automatically approved',async()=>{const r=await check('Le dispositif fictif X doit être contrôlé avant usage.',[source]);assert.equal(r.decision,'HUMAN_REVIEW');assert.equal(r.summary.text_matches,1);});
test('Negation mismatch must block',async()=>{const r=await check('Utiliser le dispositif fictif Y.',[source]);assert.equal(r.decision,'BLOCKED');});
test('Changed numbers must block',async()=>{const r=await check('La valeur fictive prévue est de 50 mg.',[source]);assert.equal(r.decision,'BLOCKED');});
test('Unreviewed source must not clear',async()=>{const r=await check('Le dispositif fictif X doit être contrôlé avant usage.',[{...source,reviewed:false}]);assert.equal(r.decision,'BLOCKED');});
test('Mixed evidence must block entire answer',async()=>{const r=await check('Le dispositif fictif X doit être contrôlé avant usage.\nLa valeur fictive prévue est de 50 mg.',[source]);assert.equal(r.decision,'BLOCKED');assert.equal(r.summary.text_matches,1);});
test('Sensitive identifiers should block',async()=>{const claim='Le contact de démonstration est test@example.org.';const r=await check(claim,[{...source,content:claim}]);assert.equal(r.decision,'BLOCKED');});
test('Normalization retains negation and numeric distinctions',()=>{assert.notEqual(normalize('ne pas donner 5 mg'),normalize('donner 5 mg'));assert.notEqual(normalize('Dose de 2,5 mg'),normalize('Dose de 25 mg'));});
test('Potential personal data in sources blocks a textual match',async()=>{const claim='Le dispositif fictif X doit être contrôlé avant usage.';const r=await check(claim,[{...source,content:source.content+'\nContact: test@example.org'}]);assert.equal(r.decision,'BLOCKED');});
test('Excessive answer statement count rejected',async()=>{await assert.rejects(check('Phrase test pour éviter toute surcharge.\n'.repeat(301),[source]));});

test('Competing reference values cannot clear the claim',async()=>{const a={...source,content:'La valeur fictive prévue est de 5 unités.'},b={...source,id:'other',content:'La valeur fictive prévue est de 50 unités.'};const r=await check('La valeur fictive prévue est de 5 unités.',[a,b]);assert.equal(r.decision,'BLOCKED');assert.equal(r.claims[0].status,'SOURCE_DISAGREEMENT');});
