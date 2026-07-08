var e=(e=new Date)=>new Intl.DateTimeFormat(`id-ID`,{day:`2-digit`,month:`short`,year:`numeric`}).format(e),t=(e=new Date)=>new Intl.DateTimeFormat(`id-ID`,{hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(e),n=e=>Number(e||0).toLocaleString(`id-ID`),r=`

    @page { size: 90mm 297mm; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 13px;
        width: 62mm;
         margin: 0 auto;
        padding: 3mm;
        color: #000;
    }
    .receipt { width: 100%; padding: 0; }
    .header { text-align: center; margin-bottom: 4px; }
    .brand-row { display: flex; flex-direction: column; justify-content: center; align-items: center; }
    .topline { width: 100%; border-collapse: collapse; table-layout: fixed; margin-top: 2px; font-size: 12px; }
    .topline td { border: none; padding: 3px 0 4px; white-space: nowrap; }
    .topline .invoice { font-size: 11px; }
    .topline .amount { padding-right: 1mm; text-align: right; }
    .invoice { font-size: 13px; font-weight: 800; }
    .title { font-size: 13px; font-weight: 800; margin-bottom: 4px; letter-spacing: 1px; text-align: center; }
    .block { margin-top: 2px; }
    .label { display: block; font-size: 11px; }
    .name { font-size: 14px; margin-top: 2px; }
    .address { min-height: 18px; overflow-wrap: anywhere; font-size: 12px; }
    .line { border-top: 2px solid #000; margin: 4px 0; }
    table { width: 100%; border-collapse: collapse; table-layout: fixed; font-size: 12px; }
    th, td { padding: 3px 2px; text-align: left; vertical-align: middle; overflow-wrap: anywhere; }
    th { border-top: 2px solid #000; border-bottom: 2px solid #000; font-weight: 900; text-align: center; font-size: 12px; }
    td { padding-top: 4px; padding-bottom: 4px; }
    .bahan { width: 18mm; text-align: left; }
    .ukuran { width: 20mm; text-align: center; font-variant-numeric: tabular-nums; }
    .qty { width: 7mm; text-align: center; font-variant-numeric: tabular-nums; }
    .amount { width: 16mm; text-align: right; font-variant-numeric: tabular-nums; }
    .alt td { background: #eee; }
    .muted { color: #000; }
    .keterangan-row td { padding-top: 0; padding-bottom: 4px; font-size: 11px; }
    tfoot td { padding: 2px; border: none; }
    tfoot tr:first-child td { padding-top: 4px; }
    .summary-label { text-align: left; font-weight: 700; }
    tfoot { border-top: 2px solid #000; }
    .notes { margin-top: 10px; }
    .notes ul { list-style: none; padding: 0; margin: 0; }
    .notes li { font-size: 11px; line-height: 1.5; margin-bottom: 2px; padding-left: 4mm; }
    .notes li::before { content: '* '; margin-left: -4mm; }
    .signatures { display: flex; justify-content: space-between; margin-top: 7px; text-align: center; font-size: 12px; }
    .signatures > div { width: 48%; }
    .sign-name { margin-top: 28px; min-height: 14px; font-size: 13px; font-weight: bold; }
    .printed { display: flex; justify-content: space-between; margin-top: 3px; font-size: 10px; }
`,i=({items:i,auth:a,paymentType:o})=>{let s=new Date,c=i.reduce((e,t)=>e+Number(t.total_harga||0),0);i.reduce((e,t)=>e+Number(t.qty||0),0);let l=i[0],u=l?.customer,d=l?.no_invoice||l?.no_antrian||`-`,f=a?.user?.username||a?.user?.name||`Admin`,p=o===`utang`?`UTANG`:`TUNAI`,m=i.map((e,t)=>`
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
                <td class="bahan invoice">${d}</td>
                <td class="ukuran"></td>
                <td class="qty"></td>
                <td class="amount" style="font-weight: bold; font-size: 10px">${e(s)}</td>
            </tr>
        </table>

        <div class="title">FAKTUR DESAIN</div>
        <div class="block">
            <span class="label">Kepada Yth :</span>
            <div class="name">${u?.nama||`-`}</div>
            <div class="address">${u?.alamat||`-`}</div>
        </div>
        <div>
            <span>Cara Bayar :</span>
            <strong>${p}</strong>
        </div>

        <br />

        <table>
            <thead>
                <tr>
                    <th class="bahan">pesanan</th>
                    <th class="ukuran">harga</th>
                    <th class="qty">qty</th>
                    <th class="amount" style="text-align: center;">total</th>
                </tr>
            </thead>
            <tbody>
                ${m}
            </tbody>
            <tfoot>
                <tr><td class="summary-label" colspan="3">Total</td><td class="amount">${n(c)}</td></tr>
                <tr><td class="summary-label" colspan="3">Bayar</td><td class="amount">0</td></tr>
                <tr><td class="summary-label" colspan="3">Kembalian</td><td class="amount">0</td></tr>
            </tfoot>
        </table>

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
                <div class="sign-name">${f}</div>
            </div>
            <div>
                <div>Customer</div>
                <div class="sign-name">${u?.nama||`-`}</div>
            </div>
        </div>

        <div class="printed" style="margin-top: 7px;">
            <span>Printed By : ${f}</span>
            <span>${e(s)} ${t(s)}</span>
        </div>
    </div>
</body></html>`};export{i as buildDesainReceiptHtml};