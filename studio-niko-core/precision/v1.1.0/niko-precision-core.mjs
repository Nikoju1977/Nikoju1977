// Studio Niko Design — local, reusable experimental precision core.
export const PRECISION_VERSION='1.0.0';
const finite=(x,min,max)=>typeof x==='number'&&Number.isFinite(x)&&x>=min&&x<=max;
const exact=(x,keys)=>x&&typeof x==='object'&&!Array.isArray(x)&&Object.keys(x).length===keys.length&&keys.every(k=>Object.hasOwn(x,k));
const metrics=Object.freeze({angle_deg:[0,180],cadence_spm:[0,300]});
// One independent paired observation per row; null estimate = rejected.
export function evaluateReference(doc){
 if(!exact(doc,['schema','metric','protocol','criteria','pairs'])||doc.schema!=='niko-reference-v1'||!Object.hasOwn(metrics,doc.metric))throw Error('Schema or metric invalid');
 if(typeof doc.protocol!=='string'||!/^[A-Za-z0-9._-]{1,80}$/.test(doc.protocol))throw Error('Protocol identifier invalid');
 const c=doc.criteria,[lo,hi]=metrics[doc.metric];
 if(!exact(c,['minPairs','minCoverage','maxMAE','maxAbsBias','maxRMSE'])||!Number.isInteger(c.minPairs)||!finite(c.minPairs,2,100000)||!finite(c.minCoverage,0.01,1)||!['maxMAE','maxAbsBias','maxRMSE'].every(k=>finite(c[k],0,hi-lo)))throw Error('Criteria invalid');
 if(!Array.isArray(doc.pairs)||doc.pairs.length<2||doc.pairs.length>100000)throw Error('Sample count invalid');
 let n=0,mean=0,m2=0,absolute=0,squares=0;
 for(const p of doc.pairs){
  if(!exact(p,['reference','estimate'])||!finite(p.reference,lo,hi)||(p.estimate!==null&&!finite(p.estimate,lo,hi)))throw Error('Invalid paired measurement');
  if(p.estimate===null)continue;
  const e=p.estimate-p.reference;n++;const delta=e-mean;mean+=delta/n;m2+=delta*(e-mean);absolute+=Math.abs(e);squares+=e*e;
 }
 const coverage=n/doc.pairs.length,mae=n?absolute/n:null,rmse=n?Math.sqrt(squares/n):null,bias=n?mean:null,sd=n>1?Math.sqrt(Math.max(0,m2/(n-1))):null;
 const limits=sd===null?null:[mean-1.96*sd,mean+1.96*sd];
 const checks={sampleCount:n>=c.minPairs,coverage:coverage>=c.minCoverage,mae:mae!==null&&mae<=c.maxMAE,bias:bias!==null&&Math.abs(bias)<=c.maxAbsBias,rmse:rmse!==null&&rmse<=c.maxRMSE};
 return {schema:'niko-reference-report-v1',engine:PRECISION_VERSION,metric:doc.metric,protocol:doc.protocol,criteria:{...c},total:doc.pairs.length,accepted:n,rejected:doc.pairs.length-n,coverage,bias,mae,rmse,sd,agreement95:limits,checks,meetsSpecifiedCriteria:Object.values(checks).every(Boolean),clinicalValidation:false};
}
const enc=new TextEncoder(),dec=new TextDecoder('utf-8',{fatal:true});
const LIMIT=32*1024*1024,ITER=600000;
const toHex=b=>Array.from(b,x=>x.toString(16).padStart(2,'0')).join('');
function fromHex(s,bytes){if(typeof s!=='string'||s.length!==bytes*2||!/^[0-9a-f]+$/.test(s))throw Error('Invalid encrypted envelope');return Uint8Array.from(s.match(/../g),x=>parseInt(x,16));}
function passwordOK(password){if(typeof password!=='string'||password.length<14||password.length>256)throw Error('Passphrase: 14 à 256 caractères');}
function cryptoAPI(){if(!globalThis.crypto?.subtle||!globalThis.crypto?.getRandomValues)throw Error('Web Crypto indisponible');return globalThis.crypto;}
async function keyFor(password,salt,usage){
 passwordOK(password);const api=cryptoAPI(),raw=enc.encode(password);
 try{const material=await api.subtle.importKey('raw',raw,'PBKDF2',false,['deriveKey']);return await api.subtle.deriveKey({name:'PBKDF2',salt,iterations:ITER,hash:'SHA-256'},material,{name:'AES-GCM',length:256},false,[usage]);}finally{raw.fill(0);}
}
const aad=enc.encode('niko-encrypted-session-v1|PBKDF2-SHA256|600000|AES-256-GCM');
export async function encryptSession(text,password){
 passwordOK(password);if(typeof text!=='string'||text.length>LIMIT)throw Error('Session trop volumineuse');
 const api=cryptoAPI(),plain=enc.encode(text);if(plain.length>LIMIT){plain.fill(0);throw Error('Session trop volumineuse');}
 const salt=api.getRandomValues(new Uint8Array(16)),iv=api.getRandomValues(new Uint8Array(12));
 try{const key=await keyFor(password,salt,'encrypt');const bytes=new Uint8Array(await api.subtle.encrypt({name:'AES-GCM',iv,additionalData:aad,tagLength:128},key,plain));
 return {schema:'niko-encrypted-session-v1',kdf:'PBKDF2-SHA256',iterations:ITER,cipher:'AES-256-GCM',salt:toHex(salt),iv:toHex(iv),ciphertext:toHex(bytes)};}finally{plain.fill(0);}
}
export async function decryptSession(doc,password){
 passwordOK(password);
 if(!exact(doc,['schema','kdf','iterations','cipher','salt','iv','ciphertext'])||doc.schema!=='niko-encrypted-session-v1'||doc.kdf!=='PBKDF2-SHA256'||doc.iterations!==ITER||doc.cipher!=='AES-256-GCM'||typeof doc.ciphertext!=='string'||doc.ciphertext.length<32||doc.ciphertext.length>(LIMIT+16)*2||doc.ciphertext.length%2)throw Error('Invalid encrypted envelope');
 const salt=fromHex(doc.salt,16),iv=fromHex(doc.iv,12),cipher=fromHex(doc.ciphertext,doc.ciphertext.length/2);
 const key=await keyFor(password,salt,'decrypt');
 const plain=new Uint8Array(await cryptoAPI().subtle.decrypt({name:'AES-GCM',iv,additionalData:aad,tagLength:128},key,cipher));
 try{return dec.decode(plain);}finally{plain.fill(0);}
}

// V1.1: explicit uncertainty budget, no inference from model confidence.
// Independent inputs in the same units; rectangular input = half-width.
export function uncertaintyBudget(doc){
 if(!exact(doc,['schema','metric','protocol','coverageFactor','repeatability','components'])||doc.schema!=='niko-uncertainty-v1'||!Object.hasOwn(metrics,doc.metric))throw Error('Invalid uncertainty schema');
 if(typeof doc.protocol!=='string'||!/^[A-Za-z0-9._-]{1,80}$/.test(doc.protocol)||!finite(doc.coverageFactor,1,5))throw Error('Invalid protocol or coverage factor');
 const [lo,hi]=metrics[doc.metric],r=doc.repeatability;
 if(!exact(r,['values','measurand'])||!['single','mean'].includes(r.measurand)||!Array.isArray(r.values)||r.values.length<2||r.values.length>10000||!r.values.every(x=>finite(x,lo,hi)))throw Error('Invalid repeatability input');
 if(!Array.isArray(doc.components)||doc.components.length>32)throw Error('Invalid uncertainty components');
 let mean=0,m2=0,n=0;
 for(const v of r.values){n++;const delta=v-mean;mean+=delta/n;m2+=delta*(v-mean);}
 const sd=Math.sqrt(Math.max(0,m2/(n-1))),typeA=r.measurand==='mean'?sd/Math.sqrt(n):sd;
 const ids=new Set(),components=doc.components.map(c=>{
  if(!exact(c,['id','distribution','value','sensitivity'])||typeof c.id!=='string'||!/^[A-Za-z0-9._-]{1,60}$/.test(c.id)||ids.has(c.id)||!['standard','rectangular'].includes(c.distribution)||!finite(c.value,0,hi-lo)||!finite(c.sensitivity,-100,100))throw Error('Invalid uncertainty component');
  ids.add(c.id);const standard=c.value/(c.distribution==='rectangular'?Math.sqrt(3):1);
  return {...c,standard,contribution:Math.abs(c.sensitivity)*standard};
 });
 const combined=Math.hypot(typeA,...components.map(c=>c.contribution));
 return {schema:'niko-uncertainty-report-v1',engine:'1.1.0',metric:doc.metric,protocol:doc.protocol,n,mean,sd,typeA,measurand:r.measurand,components,combined,coverageFactor:doc.coverageFactor,expanded:combined*doc.coverageFactor,assumption:'independent components; supplied coverage factor, not a verified confidence level',clinicalValidation:false};
}
// Fit on one dataset, assess on a distinct labelled dataset. No auto-application.
export function assessCalibration(doc){
 if(!exact(doc,['schema','metric','protocol','fitId','validationId','fit','validation','criteria'])||doc.schema!=='niko-calibration-v1'||!Object.hasOwn(metrics,doc.metric))throw Error('Invalid calibration schema');
 for(const k of ['protocol','fitId','validationId'])if(typeof doc[k]!=='string'||!/^[A-Za-z0-9._-]{1,80}$/.test(doc[k]))throw Error('Invalid identifier');
 if(doc.fitId===doc.validationId)throw Error('Distinct fit and validation datasets required');
 const [lo,hi]=metrics[doc.metric];
 if(!Array.isArray(doc.fit)||doc.fit.length<5||doc.fit.length>10000||!doc.fit.every(p=>exact(p,['reference','estimate'])&&finite(p.reference,lo,hi)&&finite(p.estimate,lo,hi)))throw Error('Invalid calibration fit');
 let n=0,mx=0,my=0,sxx=0,sxy=0,min=Infinity,max=-Infinity;
 for(const p of doc.fit){n++;const dx=p.estimate-mx,dy=p.reference-my;mx+=dx/n;my+=dy/n;sxx+=dx*(p.estimate-mx);sxy+=dx*(p.reference-my);min=Math.min(min,p.estimate);max=Math.max(max,p.estimate);}
 if(max-min<1||sxx<1e-8)throw Error('Insufficient calibration span');
 const slope=sxy/sxx,offset=my-slope*mx;
 if(!finite(slope,0.01,100)||!Number.isFinite(offset))throw Error('Invalid calibration fit coefficient');
 const raw={schema:'niko-reference-v1',metric:doc.metric,protocol:doc.protocol,criteria:doc.criteria,pairs:doc.validation};
 const before=evaluateReference(raw);
 const corrected=doc.validation.map(p=>{const x=p.estimate;if(x===null||x<min||x>max)return {reference:p.reference,estimate:null};const y=slope*x+offset;return {reference:p.reference,estimate:finite(y,lo,hi)?y:null};});
 const after=evaluateReference({...raw,pairs:corrected});
 return {schema:'niko-calibration-report-v1',engine:'1.1.0',metric:doc.metric,protocol:doc.protocol,fitId:doc.fitId,validationId:doc.validationId,fitCount:n,model:{slope,offset,min,max},before,after,autoApply:false,clinicalValidation:false};
}
export async function reportDigest(report){
 const raw=JSON.stringify(report);if(typeof raw!=='string'||raw.length>LIMIT)throw Error('Invalid report');
 const bytes=enc.encode(raw);if(bytes.length>LIMIT)throw Error('Report too large');
 return {algorithm:'SHA-256',encoding:'UTF-8 JSON.stringify',digest:toHex(new Uint8Array(await cryptoAPI().subtle.digest('SHA-256',bytes)))};
}
