'use strict';
const catalogue=require('../catalog.json');
const allowedHosts=new Set(['nikoju1977.github.io']);
const isAllowedHost=hostname=>allowedHosts.has(hostname)||hostname.endsWith('.vercel.app');
module.exports=async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  res.setHeader('X-Content-Type-Options','nosniff');
  if(req.method!=='GET')return res.status(405).json({error:'Method not allowed'});
  const requestUrl=new URL(req.url,'https://studio-niko-hub.vercel.app');
  const slug=requestUrl.searchParams.get('slug')||'';
  const item=catalogue.find(x=>x.slug===slug&&typeof x.demoUrl==='string');
  if(!item)return res.status(404).json({error:'Unknown application or no published URL'});
  let url;
  try{url=new URL(item.demoUrl);}catch{return res.status(400).json({error:'Invalid URL in catalog'});}
  if(url.protocol!=='https:'||url.username||url.password||url.port||!isAllowedHost(url.hostname)){
    return res.status(403).json({error:'Destination not on approved static host allowlist'});
  }
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),6500);
  try{
    const start=Date.now();
    const response=await fetch(url.href,{method:'GET',redirect:'manual',signal:controller.signal,
      headers:{'User-Agent':'StudioNikoHub-URL-Diagnostic/1.1','Accept':'text/html,application/json,*/*'}});
    if(response.body){await response.body.cancel().catch(()=>{});}
    let state='unknown';
    if(response.status===401||response.status===403)state='restricted';
    else if(response.status>=200&&response.status<300)state='reachable';
    else if(response.status>=300&&response.status<400)state='redirected';
    else if(response.status>=400)state='unavailable';
    return res.status(200).json({slug,state,httpStatus:response.status,latencyMs:Date.now()-start,checkedAt:new Date().toISOString(),
      note:'HTTP status only; does not verify JavaScript, APIs, credentials, audio, video or application workflows.'});
  }catch(e){return res.status(200).json({slug,state:'unknown',httpStatus:null,checkedAt:new Date().toISOString(),
    note:'Request failed or timed out. Site may still be accessible from user network.'});}
  finally{clearTimeout(timer);}
};