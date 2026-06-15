import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const formatReceiptDate = (date = new Date()) =>
    new Intl.DateTimeFormat('id-ID', {
        day: '2-digit', month: 'short', year: 'numeric',
    }).format(date)

const formatReceiptTime = (date = new Date()) =>
    new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit', minute: '2-digit', hour12: false,
    }).format(date)

const formatMoney = (value) =>
    Number(value || 0).toLocaleString('id-ID')

const styles = `
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
`

function DesainReceipt({ items, auth, paymentType, printedAt }) {
    const gtHarga = items.reduce((s, it) => s + Number(it.total_harga || 0), 0)
    const gtQty = items.reduce((s, it) => s + Number(it.qty || 0), 0)
    const firstItem = items[0]
    const invoiceNumber = firstItem?.no_invoice || firstItem?.no_antrian || '-'
    const cashierName = auth?.user?.username || auth?.user?.name || 'Admin'
    const paymentLabel = paymentType === 'utang' ? 'UTANG' : 'TUNAI'

    return (
        <div className="receipt">
            <div className="header">
                <div className="brand-row">
                    <img src="/logo.png" alt="Sentosa" className="logo-img" />
                </div>
            </div>
            <br />

            <div className="topline">
                <span className="invoice">{invoiceNumber}</span>
                <span>{formatReceiptDate(printedAt)}</span>
            </div>

            <div className="title"> FAKTUR DESAIN</div>
            <div className="block">
                <span className="label">Kepada Yth :</span>
                <div className="name font-bold">{firstItem?.customer?.nama || '-'}</div>
            </div>

            {/* <div className="line"></div> */}

            <table>
                <thead>
                    <tr>
                        <th>Pesanan</th>
                        <th style={{ width: '10mm' }}>Qty</th>
                        <th style={{ width: '18mm' }} className="jumlah">Harga</th>
                        <th style={{ width: '18mm' }} className="jumlah">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, i) => (
                        <tr key={item.id || i} className={i % 2 === 1 ? 'alt' : undefined}>
                            <td>{item.kategoridesain?.kategori || '-'}</td>
                            <td style={{ textAlign: 'center' }}>{item.qty || 0}</td>
                            <td className="jumlah">{formatMoney(item.kategoridesain?.harga || 0)}</td>
                            <td className="jumlah">{formatMoney(item.total_harga)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="summary">
                <div className="summary-row"><span>Total</span><span>{formatMoney(gtHarga)}</span></div>
                <div className="summary-row"><span>Bayar</span><span>0</span></div>
                <div className="summary-row"><span>Kembalian</span><span>0</span></div>
            </div>


            <div className="notes">
                <div>NB :</div>
                <div className>Hasil Print dikertas tidak bisa dijadikan acuan warna untuk hasil cetakan.Design diperiksa dengan baik dan teliti (warna, tulisan & peletakan).Kesalahan setelah dicetak tidak menjadi tanggung jawab kami</div>

            </div>

            <br />

            <div className="signatures">
                <div>
                    <div>Hormat Kami,</div>
                    <div className="sign-name">{cashierName}</div>
                </div>
                <div>
                    <div>Customer</div>
                    <div className="sign-name">{firstItem?.customer?.nama || '-'}</div>
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

function DesainReceiptDocument({ items, auth, paymentType, printedAt }) {
    const isMultiple = items.length > 1

    return (
        <html>
            <head>
                <title>Struk Desain - {isMultiple ? `${items.length} item` : items[0]?.kode_order}</title>
                <style>{styles}</style>
            </head>
            <body>
                <DesainReceipt
                    items={items}
                    auth={auth}
                    paymentType={paymentType}
                    printedAt={printedAt}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.addEventListener('load',function(){window.focus();setTimeout(function(){window.print()},300)});
                            window.addEventListener('afterprint',function(){window.close()});
                        `,
                    }}
                />
            </body>
        </html>
    )
}

export const buildDesainReceiptHtml = ({ items, auth, paymentType }) => {
    const printedAt = new Date()

    return `<!doctype html>${renderToStaticMarkup(
        <DesainReceiptDocument
            items={items}
            auth={auth}
            paymentType={paymentType}
            printedAt={printedAt}
        />
    )}`
}
