var e=(e=new Date)=>new Intl.DateTimeFormat(`id-ID`,{day:`2-digit`,month:`short`,year:`numeric`}).format(e),t=(e=new Date)=>new Intl.DateTimeFormat(`id-ID`,{hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(e),n=e=>{if(!e)return null;if(typeof e==`string`){let t=e.match(/^(\d{2})-(\d{2})-(\d{4})$/);if(t){let[,e,n,r]=t;return new Date(Number(r),Number(n)-1,Number(e))}}let t=new Date(e);return Number.isNaN(t.getTime())?null:t},r=(e=new Date)=>{let t=e instanceof Date?e:n(e);return t?new Intl.DateTimeFormat(`id-ID`,{day:`2-digit`,month:`2-digit`,year:`numeric`}).format(t).replace(/\//g,`-`):e||`-`},i=e=>Number(e||0).toLocaleString(`id-ID`),a=`
@page{
    size:76mm auto;
    margin:0;
}

html{
    margin:0;
    padding:0;
}

body{
    width:72mm;
    margin:0 auto;
    padding:2mm;
    color:#000;
    font-family:"Courier New", monospace;
    font-size:11px;
    line-height:1.25;
}

.receipt{
    width:100%;
}

.header{
    text-align:center;
    margin-bottom:5px;
}

.brand{
    font-size:22px;
    font-weight:bold;
}

.title{
    text-align:center;
    font-size:13px;
    font-weight:bold;
    margin:4px 0;
}

.topline{
    width:100%;
    overflow:hidden;
    margin-bottom:4px;
}

.topline .left{
    float:left;
}

.topline .right{
    float:right;
}

.clear{
    clear:both;
}

.block{
    margin-bottom:5px;
}

table{
    width:100%;
    border-collapse:collapse;
    table-layout:fixed;
}

th{
    border-top:1px solid #000;
    border-bottom:1px solid #000;
    padding:3px 1px;
    font-size:11px;
}

td{
    padding:2px 1px;
    font-size:11px;
}

.bahan{
    width:22%;
}

.ukuran{
    width:34%;
    text-align:center;
}

.qty{
    width:12%;
    text-align:center;
}

.amount{
    width:32%;
    text-align:right;
}

.summary{
    margin-top:6px;
    border-top:1px solid #000;
}

.summary table{
    width:100%;
}

.summary td{
    padding:2px 0;
}

.notes{
    margin-top:10px;
    font-size:10px;
}

.notes div{
    margin-bottom:3px;
}

.signatures{
    margin-top:18px;
    width:100%;
}

.signatures table{
    width:100%;
}

.sign-name{
    height:40px;
}

.printed{
    margin-top:8px;
    font-size:10px;
}
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
    <div class="left">
        <strong>${f}</strong>
    </div>

    <div class="right">
        ${r(c)}
    </div>

    <div class="clear"></div>
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

        <div class="signatures" style="margin-top: 10px; font-weight: bold;">
            <div>
                <div>Hormat Kami,</div>
                <div class="sign-name">${m}</div>
            </div>
            <div>
                <div>Customer</div>
                <div class="sign-name">${d?.nama||`-`}</div>
            </div>
        </div>

        <div class="printed" style="margin-top: 7px;">
            <span>Printed By : ${m}</span>
            <span>${e(c)} ${t(c)}</span>
        </div>
    </div>
</body></html>`};export{o as buildProductionReceiptHtml};