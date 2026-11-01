// 弐式 改(2026-10-31): 自分の画面ファイルだけを保存。勾玉(/latest・/rate)やGMOのAPIの応答は保存しない(通信失敗時に古い値を返さないため)
const C='yatakagami-jo11';   // 改二(2026-11-01・双子)で版上げ=古い画面を捨てさせる
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.map(k=>k!==C&&caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 if(new URL(e.request.url).origin!==self.location.origin)return;     // 外部(勾玉・GMO)は素通し=保存も代返もしない
 e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c)).catch(()=>{});return r}).catch(()=>caches.match(e.request)));
});
