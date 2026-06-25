import{r as e}from"./chunk-CilyBKbf.js";import{a as t,l as n,n as r}from"./app-BCAtFzDr.js";import{t as i}from"./AdminLayout-CySTdrEL.js";import{t as a}from"./KonfirmasiPassword-B0u6G-vg.js";var o=e(n(),1),s=r();function c({produksi:e,kurir:n}){let[r,c]=(0,o.useState)(null),[l,u]=(0,o.useState)(``),[d,f]=(0,o.useState)(``),[p,m]=(0,o.useState)(``),[h,g]=(0,o.useState)(!1),[_,v]=(0,o.useState)(null),y=(0,o.useRef)(null),b=[`INDOOR`,`INDOOR 2`,`OUTDOOR`,`OUTDOOR 2`,`DISPLAY`,`OFFSET`,`DLL`],x=[`DLL`,`DYE`,`UV`,`OFFSET`,`TONER`,`ECOSOLVENT`,`SOLVENT`],S=e=>!d||d===e,C=(0,o.useMemo)(()=>{let t={};for(let n of b){if(!S(n))continue;let r=e.filter(e=>e.bahan?.kategori_cetak===n&&(!p||e.bahan?.jenis_bahan===p)),i={};for(let e of r){let t=e.bahan?.jenis_bahan||`Lainnya`;i[t]||(i[t]=[]),i[t].push(e)}t[n]=i}return t},[e,b,d,p]),w=e=>{c(e),u(``),y.current?.showModal()},T=()=>{c(null),y.current?.close()},E=e=>{let t=parseFloat(e);return isNaN(t)?`-`:`Rp `+t.toLocaleString(`id-ID`)},D=(e,t)=>{let n=new Date().toLocaleDateString(`id-ID`,{day:`2-digit`,month:`long`,year:`numeric`}),r=(e.customer?.nama||``).toUpperCase(),i=(t||``).toUpperCase();return`
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Surat Jalan</title>
<style>
body { font-family: Arial, sans-serif; font-size: 12px; margin: 0; padding: 20px; }
.header { display: flex; align-items: center; gap: 20px; border-bottom: 2px solid #16a34a; padding-bottom: 12px; margin-bottom: 18px; }
.header img { width: 90px; }
.header .title { flex: 1; text-align: center; }
.header .title h1 { margin: 0; font-size: 20px; color: #16a34a; letter-spacing: 2px; }
.header .title p { margin: 3px 0; font-size: 11px; color: #555; }
.info { margin-bottom: 15px; }
.info table { width: 100%; font-size: 11px; }
.info td { padding: 3px 5px; }
table.items { width: 100%; border-collapse: collapse; font-size: 10px; }
table.items th { background: #16a34a; color: #fff; padding: 7px 4px; text-align: center; }
table.items td { padding: 5px 4px; border: 1px solid #ddd; }
table.items tr:nth-child(even) { background: #f9f9f9; }
.signatures { margin-top: 50px; display: flex; justify-content: space-between; text-align: center; }
.signatures .sig-block { width: 30%; }
.signatures .sig-block p.label { font-size: 11px; font-weight: bold; margin: 0 0 8px 0; }
.signatures .sig-block .line { margin-top: 35px; border-top: 1px solid #000; padding-top: 8px; font-size: 12px; font-weight: bold; letter-spacing: 1px; }
.total-row { font-weight: bold; background: #e8f5e9 !important; }
@media print { body { padding: 10px; } @page { margin: 10mm; } }
</style>
</head>
<body>
<div class="header">
    <img src="/logo.png" alt="Logo">
    <div class="title">
        <h1>SURAT JALAN</h1>
        <p>SENTOSA PRINTING & DIGITAL SOLUTIONS</p>
        <p>Jl. Laksana No.75/73 A Medan | Telp: (061) 7359007</p>
    </div>
</div>
<div class="info">
    <table>
        <tr><td style="width:100px"><strong>No Invoice</strong></td><td>: ${e.no_invoice||`-`}</td></tr>
        <tr><td><strong>Tanggal</strong></td><td>: ${n}</td></tr>
        <tr><td><strong>Customer</strong></td><td>: ${e.customer?.nama||`-`}</td></tr>
    </table>
</div>
<table class="items">
    <tr>
        <th style="width:30px">No</th>
        <th>Kode Bahan</th>
        <th style="width:50px">Qty</th>
        <th style="width:90px">Harga</th>
        <th style="width:100px">Total Harga</th>
        <th>Keterangan</th>
    </tr>
    <tr>
        <td style="text-align:center">1</td>
        <td>${e.bahan?.kode||`-`}</td>
        <td style="text-align:center">${e.qty}</td>
        <td style="text-align:right">${E(e.harga_bahan)}</td>
        <td style="text-align:right">${E(e.total_harga)}</td>
        <td>${e.keterangan||`-`}</td>
    </tr>
</table>
<div class="signatures">
    <div class="sig-block">
        <p class="label">PENERIMA</p>
        <div class="line">${r||`( _____________________ )`}</div>
    </div>
    <div class="sig-block">
        <p class="label">PENGIRIM</p>
        <div class="line">${i||`( _____________________ )`}</div>
    </div>
    <div class="sig-block">
        <p class="label">MENGETAHUI</p>
        <div class="line"></div>
    </div>
</div>
</body>
</html>`},O=e=>{if(!l){Swal.fire(`Pilih Kurir`,`Silakan pilih kurir pengirim terlebih dahulu`,`warning`);return}let t=n.find(e=>e.id==l)?.nama||``,r=window.open(``,`_blank`,`width=600,height=800`);r&&(r.document.open(),r.document.write(D(e,t)),r.document.close(),r.addEventListener(`load`,()=>{r.focus(),setTimeout(()=>r.print(),300)}))},k=()=>{r&&t.put(`/logistik/logistik/${r.id}/proses`,{},{preserveScroll:!0,onSuccess:()=>{T()}})},A=(0,o.useCallback)(e=>{v(e),g(!0)},[]),j=(0,o.useCallback)(()=>{switch(g(!1),_){case`cetak_surat`:O(r);break;case`selesai`:k();break}v(null)},[_,r]),M=(0,o.useCallback)(()=>{g(!1),v(null)},[]);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i,{children:(0,s.jsx)(`div`,{className:`grid grid-cols-1 xl:grid-cols-1`,children:(0,s.jsx)(`div`,{className:`xl:col-span-2 card bg-base-100 shadow-md border border-base-300`,children:(0,s.jsxs)(`div`,{className:`card-body`,children:[(0,s.jsxs)(`div`,{className:`flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4`,children:[(0,s.jsx)(`h2`,{className:`card-title`,children:`Halaman Logistik`}),(0,s.jsxs)(`div`,{className:`flex gap-2`,children:[(0,s.jsxs)(`select`,{value:d,onChange:e=>f(e.target.value),className:`select select-bordered`,children:[(0,s.jsx)(`option`,{value:``,children:`Semua Kategori Cetak`}),b.map(e=>(0,s.jsx)(`option`,{value:e,children:e},e))]}),(0,s.jsxs)(`select`,{value:p,onChange:e=>m(e.target.value),className:`select select-bordered`,children:[(0,s.jsx)(`option`,{value:``,children:`Semua Jenis Bahan`}),x.map(e=>(0,s.jsx)(`option`,{value:e,children:e},e))]})]})]}),(0,s.jsx)(`div`,{children:(0,s.jsx)(`div`,{className:`grid lg:grid-cols-2 gap-4`,children:Object.entries(C).map(([e,t])=>(0,s.jsx)(`div`,{children:(0,s.jsxs)(`div`,{className:`bg-base-100 border border-base-300 rounded-xl shadow-sm overflow-hidden`,children:[(0,s.jsx)(`div`,{className:`bg-primary px-4 py-3`,children:(0,s.jsx)(`h3`,{className:`font-bold text-white text-sm tracking-wide`,children:e})}),Object.entries(t).length===0?(0,s.jsx)(`div`,{className:`px-4 py-8 text-center text-base-content/50 text-xs`,children:`Tidak ada data logistik untuk kategori ini`}):Object.entries(t).map(([e,t])=>(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{className:`bg-base-200/70 px-4 py-1.5 border-b border-base-300`,children:(0,s.jsx)(`span`,{className:`font-semibold text-xs tracking-wider text-base-content/80`,children:e})}),(0,s.jsx)(`div`,{className:`overflow-x-auto`,children:(0,s.jsxs)(`table`,{className:`table table-xs table-zebra w-full`,children:[(0,s.jsx)(`thead`,{children:(0,s.jsxs)(`tr`,{className:`bg-base-200 text-base-content/70 text-[10px] tracking-wider`,children:[(0,s.jsx)(`th`,{className:`py-3`,children:`No SPK`}),(0,s.jsx)(`th`,{className:`py-3`,children:`Kd Bahan`}),(0,s.jsx)(`th`,{className:`py-3`,children:`Customer`}),(0,s.jsx)(`th`,{className:`py-3 text-center`,children:`H`}),(0,s.jsx)(`th`,{className:`py-3 text-center`,children:`W`}),(0,s.jsx)(`th`,{className:`py-3 text-center`,children:`QTY`}),(0,s.jsx)(`th`,{className:`py-3 text-center`,children:`Sisi`}),(0,s.jsx)(`th`,{className:`py-3 text-center`,children:`Pengataran`}),(0,s.jsx)(`th`,{className:`py-3 text-center`,children:`Tgl Kirim`})]})}),(0,s.jsx)(`tbody`,{children:t.map(e=>(0,s.jsxs)(`tr`,{onClick:()=>w(e),className:`hover:bg-base-200/70 transition-colors cursor-pointer`,children:[(0,s.jsx)(`td`,{className:`font-mono font-medium text-[10px]`,children:e.kode_spk}),(0,s.jsx)(`td`,{className:`text-[10px]`,children:e.bahan?.kode}),(0,s.jsx)(`td`,{className:`font-medium text-[10px]`,children:e.customer?.nama}),(0,s.jsxs)(`td`,{className:`text-[10px] text-center tabular-nums`,children:[e.tinggi,` `,(0,s.jsx)(`span`,{className:`text-[10px] text-base-content/50`,children:e.satuan})]}),(0,s.jsxs)(`td`,{className:`text-[10px] text-center tabular-nums`,children:[e.lebar,` `,(0,s.jsx)(`span`,{className:`text-[10px] text-base-content/50`,children:e.satuan})]}),(0,s.jsx)(`td`,{className:`text-[10px] text-center font-semibold tabular-nums`,children:e.qty}),(0,s.jsx)(`td`,{className:`text-[10px] text-center`,children:e.sisi}),(0,s.jsx)(`td`,{className:`text-[10px] text-center font-semibold tabular-nums`,children:e.metode_pengantaran}),(0,s.jsx)(`td`,{className:`text-[10px] text-center font-semibold tabular-nums`,children:e.tgl_kirim})]},e.id))})]})})]},e))]})},e))})})]})})})}),(0,s.jsxs)(`dialog`,{ref:y,className:`modal`,children:[(0,s.jsxs)(`div`,{className:`modal-box`,children:[(0,s.jsx)(`button`,{type:`button`,onClick:T,className:`btn btn-sm btn-circle btn-ghost absolute right-2 top-2`,children:`✕`}),(0,s.jsx)(`h3`,{className:`text-lg font-bold mb-4`,children:`Konfirmasi Logistik Selesai`}),r&&(0,s.jsxs)(`div`,{className:`space-y-3`,children:[(0,s.jsxs)(`div`,{className:`flex justify-between items-center p-3 bg-base-200 rounded-lg`,children:[(0,s.jsx)(`span`,{className:`text-sm text-base-content/70`,children:`No SPK`}),(0,s.jsx)(`span`,{className:`font-mono font-semibold`,children:r.kode_spk})]}),(0,s.jsxs)(`div`,{className:`flex justify-between items-center p-3 bg-base-200 rounded-lg`,children:[(0,s.jsx)(`span`,{className:`text-sm text-base-content/70`,children:`Customer`}),(0,s.jsx)(`span`,{className:`font-medium`,children:r.customer?.nama})]}),(0,s.jsxs)(`div`,{className:`flex justify-between items-center p-3 bg-base-200 rounded-lg`,children:[(0,s.jsx)(`span`,{className:`text-sm text-base-content/70`,children:`Bahan`}),(0,s.jsx)(`span`,{children:r.bahan?.bahan})]}),(0,s.jsxs)(`div`,{className:`flex justify-between items-center p-3 bg-base-200 rounded-lg`,children:[(0,s.jsx)(`span`,{className:`text-sm text-base-content/70`,children:`Jenis Bahan`}),(0,s.jsx)(`span`,{children:r.bahan?.jenis_bahan})]}),(0,s.jsxs)(`div`,{className:`flex justify-between items-center p-3 bg-base-200 rounded-lg`,children:[(0,s.jsx)(`span`,{className:`text-sm text-base-content/70`,children:`Kategori Cetak`}),(0,s.jsx)(`span`,{children:r.bahan?.kategori_cetak})]})]}),(0,s.jsxs)(`div`,{className:`form-control mt-4`,children:[(0,s.jsx)(`label`,{className:`label`,children:(0,s.jsx)(`span`,{className:`label-text font-medium`,children:`Pilih Kurir Pengirim`})}),(0,s.jsxs)(`select`,{value:l,onChange:e=>u(e.target.value),className:`select select-bordered w-full`,children:[(0,s.jsx)(`option`,{value:``,children:`-- Pilih Kurir --`}),n.map(e=>(0,s.jsx)(`option`,{value:e.id,children:e.nama},e.id))]})]}),(0,s.jsxs)(`div`,{className:`modal-action flex-wrap gap-2`,children:[(0,s.jsx)(`button`,{className:`btn btn-ghost`,onClick:T,children:`Batal`}),(0,s.jsxs)(`button`,{className:`btn btn-secondary`,onClick:()=>A(`cetak_surat`),children:[(0,s.jsx)(`i`,{className:`fas fa-truck`}),` Cetak Surat Jalan`]}),(0,s.jsxs)(`button`,{className:`btn btn-primary`,onClick:()=>A(`selesai`),children:[(0,s.jsx)(`i`,{className:`fas fa-check`}),` Selesai Logistik`]})]})]}),(0,s.jsx)(`form`,{method:`dialog`,className:`modal-backdrop`,children:(0,s.jsx)(`button`,{onClick:T,children:`close`})})]}),(0,s.jsx)(a,{show:h,onConfirmed:j,onClose:M})]})}export{c as default};