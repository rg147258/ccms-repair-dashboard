'use strict';
(()=>{
 const letters=[...'ABCDEFG'], fields=['caseId','floor','description','trade','status','completeDate','note','unit'];
 const statusKeys={'未處理':'open','處理中':'working','已完成':'completed','待確認':'needs_review'};
 const countKeys=['total','open','working','completed','needs_review'];
 const keys=(value,expected)=>value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).length===expected.length&&expected.every(key=>Object.hasOwn(value,key));
 let mismatches=[];
 function normalize(data){
  mismatches=[];
  if(!keys(data,['aggregates','details','verifiedAt'])||!keys(data.details,letters)||!keys(data.aggregates,letters)||typeof data.verifiedAt!=='string'||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/.test(data.verifiedAt)||!Number.isFinite(Date.parse(data.verifiedAt)))throw Error('資料格式錯誤');
  const aggregates={};
  for(const letter of letters){
   const building=data.details[letter];
   const hasTime=Object.hasOwn(building??{},'verifiedAt');
   if(!keys(building,hasTime?['building','records','verifiedAt']:['building','records'])||building.building!==letter+'棟'||!Array.isArray(building.records)||(hasTime&&(typeof building.verifiedAt!=='string'||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(building.verifiedAt)||!Number.isFinite(Date.parse(building.verifiedAt)))))throw Error('棟別格式錯誤');
   const counts={total:building.records.length,open:0,working:0,completed:0,needs_review:0},ids=new Set();
   for(const record of building.records){
    if(!keys(record,fields)||fields.some(key=>typeof record[key]!=='string')||!Object.hasOwn(statusKeys,record.status)||!new RegExp('^'+letter+'-\\d{4}$').test(record.caseId)||ids.has(record.caseId)||(record.unit!==''&&!new RegExp('^'+letter+'[0-9]{1,2}$').test(record.unit)))throw Error('明細格式錯誤');
    ids.add(record.caseId);counts[statusKeys[record.status]]++;
   }
   const supplied=data.aggregates[letter];
   if(!keys(supplied,countKeys)||countKeys.some(key=>!Number.isSafeInteger(supplied[key])||supplied[key]!==counts[key]))mismatches.push(letter);
   aggregates[letter]=counts;
  }
  return {aggregates,details:data.details,verifiedAt:data.verifiedAt};
 }
 window.RepairData={normalize,percent:(count,total)=>(total?100*count/total:0).toFixed(1)+'%',get mismatches(){return [...mismatches];}};
})();
