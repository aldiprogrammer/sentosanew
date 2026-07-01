var e=(e=new Date)=>new Intl.DateTimeFormat(`id-ID`,{day:`2-digit`,month:`short`,year:`numeric`}).format(e),t=(e=new Date)=>new Intl.DateTimeFormat(`id-ID`,{hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(e),n=e=>Number(e||0).toLocaleString(`id-ID`),r=`
    @page { size: 76mm 297mm; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
        font-family: 'Consolas', 'Lucida Console', monospace;
        font-size: 13px; max-width: 76mm; margin: 0 auto; padding: 3mm; color: #000;
    }
    .receipt { max-width: 76mm; padding: 0; }
    .header { text-align: center; margin-bottom: 4px; }
    .brand-row { display: flex; flex-direction: column; justify-content: center; align-items: center; }
    .logo-img { width: 200px; height: auto; display: block; margin-bottom: 3px; }
    .topline { display: flex; justify-content: space-between; gap: 4px; margin-top: 2px; font-size: 12px; }
    .invoice { font-size: 13px; font-weight: 800; margin-top: 1px; }
    .title { font-size: 13px; font-weight: 800; margin-bottom: 4px; letter-spacing: 1px; }
    .block { margin-top: 2px; }
    .label { display: block; font-size: 11px; }
    .name { font-size: 14px; margin-top: 2px; }
    table { width: 100%; border-collapse: collapse; table-layout: fixed; font-size: 12px; }
    th, td { padding: 3px 2px; text-align: left; vertical-align: middle; overflow-wrap: anywhere; }
    th { border-top: 2px solid #000; border-bottom: 2px solid #000; font-weight: 900; text-align: center; font-size: 12px; }
    td { padding-top: 4px; padding-bottom: 4px; }
    .alt td { background: #eee; }
    .jumlah { text-align: right; font-variant-numeric: tabular-nums; }
    .summary { border-top: 3px solid #000; margin-top: 5px; padding-top: 4px; }
    .summary-row { display: grid; grid-template-columns: 29mm 1fr; gap: 2px; margin-bottom: 2px; font-size: 12px; }
    .summary-row span:last-child { text-align: right; font-variant-numeric: tabular-nums; font-weight: 700; }
    .notes { margin-top: 20px; font-size: 11px; line-height: 1.15; }
    .notes div { margin-bottom: 1px; }
    .signatures { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; margin-top: 7px; text-align: center; font-size: 12px; }
    .sign-name { margin-top: 28px; min-height: 14px; font-size: 13px; }
    .printed { display: flex; justify-content: space-between; margin-top: 3px; font-size: 10px; }
    @media print { body { margin: 0; } }
`,i=({items:i,auth:a,paymentType:o})=>{let s=new Date,c=i.reduce((e,t)=>e+Number(t.total_harga||0),0),l=i[0],u=l?.no_invoice||l?.no_antrian||`-`,d=a?.user?.username||a?.user?.name||`Admin`,f=i.length>1,p=i.map((e,t)=>`
            <tr${t%2==1?` class="alt"`:``}>
                <td>${e.kategoridesain?.kategori||`-`}</td>
                <td style="text-align:center">${e.qty||0}</td>
                <td class="jumlah">${n(e.kategoridesain?.harga||0)}</td>
                <td class="jumlah">${n(e.total_harga)}</td>
            </tr>`).join(``);return`<!DOCTYPE html>
<html>
<head><meta charset="utf-8">
<title>Struk Desain - ${f?i.length+` item`:i[0]?.kode_order}</title>
<style>${r}</style>
</head>
<body>
    <div class="receipt">
        <div class="header">
            <div class="brand-row">
                <img src="/logo.png" alt="Sentosa" class="logo-img" />
            </div>
        </div>
        <br />

        <div class="topline">
            <span class="invoice">${u}</span>
            <span>${e(s)}</span>
        </div>

        <div class="title">FAKTUR DESAIN</div>
        <div class="block">
            <span class="label">Kepada Yth :</span>
            <div class="name">${l?.customer?.nama||`-`}</div>
        </div>

        <table>
            <thead>
                <tr>
                    <th style="width:25mm">Pesanan</th>
                    <th style="width:10mm">Qty</th>
                    <th style="width:18mm" class="jumlah">Harga</th>
                    <th style="width:18mm" class="jumlah">Total</th>
                </tr>
            </thead>
            <tbody>
                ${p}
            </tbody>
        </table>

        <div class="summary">
            <div class="summary-row"><span>Total</span><span>${n(c)}</span></div>
            <div class="summary-row"><span>Bayar</span><span>0</span></div>
            <div class="summary-row"><span>Kembalian</span><span>0</span></div>
        </div>

        <div class="notes">
            <div>NB :</div>
            <div>Hasil Print dikertas tidak bisa dijadikan acuan warna untuk hasil cetakan.</div>
            <div style="margin-top: 5px;">Design diperiksa dengan baik dan teliti (warna, tulisan & peletakan).</div>
            <div style="margin-top: 5px;">Kesalahan setelah dicetak tidak menjadi tanggung jawab kami</div>

        </div>

        <br />

        <div class="signatures" style="font-weight: bold">
            <div>
                <div>Hormat Kami,</div>
                <div class="sign-name">${d}</div>
            </div>
            <div>
                <div>Customer</div>
                <div class="sign-name">${l?.customer?.nama||`-`}</div>
            </div>
        </div>

        <div class="printed" style="margin-top: 10px;">
            <span>Printed By : ${d}</span>
            <span>${e(s)} ${t(s)}</span>
        </div>
    </div>
    <script>
        window.addEventListener('load',function(){window.focus();setTimeout(function(){window.print()},300)});
        window.addEventListener('afterprint',function(){window.close()});
    <\/script>
</body></html>`};export{i as buildDesainReceiptHtml};