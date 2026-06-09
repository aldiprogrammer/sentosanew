import{r as e}from"./chunk-CilyBKbf.js";import{a as t,l as n,n as r}from"./app-CXbcU6xv.js";import{t as i}from"./AdminLayout-DtqAOI5W.js";var a=e(n(),1),o=r();function s({produksi:e}){let[n,r]=(0,a.useState)(null),[s,c]=(0,a.useState)(``),[l,u]=(0,a.useState)(``),d=(0,a.useRef)(null),f=e=>e==null||e===``?`-`:e,p=e=>String(f(e)).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`),m=(e=new Date)=>new Intl.DateTimeFormat(`id-ID`,{day:`2-digit`,month:`short`,year:`numeric`}).format(e),h=(e=new Date)=>new Intl.DateTimeFormat(`id-ID`,{hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(e),g=e=>String(e||``).toLowerCase().replace(/\s/g,``),_=(e,t)=>g(e)===g(t),v=e=>{let t=e.pinising||{},n=e.mata_ayam||e.mataAyam||{},r=[[`atas`,`A`],[`bawah`,`B`],[`kanan`,`Ka`],[`kiri`,`Ki`]],i=[[`Kentering`,`Kentering`],[`Lipat Pas Gbr`,`Lipat Pas Gambar`],[`Potong Pas Gbr`,`Potong Pas Gambar`],[`Lipat Sisa Putih`,`Lipat Sisa Putih`]].map(([e,n])=>[e,...r.map(([e])=>_(t[e],n)?`v`:``)]);return i.push([`Mata Ayam`,...r.map(([e])=>n[e]?`v`:``)]),i},y=e=>{let t=new Date,n=v(e).map(([e,t,n,r,i])=>`
                    <tr>
                        <td class="finish-label">${p(e)}</td>
                        <td>${p(t)}</td>
                        <td>${p(n)}</td>
                        <td>${p(r)}</td>
                        <td>${p(i)}</td>
                    </tr>
                `).join(``);return`
            <!doctype html>
            <html>
                <head>
                    <title>Struk Finishing ${p(e.kode_spk)}</title>
                    <style>
                        @page {
                            size: 76mm auto;
                            margin: 2mm;
                        }

                        * {
                            box-sizing: border-box;
                        }

                        body {
                            width: 72mm;
                            margin: 0;
                            color: #000;
                            font-family: "Courier New", monospace;
                            font-size: 10.5px;
                            line-height: 1.2;
                        }

                        .receipt {
                            width: 72mm;
                            padding: 0 1mm;
                        }

                        .brand {
                            text-align: center;
                            font-size: 18px;
                            font-weight: 700;
                            letter-spacing: 1px;
                            line-height: 1;
                        }

                        .tagline,
                        .phone {
                            text-align: center;
                            font-size: 10px;
                            font-weight: 700;
                        }

                        .spk-row {
                            display: flex;
                            justify-content: space-between;
                            gap: 4mm;
                            margin-top: 8px;
                            font-size: 15px;
                            font-weight: 700;
                        }

                        .section-title {
                            margin-top: 6px;
                            font-size: 12px;
                            font-weight: 700;
                        }

                        .line {
                            border-top: 1px solid #000;
                            margin: 5px 0 4px;
                        }

                        .row {
                            display: grid;
                            grid-template-columns: 9mm 3mm 18mm 9mm 3mm 1fr;
                            gap: 0;
                            margin-bottom: 3px;
                        }

                        .customer,
                        .description,
                        .note {
                            overflow-wrap: anywhere;
                            font-size: 12px;
                            font-weight: 700;
                        }

                        .material {
                            overflow-wrap: anywhere;
                            font-weight: 700;
                        }

                        .design {
                            margin: 4px 0;
                            padding-left: 4mm;
                            overflow-wrap: anywhere;
                        }

                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 3px;
                            table-layout: fixed;
                        }

                        th,
                        td {
                            border: 1px solid #000;
                            padding: 3px 2px;
                            text-align: center;
                            vertical-align: top;
                            overflow-wrap: anywhere;
                        }

                        th {
                            font-weight: 700;
                        }

                        .finish-label {
                            width: 32mm;
                            text-align: left;
                        }

                        .footer {
                            display: flex;
                            justify-content: space-between;
                            margin-top: 20px;
                            font-size: 10px;
                        }

                        .bottom-spk {
                            margin-top: 12px;
                            font-size: 15px;
                            font-weight: 700;
                        }

                        .label-row {
                            margin-top: 6px;
                            font-size: 12px;
                            font-weight: 700;
                        }
                    </style>
                </head>
                <body>
                    <div class="receipt">
                        <div class="brand">SENTOSA</div>
                        <div class="tagline">DIGITAL PRINTING</div>
                        <div class="phone">081 - 7368007</div>

                        <div class="spk-row">
                            <span>${p(e.kode_spk)}</span>
                            <span>${p(m(t))}</span>
                        </div>

                        <div class="section-title">Pelanggan :</div>
                        <div class="customer">${p(e.customer?.nama)}</div>

                        <div class="section-title">Keterangan</div>
                        <div class="line"></div>
                        <div class="material">${p(e.bahan?.kode)} ${p(e.bahan?.bahan)}</div>
                        <div class="design">Desain : ${p(e.keterangan)}</div>
                        <div class="row">
                            <span>W</span><span>:</span><strong>${p(e.lebar)}</strong>
                            <span>H</span><span>:</span><strong>${p(e.tinggi)} ${p(e.satuan)}</strong>
                        </div>
                        <div class="row">
                            <span>Qty</span><span>:</span><strong>${p(e.qty)}</strong>
                            <span></span><span></span><strong></strong>
                        </div>

                        <div class="section-title">Finishingan :</div>
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
                            <tbody>${n}</tbody>
                        </table>
                        <div class="section-title">Catatan :</div>
                        <div class="note">${p(e.catatan||``)}</div>
                        <div class="footer">
                            <span>${p(m(t))}</span>
                            <span>${p(h(t))}</span>
                        </div>
                        <div class="line"></div>
                        <div class="bottom-spk">${p(e.kode_spk)}</div>
                        <div class="label-row">No Label :</div>
                        <div class="line" style="margin-top: 28px;"></div>
                    </div>
                    <script>
                        window.addEventListener('load', function () {
                            window.focus();
                            setTimeout(function () {
                                window.print();
                            }, 300);
                        });

                        window.addEventListener('afterprint', function () {
                            window.close();
                        });
                    <\/script>
                </body>
            </html>
        `},b=(e,t)=>{t&&(t.document.open(),t.document.write(y(e)),t.document.close())},x=t=>e.filter(e=>e.bahan.kategori_cetak===t&&(!l||e.bahan.jenis_bahan===l)),S=e=>!s||s===e,C=e=>{r(e),d.current?.showModal()},w=()=>{r(null),d.current?.close()},T=()=>{if(!n)return;let e=n.selesai!=1,r=e?window.open(``,`_blank`,`width=420,height=640`):null;t.put(`/finishing/finishing/${n.id}/proses`,{},{preserveScroll:!0,onSuccess:()=>{w(),e&&b(n,r)},onError:()=>r?.close()})};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i,{children:(0,o.jsx)(`div`,{className:`grid grid-cols-1 xl:grid-cols-1`,children:(0,o.jsx)(`div`,{className:`xl:col-span-2 card bg-base-100 shadow-md border border-base-300`,children:(0,o.jsxs)(`div`,{className:`card-body`,children:[(0,o.jsxs)(`div`,{className:`flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4`,children:[(0,o.jsx)(`h2`,{className:`card-title`,children:`Halaman Finishing`}),(0,o.jsxs)(`div`,{className:`flex gap-2`,children:[(0,o.jsxs)(`select`,{value:s,onChange:e=>c(e.target.value),className:`select select-bordered`,children:[(0,o.jsx)(`option`,{value:``,children:`Semua Kategori`}),(0,o.jsx)(`option`,{value:`STANDART`,children:`STANDART`}),(0,o.jsx)(`option`,{value:`STIKER`,children:`STIKER`}),(0,o.jsx)(`option`,{value:`INDOOR`,children:`INDOOR`}),(0,o.jsx)(`option`,{value:`DLL`,children:`Dll`})]}),(0,o.jsxs)(`select`,{value:l,onChange:e=>u(e.target.value),className:`select select-bordered`,children:[(0,o.jsx)(`option`,{value:``,children:`Semua Jenis Bahan`}),(0,o.jsx)(`option`,{value:`DLL`,children:`Dll`}),(0,o.jsx)(`option`,{value:`DYE`,children:`DYE`}),(0,o.jsx)(`option`,{value:`TONER`,children:`TONER`}),(0,o.jsx)(`option`,{value:`OFFSET`,children:`OFFSET`}),(0,o.jsx)(`option`,{value:`SOLVENT`,children:`SOLVENT`}),(0,o.jsx)(`option`,{value:`ECOSOLVENT`,children:`ECOSILVENT`})]})]})]}),(0,o.jsx)(`div`,{children:(0,o.jsxs)(`div`,{className:`grid lg:grid-cols-2 gap-2`,children:[S(`STANDART`)&&(0,o.jsx)(`div`,{children:(0,o.jsxs)(`div`,{className:`bg-base-100 border border-base-300 rounded-xl shadow-sm overflow-hidden`,children:[(0,o.jsx)(`div`,{className:`bg-primary px-4 py-3`,children:(0,o.jsx)(`h3`,{className:`font-bold text-white text-sm tracking-wide`,children:`BAHAN STANDART`})}),(0,o.jsx)(`div`,{className:`overflow-x-auto`,children:(0,o.jsxs)(`table`,{className:`table table-xs table-zebra`,id:`myTable`,children:[(0,o.jsx)(`thead`,{children:(0,o.jsxs)(`tr`,{className:`bg-base-200 text-base-content/70 text-[10px]  tracking-wider`,children:[(0,o.jsx)(`th`,{className:`py-3`,children:`No SPK`}),(0,o.jsx)(`th`,{className:`py-3`,children:`Kd Bahan`}),(0,o.jsx)(`th`,{className:`py-3`,children:`Customer`}),(0,o.jsx)(`th`,{className:`py-3 text-center`,children:`H`}),(0,o.jsx)(`th`,{className:`py-3 text-center`,children:`W`}),(0,o.jsx)(`th`,{className:`py-3 text-center`,children:`QTY`}),(0,o.jsx)(`th`,{className:`py-3 text-center`,children:`Sisi`}),(0,o.jsx)(`th`,{className:`py-3 text-center`,children:`Pengataran`}),(0,o.jsx)(`th`,{className:`py-3 text-center`,children:`Tgl Kirim`})]})}),(0,o.jsx)(`tbody`,{children:x(`STANDART`).map(e=>(0,o.jsxs)(`tr`,{onClick:()=>C(e),className:`hover:bg-base-200/70 transition-colors cursor-pointer ${e.selesai==`1`?`bg-green-400`:``} `,children:[(0,o.jsx)(`td`,{className:`font-mono font-medium text-[10px]`,children:e.kode_spk}),(0,o.jsx)(`td`,{className:`text-[10px]`,children:e.bahan.kode}),(0,o.jsx)(`td`,{className:`font-medium  text-[10px]`,children:e.customer.nama}),(0,o.jsxs)(`td`,{className:` text-[10px] text-center tabular-nums`,children:[e.tinggi,` `,(0,o.jsx)(`span`,{className:`text-[10px] text-base-content/50`,children:e.satuan})]}),(0,o.jsxs)(`td`,{className:`text-[10px] text-center tabular-nums`,children:[e.lebar,` `,(0,o.jsx)(`span`,{className:`text-[10px] text-base-content/50`,children:e.satuan})]}),(0,o.jsx)(`td`,{className:`text-[10px] text-center font-semibold tabular-nums`,children:e.qty}),(0,o.jsx)(`td`,{className:` text-[10px] text-center`,children:e.sisi}),(0,o.jsx)(`td`,{className:`text-[10px] text-center font-semibold tabular-nums`,children:e.metode_pengantaran}),(0,o.jsx)(`td`,{className:` text-[10px] text-center font-semibold tabular-nums`,children:e.tgl_kirim})]},e.id))})]})})]})}),S(`STIKER`)&&(0,o.jsx)(`div`,{children:(0,o.jsxs)(`div`,{className:`bg-base-100 border border-base-300 rounded-xl shadow-sm overflow-hidden`,children:[(0,o.jsx)(`div`,{className:`bg-secondary px-4 py-3`,children:(0,o.jsx)(`h3`,{className:`font-bold text-white text-sm tracking-wide`,children:`BAHAN STIKER`})}),(0,o.jsx)(`div`,{className:`overflow-x-auto`,children:(0,o.jsxs)(`table`,{className:`table table-xs table-zebra`,id:`myTable`,children:[(0,o.jsx)(`thead`,{children:(0,o.jsxs)(`tr`,{className:`bg-base-200 text-base-content/70 text-[10px]  tracking-wider`,children:[(0,o.jsx)(`th`,{className:`py-3`,children:`No SPK`}),(0,o.jsx)(`th`,{className:`py-3`,children:`Kd Bahan`}),(0,o.jsx)(`th`,{className:`py-3`,children:`Customer`}),(0,o.jsx)(`th`,{className:`py-3 text-center`,children:`H`}),(0,o.jsx)(`th`,{className:`py-3 text-center`,children:`W`}),(0,o.jsx)(`th`,{className:`py-3 text-center`,children:`QTY`}),(0,o.jsx)(`th`,{className:`py-3 text-center`,children:`Sisi`}),(0,o.jsx)(`th`,{className:`py-3 text-center`,children:`Pengataran`}),(0,o.jsx)(`th`,{className:`py-3 text-center`,children:`Tgl Kirim`})]})}),(0,o.jsx)(`tbody`,{children:x(`STIKER`).map(e=>(0,o.jsxs)(`tr`,{onClick:()=>C(e),className:`hover:bg-base-200/70 transition-colors cursor-pointer ${e.selesai==`1`?`bg-green-400`:``} `,children:[(0,o.jsx)(`td`,{className:`font-mono font-medium text-[10px]`,children:e.kode_spk}),(0,o.jsx)(`td`,{className:`text-[10px]`,children:e.bahan.kode}),(0,o.jsx)(`td`,{className:`font-medium  text-[10px]`,children:e.customer.nama}),(0,o.jsxs)(`td`,{className:` text-[10px] text-center tabular-nums`,children:[e.tinggi,` `,(0,o.jsx)(`span`,{className:`text-[10px] text-base-content/50`,children:e.satuan})]}),(0,o.jsxs)(`td`,{className:`text-[10px] text-center tabular-nums`,children:[e.lebar,` `,(0,o.jsx)(`span`,{className:`text-[10px] text-base-content/50`,children:e.satuan})]}),(0,o.jsx)(`td`,{className:`text-[10px] text-center font-semibold tabular-nums`,children:e.qty}),(0,o.jsx)(`td`,{className:` text-[10px] text-center`,children:e.sisi}),(0,o.jsx)(`td`,{className:`text-[10px] text-center font-semibold tabular-nums`,children:e.metode_pengantaran}),(0,o.jsx)(`td`,{className:` text-[10px] text-center font-semibold tabular-nums`,children:e.tgl_kirim})]},e.id))})]})})]})}),S(`INDOOR`)&&(0,o.jsx)(`div`,{children:(0,o.jsxs)(`div`,{className:`bg-base-100 border border-base-300 rounded-xl shadow-sm overflow-hidden`,children:[(0,o.jsx)(`div`,{className:`bg-accent px-4 py-3`,children:(0,o.jsx)(`h3`,{className:`font-bold text-white text-sm tracking-wide`,children:`BAHAN INDOOR`})}),(0,o.jsx)(`div`,{className:`overflow-x-auto`,children:(0,o.jsxs)(`table`,{className:`table table-xs table-zebra`,id:`myTable`,children:[(0,o.jsx)(`thead`,{children:(0,o.jsxs)(`tr`,{className:`bg-base-200 text-base-content/70 text-[10px]  tracking-wider`,children:[(0,o.jsx)(`th`,{className:`py-3`,children:`No SPK`}),(0,o.jsx)(`th`,{className:`py-3`,children:`Kd Bahan`}),(0,o.jsx)(`th`,{className:`py-3`,children:`Customer`}),(0,o.jsx)(`th`,{className:`py-3 text-center`,children:`H`}),(0,o.jsx)(`th`,{className:`py-3 text-center`,children:`W`}),(0,o.jsx)(`th`,{className:`py-3 text-center`,children:`QTY`}),(0,o.jsx)(`th`,{className:`py-3 text-center`,children:`Sisi`}),(0,o.jsx)(`th`,{className:`py-3 text-center`,children:`Pengataran`}),(0,o.jsx)(`th`,{className:`py-3 text-center`,children:`Tgl Kirim`})]})}),(0,o.jsx)(`tbody`,{children:x(`INDOOR`).map(e=>(0,o.jsxs)(`tr`,{onClick:()=>C(e),className:`hover:bg-base-200/70 transition-colors cursor-pointer ${e.selesai==`1`?`bg-green-400`:``} `,children:[(0,o.jsx)(`td`,{className:`font-mono font-medium text-[10px]`,children:e.kode_spk}),(0,o.jsx)(`td`,{className:`text-[10px]`,children:e.bahan.kode}),(0,o.jsx)(`td`,{className:`font-medium  text-[10px]`,children:e.customer.nama}),(0,o.jsxs)(`td`,{className:` text-[10px] text-center tabular-nums`,children:[e.tinggi,` `,(0,o.jsx)(`span`,{className:`text-[10px] text-base-content/50`,children:e.satuan})]}),(0,o.jsxs)(`td`,{className:`text-[10px] text-center tabular-nums`,children:[e.lebar,` `,(0,o.jsx)(`span`,{className:`text-[10px] text-base-content/50`,children:e.satuan})]}),(0,o.jsx)(`td`,{className:`text-[10px] text-center font-semibold tabular-nums`,children:e.qty}),(0,o.jsx)(`td`,{className:` text-[10px] text-center`,children:e.sisi}),(0,o.jsx)(`td`,{className:`text-[10px] text-center font-semibold tabular-nums`,children:e.metode_pengantaran}),(0,o.jsx)(`td`,{className:` text-[10px] text-center font-semibold tabular-nums`,children:e.tgl_kirim})]},e.id))})]})})]})}),S(`DLL`)&&(0,o.jsx)(`div`,{children:(0,o.jsxs)(`div`,{className:`bg-base-100 border border-base-300 rounded-xl shadow-sm overflow-hidden`,children:[(0,o.jsx)(`div`,{className:`bg-neutral px-4 py-3`,children:(0,o.jsx)(`h3`,{className:`font-bold text-white text-sm tracking-wide`,children:`BAHAN DLL`})}),(0,o.jsx)(`div`,{className:`overflow-x-auto`,children:(0,o.jsxs)(`table`,{className:`table table-xs table-zebra`,id:`myTable`,children:[(0,o.jsx)(`thead`,{children:(0,o.jsxs)(`tr`,{className:`bg-base-200 text-base-content/70 text-[10px]  tracking-wider`,children:[(0,o.jsx)(`th`,{className:`py-3`,children:`No SPK`}),(0,o.jsx)(`th`,{className:`py-3`,children:`Kd Bahan`}),(0,o.jsx)(`th`,{className:`py-3`,children:`Customer`}),(0,o.jsx)(`th`,{className:`py-3 text-center`,children:`H`}),(0,o.jsx)(`th`,{className:`py-3 text-center`,children:`W`}),(0,o.jsx)(`th`,{className:`py-3 text-center`,children:`QTY`}),(0,o.jsx)(`th`,{className:`py-3 text-center`,children:`Sisi`}),(0,o.jsx)(`th`,{className:`py-3 text-center`,children:`Pengataran`}),(0,o.jsx)(`th`,{className:`py-3 text-center`,children:`Tgl Kirim`})]})}),(0,o.jsx)(`tbody`,{children:x(`DLL`).map(e=>(0,o.jsxs)(`tr`,{onClick:()=>C(e),className:`hover:bg-base-200/70 transition-colors cursor-pointer ${e.status_selesai==`1`?`bg-green-400`:``} `,children:[(0,o.jsx)(`td`,{className:`font-mono font-medium text-[10px]`,children:e.kode_spk}),(0,o.jsx)(`td`,{className:`text-[10px]`,children:e.bahan.kode}),(0,o.jsx)(`td`,{className:`font-medium  text-[10px]`,children:e.customer.nama}),(0,o.jsxs)(`td`,{className:` text-[10px] text-center tabular-nums`,children:[e.tinggi,` `,(0,o.jsx)(`span`,{className:`text-[10px] text-base-content/50`,children:e.satuan})]}),(0,o.jsxs)(`td`,{className:`text-[10px] text-center tabular-nums`,children:[e.lebar,` `,(0,o.jsx)(`span`,{className:`text-[10px] text-base-content/50`,children:e.satuan})]}),(0,o.jsx)(`td`,{className:`text-[10px] text-center font-semibold tabular-nums`,children:e.qty}),(0,o.jsx)(`td`,{className:` text-[10px] text-center`,children:e.sisi}),(0,o.jsx)(`td`,{className:`text-[10px] text-center font-semibold tabular-nums`,children:e.metode_pengantaran}),(0,o.jsx)(`td`,{className:` text-[10px] text-center font-semibold tabular-nums`,children:e.tgl_kirim})]},e.id))})]})})]})})]})})]})})})}),(0,o.jsxs)(`dialog`,{ref:d,className:`modal`,children:[(0,o.jsxs)(`div`,{className:`modal-box`,children:[(0,o.jsx)(`button`,{type:`button`,onClick:w,className:`btn btn-sm btn-circle btn-ghost absolute right-2 top-2`,children:`✕`}),(0,o.jsx)(`h3`,{className:`text-lg font-bold mb-4`,children:`Konfirmasi Finishing Selesai`}),n&&(0,o.jsxs)(`div`,{className:`space-y-3`,children:[(0,o.jsxs)(`div`,{className:`flex justify-between items-center p-3 bg-base-200 rounded-lg`,children:[(0,o.jsx)(`span`,{className:`text-sm text-base-content/70`,children:`No SPK`}),(0,o.jsx)(`span`,{className:`font-mono font-semibold`,children:n.kode_spk})]}),(0,o.jsxs)(`div`,{className:`flex justify-between items-center p-3 bg-base-200 rounded-lg`,children:[(0,o.jsx)(`span`,{className:`text-sm text-base-content/70`,children:`Customer`}),(0,o.jsx)(`span`,{className:`font-medium`,children:n.customer?.nama})]}),(0,o.jsxs)(`div`,{className:`flex justify-between items-center p-3 bg-base-200 rounded-lg`,children:[(0,o.jsx)(`span`,{className:`text-sm text-base-content/70`,children:`Bahan`}),(0,o.jsx)(`span`,{children:n.bahan?.bahan})]})]}),(0,o.jsxs)(`div`,{className:`modal-action`,children:[(0,o.jsx)(`button`,{className:`btn btn-ghost`,onClick:w,children:`Batal`}),n&&n.selesai==1?(0,o.jsx)(`button`,{className:`btn btn-primary w-full`,onClick:T,children:`Batal Proses Selesai`}):(0,o.jsx)(`button`,{className:`btn btn-primary w-full`,onClick:T,children:`Proses Selesai`})]})]}),(0,o.jsx)(`form`,{method:`dialog`,className:`modal-backdrop`,children:(0,o.jsx)(`button`,{onClick:w,children:`close`})})]})]})}export{s as default};