import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const formatReceiptDate = (date = new Date()) =>
    new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date)

const formatReceiptTime = (date = new Date()) =>
    new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(date)

const parseReceiptDate = (value) => {
    if (!value) return null
    if (typeof value === 'string') {
        const parts = value.match(/^(\d{2})-(\d{2})-(\d{4})$/)
        if (parts) {
            const [, day, month, year] = parts
            return new Date(Number(year), Number(month) - 1, Number(day))
        }
    }

    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? null : date
}

const formatReceiptDateShort = (value = new Date()) => {
    const date = value instanceof Date ? value : parseReceiptDate(value)
    if (!date) return value || '-'

    return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(date).replace(/\//g, '-')
}

const formatMoney = (value) =>
    Number(value || 0).toLocaleString('id-ID')

const receiptStyles = `
    @page { size: 76mm auto; margin: 2mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { width: 70mm; margin: 0; color: #000; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 12px; line-height: 1.1; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .receipt { width: 70mm; padding: 2mm; }
    .header { text-align: center; margin-bottom: 4px; }
    .brand-row { display: flex; flex-direction: column; justify-content: center; align-items: center; }
    .logo-img { width: 200px; height: auto; display: block; margin-bottom: 3px; }
    .brand { font-size: 20px; font-weight: 900; letter-spacing: 0; line-height: 1; }
    .sub { font-size: 10px; font-weight: 700; letter-spacing: 2px; margin-top: 1px; }
    .contact { font-size: 13px; font-weight: 700; margin-top: 2px; letter-spacing: 0; margin-right-30px }
    .topline { display: flex; justify-content: space-between; gap: 4px; margin-top: 2px; font-size: 12px; }
    .invoice { font-size: 13px; font-weight: 800; margin-top: 1px; }
    .title { font-size: 13px; font-weight: 800; margin-bottom: 4px; letter-spacing: 1px; }
    .block { margin-top: 2px; }
    .label { display: block; font-size: 11px; }
    .name { font-size: 14px; margin-top: 2px; }
    .address { min-height: 18px; overflow-wrap: anywhere; font-size: 12px; }
    .pay-row { display: grid; grid-template-columns: 1fr 1fr; margin: 5px 0 3px; text-align: center; font-size: 12px; }
    .line { border-top: 2px solid #000; margin: 4px 0; }
    table { width: 100%; border-collapse: collapse; table-layout: fixed; font-size: 12px; }
    th, td { padding: 3px 2px; text-align: left; vertical-align: middle; overflow-wrap: anywhere; }
    th { border-top: 2px solid #000; border-bottom: 2px solid #000; font-weight: 900; text-align: center; font-size: 12px; }
    td { padding-top: 4px; padding-bottom: 4px; }
    .bahan { width: 18mm; text-align: left; }
    .ukuran { width: 20mm; text-align: center; font-variant-numeric: tabular-nums; }
    .qty { width: 10mm; text-align: center; font-variant-numeric: tabular-nums; }
    .amount { width: 18mm; text-align: right; font-variant-numeric: tabular-nums; }
    .alt td { background: #eee; }
    .muted { color: #000; }
    .keterangan-row td { padding-top: 0; padding-bottom: 4px; font-size: 11px; }
    .summary { border-top: 3px solid #000; margin-top: 5px; padding-top: 4px; }
    .summary-row { display: grid; grid-template-columns: 29mm 1fr; gap: 2px; margin-bottom: 2px; font-size: 12px; }
    .summary-row span:last-child { text-align: right; font-variant-numeric: tabular-nums; font-weight: 700; }
    .notes { margin-top: 20px; font-size: 11px; line-height: 1.15; }
    .notes div { margin-bottom: 1px; }
    .signatures { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; margin-top: 7px; text-align: center; font-size: 12px; }
    .sign-name { margin-top: 28px; min-height: 14px; font-size: 13px; }
    .printed { display: grid; grid-template-columns: 15mm 1fr; column-gap: 2px; margin-top: 3px; font-size: 10px; }
    @media print { body { margin: 0; } }
`

function ProductionReceipt({ items, auth, paymentType, printedAt }) {
    const gtHarga = items.reduce((s, it) => s + Number(it.total_harga || 0), 0)
    const gtQty = items.reduce((s, it) => s + Number(it.qty || 0), 0)
    const firstItem = items[0]
    const firstCustomer = firstItem?.customer
    const invoiceNumber = firstItem?.no_invoice || firstItem?.kode_spk || '-'
    const selesaiDate = firstItem?.tgl_kirim || printedAt
    const cashierName = auth?.user?.username || auth?.user?.name || 'Admin'
    const paymentLabel = paymentType === 'utang' ? 'UTANG' : 'TUNAI'

    return (
        <div className="receipt">
            <div className="header">
                <div className="brand-row">
                    <img src="/logo.png" alt="Sentosa" className="logo-img" />
                    {/* <div>
                        <div className="brand">SENTOSA</div>
                        <div className="sub">DIGITAL PRINTING</div>
                    </div> */}
                </div>
                {/* <div className="contact">0811-6124-002</div> */}
            </div>
            <br />

            <div className="topline">
                <span className="invoice">{invoiceNumber}</span>
                <span>{formatReceiptDateShort(printedAt)}</span>
            </div>

            <div className="title">FAKTUR</div>
            <div className="block">
                <span className="label">Kepada Yth :</span>
                <div className="name">{firstCustomer?.nama || '-'}</div>
                <div className="address">{firstCustomer?.alamat || '-'}</div>
            </div>
            <div>Selesai : {formatReceiptDateShort(selesaiDate)}</div>
            <div className="">
                <span>Cara Bayar :</span>
                <strong>{paymentLabel}</strong>
            </div>

            <br />

            <table>
                <thead>
                    <tr>
                        <th className="bahan">Bahan</th>
                        <th className="ukuran">Ukuran</th>
                        <th className="qty">Qty</th>
                        <th className="amount">Jml</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, i) => (
                        <React.Fragment key={`${item.id || item.kode_spk}-${i}`}>
                            <tr className={i % 2 === 1 ? 'alt' : undefined}>
                                <td className="bahan">{item.bahan?.kode || '-'}</td>
                                <td className="ukuran">
                                    <span>{item.lebar || 0}</span>
                                    <span className="muted"> x </span>
                                    <span>{item.tinggi || 0}</span>
                                    <span className="muted"> {item.satuan || ''}</span>
                                </td>
                                <td className="qty">{item.qty || 0}</td>
                                <td className="amount">{formatMoney(item.total_harga)}</td>
                            </tr>
                            {(item.keterangan || item.kode_spk) && (
                                <tr className={`keterangan-row ${i % 2 === 1 ? 'alt' : ''}`}>
                                    <td className="keterangan" colSpan={4}>
                                        {item.keterangan || item.kode_spk}
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>

            <div className="summary">
                <div className="summary-row"><span>Total Faktur</span><span>{formatMoney(gtHarga)}</span></div>
                <div className="summary-row"><span>Bayar</span><span>0</span></div>
                <div className="summary-row"><span>Kembalian</span><span>0</span></div>
                <div className="summary-row"><span>Point</span><span>{formatMoney(gtQty)}</span></div>
            </div>

            <div className="notes">
                <div>* Diperiksa saat pengambilan / penerimaan barang pesanan.</div>
                <div>* Kami tidak bertanggung jawab atas kekurangan/kerusakan barang setelah diterima.</div>
                <div>* Barang yang tidak diambil selama 1 bulan bila hilang/rusak bukan tanggungan kami.</div>
            </div>

            <div className="signatures">
                <div>
                    <div>Hormat Kami,</div>
                    <div className="sign-name">{cashierName}</div>
                </div>
                <div>
                    <div>Customer</div>
                    <div className="sign-name">{firstCustomer?.nama || '-'}</div>
                </div>
            </div>

            <div className="printed">
                <span>Printed By :</span>
                <span>{cashierName}</span>
                <span></span>
                <span>{formatReceiptDate(printedAt)} {formatReceiptTime(printedAt)}</span>
            </div>
        </div>
    )
}

function ProductionReceiptDocument({ items, auth, paymentType, printedAt }) {
    const isMultiple = items.length > 1

    return (
        <html>
            <head>
                <title>
                    Struk Produksi - {isMultiple ? `${items.length} item` : items[0]?.kode_spk}
                </title>
                <style>{receiptStyles}</style>
            </head>
            <body>
                <ProductionReceipt
                    items={items}
                    auth={auth}
                    paymentType={paymentType}
                    printedAt={printedAt}
                />
            </body>
        </html>
    )
}

export const buildProductionReceiptHtml = ({ items, auth, paymentType }) => {
    const printedAt = new Date()

    return `<!doctype html>${renderToStaticMarkup(
        <ProductionReceiptDocument
            items={items}
            auth={auth}
            paymentType={paymentType}
            printedAt={printedAt}
        />
    )}`
}
