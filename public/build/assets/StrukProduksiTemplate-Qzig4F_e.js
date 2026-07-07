var e=(e=new Date)=>new Intl.DateTimeFormat(`id-ID`,{day:`2-digit`,month:`short`,year:`numeric`}).format(e),t=(e=new Date)=>new Intl.DateTimeFormat(`id-ID`,{hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(e),n=e=>{if(!e)return null;if(typeof e==`string`){let t=e.match(/^(\d{2})-(\d{2})-(\d{4})$/);if(t){let[,e,n,r]=t;return new Date(Number(r),Number(n)-1,Number(e))}}let t=new Date(e);return Number.isNaN(t.getTime())?null:t},r=(e=new Date)=>{let t=e instanceof Date?e:n(e);return t?new Intl.DateTimeFormat(`id-ID`,{day:`2-digit`,month:`2-digit`,year:`numeric`}).format(t).replace(/\//g,`-`):e||`-`},i=e=>Number(e||0).toLocaleString(`id-ID`),a=`

    @page { size: 76mm 297mm; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
        font-family: 'Consolas', 'Lucida Console', monospace;
        font-size: 13px;
        width: 68mm;
         margin: 0 auto;
        padding: 1mm;
        color: #000;
    }
    .receipt { width: 100%; padding: 0; }
    .header { text-align: center; margin-bottom: 4px; }
    .brand-row { display: flex; flex-direction: column; justify-content: center; align-items: center; }
    .logo-img { max-width: 100%; height: auto; display: block; margin: 0 auto 3px; }
    .brand { font-size: 20px; font-weight: 900; letter-spacing: 0; line-height: 1; }
    .sub { font-size: 10px; font-weight: 700; letter-spacing: 2px; margin-top: 1px; }
    .contact { font-size: 13px; font-weight: 700; margin-top: 2px; letter-spacing: 0; }
    .topline { display: flex; justify-content: space-between; gap: 4px; margin-top: 2px; font-size: 12px; }
    .invoice { font-size: 13px; font-weight: 800; margin-top: 1px; }
    .title { font-size: 13px; font-weight: 800; margin-bottom: 4px; letter-spacing: 1px; text-align: center; }
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
    .bahan { width: 18mm; text-align: left; }
    .ukuran { width: 20mm; text-align: center; font-variant-numeric: tabular-nums; }
    .qty { width: 7mm; text-align: center; font-variant-numeric: tabular-nums; }
    .amount { width: 16mm; text-align: right; font-variant-numeric: tabular-nums; }
    .alt td { background: #eee; }
    .muted { color: #000; }
    .keterangan-row td { padding-top: 0; padding-bottom: 4px; font-size: 11px; }
    .summary { border-top: 3px solid #000; margin-top: 5px; padding-top: 4px; }
    .summary-row { display: flex; justify-content: space-between; margin-bottom: 2px; font-size: 12px; }
    .summary-row span:last-child { text-align: right; font-variant-numeric: tabular-nums; font-weight: 700; }
    .notes { margin-top: 20px; }
    .notes ul { list-style: none; padding: 0; margin: 0; }
    .notes li { font-size: 11px; line-height: 1.5; margin-bottom: 2px; padding-left: 4mm; }
    .notes li::before { content: '* '; margin-left: -4mm; }
    .signatures { display: flex; justify-content: space-between; margin-top: 7px; text-align: center; font-size: 12px; }
    .signatures > div { width: 48%; }
    .sign-name { margin-top: 28px; min-height: 14px; font-size: 13px; font-weight: bold; }
    .printed { display: flex; justify-content: space-between; margin-top: 3px; font-size: 10px; }
`,o=({items:n,auth:o,paymentType:s})=>{let c=new Date,l=n.reduce((e,t)=>e+Number(t.total_harga||0),0);n.reduce((e,t)=>e+Number(t.qty||0),0);let u=n[0],d=u?.customer,f=u?.no_invoice||u?.kode_spk||`-`,p=u?.tgl_kirim||c,m=o?.user?.username||o?.user?.name||`Admin`,h=s===`utang`?`UTANG`:`TUNAI`,g=n.map((e,t)=>`
            <tr${t%2==1?` class="alt"`:``}>
                <td class="bahan">${e.bahan?.kode||`-`}</td>
                <td class="ukuran">
                    <span>${e.lebar||0}</span>
                    <span class="muted"> x </span>
                    <span>${e.tinggi||0}</span>
                    <span class="muted"> ${e.satuan||``}</span>
                </td>
                <td class="qty">${e.qty||0}</td>
                <td class="amount">${i(e.total_harga)}</td>
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

        <div class="topline">
            <span class="invoice">${f}</span>
            <span>${r(c)}</span>
        </div>

        <div class="title">FAKTUR</div>
        <div class="block">
            <span class="label">Kepada Yth :</span>
            <div class="name">${d?.nama||`-`}</div>
            <div class="address">${d?.alamat||`-`}</div>
        </div>
        <div>Selesai : ${r(p)}</div>
        <div>
            <span>Cara Bayar :</span>
            <strong>${h}</strong>
        </div>

        <br />

        <table>
            <thead>
                <tr>
                    <th class="bahan">Bahan</th>
                    <th class="ukuran">Ukuran</th>
                    <th class="qty">Qty</th>
                    <th class="amount">Jml</th>
                </tr>
            </thead>
            <tbody>
                ${g}
            </tbody>
        </table>

        <div class="summary">
            <div class="summary-row"><span>Total Faktur</span><span>${i(l)}</span></div>
            <div class="summary-row"><span>Bayar</span><span>0</span></div>
            <div class="summary-row"><span>Kembalian</span><span>0</span></div>
        </div>

        <div class="notes">
            <ul>
                <li>Diperiksa saat pengambilan / penerimaan barang pesanan.</li>
                <li>Kami tidak bertanggung jawab atas kekurangan/kerusakan barang setelah diterima.</li>
                <li>Barang yang tidak diambil selama 1 bulan bila hilang/rusak bukan tanggungan kami.</li>
            </ul>
        </div>

        <div class="signatures" style="margin-top: 20px; font-weight: bold;">
            <div>
                <div>Hormat Kami,</div>
                <div class="sign-name">${m}</div>
            </div>
            <div>
                <div>Customer</div>
                <div class="sign-name">${d?.nama||`-`}</div>
            </div>
        </div>

        <div class="printed" style="margin-top: 20px;">
            <span>Printed By : ${m}</span>
            <span>${e(c)} ${t(c)}</span>
        </div>
    </div>
</body></html>`};export{o as buildProductionReceiptHtml};