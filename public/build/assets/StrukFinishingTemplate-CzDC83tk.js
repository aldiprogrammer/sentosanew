var e=(e=new Date)=>new Intl.DateTimeFormat(`id-ID`,{day:`2-digit`,month:`short`,year:`numeric`}).format(e),t=(e=new Date)=>new Intl.DateTimeFormat(`id-ID`,{hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(e),n=e=>String(e||``).toLowerCase().replace(/\s/g,``),r=(e,t)=>n(e)===n(t),i=e=>{let t=e.pinising||{},n=e.mata_ayam||e.mataAyam||{},i=[[`atas`,`A`],[`bawah`,`B`],[`kanan`,`Ka`],[`kiri`,`Ki`]],a=[[`Kantongan`,`Kantongan`],[`Lipat Pas Gbr`,`Lipat Pas Gambar`],[`Potong Pas Gbr`,`Potong Pas Gambar`],[`Lipat Sisa Putih`,`Lipat Sisa Putih`],[`Sisa Putih`,`Sisa Putih`]].map(([e,n])=>[e,...i.map(([e])=>r(t[e],n)?`v`:``)]);return a.push([`Mata Ayam`,...i.map(([e])=>n[e]?`v`:``)]),a},a=`
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
    .spk-row { display: flex; justify-content: space-between; gap: 4mm; margin-top: 8px; font-size: 15px; font-weight: 700; }
    .section-title { margin-top: 6px; font-size: 12px; font-weight: 700; }
    .line { border-top: 1px solid #000; margin: 5px 0 4px; }
    .row { display: grid; grid-template-columns: 9mm 3mm 18mm 9mm 3mm 1fr; gap: 0; margin-bottom: 3px; }
    .customer, .description, .note { overflow-wrap: anywhere; font-size: 12px; font-weight: 700; }
    .material { overflow-wrap: anywhere; font-weight: 700; }
    .design { margin: 4px 0; padding-left: 4mm; overflow-wrap: anywhere; }
    table { width: 100%; border-collapse: collapse; margin-top: 3px; table-layout: fixed; }
    th, td { border: 1px solid #000; padding: 3px 2px; text-align: center; vertical-align: top; overflow-wrap: anywhere; }
    th { font-weight: 700; }
    .finish-label { width: 32mm; text-align: left; }
    .footer { display: flex; justify-content: space-between; margin-top: 20px; font-size: 10px; }
    .bottom-spk { margin-top: 12px; font-size: 15px; font-weight: 700; }
    .label-row { margin-top: 6px; font-size: 12px; font-weight: 700; }
`,o=(n,r=``)=>{let o=new Date,s=i(n).map(([e,t,n,r,i])=>`
            <tr>
                <td class="finish-label">${e}</td>
                <td>${t}</td>
                <td>${n}</td>
                <td>${r}</td>
                <td>${i}</td>
            </tr>`).join(``);return`<!DOCTYPE html>
<html>
<head><meta charset="utf-8">
<title>Struk Finishing ${n.kode_spk}</title>
<style>${a}</style>
</head>
<body>
    <div class="receipt">
        <div class="header">
            <div class="brand-row">
                <img src="/logo.png" alt="Sentosa" class="logo-img" />
            </div>
        </div>
        <br />
        <div class="spk-row">
            <span>${n.kode_spk}</span>
            <span>${e(o)}</span>
        </div>
        <div class="section-title">Pelanggan :</div>
        <div class="customer">${n.customer?.nama}</div>
        <div class="section-title">Keterangan</div>
        <div class="line"></div>
        <div class="material">${n.bahan?.kode} ${n.bahan?.bahan}</div>
        <div>${n.keterangan}</div>
        <div class="row">
            <span>W</span><span>:</span><strong>${n.lebar}</strong>
            <span>H</span><span>:</span><strong>${n.tinggi} ${n.satuan}</strong>
        </div>
        <div class="row">
            <span>Qty</span><span>:</span><strong>${n.qty}</strong>
            <span></span><span></span><strong></strong>
        </div>
        <div class="section-title">Finishing :</div>
        <table>
            <thead>
                <tr>
                    <th class="finish-label"></th>
                    <th>A</th>
                    <th>B</th>
                    <th>Ka</th>
                    <th>Ki</th>
                </tr>
            </thead>
            <tbody>
                ${s}
            </tbody>
        </table>
        <div class="section-title">Catatan :</div>
        <div class="note">${n.pinising?.catatan||``}</div>
        <div class="footer">
            <span>${e(o)}</span>
            <span>${t(o)}</span>
        </div>
        <div class="line"></div>
        <div class="bottom-spk">${n.kode_spk}</div>
        <div class="label-row">No Label : ${r||`-`}</div>
        <div class="line" style="margin-top:28px"></div>
    </div>
</body></html>`};export{o as buildFinishingReceiptHtml};