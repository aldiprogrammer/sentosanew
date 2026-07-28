var e=(e=new Date)=>new Intl.DateTimeFormat(`id-ID`,{day:`2-digit`,month:`short`,year:`numeric`}).format(e),t=(e=new Date)=>new Intl.DateTimeFormat(`id-ID`,{hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(e),n=e=>{if(!e)return null;if(typeof e==`string`){let t=e.match(/^(\d{2})-(\d{2})-(\d{4})$/);if(t){let[,e,n,r]=t;return new Date(Number(r),Number(n)-1,Number(e))}}let t=new Date(e);return Number.isNaN(t.getTime())?null:t},r=(e=new Date)=>{let t=e instanceof Date?e:n(e);return t?new Intl.DateTimeFormat(`id-ID`,{day:`2-digit`,month:`2-digit`,year:`numeric`}).format(t).replace(/\//g,`-`):e||`-`},i=e=>Math.round(Number(e||0)).toLocaleString(`id-ID`),a=`

    @page { size: 90mm 450mm; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
        font-family: Calibri, sans-serif;
        font-size: 11px;
        width: 62mm;
         margin: 0 auto;
        padding: 3mm;
        color: #000;
    }
    .receipt { width: 100%; padding: 0; }
    .header { text-align: center; margin-bottom: 4px; }
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
    .title { font-size: 13px; font-weight: 800; margin-bottom: 4px letter-spacing: 1px; text-align: center; }
    .block { margin-top: 2px; }
    .label { display: block; font-size: 11px; }
    .name { font-size: 14px; margin-top: 2px; }
    .address { min-height: 18px; overflow-wrap: anywhere; font-size: 12px; }
    .pay-row { display: grid; grid-template-columns: 1fr 1fr; margin: 5px 0 3px; text-align: center; font-size: 12px; }
    .line { border-top: 2px solid #000; margin: 4px 0; }
    table { width: 100%; border-collapse: collapse; table-layout: fixed; font-size: 12px; }
    th, td { padding: 3px 2px; text-align: left; vertical-align: middle; overflow-wrap: anywhere; }
    th { border-top: 2px solid #000; border-bottom: 2px solid #000; font-weight: 900; text-align: center; font-size: 12px; }
    td { padding-top: 4px; padding-bottom: 4px; }
    .bahan { width: 26mm; text-align: left; }
    .ukuran { display: block; font-size: 10px; color: #444; margin-top: 1px; }
    .qty { width: 8mm; text-align: center; font-variant-numeric: tabular-nums; font-size: 12px; }
    .amount { width: 22mm; text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
    .alt td { background: #eee; }
    .muted { color: #000; }
    .keterangan-row td { padding-top: 0; padding-bottom: 4px; font-size: 11px; }
    tfoot td { padding: 2px; white-space: nowrap; }
    .summary-amount { width: mm; text-align: right; font-variant-numeric: tabular-nums; font-size: 12px; }
    tfoot tr:first-child td { padding-top: 4px; }
    .summary-label { text-align: left; font-weight: 700; white-space: nowrap; }
    tfoot { border-top: 2px solid #000; }
    .notes { margin-top: 10px; }
    .notes ul { list-style: none; padding: 0; margin: 0;  border-radius: 2px; }
    .notes li { font-size: 11px; line-height: 1.5; margin-bottom: 2px; padding: 2px 4mm; }
    .notes li::before { content: '* '; margin-left: -4mm; }
    .signatures { display: flex; justify-content: space-between; margin-top: 7px; text-align: center; font-size: 12px; }
    .signatures > div { width: 48%; }
    .sign-name { margin-top: 28px; min-height: 14px; font-size: 13px; font-weight: bold; }
    .printed { display: flex; justify-content: space-between; margin-top: 3px; font-size: 10px; }
`,o=({items:n,auth:o,paymentType:s,diskonInfo:c,minimumHarga:l=0,hargaAkhirInvoice:u=null})=>{let d=new Date,f=n.reduce((e,t)=>e+Number(t.total_harga||0),0);n.reduce((e,t)=>e+Number(t.qty||0),0);let p=n[0],m=p?.customer,h=p?.no_invoice||p?.kode_spk||`-`,g=p?.tgl_kirim||d,_=n[0]?.cs?.username||o?.user?.username||o?.user?.name||`Admin`,v={lunas:`TUNAI`,utang:`UTANG`,transfer:`TRANSFER`,qris:`QRIS`}[s]||`TUNAI`,y=c&&Number(c.diskon||0)>0,b=y?c.mode_diskon===`persen`?`${c.diskon}%`:`Rp ${i(c.diskon)}`:``,x=y?Number(c.harga_diskon||f):f,S=Number(l)>0,C=u?Number(u):x+Number(l),w=n.map((e,t)=>`
            <tr${t%2==1?` class="alt"`:``}>
                <td class="bahan">
                    ${e.bahan?.kode||`-`}
                    <span class="ukuran">${e.lebar||0} x ${e.tinggi||0} ${e.satuan||``}</span>
                </td>
                <td class="qty">${e.qty||0}</td>
                <td class="amount" style="font-size: 11px">${i(e.total_harga)}</td>
            </tr>
            ${e.keterangan||e.kode_spk?`
            <tr class="keterangan-row${t%2==1?` alt`:``}">
                <td class="keterangan" colspan="3">${e.keterangan||e.kode_spk}</td>
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
                <td class="bahan invoice">${h}</td>
                <td class="qty"></td>
                <td class="amount" style="font-weight: bold; font-size: 10px">${r(d)}</td>
            </tr>
        </table>

        <div class="title">FAKTUR</div>
        <div class="block">
            <span class="label">Kepada Yth :</span>
            <div class="name">${m?.nama||`-`}</div>
            <div class="address">${m?.alamat||`-`}</div>
        </div>
        <div>Selesai : ${r(g)}</div>
        <div>
            <span>Cara Bayar :</span>
            <strong>${v}</strong>
        </div>

        <br />

        <table>
            <thead>
                <tr>
                    <th class="bahan">Bahan</th>
                    <th class="qty">Qty</th>
                    <th class="amount" style="text-align: center;">Jml</th>
                </tr>
            </thead>
            <tbody>
                ${w}
            </tbody>
            <tfoot>
                <tr><td class="summary-label" colspan="1">Total Faktur</td><td class="summary-amount" colspan='2' style="font-weight: bold">${i(f)}</td></tr>
                ${y?`<tr><td class="summary-label" colspan="1">Diskon (${b})</td><td colspan='2' class="summary-amount" style="color:#c00">-${i(f-x)}</td></tr>`:``}
                ${S?`<tr><td class="summary-label" colspan="2">Minimum Faktur</td><td class="summary-amount" style="color:#c00">+${i(l)}</td></tr>`:``}
                ${y||S?`<tr><td class="summary-label" colspan="1" style="font-weight:900">Harga Akhir</td><td colspan='2' class="summary-amount" style="font-weight:900">${i(C)}</td></tr>`:``}
            </tfoot>
        </table>

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
                <div class="sign-name">${_}</div>
            </div>
            <div>
                <div>Customer</div>
                <div class="sign-name">${m?.nama||`-`}</div>
            </div>
        </div>

        <div class="printed" style="margin-top: 7px;">
            <span>Printed By : ${_}</span>
            <span>${e(d)} ${t(d)}</span>
        </div>
    </div>
</body></html>`};export{o as buildProductionReceiptHtml};