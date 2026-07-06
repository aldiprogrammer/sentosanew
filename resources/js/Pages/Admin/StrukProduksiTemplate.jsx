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
@page{
    size:76mm auto;
    margin:0;
}

html{
    margin:0;
    padding:0;
}

body{
    width:72mm;
    margin:0 auto;
    padding:2mm;
    color:#000;
    font-family:"Courier New", monospace;
    font-size:11px;
    line-height:1.25;
}

.receipt{
    width:100%;
}

.header{
    text-align:center;
    margin-bottom:5px;
}

.brand{
    font-size:22px;
    font-weight:bold;
}

.title{
    text-align:center;
    font-size:13px;
    font-weight:bold;
    margin:4px 0;
}

.topline{
    width:100%;
    overflow:hidden;
    margin-bottom:4px;
}

.topline .left{
    float:left;
}

.topline .right{
    float:right;
}

.clear{
    clear:both;
}

.block{
    margin-bottom:5px;
}

table{
    width:100%;
    border-collapse:collapse;
    table-layout:fixed;
}

th{
    border-top:1px solid #000;
    border-bottom:1px solid #000;
    padding:3px 1px;
    font-size:11px;
}

td{
    padding:2px 1px;
    font-size:11px;
}

.bahan{
    width:22%;
}

.ukuran{
    width:34%;
    text-align:center;
}

.qty{
    width:12%;
    text-align:center;
}

.amount{
    width:32%;
    text-align:right;
}

.summary{
    margin-top:6px;
    border-top:1px solid #000;
}

.summary table{
    width:100%;
}

.summary td{
    padding:2px 0;
}

.notes{
    margin-top:10px;
    font-size:10px;
}

.notes div{
    margin-bottom:3px;
}

.signatures{
    margin-top:18px;
    width:100%;
}

.signatures table{
    width:100%;
}

.sign-name{
    height:40px;
}

.printed{
    margin-top:8px;
    font-size:10px;
}
`

export const buildProductionReceiptHtml = ({ items, auth, paymentType }) => {
    const printedAt = new Date()
    const gtHarga = items.reduce((s, it) => s + Number(it.total_harga || 0), 0)
    const gtQty = items.reduce((s, it) => s + Number(it.qty || 0), 0)
    const firstItem = items[0]
    const firstCustomer = firstItem?.customer
    const invoiceNumber = firstItem?.no_invoice || firstItem?.kode_spk || '-'
    const selesaiDate = firstItem?.tgl_kirim || printedAt
    const cashierName = auth?.user?.username || auth?.user?.name || 'Admin'
    const paymentLabel = paymentType === 'utang' ? 'UTANG' : 'TUNAI'

    const itemRows = items.map((item, i) => `
            <tr${i % 2 === 1 ? ' class="alt"' : ''}>
                <td class="bahan">${item.bahan?.kode || '-'}</td>
                <td class="ukuran">
                    <span>${item.lebar || 0}</span>
                    <span class="muted"> x </span>
                    <span>${item.tinggi || 0}</span>
                    <span class="muted"> ${item.satuan || ''}</span>
                </td>
                <td class="qty">${item.qty || 0}</td>
                <td class="amount">${formatMoney(item.total_harga)}</td>
            </tr>
            ${(item.keterangan || item.kode_spk) ? `
            <tr class="keterangan-row${i % 2 === 1 ? ' alt' : ''}">
                <td class="keterangan" colspan="4">${item.keterangan || item.kode_spk}</td>
            </tr>` : ''}`
    ).join('')

    return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8">
<title>Struk Produksi - ${items.length > 1 ? items.length + ' item' : items[0]?.kode_spk}</title>
<style>${receiptStyles}</style>
</head>
<body>
    <div class="receipt">
        <div class="header">
            <div class="brand-row">
               <h1>SENTOSA</h1>
            </div>
        </div>

        <div class="topline">
    <div class="left">
        <strong>${invoiceNumber}</strong>
    </div>

    <div class="right">
        ${formatReceiptDateShort(printedAt)}
    </div>

    <div class="clear"></div>
</div>


        <div class="title">FAKTUR</div>
        <div class="block">
            <span class="label">Kepada Yth :</span>
            <div class="name">${firstCustomer?.nama || '-'}</div>
            <div class="address">${firstCustomer?.alamat || '-'}</div>
        </div>
        <div>Selesai : ${formatReceiptDateShort(selesaiDate)}</div>
        <div>
            <span>Cara Bayar :</span>
            <strong>${paymentLabel}</strong>
        </div>
        <table>
            <thead>
                <tr>
                    <th class="bahan">Bahan</th>
                    <th class="ukuran">Ukuran</th>
                    <th class="qty">Qty</th>
                    <th class="amount">Jml</th>
                </tr>
            </thead>
            <tbody>
                ${itemRows}
            </tbody>
        </table>

        <div class="summary">
            <div class="summary-row"><span>Total Faktur</span><span>${formatMoney(gtHarga)}</span></div>
            <div class="summary-row"><span>Bayar</span><span>0</span></div>
            <div class="summary-row"><span>Kembalian</span><span>0</span></div>
        </div>

        <div class="notes">
            <ul>
                <li>Diperiksa saat pengambilan / penerimaan barang pesanan.</li>
                <li>Kami tidak bertanggung jawab atas kekurangan/kerusakan barang setelah diterima.</li>
                <li>Barang yang tidak diambil selama 1 bulan bila hilang/rusak bukan tanggungan kami.</li>
            </ul>
        </div>

        <div class="signatures" style="margin-top: 10px; font-weight: bold;">
            <div>
                <div>Hormat Kami,</div>
                <div class="sign-name">${cashierName}</div>
            </div>
            <div>
                <div>Customer</div>
                <div class="sign-name">${firstCustomer?.nama || '-'}</div>
            </div>
        </div>

        <div class="printed" style="margin-top: 7px;">
            <span>Printed By : ${cashierName}</span>
            <span>${formatReceiptDate(printedAt)} ${formatReceiptTime(printedAt)}</span>
        </div>
    </div>
</body></html>`
}
