import{r as e}from"./chunk-CilyBKbf.js";import{a as t,i as n,l as r,n as i}from"./app-DJUVFcqy.js";import{t as a}from"./AdminLayout-Oeh8qg5Z.js";var o=e(r(),1),s=i();function c({produksi:e,tglAwal:r,tglAkhir:i}){let[c,l]=o.useState(``),[u,d]=o.useState(r||``),[f,p]=o.useState(i||``),[m,h]=o.useState([]),g=(0,o.useRef)(null),_=(0,o.useRef)(null),v=e.data.length>0&&e.data.every(e=>m.some(t=>t.id===e.id)),y=e=>{h(t=>t.find(t=>t.id===e.id)?t.filter(t=>t.id!==e.id):[...t,e])},b=()=>{if(v){let t=new Set(e.data.map(e=>e.id));h(e=>e.filter(e=>!t.has(e.id)))}else{let t=new Set(m.map(e=>e.id)),n=e.data.filter(e=>!t.has(e.id));h(e=>[...e,...n])}},x=m,S=x.reduce((e,t)=>e+Number(t.total_harga||0),0),C=x.reduce((e,t)=>e+Number(t.qty||0),0),w=e=>{e.preventDefault(),h([]),t.get(`/produksi/data-saya`,{search:c,tgl_awal:u,tgl_akhir:f},{preserveState:!0,replace:!0})},T=e=>{if(e&&x.length>0){let e=k(x),t=_.current?.contentDocument||_.current?.contentWindow?.document;t&&(t.open(),t.write(e),t.close()),g.current?.showModal()}},E=e=>String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`),D=(e=new Date)=>new Intl.DateTimeFormat(`id-ID`,{day:`2-digit`,month:`short`,year:`numeric`}).format(e),O=(e=new Date)=>new Intl.DateTimeFormat(`id-ID`,{hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(e),k=e=>{let t=new Date,n=e.length>1,r=e.map((e,t)=>`
                <tr${t%2==1?` class="alt"`:``}>
                    <td>${E(e.kode_spk)}</td>
                    <td>${E(e.customer?.nama)}</td>
                    <td>${E(e.bahan?.bahan)}</td>
                    <td class="num">${E(e.qty)}</td>
                    <td class="num">${E(e.tinggi)}x${E(e.lebar)} ${E(e.satuan)}</td>
                    <td class="num">Rp ${Number(e.total_harga||0).toLocaleString(`id-ID`)}</td>
                </tr>
            `).join(``);return`
            <!doctype html>
            <html>
                <head>
                    <title>Struk Produksi - ${n?e.length+` item`:E(e[0].kode_spk)}</title>
                    <style>
                        @page { size: 75mm auto; margin: 3mm; }
                        * { box-sizing: border-box; margin: 0; padding: 0; }
                        body {
                            width: 69mm; margin: 0; color: #000;
                            font-family: 'Courier New', monospace;
                            font-size: 10px; line-height: 1.3;
                        }
                        .receipt { width: 69mm; padding: 2mm 2mm; }
                        .header { text-align: center; margin-bottom: 6px; }
                        .header .brand { font-size: 20px; font-weight: 900; letter-spacing: 2px; }
                        .header .sub { font-size: 11px; font-weight: 700; }
                        .header .contact { font-size: 10px; }
                        .divider { border-top: 1px dashed #000; margin: 6px 0; }
                        .divider-solid { border-top: 1px solid #000; margin: 6px 0; }
                        .info-row { display: flex; justify-content: space-between; font-size: 10px; margin-bottom: 2px; }
                        .info-row .label { font-weight: 700; }
                        .section-title { font-weight: 700; font-size: 11px; margin: 4px 0 3px; }
                        table { width: 100%; border-collapse: collapse; font-size: 9px; }
                        th, td { padding: 2px 3px; text-align: left; vertical-align: top; }
                        thead th { border-bottom: 1px solid #000; font-weight: 700; }
                        tbody td { border-bottom: 1px dotted #ccc; }
                        .num { text-align: right; font-variant-numeric: tabular-nums; }
                        .total-row td { font-weight: 700; border-top: 1px solid #000; border-bottom: 1px solid #000; padding: 3px; }
                        .total-row .num { font-size: 11px; }
                        .footer { text-align: center; margin-top: 8px; font-size: 9px; }
                        .signature { display: flex; justify-content: space-between; margin-top: 16px; font-size: 10px; }
                        .signature div { text-align: center; }
                        .signature .line { margin-top: 24px; width: 80px; border-top: 1px solid #000; }
                        .note-box { margin-top: 4px; padding: 3px; border: 1px dashed #000; font-size: 9px; }
                        .terbilang { font-size: 9px; font-style: italic; margin-top: 2px; }
                        @media print {
                            body { margin: 0; }
                            .no-print { display: none; }
                        }
                    </style>
                </head>
                <body>
                    <div class="receipt">
                        <div class="header">
                            <div class="brand">SENTOSA</div>
                            <div class="sub">DIGITAL PRINTING</div>
                            <div class="contact">081 - 7368007</div>
                        </div>

                        <div class="divider"></div>

                        <div class="info-row">
                            <span class="label">Tanggal</span>
                            <span>${E(D(t))} ${E(O(t))}</span>
                        </div>

                        ${n?`
                            <div class="section-title">STRUK PRODUKSI (${e.length} item)</div>
                        `:`
                            <div class="info-row">
                                <span class="label">No. SPK</span>
                                <span>${E(e[0].kode_spk)}</span>
                            </div>
                            <div class="info-row">
                                <span class="label">Customer</span>
                                <span>${E(e[0].customer?.nama)}</span>
                            </div>
                            <div class="info-row">
                                <span class="label">Bahan</span>
                                <span>${E(e[0].bahan?.bahan)}</span>
                            </div>
                        `}

                        <div class="divider"></div>

                        <table>
                            <thead>
                                <tr>
                                    <th>SPK</th>
                                    <th>Customer</th>
                                    <th>Bahan</th>
                                    <th class="num">Qty</th>
                                    <th class="num">Ukuran</th>
                                    <th class="num">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${r}
                            </tbody>
                            ${n?`
                                <tfoot>
                                    <tr class="total-row">
                                        <td colspan="3">${e.length} item</td>
                                        <td class="num">${C}</td>
                                        <td></td>
                                        <td class="num">Rp ${S.toLocaleString(`id-ID`)}</td>
                                    </tr>
                                </tfoot>
                            `:``}
                        </table>

                        <div class="divider"></div>

                        <div class="info-row">
                            <span class="label">Total Item</span>
                            <span>${e.length}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">Total Qty</span>
                            <span>${C}</span>
                        </div>
                        <div class="info-row" style="font-size: 13px; font-weight: 900; margin-top: 2px;">
                            <span>GRAND TOTAL</span>
                            <span>Rp ${S.toLocaleString(`id-ID`)}</span>
                        </div>

                        <div class="divider-solid"></div>

                        <div class="signature">
                            <div>
                                <div>Hormat Kami</div>
                                <div class="line"></div>
                            </div>
                            <div>
                                <div>Penerima</div>
                                <div class="line"></div>
                            </div>
                        </div>

                        <div class="footer">
                            Terima Kasih Atas Kepercayaan Anda<br>
                            Barang yang sudah dibeli tidak dapat dikembalikan
                        </div>
                    </div>
                    <script>
                        window.addEventListener('load', function () {
                            window.focus();
                            setTimeout(function () { window.print(); }, 300);
                        });
                        window.addEventListener('afterprint', function () {
                            window.close();
                        });
                    <\/script>
                </body>
            </html>
        `},A=()=>{if(x.length!==0){if(x.length===1){let e=window.open(``,`_blank`,`width=420,height=640`);e.document.open(),e.document.write(k(x)),e.document.close()}else{let e=0,t=()=>{if(e>=x.length)return;let n=window.open(``,`_blank`,`width=420,height=640`);n.document.open(),n.document.write(k([x[e]])),n.document.close();let r=setInterval(()=>{n.closed&&(clearInterval(r),e++,t())},500)};t()}h([])}};return(0,s.jsxs)(a,{children:[(0,s.jsx)(`div`,{className:`grid grid-cols-1 xl:grid-cols-1`,children:(0,s.jsx)(`div`,{className:`xl:col-span-2 card bg-base-100 shadow-md border border-base-300`,children:(0,s.jsxs)(`div`,{className:`card-body`,children:[(0,s.jsx)(`div`,{className:`flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4`,children:(0,s.jsx)(`h2`,{className:`card-title`,children:`Data Produksi`})}),(0,s.jsx)(`div`,{className:`mb-3`,children:(0,s.jsxs)(`form`,{onSubmit:w,className:`flex flex-wrap gap-2 items-end`,children:[(0,s.jsx)(`input`,{type:`text`,placeholder:`Cari kode SPK, keterangan, customer, bahan...`,className:`input input-bordered input-success w-full max-w-xs`,value:c,onChange:e=>l(e.target.value)}),(0,s.jsxs)(`label`,{className:`form-control w-full max-w-[160px]`,children:[(0,s.jsx)(`span`,{className:`label-text text-xs`,children:`Tgl Awal`}),(0,s.jsx)(`input`,{type:`date`,className:`input input-bordered input-success input-sm`,value:u,onChange:e=>d(e.target.value)})]}),(0,s.jsxs)(`label`,{className:`form-control w-full max-w-[160px]`,children:[(0,s.jsx)(`span`,{className:`label-text text-xs`,children:`Tgl Akhir`}),(0,s.jsx)(`input`,{type:`date`,className:`input input-bordered input-success input-sm`,value:f,onChange:e=>p(e.target.value)})]}),(0,s.jsxs)(`button`,{type:`submit`,className:`btn btn-success btn-sm`,children:[(0,s.jsx)(`i`,{className:`fas fa-search`}),` Cari`]})]})}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{className:`overflow-x-auto`,children:(0,s.jsxs)(`table`,{className:`table table-zebra`,children:[(0,s.jsx)(`thead`,{children:(0,s.jsxs)(`tr`,{children:[(0,s.jsx)(`th`,{className:`w-10`,children:(0,s.jsx)(`input`,{type:`checkbox`,className:`checkbox checkbox-sm checkbox-success`,checked:v,onChange:b})}),(0,s.jsx)(`th`,{children:`No`}),(0,s.jsx)(`th`,{children:`Kode SPK`}),(0,s.jsx)(`th`,{children:`Customer`}),(0,s.jsx)(`th`,{children:`Bahan`}),(0,s.jsx)(`th`,{children:`Keterangan`}),(0,s.jsx)(`th`,{children:`Tinggi`}),(0,s.jsx)(`th`,{children:`Lebar`}),(0,s.jsx)(`th`,{children:`Qty`}),(0,s.jsx)(`th`,{children:`Sisi`}),(0,s.jsx)(`th`,{children:`Harga`}),(0,s.jsx)(`th`,{children:`Total Harga`}),(0,s.jsx)(`th`,{children:`Metode P`}),(0,s.jsx)(`th`,{children:`Tgl Kirim`})]})}),(0,s.jsx)(`tbody`,{className:`text-xs`,children:e.data.length===0?(0,s.jsx)(`tr`,{children:(0,s.jsx)(`td`,{colSpan:14,className:`text-center py-8 text-base-content/50`,children:`Tidak ada data produksi`})}):e.data.map((t,n)=>(0,s.jsxs)(`tr`,{className:`hover:bg-base-200`,children:[(0,s.jsx)(`td`,{children:(0,s.jsx)(`input`,{type:`checkbox`,className:`checkbox checkbox-sm checkbox-success`,checked:m.some(e=>e.id===t.id),onChange:()=>y(t)})}),(0,s.jsx)(`td`,{children:e.from+n}),(0,s.jsx)(`td`,{className:`font-mono font-medium`,children:t.kode_spk}),(0,s.jsx)(`td`,{children:t.customer?.nama}),(0,s.jsx)(`td`,{children:t.bahan?.bahan}),(0,s.jsx)(`td`,{children:t.keterangan}),(0,s.jsxs)(`td`,{className:`tabular-nums`,children:[t.tinggi,` `,t.satuan]}),(0,s.jsx)(`td`,{className:`tabular-nums`,children:t.lebar}),(0,s.jsx)(`td`,{className:`tabular-nums text-center`,children:t.qty}),(0,s.jsx)(`td`,{className:`text-center`,children:t.sisi}),(0,s.jsx)(`td`,{className:`tabular-nums`,children:Number(t.harga_bahan).toLocaleString(`id-ID`)}),(0,s.jsx)(`td`,{className:`tabular-nums`,children:Number(t.total_harga).toLocaleString(`id-ID`)}),(0,s.jsx)(`td`,{children:t.metode_pengantaran}),(0,s.jsx)(`td`,{children:t.tgl_kirim})]},t.id))})]})}),e.links&&(0,s.jsx)(`div`,{className:`flex justify-center mt-4 join`,children:e.links.map((e,t)=>(0,s.jsx)(n,{href:e.url||`#`,className:`btn btn-sm join-item ${e.active?`btn-success`:``} ${e.url?``:`btn-disabled`}`,preserveState:!0,replace:!0,dangerouslySetInnerHTML:{__html:e.label}},t))})]})]})})}),m.length>0&&(0,s.jsx)(`div`,{className:`mb-3 bg-gradient-to-r from-success/10 to-success/5 border border-success/30 rounded-xl px-4 py-3 shadow-sm transition-all duration-300`,children:(0,s.jsxs)(`div`,{className:`flex flex-wrap items-center justify-between gap-3`,children:[(0,s.jsxs)(`div`,{className:`flex items-center gap-4 text-sm`,children:[(0,s.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,s.jsxs)(`div`,{className:`badge badge-success badge-lg gap-1`,children:[(0,s.jsx)(`i`,{className:`fas fa-check-circle text-xs`}),m.length]}),(0,s.jsx)(`span`,{className:`text-base-content/70 font-medium`,children:`item dipilih`})]}),(0,s.jsxs)(`div`,{className:`hidden sm:flex items-center gap-4`,children:[(0,s.jsx)(`span`,{className:`text-base-content/40`,children:`|`}),(0,s.jsxs)(`span`,{className:`text-base-content/70`,children:[`Qty: `,(0,s.jsx)(`strong`,{className:`text-base-content`,children:C})]}),(0,s.jsx)(`span`,{className:`text-base-content/40`,children:`|`}),(0,s.jsxs)(`span`,{className:`text-base-content/70`,children:[`Total: `,(0,s.jsxs)(`strong`,{className:`text-success text-sm`,children:[`Rp `,S.toLocaleString(`id-ID`)]})]})]})]}),(0,s.jsxs)(`div`,{className:`flex gap-2`,children:[(0,s.jsxs)(`button`,{className:`btn btn-success btn-sm`,onClick:A,children:[(0,s.jsx)(`i`,{className:`fas fa-receipt`}),` Cetak Struk`]}),(0,s.jsxs)(`div`,{className:`dropdown dropdown-end`,children:[(0,s.jsx)(`button`,{className:`btn btn-success btn-sm btn-outline`,tabIndex:0,children:(0,s.jsx)(`i`,{className:`fas fa-chevron-down`})}),(0,s.jsxs)(`ul`,{tabIndex:0,className:`dropdown-content menu menu-sm bg-base-100 rounded-xl shadow-lg border border-base-300 z-50 w-48 p-2 mt-1`,children:[(0,s.jsx)(`li`,{children:(0,s.jsxs)(`button`,{onClick:()=>{if(x.length===0)return;let e=window.open(``,`_blank`,`width=500,height=700`);e.document.open(),e.document.write(k(x)),e.document.close(),h([])},children:[(0,s.jsx)(`i`,{className:`fas fa-layer-group`}),` Cetak Gabungan`]})}),(0,s.jsx)(`li`,{children:(0,s.jsxs)(`button`,{onClick:()=>T(!0),children:[(0,s.jsx)(`i`,{className:`fas fa-eye`}),` Preview Struk`]})}),(0,s.jsx)(`li`,{children:(0,s.jsxs)(`button`,{onClick:()=>h([]),children:[(0,s.jsx)(`i`,{className:`fas fa-times`}),` Batalkan Pilihan`]})})]})]})]})]})}),(0,s.jsxs)(`dialog`,{ref:g,className:`modal`,children:[(0,s.jsxs)(`div`,{className:`modal-box w-11/12 max-w-4xl h-[90vh] p-0`,children:[(0,s.jsxs)(`div`,{className:`flex items-center justify-between px-4 py-3 border-b border-base-300 bg-base-100 sticky top-0 z-10`,children:[(0,s.jsxs)(`h3`,{className:`font-bold text-lg`,children:[(0,s.jsx)(`i`,{className:`fas fa-eye text-success`}),` Preview Struk`]}),(0,s.jsxs)(`div`,{className:`flex gap-2`,children:[(0,s.jsxs)(`button`,{className:`btn btn-success btn-sm`,onClick:()=>{g.current?.close(),A()},children:[(0,s.jsx)(`i`,{className:`fas fa-print`}),` Cetak`]}),(0,s.jsx)(`button`,{className:`btn btn-ghost btn-sm btn-circle`,onClick:()=>g.current?.close(),children:`✕`})]})]}),(0,s.jsx)(`div`,{className:`w-full h-[calc(90vh-60px)]`,children:(0,s.jsx)(`iframe`,{ref:_,className:`w-full h-full border-none`,title:`Preview Struk`})})]}),(0,s.jsx)(`form`,{method:`dialog`,className:`modal-backdrop`,children:(0,s.jsx)(`button`,{children:`close`})})]})]})}export{c as default};