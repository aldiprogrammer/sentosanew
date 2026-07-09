import{r as e}from"./chunk-CilyBKbf.js";import{l as t,n,r}from"./app-YPLl7IiU.js";var i=e(t(),1),a=n(),o=[{nama:`Nasi Goreng Spesial`,qty:2,harga:25e3},{nama:`Ayam Bakar Madu`,qty:1,harga:35e3},{nama:`Es Teh Manis`,qty:2,harga:5e3},{nama:`Jus Alpukat`,qty:1,harga:15e3},{nama:`Pisang Goreng`,qty:3,harga:1e4}],s={noNota:`STR-20260630-001`,tanggal:`30/06/2026 14:30`,kasir:`Rina`,customer:`Walk-in`,items:o,subtotal:0,pajak:0,total:0,bayar:2e5,kembali:0};s.subtotal=o.reduce((e,t)=>e+t.qty*t.harga,0),s.pajak=Math.round(s.subtotal*.1),s.total=s.subtotal+s.pajak,s.kembali=s.bayar-s.total;function c(e){return`Rp `+e.toLocaleString(`id-ID`)}function l(){let e=(0,i.useRef)(null);function t(){let t=e.current;if(!t)return;let n=t.contentWindow.document;n.open(),n.write(o()),n.close(),t.onload=function(){t.contentWindow.focus(),t.contentWindow.print()},setTimeout(function(){t.contentWindow.focus(),t.contentWindow.print()},500)}let n=s.items.map(e=>`
      <tr>
        <td style="padding:3px 0">${e.nama}</td>
        <td style="text-align:center;padding:3px 0">${e.qty}</td>
        <td style="text-align:right;padding:3px 0">${e.harga.toLocaleString(`id-ID`)}</td>
        <td style="text-align:right;padding:3px 0 3px 6px">${(e.qty*e.harga).toLocaleString(`id-ID`)}</td>
      </tr>`).join(``);function o(){return`<!DOCTYPE html>
<html>
<head><meta charset="utf-8">
<style>
  @page { size: 76mm 297mm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Consolas', 'Lucida Console', monospace;
    font-size: 13px; max-width: 76mm; margin: 0 auto; padding: 3mm; color: #000;
  }
  h1 { font-size: 18px; text-align: center; letter-spacing: 2px; margin-bottom: 2px; }
  .alamat { text-align: center; font-size: 11px; margin-bottom: 4px; }
  hr { border: none; border-top: 1px dashed #000; margin: 4px 0; }
  table { width: 100%; font-size: 12px; border-collapse: collapse; margin-top : 5px }
  th { border-top: 1px dashed #000; border-bottom: 1px dashed #000; padding: 3px 0; }
  th:nth-child(1) { text-align: left; }
  th:nth-child(2) { text-align: center; }
  th:nth-child(3), th:nth-child(4) { text-align: right; }
  td { padding: 2px 0; }
  td:nth-child(1) { text-align: left; }
  td:nth-child(2) { text-align: center; }
  td:nth-child(3), td:nth-child(4) { text-align: right; }
  .row { display: flex; justify-content: space-between; font-size: 12px; padding: 1px 0; }
  .total { font-size: 15px; font-weight: bold; border-top: 2px double #000; padding-top: 3px; }
  .footer { text-align: center; font-size: 11px; margin-top: 8px; }
</style>
</head>
<body>
  <h1>RUMAH MAKAN SENTOSA</h1>
  <div class="alamat">Jl. Merdeka No. 123, Jakarta</div>
  <div class="alamat">Telp: (021) 1234-5678</div>
  <hr>
  <div class="row"><span>No. Nota</span><span>${s.noNota}</span></div>
  <div class="row"><span>Tanggal</span><span>${s.tanggal}</span></div>
  <div class="row"><span>Kasir</span><span>${s.kasir}</span></div>
  <div class="row"><span>Customer</span><span>${s.customer}</span></div>
  
  <table><thead><tr><th>Item</th><th>Qty</th><th>Harga</th><th>Total</th></tr></thead>
  <tbody>${n}</tbody></table>
  <hr>
  <div class="row"><span>Subtotal</span><span>${c(s.subtotal)}</span></div>
  <div class="row"><span>Pajak (10%)</span><span>${c(s.pajak)}</span></div>
  <div class="row total"><span>TOTAL</span><span>${c(s.total)}</span></div>
  <div class="row"><span>Bayar</span><span>${c(s.bayar)}</span></div>
  <div class="row"><span>Kembali</span><span>${c(s.kembali)}</span></div>
  <hr>
  <div class="footer">--- Metode Pembayaran ---</div>
  <div class="footer">TUNAI</div>
  <div class="footer" style="margin-top:4px">Terima kasih sudah berbelanja!</div>
 
</body></html>`}return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(r,{title:`Test Print Struk`}),(0,a.jsxs)(`div`,{className:`min-h-screen bg-base-200 p-4`,children:[(0,a.jsxs)(`div`,{className:`max-w-md mx-auto mb-6 flex justify-center gap-3 no-print`,children:[(0,a.jsxs)(`button`,{className:`btn btn-primary btn-lg`,onClick:t,children:[(0,a.jsx)(`i`,{className:`fas fa-print mr-2`}),`Print Struk`]}),(0,a.jsxs)(`button`,{className:`btn btn-lg`,onClick:()=>window.print(),children:[(0,a.jsx)(`i`,{className:`fas fa-file mr-2`}),`Print Preview`]})]}),(0,a.jsxs)(`div`,{className:`receipt`,children:[(0,a.jsx)(`h1`,{className:`text-lg font-bold text-center tracking-wider`,children:`RUMAH MAKAN SENTOSA`}),(0,a.jsx)(`p`,{className:`text-[10px] text-center`,children:`Jl. Merdeka No. 123, Jakarta`}),(0,a.jsx)(`p`,{className:`text-[10px] text-center`,children:`Telp: (021) 1234-5678`}),(0,a.jsx)(`hr`,{className:`border-t border-dashed border-gray-400 my-2`}),(0,a.jsxs)(`div`,{className:`text-[11px] space-y-[1px]`,children:[(0,a.jsxs)(`div`,{className:`flex justify-between`,children:[(0,a.jsx)(`span`,{children:`No. Nota`}),(0,a.jsx)(`span`,{className:`font-medium`,children:s.noNota})]}),(0,a.jsxs)(`div`,{className:`flex justify-between`,children:[(0,a.jsx)(`span`,{children:`Tanggal`}),(0,a.jsx)(`span`,{children:s.tanggal})]}),(0,a.jsxs)(`div`,{className:`flex justify-between`,children:[(0,a.jsx)(`span`,{children:`Kasir`}),(0,a.jsx)(`span`,{children:s.kasir})]}),(0,a.jsxs)(`div`,{className:`flex justify-between`,children:[(0,a.jsx)(`span`,{children:`Customer`}),(0,a.jsx)(`span`,{children:s.customer})]})]}),(0,a.jsxs)(`table`,{className:`w-full text-[11px] mt-3`,children:[(0,a.jsx)(`thead`,{children:(0,a.jsxs)(`tr`,{className:`border-t border-b border-dashed border-gray-400`,children:[(0,a.jsx)(`th`,{className:`text-left py-[2px]`,children:`Item`}),(0,a.jsx)(`th`,{className:`text-center py-[2px]`,children:`Qty`}),(0,a.jsx)(`th`,{className:`text-right py-[2px]`,children:`Harga`}),(0,a.jsx)(`th`,{className:`text-right py-[2px] pl-8`,children:`Total`})]})}),(0,a.jsx)(`tbody`,{children:s.items.map((e,t)=>(0,a.jsxs)(`tr`,{children:[(0,a.jsx)(`td`,{className:`py-[2px]`,children:e.nama}),(0,a.jsx)(`td`,{className:`text-center py-[2px]`,children:e.qty}),(0,a.jsx)(`td`,{className:`text-right py-[2px]`,children:e.harga.toLocaleString(`id-ID`)}),(0,a.jsx)(`td`,{className:`text-right py-[2px] pl-8`,children:(e.qty*e.harga).toLocaleString(`id-ID`)})]},t))})]}),(0,a.jsx)(`hr`,{className:`border-t border-dashed border-gray-400 my-2`}),(0,a.jsxs)(`div`,{className:`text-[11px] space-y-[1px]`,children:[(0,a.jsxs)(`div`,{className:`flex justify-between`,children:[(0,a.jsx)(`span`,{children:`Subtotal`}),(0,a.jsx)(`span`,{children:c(s.subtotal)})]}),(0,a.jsxs)(`div`,{className:`flex justify-between`,children:[(0,a.jsx)(`span`,{children:`Pajak (10%)`}),(0,a.jsx)(`span`,{children:c(s.pajak)})]}),(0,a.jsxs)(`div`,{className:`flex justify-between font-bold text-[13px] border-t-2 border-double border-gray-400 pt-1`,children:[(0,a.jsx)(`span`,{children:`TOTAL`}),(0,a.jsx)(`span`,{children:c(s.total)})]}),(0,a.jsxs)(`div`,{className:`flex justify-between`,children:[(0,a.jsx)(`span`,{children:`Bayar`}),(0,a.jsx)(`span`,{children:c(s.bayar)})]}),(0,a.jsxs)(`div`,{className:`flex justify-between font-medium`,children:[(0,a.jsx)(`span`,{children:`Kembali`}),(0,a.jsx)(`span`,{children:c(s.kembali)})]})]}),(0,a.jsx)(`hr`,{className:`border-t border-dashed border-gray-400 my-2`}),(0,a.jsxs)(`div`,{className:`text-center text-[11px] space-y-[2px]`,children:[(0,a.jsx)(`p`,{className:`font-medium`,children:`--- Metode Pembayaran ---`}),(0,a.jsx)(`p`,{children:`TUNAI`}),(0,a.jsx)(`p`,{className:`mt-1`,children:`Terima kasih sudah berbelanja!`}),(0,a.jsx)(`p`,{className:`text-[9px] text-gray-500`,children:`Barang yang sudah dibeli tidak dapat ditukar`}),(0,a.jsx)(`p`,{className:`text-[9px] text-gray-500`,children:`kembali kecuali ada kerusakan dari pabrik`})]})]}),(0,a.jsx)(`iframe`,{ref:e,className:`hidden`,title:`print-frame`}),(0,a.jsx)(`style`,{children:`
          .receipt {
            max-width: 76mm; margin: 0 auto; background: white; padding: 3mm;
            font-family: 'Consolas', 'Lucida Console', monospace;
            border: 1px solid #ddd; box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          @media print {
            body { margin: 0; padding: 0; background: white; }
            .no-print { display: none !important; }
            .min-h-screen { background: white !important; padding: 0 !important; }
            .receipt {
              max-width: 76mm !important; border: none !important;
              box-shadow: none !important; padding: 3mm !important;
              margin: 0 auto !important;
            }
            @page { size: 76mm 297mm; }
          }
        `})]})]})}export{l as default};