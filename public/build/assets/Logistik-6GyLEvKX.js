import{r as e}from"./chunk-CilyBKbf.js";import{a as t,l as n,n as r}from"./app-BjaEIppq.js";import{t as i}from"./AdminLayout-Ch9tsSGt.js";import{t as a}from"./KonfirmasiPassword-CKArHq9I.js";var o=e(n(),1),s=r();function c({produksi:e,kurir:n,bahanpakaiList:r,itemstokbahans:c}){let[l,u]=(0,o.useState)(null),[d,f]=(0,o.useState)(``),[p,m]=(0,o.useState)(``),[h,g]=(0,o.useState)(``),[_,v]=(0,o.useState)(``),[y,b]=(0,o.useState)([]),[x,S]=(0,o.useState)(!1),[C,w]=(0,o.useState)(null),T=(0,o.useRef)(null),E=[`INDOOR`,`INDOOR 2`,`OUTDOOR`,`OUTDOOR 2`,`DISPLAY`,`OFFSET`,`DLL`],D=[`DLL`,`DYE`,`UV`,`OFFSET`,`TONER`,`ECOSOLVENT`,`SOLVENT`],O=(0,o.useMemo)(()=>{if(!l)return 0;if(l.bahan?.kategori_cetak===`DISPLAY`)return parseFloat(l.qty)||0;let e=parseFloat(l.tinggi)||0,t=parseFloat(l.lebar)||0,n=parseFloat(l.qty)||1;return((l.satuan||``).toLowerCase()===`cm`?e/100*(t/100):e*t)*n},[l]),k=l?.bahan?.kategori_cetak===`DISPLAY`,A=(0,o.useMemo)(()=>l&&r?.filter(e=>Array.isArray(e.id_master_bahan)&&e.id_master_bahan.includes(l.bahan?.kode))||[],[l,r]),j=(0,o.useMemo)(()=>!_||!c?[]:c.filter(e=>e.kode_bahan_pakai===_&&parseFloat(e.total)>0&&parseInt(e.qty)>0),[_,c]),M=parseInt(l?.qty)||1;(0,o.useMemo)(()=>y.map(e=>c?.find(t=>t.id===e)||null).filter(Boolean),[y,c]);let N=(0,o.useMemo)(()=>{let e=y.filter(Boolean);return j.filter(t=>!e.includes(t.id))},[j,y]);(0,o.useMemo)(()=>y.length===M?y.reduce((e,t)=>{let n=c?.find(e=>e.id===t);return e+(n?parseFloat(n.total):0)},0)>=O:!1,[y,O,M,c]);let P=e=>!p||p===e,F=(0,o.useMemo)(()=>{let t={};for(let n of E){if(!P(n))continue;let r=e.filter(e=>e.bahan?.kategori_cetak===n&&(!h||e.bahan?.jenis_bahan===h)),i={};for(let e of r){let t=e.bahan?.jenis_bahan||`Lainnya`;i[t]||(i[t]=[]),i[t].push(e)}t[n]=i}return t},[e,E,p,h]),I=e=>{u(e),f(``),v(e.kode_bahanpakai??``),b(Array(parseInt(e.qty)||1).fill(``)),T.current?.showModal()},L=()=>{u(null),T.current?.close()},R=(e,t)=>{let n=new Date().toLocaleDateString(`id-ID`,{day:`2-digit`,month:`long`,year:`numeric`}),r=(e.customer?.nama||``).toUpperCase(),i=(t||``).toUpperCase();return`
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Surat Jalan</title>
<style>
body { font-family: Arial, sans-serif; font-size: 13px; margin: 0; padding: 20px; font-weight: 700; }
.header { text-align: center; border-bottom: 3px solid #16a34a; padding-bottom: 12px; margin-bottom: 18px; }
.header .title { text-align: center; }
.header .title h1 { margin: 0; font-size: 24px; color: #16a34a; letter-spacing: 3px; font-weight: 900; }
.header .title p { margin: 3px 0; font-size: 12px; color: #333; font-weight: 700; }
.info { margin-bottom: 15px; }
.info table { width: 100%; font-size: 12px; }
.info td { padding: 4px 5px; font-weight: 700; }
table.items { width: 100%; border-collapse: collapse; font-size: 11px; }
table.items th { background: #16a34a; color: #000; padding: 8px 6px; text-align: center; font-weight: 900; font-size: 12px; }
table.items td { padding: 6px 6px; border: 2px solid #000; font-weight: 700; }
table.items tr:nth-child(even) { background: #f0fdf4; }
.signatures { margin-top: 50px; display: flex; justify-content: space-between; text-align: center; }
.signatures .sig-block { width: 30%; }
.signatures .sig-block p.label { font-size: 12px; font-weight: 900; margin: 0 0 8px 0; text-transform: uppercase; }
.signatures .sig-block .line { margin-top: 35px; border-top: 2px solid #000; padding-top: 8px; font-size: 13px; font-weight: 900; letter-spacing: 1px; }
.total-row { font-weight: bold; background: #e8f5e9 !important; }
@media print { body { padding: 10px; } @page { margin: 10mm; } }
</style>
</head>
<body>
<div class="header">
    <div class="title">
        <h1>SURAT JALAN</h1>
        <p>SENTOSA PRINTING & DIGITAL SOLUTIONS</p>
        <p>Jl. Laksana No.75/73 A Medan | Telp: (061) 7359007</p>
    </div>
</div>
<div class="info">
    <table>
        <tr><td style="width:100px"><strong>No Invoice</strong></td><td>: ${e.no_invoice||`-`}</td></tr>
        <tr><td><strong>Tanggal Produksi</strong></td><td>: ${e.tanggal?new Date(e.tanggal).toLocaleDateString(`id-ID`,{day:`2-digit`,month:`long`,year:`numeric`}):`-`}</td></tr>
        <tr><td><strong>Tanggal Antar</strong></td><td>: ${n}</td></tr>
        <tr><td><strong>Customer</strong></td><td>: ${e.customer?.nama||`-`}</td></tr>
    </table>
</div>
<table class="items">
    <tr>
        <th style="width:30px">No</th>
        <th>Bahan produksi</th>
        <th style="width:50px">Qty</th>
        <th>Keterangan</th>
    </tr>
    <tr>
        <td style="text-align:center">1</td>
        <td>${e.bahan?.bahan||`-`}</td>
        <td style="text-align:center">${e.qty}</td>
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
</html>`},z=e=>{if(!d){Swal.fire(`Pilih Kurir`,`Silakan pilih kurir pengirim terlebih dahulu`,`warning`);return}let t=n.find(e=>e.id==d)?.nama||``,r=window.open(``,`_blank`,`width=600,height=800`);r&&(r.document.open(),r.document.write(R(e,t)),r.document.close(),r.addEventListener(`load`,()=>{r.focus(),setTimeout(()=>r.print(),300)}))},B=()=>{l&&t.put(`/logistik/logistik/${l.id}/proses`,{kode_bahanpakai:_,id_item_stoks:y.filter(Boolean),total_all:O},{preserveScroll:!0,onSuccess:()=>{L()}})},V=(0,o.useCallback)(e=>{w(e),S(!0)},[]),H=(0,o.useCallback)(()=>{switch(S(!1),C){case`cetak_surat`:z(l);break;case`selesai`:B();break}w(null)},[C,l]),U=(0,o.useCallback)(()=>{S(!1),w(null)},[]);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i,{children:(0,s.jsx)(`div`,{className:`grid grid-cols-1 xl:grid-cols-1`,children:(0,s.jsx)(`div`,{className:`xl:col-span-2 card bg-base-100 shadow-md border border-base-300`,children:(0,s.jsxs)(`div`,{className:`card-body`,children:[(0,s.jsxs)(`div`,{className:`flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4`,children:[(0,s.jsx)(`h2`,{className:`card-title`,children:`Halaman Logistik`}),(0,s.jsxs)(`div`,{className:`flex gap-2`,children:[(0,s.jsxs)(`select`,{value:p,onChange:e=>m(e.target.value),className:`select select-bordered`,children:[(0,s.jsx)(`option`,{value:``,children:`Semua Kategori Cetak`}),E.map(e=>(0,s.jsx)(`option`,{value:e,children:e},e))]}),(0,s.jsxs)(`select`,{value:h,onChange:e=>g(e.target.value),className:`select select-bordered`,children:[(0,s.jsx)(`option`,{value:``,children:`Semua Jenis Bahan`}),D.map(e=>(0,s.jsx)(`option`,{value:e,children:e},e))]})]})]}),(0,s.jsx)(`div`,{children:(0,s.jsx)(`div`,{className:`grid lg:grid-cols-2 gap-4`,children:Object.entries(F).map(([e,t])=>(0,s.jsx)(`div`,{children:(0,s.jsxs)(`div`,{className:`bg-base-100 border border-base-300 rounded-xl shadow-sm overflow-hidden`,children:[(0,s.jsx)(`div`,{className:`bg-primary px-4 py-3`,children:(0,s.jsx)(`h3`,{className:`font-bold text-white text-sm tracking-wide`,children:e})}),Object.entries(t).length===0?(0,s.jsx)(`div`,{className:`px-4 py-8 text-center text-base-content/50 text-xs`,children:`Tidak ada data logistik untuk kategori ini`}):Object.entries(t).map(([e,t])=>(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{className:`bg-base-200/70 px-4 py-1.5 border-b border-base-300`,children:(0,s.jsx)(`span`,{className:`font-semibold text-xs tracking-wider text-base-content/80`,children:e})}),(0,s.jsx)(`div`,{className:`overflow-x-auto`,children:(0,s.jsxs)(`table`,{className:`table table-xs table-zebra w-full`,children:[(0,s.jsx)(`thead`,{children:(0,s.jsxs)(`tr`,{className:`bg-base-200 text-base-content/70 text-[10px] tracking-wider`,children:[(0,s.jsx)(`th`,{className:`py-3`,children:`No SPK`}),(0,s.jsx)(`th`,{className:`py-3`,children:`Kd Bahan`}),(0,s.jsx)(`th`,{className:`py-3`,children:`Customer`}),(0,s.jsx)(`th`,{className:`py-3 text-center`,children:`H`}),(0,s.jsx)(`th`,{className:`py-3 text-center`,children:`W`}),(0,s.jsx)(`th`,{className:`py-3 text-center`,children:`QTY`}),(0,s.jsx)(`th`,{className:`py-3 text-center`,children:`Sisi`}),(0,s.jsx)(`th`,{className:`py-3 text-center`,children:`Pengataran`}),(0,s.jsx)(`th`,{className:`py-3 text-center`,children:`Tgl Kirim`})]})}),(0,s.jsx)(`tbody`,{children:t.map(e=>(0,s.jsxs)(`tr`,{onClick:()=>I(e),className:`hover:bg-base-200/70 transition-colors cursor-pointer`,children:[(0,s.jsx)(`td`,{className:`font-mono font-medium text-[10px]`,children:e.kode_spk}),(0,s.jsx)(`td`,{className:`text-[10px]`,children:e.bahan?.kode}),(0,s.jsx)(`td`,{className:`font-medium text-[10px]`,children:e.customer?.nama}),(0,s.jsxs)(`td`,{className:`text-[10px] text-center tabular-nums`,children:[e.tinggi,` `,(0,s.jsx)(`span`,{className:`text-[10px] text-base-content/50`,children:e.satuan})]}),(0,s.jsxs)(`td`,{className:`text-[10px] text-center tabular-nums`,children:[e.lebar,` `,(0,s.jsx)(`span`,{className:`text-[10px] text-base-content/50`,children:e.satuan})]}),(0,s.jsx)(`td`,{className:`text-[10px] text-center font-semibold tabular-nums`,children:e.qty}),(0,s.jsx)(`td`,{className:`text-[10px] text-center`,children:e.sisi}),(0,s.jsx)(`td`,{className:`text-[10px] text-center font-semibold tabular-nums`,children:e.metode_pengantaran}),(0,s.jsx)(`td`,{className:`text-[10px] text-center font-semibold tabular-nums`,children:e.tgl_kirim})]},e.id))})]})})]},e))]})},e))})})]})})})}),(0,s.jsxs)(`dialog`,{ref:T,className:`modal`,children:[(0,s.jsxs)(`div`,{className:`modal-box`,children:[(0,s.jsx)(`button`,{type:`button`,onClick:L,className:`btn btn-sm btn-circle btn-ghost absolute right-2 top-2`,children:`✕`}),(0,s.jsx)(`h3`,{className:`text-lg font-bold mb-4`,children:`Konfirmasi Logistik Selesai`}),l&&(0,s.jsxs)(`div`,{className:`space-y-3`,children:[(0,s.jsxs)(`div`,{className:`flex justify-between items-center p-3 bg-base-200 rounded-lg`,children:[(0,s.jsx)(`span`,{className:`text-sm text-base-content/70`,children:`No SPK`}),(0,s.jsx)(`span`,{className:`font-mono font-semibold`,children:l.kode_spk})]}),(0,s.jsxs)(`div`,{className:`flex justify-between items-center p-3 bg-base-200 rounded-lg`,children:[(0,s.jsx)(`span`,{className:`text-sm text-base-content/70`,children:`Customer`}),(0,s.jsx)(`span`,{className:`font-medium`,children:l.customer?.nama})]}),(0,s.jsxs)(`div`,{className:`flex justify-between items-center p-3 bg-base-200 rounded-lg`,children:[(0,s.jsx)(`span`,{className:`text-sm text-base-content/70`,children:`Bahan`}),(0,s.jsx)(`span`,{children:l.bahan?.bahan})]}),(0,s.jsxs)(`div`,{className:`flex justify-between items-center p-3 bg-base-200 rounded-lg`,children:[(0,s.jsx)(`span`,{className:`text-sm text-base-content/70`,children:`Jenis Bahan`}),(0,s.jsx)(`span`,{children:l.bahan?.jenis_bahan})]}),(0,s.jsxs)(`div`,{className:`flex justify-between items-center p-3 bg-base-200 rounded-lg`,children:[(0,s.jsx)(`span`,{className:`text-sm text-base-content/70`,children:`Kategori Cetak`}),(0,s.jsx)(`span`,{children:l.bahan?.kategori_cetak})]}),k&&(0,s.jsxs)(`div`,{className:`space-y-3 mt-3`,children:[(0,s.jsxs)(`label`,{className:`form-control`,children:[(0,s.jsx)(`span`,{className:`label-text text-xs`,children:`Kode Bahan pakai`}),(0,s.jsxs)(`select`,{value:_,onChange:e=>{v(e.target.value),b(Array(M).fill(``))},className:`select select-bordered select-sm text-xs`,children:[(0,s.jsx)(`option`,{value:``,children:`Pilih Bahan Pakai`}),A.map(e=>(0,s.jsxs)(`option`,{value:e.kode_bahan,children:[e.kode_bahan,` - `,e.keterangan]},e.kode_bahan))]})]}),_&&(0,s.jsxs)(`div`,{className:`space-y-2`,children:[(0,s.jsxs)(`span`,{className:`text-xs font-medium`,children:[`Pilih Kode Label (`,M,` item)`]}),Array.from({length:M}).map((e,t)=>{let n=y[t]?[c?.find(e=>e.id===y[t]),...N].filter(Boolean):N;return(0,s.jsxs)(`select`,{value:y[t]||``,onChange:e=>{let n=[...y];n[t]=e.target.value?Number(e.target.value):``,b(n)},className:`select select-bordered select-sm text-xs w-full`,children:[(0,s.jsx)(`option`,{value:``,children:`Pilih`}),n.map(e=>(0,s.jsx)(`option`,{value:e.id,children:e.kode_label||`-`},e.id))]},t)})]})]})]}),(0,s.jsxs)(`div`,{className:`form-control mt-4`,children:[(0,s.jsx)(`label`,{className:`label`,children:(0,s.jsx)(`span`,{className:`label-text font-medium`,children:`Pilih Kurir Pengirim`})}),(0,s.jsxs)(`select`,{value:d,onChange:e=>f(e.target.value),className:`select select-bordered w-full`,children:[(0,s.jsx)(`option`,{value:``,children:`-- Pilih Kurir --`}),n.map(e=>(0,s.jsx)(`option`,{value:e.id,children:e.nama},e.id))]})]}),(0,s.jsxs)(`div`,{className:`modal-action flex-wrap gap-2`,children:[(0,s.jsx)(`button`,{className:`btn btn-ghost`,onClick:L,children:`Batal`}),(0,s.jsxs)(`button`,{className:`btn btn-secondary`,onClick:()=>V(`cetak_surat`),children:[(0,s.jsx)(`i`,{className:`fas fa-truck`}),` Cetak Surat Jalan`]}),(0,s.jsxs)(`button`,{className:`btn btn-primary`,onClick:()=>V(`selesai`),children:[(0,s.jsx)(`i`,{className:`fas fa-check`}),` Selesai Logistik`]})]})]}),(0,s.jsx)(`form`,{method:`dialog`,className:`modal-backdrop`,children:(0,s.jsx)(`button`,{onClick:L,children:`close`})})]}),(0,s.jsx)(a,{show:x,onConfirmed:H,onClose:U})]})}export{c as default};