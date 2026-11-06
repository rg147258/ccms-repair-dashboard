'use strict';
(async()=>{
 const state=document.getElementById('insights-load'),section=document.getElementById('repairs');
 section.style.display='none';
 try{
  const responses=await Promise.all([fetch('./repair_public_data.json',{cache:'no-store'}),fetch('./repair_report_dates.json',{cache:'no-store'})]);
  if(responses.some(r=>!r.ok))throw Error('資料讀取失敗');
  const [input,dates]=await Promise.all(responses.map(r=>r.json())),data=RepairData.normalize(input);
  const valid=d=>d===null||typeof d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d)&&new Date(d+'T12:00:00Z').toISOString().slice(0,10)===d;
  if(!dates||Object.keys(dates).sort().join(',')!=='dates,publicVerifiedAt,snapshot'||!valid(dates.snapshot)||!dates.snapshot||!dates.dates||Object.entries(dates.dates).some(([id,d])=>!/[A-G]-\d{4}$/.test(id)||!valid(d)))throw Error('日期格式需查核');
  let unmatched=0;const records=[];
  for(const [building,detail] of Object.entries(data.details))for(const r of detail.records){
   const m=/^(\d+)F?$/i.exec(r.floor.trim()),floor=m?Number(m[1]):null,stack=r.unit?r.unit.slice(1):null;
   const unit=stack&&floor!==null?r.unit+'-'+String(floor).padStart(2,'0')+'F':null;
   if(!Object.hasOwn(dates.dates,r.caseId))unmatched++;
   records.push({id:r.caseId,unit,building,floor,stack,reported:dates.dates[r.caseId]||null,completed:null,done:r.status==='已完成',status:r.status,description:r.description||'缺失內容未填（待確認）',trade:r.trade,vendor:'',reportedRaw:dates.dates[r.caseId]||'',completedRaw:r.completeDate});
  }
  window.DATA={householdRegistry:[...new Set(records.map(r=>r.unit).filter(Boolean))],meta:{snapshot:dates.snapshot},repairs:{snapshot:dates.snapshot,records,sources:[],quality:{},dateRule:'日期快照為 '+dates.snapshot+'；未載年份的月日依原批2026年資料補年。案件數與目前狀態由首頁同一份公開資料計算。'}};
  window.report={openHouse:unit=>{location.href='./details.html?building='+encodeURIComponent(unit[0])}};
  Chart.defaults.font.family='system-ui,"Microsoft JhengHei",sans-serif';Chart.defaults.color='#60716d';
  section.style.display='';initRepairs();
  state.textContent='公開案件 '+records.length+' 件；報修日期快照 '+dates.snapshot+'。資料為人工快照，非即時同步。';
  if(data.verifiedAt!==dates.publicVerifiedAt||unmatched||RepairData.mismatches.length){state.className='insights-warning';state.textContent+=' 案件資料版本與報修日期快照需重新核對；'+unmatched+' 筆案件尚無對應日期，未補造日期。'}
 }catch(error){state.className='insights-warning';state.textContent='修繕案件與日期資料載入失敗或格式不符，請稍後重新整理。';section.style.display='none';}
})();
