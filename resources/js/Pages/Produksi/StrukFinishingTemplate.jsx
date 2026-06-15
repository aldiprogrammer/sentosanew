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

const normalizeFinishing = (value) =>
    String(value || '').toLowerCase().replace(/\s/g, '')

const isSameFinishing = (value, target) =>
    normalizeFinishing(value) === normalizeFinishing(target)

const getFinishingTableRows = (item) => {
    const pinising = item.pinising || {}
    const mataAyam = item.mata_ayam || item.mataAyam || {}
    const sides = [
        ['atas', 'A'],
        ['bawah', 'B'],
        ['kanan', 'Ka'],
        ['kiri', 'Ki'],
    ]
    const targets = [
        ['Kentering', 'Kentering'],
        ['Lipat Pas Gbr', 'Lipat Pas Gambar'],
        ['Potong Pas Gbr', 'Potong Pas Gambar'],
        ['Lipat Sisa Putih', 'Lipat Sisa Putih'],
    ]
    const rows = targets.map(([label]) => [
        label,
        ...sides.map(([key]) => (isSameFinishing(pinising[key], label) ? 'v' : '')),
    ])
    rows.push([
        'Mata Ayam',
        ...sides.map(([key]) => (mataAyam[key] ? 'v' : '')),
    ])
    return rows
}

const styles = `
    @page { size: 76mm auto; margin: 2mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { width: 70mm; margin: 0; color: #000; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 12px; line-height: 1.1; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .receipt { width: 70mm; padding: 2mm; }
    .header { text-align: center; margin-bottom: 4px; }
    .brand-row { display: flex; flex-direction: column; justify-content: center; align-items: center; }
    .logo-img { width: 200px; height: auto; display: block; margin-bottom: 3px; }
    .spk-row { display: flex; justify-content: space-between; gap: 4mm; margin-top: 8px; font-size: 15px; font-weight: 700; }
    .section-title { margin-top: 6px; font-size: 12px; font-weight: 700; }
    .line { border-top: 1px solid #000; margin: 5px 0 4px; }
    .row { display: grid; grid-template-columns: 9mm 3mm 18mm 9mm 3mm 1fr; gap: 0; margin-bottom: 3px; }
    .customer, .description, .note { overflow-wrap: anywhere; font-size: 12px; font-weight: 700; }
    .material { overflow-wrap: anywhere; font-weight: 700; }
    .design { margin: 4px 0; padding-left: 4mm; overflow-wrap: anywhere; }
    table { width: 100%; border-collapse: collapse; margin-top: 3px; table-layout: fixed; }
    th, td { border: 1px solid #000; padding: 3px 2px; text-align: center; vertical-align: top; overflow-wrap: anywhere; }
    th { font-weight: 700; }
    .finish-label { width: 32mm; text-align: left; }
    .footer { display: flex; justify-content: space-between; margin-top: 20px; font-size: 10px; }
    .bottom-spk { margin-top: 12px; font-size: 15px; font-weight: 700; }
    .label-row { margin-top: 6px; font-size: 12px; font-weight: 700; }
`

function FinishingReceipt({ item }) {
    const printedAt = new Date()
    const finishingRows = getFinishingTableRows(item)

    return (
        <div className="receipt">
            <div className="header">
                <div className="brand-row">
                    <img src="/logo.png" alt="Sentosa" className="logo-img" />
                </div>
            </div>
            <br />
            <div className="spk-row">
                <span>{item.kode_spk}</span>
                <span>{formatReceiptDate(printedAt)}</span>
            </div>
            <div className="section-title">Pelanggan :</div>
            <div className="customer">{item.customer?.nama}</div>
            <div className="section-title">Keterangan</div>
            <div className="line"></div>
            <div className="material">{item.bahan?.kode} {item.bahan?.bahan}</div>
            <div className="font-style-italic">{item.catatan}</div>
            <div className="row">
                <span>W</span><span>:</span><strong>{item.lebar}</strong>
                <span>H</span><span>:</span><strong>{item.tinggi} {item.satuan}</strong>
            </div>
            <div className="row">
                <span>Qty</span><span>:</span><strong>{item.qty}</strong>
                <span></span><span></span><strong></strong>
            </div>
            <div className="section-title">Finishingan :</div>
            <table>
                <thead>
                    <tr>
                        <th className="finish-label"></th>
                        <th>A</th>
                        <th>B</th>
                        <th>Ka</th>
                        <th>Ki</th>
                    </tr>
                </thead>
                <tbody>
                    {finishingRows.map(([label, atas, bawah, kanan, kiri], i) => (
                        <tr key={i}>
                            <td className="finish-label">{label}</td>
                            <td>{atas}</td>
                            <td>{bawah}</td>
                            <td>{kanan}</td>
                            <td>{kiri}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="section-title">Catatan :</div>
            <div className="note">{item.pinising?.catatan || ''}</div>
            <div className="footer">
                <span>{formatReceiptDate(printedAt)}</span>
                <span>{formatReceiptTime(printedAt)}</span>
            </div>
            <div className="line"></div>
            <div className="bottom-spk">{item.kode_spk}</div>
            <div className="label-row">No Label :</div>
            <div className="line" style={{ marginTop: '28px' }}></div>
        </div>
    )
}

function FinishingReceiptDocument({ item }) {
    return (
        <html>
            <head>
                <title>Struk Finishing {item.kode_spk}</title>
                <style>{styles}</style>
            </head>
            <body>
                <FinishingReceipt item={item} />
            </body>
        </html>
    )
}

export const buildFinishingReceiptHtml = (item) =>
    `<!doctype html>${renderToStaticMarkup(<FinishingReceiptDocument item={item} />)}`
