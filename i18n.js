'use strict';
(()=>{
const dict={
'修繕進度｜各棟統計':'Kemajuan perbaikan | Ringkasan blok','修繕進度 · 總覽與明細':'Kemajuan perbaikan | Ringkasan dan rincian',
'修繕進度總覽':'Ringkasan perbaikan','修繕進度':'Kemajuan perbaikan','把進度，看清楚。':'Pantau kemajuan dengan jelas.',
'此頁需要 JavaScript 顯示彙總；目前未載入統計資料。':'Halaman ini memerlukan JavaScript untuk menampilkan ringkasan; data statistik belum dimuat.',
'依棟別掌握修繕件數與處理狀態，讓每一步都有依據。':'Pantau jumlah dan status perbaikan untuk setiap blok.',
'資料查核時間':'Data diperiksa','尚未查核':'Belum diperiksa','各棟合計':'Total seluruh blok','修繕總件數':'Total perbaikan',
'已發布棟別合計':'Total blok yang dipublikasikan','未處理':'Belum ditangani','處理中':'Sedang ditangani','已完成':'Selesai','待確認':'Perlu konfirmasi',
'等待開始處理':'Menunggu penanganan','修繕持續進行':'Perbaikan sedang berlangsung','依核定規則統計':'Berdasarkan status sumber','狀態待確認':'Status perlu dikonfirmasi',
'各棟概況':'Ringkasan per blok','選擇棟別':'Pilih blok','全部棟別':'Semua blok','棟別':'Blok','樓層':'Lantai','工種':'Jenis pekerjaan','狀態':'Status',
'案件編號':'Nomor kasus','缺失內容':'Rincian kerusakan','完成日期':'Tanggal selesai','備註':'Catatan','全部明細':'Semua rincian','未指定工種':'Pekerjaan belum ditentukan',
'查看全部明細':'Lihat semua rincian','全部樓層':'Semua lantai','全部工種':'Semua pekerjaan','全部狀態':'Semua status','搜尋':'Cari',
'清除篩選':'Hapus filter','篩選狀態':'Filter status','篩選棟別':'Filter blok','篩選樓層':'Filter lantai','篩選工種':'Filter pekerjaan',
'搜尋修繕明細':'Cari rincian perbaikan','搜尋案件、樓層、修繕內容或備註':'Cari kasus, lantai, kerusakan, atau catatan',
'← 返回首頁':'← Kembali ke beranda','← 返回總覽':'← Kembali ke ringkasan','無符合資料':'Tidak ada hasil yang cocok',
'正在載入修繕資料…':'Memuat data perbaikan…','正在載入翻譯…':'Memuat terjemahan…',
'資料載入失敗或格式不符，請稍後重新整理。':'Data gagal dimuat atau format tidak sesuai. Muat ulang nanti.',
'印尼文翻譯暫時無法載入，請重新整理；目前保留中文。':'Terjemahan Indonesia gagal dimuat. Muat ulang; teks Mandarin tetap ditampilkan.',
'依來源狀態欄分類，快照非即時進度；填表完成不等於人工驗收。':'Status mengikuti data sumber. Ini cuplikan, bukan pembaruan langsung; status selesai bukan bukti penerimaan manual.',
'中印翻譯供閱讀參考，修繕判定請核對中文原文。':'Terjemahan untuk membantu membaca. Periksa teks Mandarin untuk keputusan perbaikan.',
'等待核實的彙總資料':'Menunggu ringkasan terverifikasi','尚未發布件數；空白不代表零件。統計規則仍待核定。':'Jumlah belum dipublikasikan. Kosong bukan berarti nol; aturan statistik menunggu konfirmasi.',
'已發布核實彙總':'Ringkasan terverifikasi dipublikasikan','各棟依各自查核時間發布人工快照；非自動同步，非即時資料。':'Cuplikan setiap blok sesuai waktu pemeriksaan; tidak tersinkron otomatis dan bukan data langsung.',
'僅顯示已核實、獲准公開的棟別。':'Hanya blok yang diperiksa dan diizinkan untuk publik.',
'資料確認後，進度就會在這裡。':'Kemajuan muncul setelah data dikonfirmasi.',
'目前沒有已核實的統計可供發布。完成資料與狀態規則查核後，再更新各棟彙總。':'Belum ada statistik terverifikasi. Ringkasan diperbarui setelah data dan aturan status diperiksa.',
'尚無資料 · 不以示範數字代替':'Belum ada data · tanpa angka contoh',
'點選棟別卡片查看公開去識別修繕明細。':'Pilih kartu blok untuk melihat rincian perbaikan tanpa identitas pribadi.',
'狀態統計規則待核定；尚未使用日期推算狀態。':'Aturan status menunggu konfirmasi; tanggal tidak digunakan untuk memperkirakan status.',
'資料為查核時間的快照，並非即時進度。':'Data merupakan cuplikan saat pemeriksaan, bukan kemajuan langsung.',
'統計規則待核定':'Aturan statistik menunggu konfirmasi','依來源狀態欄分類':'Berdasarkan kolom status sumber',
'依來源狀態欄分類為未處理、處理中、已完成、待確認。不使用日期反推；填表狀態不等同人工驗收。':'Status sumber: belum ditangani, sedang ditangani, selesai, atau perlu konfirmasi. Tidak disimpulkan dari tanggal; status bukan penerimaan manual.',
'修繕統計 · 公開彙總':'Statistik perbaikan · ringkasan publik','公開明細已遮除個人與門禁資訊':'Identitas pribadi dan informasi akses telah disamarkan',
'資料暫時無法顯示':'Data sementara tidak tersedia','彙總格式需重新查核；目前不顯示統計數字。':'Format ringkasan perlu diperiksa kembali; angka belum ditampilkan.',
'其他':'Lainnya','工務所':'Kantor teknik','廚具':'Perangkat dapur','水電':'Air dan listrik','石材':'Batu','磁磚':'Ubin','衛浴設備':'Perlengkapan kamar mandi','門框扇':'Kusen dan daun pintu',
'三協':'San Xie','予宙':'Yu Zhou','櫻花':'Sakura','沐泰':'Mu Tai','翔第':'Xiang Di','麗璟':'Li Jing',
'狀態分布':'Distribusi status','總計':'Total','件':' kasus','（台北）':'(Taipei)',
};
let lang='zh';try{lang=localStorage.getItem('repair-language')==='id'?'id':'zh';}catch{}
const cache=new WeakMap(),attributeCache=new WeakMap();
function t(text){
 if(lang!=='id')return text;
 const value=String(text), trimmed=value.trim();let result=dict[trimmed];
 if(result===undefined){
  result=trimmed.replace(/^([A-G])棟 修繕明細$/,'Rincian perbaikan blok $1').replace(/^([A-G])棟$/,'Blok $1')
   .replace(/^顯示 (\d+) \/ (\d+) 筆$/,'Menampilkan $1 / $2 kasus').replace(/^共 (\d+) 棟已發布彙總$/,'Ringkasan $1 blok dipublikasikan')
   .replace(/^總計 (\d+)$/,'Total $1').replace(/^查核：/,'Diperiksa: ').replace(/（台北；各棟時間見下）/g,'(Taipei; waktu per blok di bawah)').replace(/（台北）/g,'(Taipei)')
   .replace(/(\d{4})年(\d{1,2})月(\d{1,2})日/g,'$1/$2/$3').replace(/晚上/g,'malam ').replace(/下午/g,'sore ').replace(/上午/g,'pagi ').replace(/凌晨/g,'dini hari ')
   .replace(/^點選棟別查看明細 · 公開去識別化資料 · 查核時間$/,'Pilih blok untuk rincian · Data tanpa identitas · Diperiksa');
 }
 return value.replace(trimmed,result);
}
function skip(node){return node.parentElement?.closest('script,style,[data-no-i18n]');}
function apply(){
 document.documentElement.lang=lang==='id'?'id':'zh-Hant';
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;
 while(node=walker.nextNode()){
  if(skip(node)||!node.data.trim())continue;
  const old=cache.get(node),original=old&&node.data===old.last?old.original:node.data,translated=t(original);
  cache.set(node,{original,last:translated});if(node.data!==translated)node.data=translated;
 }
 for(const element of document.querySelectorAll('[aria-label],[placeholder],[data-label]')){
  if(element.closest('[data-no-i18n]')&&!element.hasAttribute('data-label'))continue;
  let values=attributeCache.get(element)||{};
  for(const key of ['aria-label','placeholder','data-label']){if(!element.hasAttribute(key))continue;const current=element.getAttribute(key),old=values[key],original=old&&old.last===current?old.original:current,translated=t(original);values[key]={original,last:translated};if(current!==translated)element.setAttribute(key,translated);}
  attributeCache.set(element,values);
 }
 for(const button of document.querySelectorAll('[data-language]'))button.setAttribute('aria-pressed',String(button.dataset.language===lang));
 document.title=t(document.body.dataset.titleZh||document.title);
}
function set(value){lang=value==='id'?'id':'zh';try{localStorage.setItem('repair-language',lang);}catch{}apply();window.dispatchEvent(new Event('repairlanguagechange'));}
window.I18N={t,apply,set,get lang(){return lang;}};
document.addEventListener('DOMContentLoaded',()=>{
 document.body.dataset.titleZh=document.title;
 document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>set(button.dataset.language)));
 apply();let pending=false;new MutationObserver(()=>{if(pending)return;pending=true;queueMicrotask(()=>{pending=false;apply();});}).observe(document.body,{childList:true,characterData:true,subtree:true});
});
})();
