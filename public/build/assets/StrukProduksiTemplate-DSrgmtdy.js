var e=(e=new Date)=>new Intl.DateTimeFormat(`id-ID`,{day:`2-digit`,month:`short`,year:`numeric`}).format(e),t=(e=new Date)=>new Intl.DateTimeFormat(`id-ID`,{hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(e),n=e=>{if(!e)return null;if(typeof e==`string`){let t=e.match(/^(\d{2})-(\d{2})-(\d{4})$/);if(t){let[,e,n,r]=t;return new Date(Number(r),Number(n)-1,Number(e))}}let t=new Date(e);return Number.isNaN(t.getTime())?null:t},r=(e=new Date)=>{let t=e instanceof Date?e:n(e);return t?new Intl.DateTimeFormat(`id-ID`,{day:`2-digit`,month:`2-digit`,year:`numeric`}).format(t).replace(/\//g,`-`):e||`-`},i=e=>Math.round(Number(e||0)).toLocaleString(`id-ID`),a=`

    @page { size: 96mm 450mm; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
        font-family: Calibri, sans-serif;
        font-size: 13px;
        width: 67mm;
        margin: 0 auto;
        padding: 3mm;
        color: #000;
    }
    .receipt { width: 100%; padding: 0; }
    .header { text-align: center; margin-bottom: 2px; }
    .brand-row { display: flex; flex-direction: column; justify-content: center; align-items: center; }
    .logo-img { max-width: 100%; height: auto; display: block; margin: 0 auto 3px; }
    .brand { font-size: 20px; font-weight: 900; letter-spacing: 0; line-height: 1; }
    .sub { font-size: 10px; font-weight: 700; letter-spacing: 2px; margin-top: 1px; }
    .contact { font-size: 13px; font-weight: 700; margin-top: 2px; letter-spacing: 0; }
    .topline { width: 100%; border-collapse: collapse; table-layout: fixed; margin-top: 2px; font-size: 12px; }
    .topline td { border: none; padding: 3px 0 4px; white-space: nowrap; }
    .topline .invoice { font-size: 11px; }
    .topline .amount { padding-right: 1mm; text-align: right; }
    .invoice { font-size: 13px; font-weight: 800; }
    .title { font-size: 13px; font-weight: 800; margin-bottom: 2px letter-spacing: 1px; text-align: center; }
    .block { margin-top: 1px; }
    .label { display: block; font-size: 11px; }
    .name { font-size: 14px; margin-top: 2px; }
    .address { min-height: 18px; overflow-wrap: anywhere; font-size: 12px; }
    .pay-row { display: grid; grid-template-columns: 1fr 1fr; margin: 5px 0 3px; text-align: center; font-size: 12px; }
    .line { border-top: 2px solid #000; margin: 2px 0; }
    table { width: 100%; border-collapse: collapse; table-layout: fixed; font-size: 12px; }
    th, td { padding: 1px 2px; text-align: left; vertical-align: middle; overflow-wrap: anywhere; line-height: 1.1; }
    th { border-top: 2px solid #000; border-bottom: 2px solid #000; font-weight: 900; text-align: center; font-size: 12px; }
    td { padding-top: 1px; padding-bottom: 1px; }
    .bahan { width: 17mm; text-align: left; }
    .ukuran-col { width: 14mm; text-align: left; font-size: 11px; font-weight: bold; white-space: nowrap; }
    .ukuran { display: block; font-size: 10px; color: #444; margin-top: 0; }
    .qty { width: 7mm; text-align: center; font-variant-numeric: tabular-nums; font-size: 12px; }
    .amount { width: 18mm; text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
    .alt td { background: #eee; }
    .muted { color: #000; }
    .keterangan-row td { padding-top: 0; padding-bottom: 1px; font-size: 11px; }
    tfoot td { padding: 1px 2px; white-space: nowrap; }
    .summary-amount { width: mm; text-align: right; font-variant-numeric: tabular-nums; font-size: 12px; }
    tfoot tr:first-child td { padding-top: 2px; }
    .summary-label { text-align: left; font-weight: 700; white-space: nowrap; }
    tfoot { border-top: 2px solid #000; }
    .notes { margin-top: 5px; }
    .notes ul { list-style: none; padding: 0; margin: 0;  border-radius: 2px; }
    .notes li { font-size: 10px; line-height: 1; margin-bottom: 0; padding: 1px 4mm; }
    .notes li::before { content: '* '; margin-left: -4mm; }
    .signatures { display: flex; justify-content: space-between; margin-top: 7px; text-align: center; font-size: 12px; }
    .signatures > div { width: 48%; }
    .sign-name { margin-top: 28px; min-height: 14px; font-size: 13px; font-weight: bold; }
    .printed { display: flex; justify-content: space-between; margin-top: 3px; font-size: 10px; }
`,o=({items:n,auth:o,paymentType:s,diskonInfo:c,minimumHarga:l=0,hargaAkhirInvoice:u=null})=>{let d=new Date,f=n.reduce((e,t)=>e+Number(t.total_harga||0),0);n.reduce((e,t)=>e+Number(t.qty||0),0);let p=n[0],m=p?.customer,h=p?.no_invoice||p?.kode_spk||`-`;p?.tgl_kirim;let g=n[0]?.cs?.username||o?.user?.username||o?.user?.name||`Admin`,_={lunas:`TUNAI`,utang:`UTANG`,transfer:`TRANSFER`,qris:`QRIS`}[s]||`TUNAI`,v=c&&Number(c.diskon||0)>0,y=v?c.mode_diskon===`persen`?`${c.diskon}%`:`Rp ${i(c.diskon)}`:``,b=v?Number(c.harga_diskon||f):f,x=Number(l)>0,S=u?Number(u):b+Number(l),C=n.map((e,t)=>`
            <tr${t%2==1?` class="alt"`:``}>
                <td class="bahan">${e.bahan?.kode||`-`}</td>
                <td class="ukuran-col">${e.lebar||0}x${e.tinggi||0}${e.satuan?` `+e.satuan:``}</td>
                <td class="qty">${e.qty||0}</td>
                <td class="amount" style="font-size: 12px; font-weight: bold;">${i(e.total_harga)}</td>
            </tr>
            ${e.keterangan||e.kode_spk?`
            <tr class="keterangan-row${t%2==1?` alt`:``}">
                <td class="keterangan" colspan="4">${e.keterangan||e.kode_spk}</td>
            </tr>`:``}`).join(``);return`<!DOCTYPE html>
<html>
<head><meta charset="utf-8">
<title>Struk Produksi - ${n.length>1?n.length+` item`:n[0]?.kode_spk}</title>
<style>${a}</style>
</head>
<body>
    <div class="receipt">
        <div class="header">
            <div class="brand-row">
               <h1>SENTOSA</h1>
            </div>
        </div>

        <table class="topline">
            <tr>
                <td class="bahan invoice" style="font-weight: bold; font-size: 13px">${h}</td>
                <td class="ukuran-col"></td>
                <td class="qty"></td>
                <td class="amount" style="font-weight: bold; font-size: 13px">${r(d)}</td>
            </tr>
        </table>

        <div class="title" style="font-size: 16px"><b>FAKTUR</b></div>
        <div class="block" style="font-size:13px; font-weight: bold;">
            <span class="label">Kepada Yth :</span>
            <div class="name">${m?.nama||`-`}</div>
            <div class="address">${m?.alamat||`-`}</div>
             <span>Cara Bayar :</span>
            <strong>${_}</strong>
        </div>

        <table>
            <thead>
                <tr>
                    <th class="bahan">Bahan</th>
                    <th class="ukuran-col">Ukuran</th>
                    <th class="qty">Qty</th>
                    <th class="amount" style="text-align: center;">Jml</th>
                </tr>
            </thead>
            <tbody>
                ${C}
            </tbody>
            <tfoot>
                <tr><td class="summary-label" colspan="3">Total Faktur</td><td class="summary-amount" colspan='1' style="font-weight: bold">${i(f)}</td></tr>
                ${v?`<tr><td class="summary-label" colspan="3">Diskon (${y})</td><td colspan='1' class="summary-amount" style="color:#c00">-${i(f-b)}</td></tr>`:``}
                ${x?`<tr><td class="summary-label" colspan="3">Minimum Faktur</td><td class="summary-amount" style="color:#c00">+${i(l)}</td></tr>`:``}
                ${v||x?`<tr><td class="summary-label" colspan="3" style="font-weight:900">Harga Akhir</td><td colspan='1' class="summary-amount" style="font-weight:900">${i(S)}</td></tr>`:``}
            </tfoot>
        </table>

<br>
        <div class="notes">
            <ul>
                <li>Diperiksa saat pengambilan / penerimaan barang pesanan.</li>
                <li>Kami tidak bertanggung jawab atas kekurangan/kerusakan barang setelah diterima.</li>
                <li>Barang yang tidak diambil selama 1 bulan bila hilang/rusak bukan tanggungan kami.</li>
            </ul>
        </div>

        <div class="signatures" style="margin-top: 10px; font-weight: bold;">
            <div>
                <div>Hormat Kami,</div>
                <div class="sign-name">${g}</div>
            </div>
            <div>
                <div>Customer</div>
                <div class="sign-name">${m?.nama||`-`}</div>
            </div>
        </div>

        <div class="printed" style="margin-top: 7px;">
            <span>Printed By : ${g}</span>
            <span>${e(d)} ${t(d)}</span>
        </div>
    </div>
</body></html>`};export{o as buildProductionReceiptHtml};