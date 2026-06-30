import"./chunk-CilyBKbf.js";import{l as e,n as t}from"./app-CpAdK8HW.js";import{t as n}from"./server.browser-DtnOUpwb.js";e();var r=n(),i=t(),a=(e=new Date)=>new Intl.DateTimeFormat(`id-ID`,{day:`2-digit`,month:`short`,year:`numeric`}).format(e),o=(e=new Date)=>new Intl.DateTimeFormat(`id-ID`,{hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(e),s=e=>Number(e||0).toLocaleString(`id-ID`),c=`
    @page { size: 76mm auto; margin: 2mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { width: 70mm; margin: 0; color: #000; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 12px; line-height: 1.1; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .receipt { width: 70mm; padding: 2mm; }
    .header { text-align: center; margin-bottom: 4px; }
    .brand-row { display: flex; flex-direction: column; justify-content: center; align-items: center; }
    .logo-img { width: 200px; height: auto; display: block; margin-bottom: 3px; }
    .topline { display: flex; justify-content: space-between; gap: 4px; margin-top: 2px; font-size: 12px; }
    .invoice { font-size: 13px; font-weight: 800; margin-top: 1px; }
    .title { font-size: 13px; font-weight: 800; margin-bottom: 4px; letter-spacing: 1px; }
    .block { margin-top: 2px; }
    .label { display: block; font-size: 11px; }
    .name { font-size: 14px; margin-top: 2px; }
    .line { border-top: 2px solid #000; margin: 4px 0; }
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
    .printed { display: grid; grid-template-columns: 15mm 1fr; column-gap: 2px; margin-top: 3px; font-size: 10px; }
    @media print { body { margin: 0; } }
`;function l({items:e,auth:t,paymentType:n,printedAt:r}){let c=e.reduce((e,t)=>e+Number(t.total_harga||0),0);e.reduce((e,t)=>e+Number(t.qty||0),0);let l=e[0],u=l?.no_invoice||l?.no_antrian||`-`,d=t?.user?.username||t?.user?.name||`Admin`;return(0,i.jsxs)(`div`,{className:`receipt`,children:[(0,i.jsx)(`div`,{className:`header`,children:(0,i.jsx)(`div`,{className:`brand-row`,children:(0,i.jsx)(`img`,{src:`/logo.png`,alt:`Sentosa`,className:`logo-img`})})}),(0,i.jsx)(`br`,{}),(0,i.jsxs)(`div`,{className:`topline`,children:[(0,i.jsx)(`span`,{className:`invoice`,children:u}),(0,i.jsx)(`span`,{children:a(r)})]}),(0,i.jsx)(`div`,{className:`title`,children:` FAKTUR DESAIN`}),(0,i.jsxs)(`div`,{className:`block`,children:[(0,i.jsx)(`span`,{className:`label`,children:`Kepada Yth :`}),(0,i.jsx)(`div`,{className:`name font-bold`,children:l?.customer?.nama||`-`})]}),(0,i.jsxs)(`table`,{children:[(0,i.jsx)(`thead`,{children:(0,i.jsxs)(`tr`,{children:[(0,i.jsx)(`th`,{children:`Pesanan`}),(0,i.jsx)(`th`,{style:{width:`10mm`},children:`Qty`}),(0,i.jsx)(`th`,{style:{width:`18mm`},className:`jumlah`,children:`Harga`}),(0,i.jsx)(`th`,{style:{width:`18mm`},className:`jumlah`,children:`Subtotal`})]})}),(0,i.jsx)(`tbody`,{children:e.map((e,t)=>(0,i.jsxs)(`tr`,{className:t%2==1?`alt`:void 0,children:[(0,i.jsx)(`td`,{children:e.kategoridesain?.kategori||`-`}),(0,i.jsx)(`td`,{style:{textAlign:`center`},children:e.qty||0}),(0,i.jsx)(`td`,{className:`jumlah`,children:s(e.kategoridesain?.harga||0)}),(0,i.jsx)(`td`,{className:`jumlah`,children:s(e.total_harga)})]},e.id||t))})]}),(0,i.jsxs)(`div`,{className:`summary`,children:[(0,i.jsxs)(`div`,{className:`summary-row`,children:[(0,i.jsx)(`span`,{children:`Total`}),(0,i.jsx)(`span`,{children:s(c)})]}),(0,i.jsxs)(`div`,{className:`summary-row`,children:[(0,i.jsx)(`span`,{children:`Bayar`}),(0,i.jsx)(`span`,{children:`0`})]}),(0,i.jsxs)(`div`,{className:`summary-row`,children:[(0,i.jsx)(`span`,{children:`Kembalian`}),(0,i.jsx)(`span`,{children:`0`})]})]}),(0,i.jsxs)(`div`,{className:`notes`,children:[(0,i.jsx)(`div`,{children:`NB :`}),(0,i.jsx)(`div`,{className:!0,children:`Hasil Print dikertas tidak bisa dijadikan acuan warna untuk hasil cetakan.Design diperiksa dengan baik dan teliti (warna, tulisan & peletakan).Kesalahan setelah dicetak tidak menjadi tanggung jawab kami`})]}),(0,i.jsx)(`br`,{}),(0,i.jsxs)(`div`,{className:`signatures`,children:[(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`div`,{children:`Hormat Kami,`}),(0,i.jsx)(`div`,{className:`sign-name`,children:d})]}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`div`,{children:`Customer`}),(0,i.jsx)(`div`,{className:`sign-name`,children:l?.customer?.nama||`-`})]})]}),(0,i.jsxs)(`div`,{className:`printed`,children:[(0,i.jsx)(`span`,{children:`Printed By :`}),(0,i.jsx)(`span`,{children:d}),(0,i.jsx)(`span`,{}),(0,i.jsxs)(`span`,{children:[a(r),` `,o(r)]})]})]})}function u({items:e,auth:t,paymentType:n,printedAt:r}){return(0,i.jsxs)(`html`,{children:[(0,i.jsxs)(`head`,{children:[(0,i.jsxs)(`title`,{children:[`Struk Desain - `,e.length>1?`${e.length} item`:e[0]?.kode_order]}),(0,i.jsx)(`style`,{children:c})]}),(0,i.jsxs)(`body`,{children:[(0,i.jsx)(l,{items:e,auth:t,paymentType:n,printedAt:r}),(0,i.jsx)(`script`,{dangerouslySetInnerHTML:{__html:`
                            window.addEventListener('load',function(){window.focus();setTimeout(function(){window.print()},300)});
                            window.addEventListener('afterprint',function(){window.close()});
                        `}})]})]})}var d=({items:e,auth:t,paymentType:n})=>`<!doctype html>${(0,r.renderToStaticMarkup)((0,i.jsx)(u,{items:e,auth:t,paymentType:n,printedAt:new Date}))}`;export{d as buildDesainReceiptHtml};