var e=(e=new Date)=>new Intl.DateTimeFormat(`id-ID`,{day:`2-digit`,month:`short`,year:`numeric`}).format(e),t=(e=new Date)=>new Intl.DateTimeFormat(`id-ID`,{hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(e),n=e=>Number(e||0).toLocaleString(`id-ID`),r=`

    @page { size: 96mm 450mm; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
        font-family: Calibri, sans-serif;
        font-size: 17px;
        width: 67mm;
        margin: 0 auto;
        padding: 3mm;
        color: #000;
    }
    .receipt { width: 100%; padding: 0; }
    .header { text-align: center; margin-bottom: 2px; }
    .brand-row { display: flex; flex-direction: column; justify-content: center; align-items: center; }
    .topline { width: 100%; border-collapse: collapse; table-layout: fixed; margin-top: 2px; font-size: 14px; }
    .topline td { border: none; padding: 3px 0 4px; white-space: nowrap; }
    .topline .invoice { font-size: 13px; }
    .topline .amount { padding-right: 1mm; text-align: right; }
    .invoice { font-size: 15px; font-weight: 800; }
    .title { font-size: 16px; font-weight: 800; margin-bottom: 2px; letter-spacing: 1px; text-align: center; }
    .block { margin-top: 1px; }
    .label { display: block; font-size: 13px; }
    .name { font-size: 16px; margin-top: 2px; }
    .address { min-height: 18px; overflow-wrap: anywhere; font-size: 16px; }
    .line { border-top: 2px solid #000; margin: 2px 0; }
    table { width: 100%; border-collapse: collapse; table-layout: fixed; font-size: 14px; }
    th, td { padding: 1px 2px; text-align: left; vertical-align: middle; overflow-wrap: anywhere; line-height: 1.1; }
    th { border-top: 2px solid #000; border-bottom: 2px solid #000; font-weight: 900; text-align: center; font-size: 14px; }
    td { padding-top: 1px; padding-bottom: 1px; }
    .bahan { width: 17mm; text-align: left; }
    .ukuran { width: 14mm; text-align: center; font-variant-numeric: tabular-nums; font-size: 13px; }
    .qty { width: 7mm; text-align: center; font-variant-numeric: tabular-nums; font-size: 14px; }
    .amount { width: 18mm; text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
    .alt td { background: #eee; }
    .muted { color: #000; }
    .keterangan-row td { padding-top: 0; padding-bottom: 1px; font-size: 13px; }
    tfoot td { padding: 1px 2px; white-space: nowrap; }
    .summary-amount { text-align: right; font-variant-numeric: tabular-nums; font-size: 14px; }
    tfoot tr:first-child td { padding-top: 2px; }
    .summary-label { text-align: left; font-weight: 700; white-space: nowrap; }
    tfoot { border-top: 2px solid #000; }
    .notes { margin-top: 10px; }
    .notes ul { list-style: none; padding: 0; margin: 0; }
    .notes li { font-size: 10px; line-height: 1.5; margin-bottom: 2px; padding-left: 4mm; }
    .notes li::before { content: '* '; margin-left: -4mm; }
    .signatures { display: flex; justify-content: space-between; margin-top: 7px; text-align: center; font-size: 14px; }
    .signatures > div { width: 48%; }
    .sign-name { margin-top: 28px; min-height: 14px; font-size: 15px; font-weight: bold; }
    .printed { display: flex; justify-content: space-between; margin-top: 3px; font-size: 12px; }
`,i=({items:i,auth:a,paymentType:o,diskonInfo:s,uang:c=null,kembalian:l=null})=>{let u=new Date,d=i.reduce((e,t)=>e+Number(t.total_harga||0),0);i.reduce((e,t)=>e+Number(t.qty||0),0);let f=i[0],p=f?.customer,m=f?.no_invoice||f?.no_antrian||`-`,h=l===null?null:Math.max(0,Number(l)),g=i[0]?.cs?.username||a?.user?.username||a?.user?.name||`Admin`,_={lunas:`TUNAI`,utang:`UTANG`,transfer:`TRANSFER`,qris:`QRIS`}[o]||`TUNAI`,v=s&&Number(s.diskon||0)>0,y=v?s.mode_diskon===`persen`?`${s.diskon}%`:`Rp ${n(s.diskon)}`:``,b=v?Number(s.harga_diskon||d):d,x=i.map((e,t)=>`
            <tr${t%2==1?` class="alt"`:``}>
                <td class="bahan">${e.kategoridesain?.kategori||`-`}</td>
                <td class="ukuran">
                    <span>${n(e.kategoridesain?.harga||0)}</span>
                </td>
                <td class="qty">${e.qty||0}</td>
                <td class="amount">${n(e.total_harga)}</td>
            </tr>
            ${e.keterangan||e.kode_order?`
            <tr class="keterangan-row${t%2==1?` alt`:``}">
                <td class="keterangan" colspan="4">${e.keterangan||e.kode_order}</td>
            </tr>`:``}`).join(``);return`<!DOCTYPE html>
<html>
<head><meta charset="utf-8">
<title>Struk Desain - ${i.length>1?i.length+` item`:i[0]?.kode_order}</title>
<style>${r}</style>
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
                <td class="bahan invoice" style="font-weight: bold; font-size: 12px">${m}</td>
                <td class="ukuran"></td>
                <td class="qty"></td>
                <td class="amount" style="font-weight: bold; font-size: 12px">${e(u)}</td>
            </tr>
        </table>

        <div class="title" style="font-weight: bold;">FAKTUR DESAIN</div>
        <div class="block">
            <span class="label">Kepada Yth :</span>
            <div class="name">${p?.nama||`-`}</div>
            <div class="address">${p?.alamat||`-`}</div>
        </div>
        <div>
            <span>Cara Bayar :</span>
            <strong>${_}</strong>
        </div>

        <br />

        <table>
            <thead>
                <tr>
                    <th class="bahan">Pesanan</th>
                    <th class="ukuran">Harga</th>
                    <th class="qty">Qty</th>
                    <th class="amount" style="text-align: center;">Total</th>
                </tr>
            </thead>
            <tbody>
                ${x}
            </tbody>
            <tfoot>
                <tr><td class="summary-label" colspan="3">Total</td><td class="amount">${n(d)}</td></tr>
                ${v?`<tr><td class="summary-label" colspan="3">Diskon (${y})</td><td class="summary-amount" style="color:#c00">-${n(d-b)}</td></tr>`:``}
                ${v?`<tr><td class="summary-label" colspan="3" style="font-weight:900">Harga Akhir</td><td class="summary-amount" style="font-weight:900">${n(b)}</td></tr>`:``}
            </tfoot>
        </table>

        ${c===null?``:`
        <table>
            <tfoot>
                <tr><td class="summary-label" colspan="3">Uang</td><td class="amount">${n(c)}</td></tr>
                <tr><td class="summary-label" colspan="3">Kembalian</td><td class="amount">${n(h)}</td></tr>
            </tfoot>
        </table>`}

        <div class="notes">
            <ul>
                <li>Hasil print dikertas tidak bisa dijadikan acuan</li>
                <li>Design diperiksa dengan teliti dan baik (Warna, tulisan, peletakan).</li>
                <li>Kesalahan dalam mencentak tidak menjadi tanggungan kami.</li>
            </ul>
        </div>

        <div class="signatures" style="margin-top: 10px; font-weight: bold;">
            <div>
                <div>Hormat Kami,</div>
                <div class="sign-name">${g}</div>
            </div>
            <div>
                <div>Customer</div>
                <div class="sign-name">${p?.nama||`-`}</div>
            </div>
        </div>

        <div class="printed" style="margin-top: 7px;">
            <span>Printed By : ${g}</span>
            <span>${e(u)} ${t(u)}</span>
        </div>
    </div>
</body></html>`};export{i as buildDesainReceiptHtml};