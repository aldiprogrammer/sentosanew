import { Head } from '@inertiajs/react'

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

export default function TestPrint() {
  return (
    <>
      <Head title="Test Print Struk" />

      <div className="min-h-screen bg-base-200 p-4">
        <div className="max-w-md mx-auto mb-6 flex justify-center gap-3">
          <button className="btn btn-primary" onClick={() => window.print()}>
            <i className="fas fa-print mr-2"></i>
            Print Struk
          </button>
          <button className="btn btn-outline" onClick={() => window.close()}>
            Tutup
          </button>
        </div>

        <div id="receipt" className="receipt mx-auto">
          <div className="text-center border-b border-dashed border-gray-400 pb-3 mb-3">
            <h1 className="text-lg font-bold tracking-wider">RUMAH MAKAN SENTOSA</h1>
            <p className="text-xs">Jl. Merdeka No. 123, Jakarta</p>
            <p className="text-xs">Telp: (021) 1234-5678</p>
          </div>

          <div className="text-xs mb-3 space-y-1">
            <div className="flex justify-between">
              <span>No. Nota</span>
              <span className="font-medium">{receiptData.noNota}</span>
            </div>
            <div className="flex justify-between">
              <span>Tanggal</span>
              <span>{receiptData.tanggal}</span>
            </div>
            <div className="flex justify-between">
              <span>Kasir</span>
              <span>{receiptData.kasir}</span>
            </div>
            <div className="flex justify-between">
              <span>Customer</span>
              <span>{receiptData.customer}</span>
            </div>
          </div>

          <table className="w-full text-xs mb-3">
            <thead>
              <tr className="border-t border-b border-dashed border-gray-400">
                <th className="text-left py-1">Item</th>
                <th className="text-center py-1">Qty</th>
                <th className="text-right py-1">Harga</th>
                <th className="text-right py-1">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {receiptData.items.map((item, i) => (
                <tr key={i}>
                  <td className="py-1">{item.nama}</td>
                  <td className="text-center py-1">{item.qty}</td>
                  <td className="text-right py-1">{item.harga.toLocaleString()}</td>
                  <td className="text-right py-1">{(item.qty * item.harga).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border-t border-dashed border-gray-400 pt-2 text-xs space-y-1">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rp {receiptData.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Pajak (10%)</span>
              <span>Rp {receiptData.pajak.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-sm border-t border-double border-gray-400 pt-1">
              <span>TOTAL</span>
              <span>Rp {receiptData.total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Bayar</span>
              <span>Rp {receiptData.bayar.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Kembali</span>
              <span>Rp {receiptData.kembali.toLocaleString()}</span>
            </div>
          </div>

          <div className="text-center mt-4 pt-3 border-t border-dashed border-gray-400 text-xs space-y-1">
            <p className="font-medium">--- Metode Pembayaran ---</p>
            <p>TUNAI</p>
            <p className="mt-2">Terima kasih sudah berbelanja!</p>
            <p className="text-[10px] text-gray-500">Barang yang sudah dibeli tidak dapat ditukar</p>
            <p className="text-[10px] text-gray-500">kembali kecuali ada kerusakan dari pabrik</p>
          </div>
        </div>

        <style>{`
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
        `}</style>
      </div>
    </>
  )
}
