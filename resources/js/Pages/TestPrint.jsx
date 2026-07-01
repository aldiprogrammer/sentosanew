import { Head } from '@inertiajs/react'
import { useRef } from 'react'

const items = [
  { nama: 'Nasi Goreng Spesial', qty: 2, harga: 25000 },
  { nama: 'Ayam Bakar Madu', qty: 1, harga: 35000 },
  { nama: 'Es Teh Manis', qty: 2, harga: 5000 },
  { nama: 'Jus Alpukat', qty: 1, harga: 15000 },
  { nama: 'Pisang Goreng', qty: 3, harga: 10000 },
]

const receiptData = {
  noNota: 'STR-20260630-001',
  tanggal: '30/06/2026 14:30',
  kasir: 'Rina',
  customer: 'Walk-in',
  items,
  subtotal: 0,
  pajak: 0,
  total: 0,
  bayar: 200000,
  kembali: 0,
}

receiptData.subtotal = items.reduce((sum, i) => sum + i.qty * i.harga, 0)
receiptData.pajak = Math.round(receiptData.subtotal * 0.1)
receiptData.total = receiptData.subtotal + receiptData.pajak
receiptData.kembali = receiptData.bayar - receiptData.total

function formatRp(n) {
  return 'Rp ' + n.toLocaleString('id-ID')
}

export default function TestPrint() {
  const iframeRef = useRef(null)

  function handlePrint() {
    const iframe = iframeRef.current
    if (!iframe) return

    const doc = iframe.contentWindow.document
    doc.open()
    doc.write(buildReceiptHTML())
    doc.close()

    iframe.onload = function () {
      iframe.contentWindow.focus()
      iframe.contentWindow.print()
    }

    setTimeout(function () {
      iframe.contentWindow.focus()
      iframe.contentWindow.print()
    }, 500)
  }

  const itemRows = receiptData.items
    .map(
      (item) => `
      <tr>
        <td style="padding:3px 0">${item.nama}</td>
        <td style="text-align:center;padding:3px 0">${item.qty}</td>
        <td style="text-align:right;padding:3px 0">${item.harga.toLocaleString('id-ID')}</td>
        <td style="text-align:right;padding:3px 0">${(item.qty * item.harga).toLocaleString('id-ID')}</td>
      </tr>`,
    )
    .join('')

  function buildReceiptHTML() {
    return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8">
<style>
  @page { size: 76mm 297mm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Courier New', 'Courier', monospace;
    font-size: 12px; max-width: 76mm; margin: 0 auto; padding: 3mm; color: #000;
  }
  h1 { font-size: 16px; text-align: center; letter-spacing: 2px; margin-bottom: 2px; }
  .alamat { text-align: center; font-size: 10px; margin-bottom: 4px; }
  hr { border: none; border-top: 1px dashed #000; margin: 4px 0; }
  table { width: 100%; font-size: 11px; border-collapse: collapse; }
  th { border-top: 1px dashed #000; border-bottom: 1px dashed #000; padding: 3px 0; }
  th:nth-child(1) { text-align: left; }
  th:nth-child(2) { text-align: center; }
  th:nth-child(3), th:nth-child(4) { text-align: right; }
  td { padding: 2px 0; }
  td:nth-child(1) { text-align: left; }
  td:nth-child(2) { text-align: center; }
  td:nth-child(3), td:nth-child(4) { text-align: right; }
  .row { display: flex; justify-content: space-between; font-size: 11px; padding: 1px 0; }
  .total { font-size: 14px; font-weight: bold; border-top: 2px double #000; padding-top: 3px; }
  .footer { text-align: center; font-size: 10px; margin-top: 8px; }
</style>
</head>
<body>
  <h1>RUMAH MAKAN SENTOSA</h1>
  <div class="alamat">Jl. Merdeka No. 123, Jakarta</div>
  <div class="alamat">Telp: (021) 1234-5678</div>
  <hr>
  <div class="row"><span>No. Nota</span><span>${receiptData.noNota}</span></div>
  <div class="row"><span>Tanggal</span><span>${receiptData.tanggal}</span></div>
  <div class="row"><span>Kasir</span><span>${receiptData.kasir}</span></div>
  <div class="row"><span>Customer</span><span>${receiptData.customer}</span></div>
  <hr>
  <table><thead><tr><th>Item</th><th>Qty</th><th>Harga</th><th>Subtotal</th></tr></thead>
  <tbody>${itemRows}</tbody></table>
  <hr>
  <div class="row"><span>Subtotal</span><span>${formatRp(receiptData.subtotal)}</span></div>
  <div class="row"><span>Pajak (10%)</span><span>${formatRp(receiptData.pajak)}</span></div>
  <div class="row total"><span>TOTAL</span><span>${formatRp(receiptData.total)}</span></div>
  <div class="row"><span>Bayar</span><span>${formatRp(receiptData.bayar)}</span></div>
  <div class="row"><span>Kembali</span><span>${formatRp(receiptData.kembali)}</span></div>
  <hr>
  <div class="footer">--- Metode Pembayaran ---</div>
  <div class="footer">TUNAI</div>
  <div class="footer" style="margin-top:4px">Terima kasih sudah berbelanja!</div>
  <div class="footer" style="color:#666;font-size:9px">Barang yang sudah dibeli tidak dapat ditukar</div>
  <div class="footer" style="color:#666;font-size:9px">kembali kecuali ada kerusakan dari pabrik</div>
</body></html>`
  }

  return (
    <>
      <Head title="Test Print Struk" />
      <div className="min-h-screen bg-base-200 p-4">
        <div className="max-w-md mx-auto mb-6 flex justify-center gap-3 no-print">
          <button className="btn btn-primary btn-lg" onClick={handlePrint}>
            <i className="fas fa-print mr-2"></i>
            Print Struk
          </button>
          <button className="btn btn-lg" onClick={() => window.print()}>
            <i className="fas fa-file mr-2"></i>
            Print Preview
          </button>
        </div>

        <div className="receipt">
          <h1 className="text-lg font-bold text-center tracking-wider">RUMAH MAKAN SENTOSA</h1>
          <p className="text-[10px] text-center">Jl. Merdeka No. 123, Jakarta</p>
          <p className="text-[10px] text-center">Telp: (021) 1234-5678</p>
          <hr className="border-t border-dashed border-gray-400 my-2" />

          <div className="text-[11px] space-y-[1px]">
            <div className="flex justify-between"><span>No. Nota</span><span className="font-medium">{receiptData.noNota}</span></div>
            <div className="flex justify-between"><span>Tanggal</span><span>{receiptData.tanggal}</span></div>
            <div className="flex justify-between"><span>Kasir</span><span>{receiptData.kasir}</span></div>
            <div className="flex justify-between"><span>Customer</span><span>{receiptData.customer}</span></div>
          </div>
          <hr className="border-t border-dashed border-gray-400 my-2" />

          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-t border-b border-dashed border-gray-400">
                <th className="text-left py-[2px]">Item</th>
                <th className="text-center py-[2px]">Qty</th>
                <th className="text-right py-[2px]">Harga</th>
                <th className="text-right py-[2px]">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {receiptData.items.map((item, i) => (
                <tr key={i}>
                  <td className="py-[2px]">{item.nama}</td>
                  <td className="text-center py-[2px]">{item.qty}</td>
                  <td className="text-right py-[2px]">{item.harga.toLocaleString('id-ID')}</td>
                  <td className="text-right py-[2px]">{(item.qty * item.harga).toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr className="border-t border-dashed border-gray-400 my-2" />

          <div className="text-[11px] space-y-[1px]">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatRp(receiptData.subtotal)}</span></div>
            <div className="flex justify-between"><span>Pajak (10%)</span><span>{formatRp(receiptData.pajak)}</span></div>
            <div className="flex justify-between font-bold text-[13px] border-t-2 border-double border-gray-400 pt-1">
              <span>TOTAL</span><span>{formatRp(receiptData.total)}</span>
            </div>
            <div className="flex justify-between"><span>Bayar</span><span>{formatRp(receiptData.bayar)}</span></div>
            <div className="flex justify-between font-medium"><span>Kembali</span><span>{formatRp(receiptData.kembali)}</span></div>
          </div>
          <hr className="border-t border-dashed border-gray-400 my-2" />

          <div className="text-center text-[11px] space-y-[2px]">
            <p className="font-medium">--- Metode Pembayaran ---</p>
            <p>TUNAI</p>
            <p className="mt-1">Terima kasih sudah berbelanja!</p>
            <p className="text-[9px] text-gray-500">Barang yang sudah dibeli tidak dapat ditukar</p>
            <p className="text-[9px] text-gray-500">kembali kecuali ada kerusakan dari pabrik</p>
          </div>
        </div>

        <iframe ref={iframeRef} className="hidden" title="print-frame" />

        <style>{`
          .receipt {
            max-width: 76mm; margin: 0 auto; background: white; padding: 3mm;
            font-family: 'Courier New', Courier, monospace;
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
        `}</style>
      </div>
    </>
  )
}
