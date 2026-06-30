import{n as e,r as t}from"./app-CpAdK8HW.js";var n=e(),r=[{nama:`Nasi Goreng Spesial`,qty:2,harga:25e3},{nama:`Ayam Bakar Madu`,qty:1,harga:35e3},{nama:`Es Teh Manis`,qty:2,harga:5e3},{nama:`Jus Alpukat`,qty:1,harga:15e3},{nama:`Pisang Goreng`,qty:3,harga:1e4}],i={noNota:`STR-20260630-001`,tanggal:`30/06/2026 14:30`,kasir:`Rina`,customer:`Walk-in`,items:r,subtotal:0,pajak:0,total:0,bayar:2e5,kembali:0};i.subtotal=r.reduce((e,t)=>e+t.qty*t.harga,0),i.pajak=Math.round(i.subtotal*.1),i.total=i.subtotal+i.pajak,i.kembali=i.bayar-i.total;function a(){return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t,{title:`Test Print Struk`}),(0,n.jsxs)(`div`,{className:`min-h-screen bg-base-200 p-4`,children:[(0,n.jsxs)(`div`,{className:`max-w-md mx-auto mb-6 flex justify-center gap-3`,children:[(0,n.jsxs)(`button`,{className:`btn btn-primary`,onClick:()=>window.print(),children:[(0,n.jsx)(`i`,{className:`fas fa-print mr-2`}),`Print Struk`]}),(0,n.jsx)(`button`,{className:`btn btn-outline`,onClick:()=>window.close(),children:`Tutup`})]}),(0,n.jsxs)(`div`,{id:`receipt`,className:`receipt mx-auto`,children:[(0,n.jsxs)(`div`,{className:`text-center border-b border-dashed border-gray-400 pb-3 mb-3`,children:[(0,n.jsx)(`h1`,{className:`text-lg font-bold tracking-wider`,children:`RUMAH MAKAN SENTOSA`}),(0,n.jsx)(`p`,{className:`text-xs`,children:`Jl. Merdeka No. 123, Jakarta`}),(0,n.jsx)(`p`,{className:`text-xs`,children:`Telp: (021) 1234-5678`})]}),(0,n.jsxs)(`div`,{className:`text-xs mb-3 space-y-1`,children:[(0,n.jsxs)(`div`,{className:`flex justify-between`,children:[(0,n.jsx)(`span`,{children:`No. Nota`}),(0,n.jsx)(`span`,{className:`font-medium`,children:i.noNota})]}),(0,n.jsxs)(`div`,{className:`flex justify-between`,children:[(0,n.jsx)(`span`,{children:`Tanggal`}),(0,n.jsx)(`span`,{children:i.tanggal})]}),(0,n.jsxs)(`div`,{className:`flex justify-between`,children:[(0,n.jsx)(`span`,{children:`Kasir`}),(0,n.jsx)(`span`,{children:i.kasir})]}),(0,n.jsxs)(`div`,{className:`flex justify-between`,children:[(0,n.jsx)(`span`,{children:`Customer`}),(0,n.jsx)(`span`,{children:i.customer})]})]}),(0,n.jsxs)(`table`,{className:`w-full text-xs mb-3`,children:[(0,n.jsx)(`thead`,{children:(0,n.jsxs)(`tr`,{className:`border-t border-b border-dashed border-gray-400`,children:[(0,n.jsx)(`th`,{className:`text-left py-1`,children:`Item`}),(0,n.jsx)(`th`,{className:`text-center py-1`,children:`Qty`}),(0,n.jsx)(`th`,{className:`text-right py-1`,children:`Harga`}),(0,n.jsx)(`th`,{className:`text-right py-1`,children:`Subtotal`})]})}),(0,n.jsx)(`tbody`,{children:i.items.map((e,t)=>(0,n.jsxs)(`tr`,{children:[(0,n.jsx)(`td`,{className:`py-1`,children:e.nama}),(0,n.jsx)(`td`,{className:`text-center py-1`,children:e.qty}),(0,n.jsx)(`td`,{className:`text-right py-1`,children:e.harga.toLocaleString()}),(0,n.jsx)(`td`,{className:`text-right py-1`,children:(e.qty*e.harga).toLocaleString()})]},t))})]}),(0,n.jsxs)(`div`,{className:`border-t border-dashed border-gray-400 pt-2 text-xs space-y-1`,children:[(0,n.jsxs)(`div`,{className:`flex justify-between`,children:[(0,n.jsx)(`span`,{children:`Subtotal`}),(0,n.jsxs)(`span`,{children:[`Rp `,i.subtotal.toLocaleString()]})]}),(0,n.jsxs)(`div`,{className:`flex justify-between`,children:[(0,n.jsx)(`span`,{children:`Pajak (10%)`}),(0,n.jsxs)(`span`,{children:[`Rp `,i.pajak.toLocaleString()]})]}),(0,n.jsxs)(`div`,{className:`flex justify-between font-bold text-sm border-t border-double border-gray-400 pt-1`,children:[(0,n.jsx)(`span`,{children:`TOTAL`}),(0,n.jsxs)(`span`,{children:[`Rp `,i.total.toLocaleString()]})]}),(0,n.jsxs)(`div`,{className:`flex justify-between`,children:[(0,n.jsx)(`span`,{children:`Bayar`}),(0,n.jsxs)(`span`,{children:[`Rp `,i.bayar.toLocaleString()]})]}),(0,n.jsxs)(`div`,{className:`flex justify-between font-medium`,children:[(0,n.jsx)(`span`,{children:`Kembali`}),(0,n.jsxs)(`span`,{children:[`Rp `,i.kembali.toLocaleString()]})]})]}),(0,n.jsxs)(`div`,{className:`text-center mt-4 pt-3 border-t border-dashed border-gray-400 text-xs space-y-1`,children:[(0,n.jsx)(`p`,{className:`font-medium`,children:`--- Metode Pembayaran ---`}),(0,n.jsx)(`p`,{children:`TUNAI`}),(0,n.jsx)(`p`,{className:`mt-2`,children:`Terima kasih sudah berbelanja!`}),(0,n.jsx)(`p`,{className:`text-[10px] text-gray-500`,children:`Barang yang sudah dibeli tidak dapat ditukar`}),(0,n.jsx)(`p`,{className:`text-[10px] text-gray-500`,children:`kembali kecuali ada kerusakan dari pabrik`})]})]}),(0,n.jsx)(`style`,{children:`
          @media print {
            body {
              margin: 0;
              padding: 0;
              background: white;
            }
            .btn, .navbar, .min-h-screen > div:first-child {
              display: none !important;
            }
            .min-h-screen {
              background: white !important;
              padding: 0 !important;
            }
            #receipt {
              box-shadow: none !important;
              border: none !important;
              padding: 8px !important;
              max-width: 80mm !important;
            }
            @page {
              margin: 0;
              size: 80mm auto;
            }
          }

          .receipt {
            max-width: 80mm;
            background: white;
            padding: 12px 8px;
            font-family: 'Courier New', Courier, monospace;
            border: 1px solid #ddd;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
        `})]})]})}export{a as default};