import { Head } from '@inertiajs/react'
import { useEffect, useRef, useState } from 'react'

const QZ_SCRIPTS = [
    'https://cdn.jsdelivr.net/npm/qz-tray@2.2.6/qz-tray.js',
    'https://cdn.qz.io/2.2.1/qz.min.js',
]

const ESC = 0x1b
const GS = 0x1d

function encodeText(str) {
    const bytes = []
    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i)
        if (code < 128) {
            bytes.push(code)
        } else {
            bytes.push(0x3f)
        }
    }
    return bytes
}

function init() {
    return [ESC, 0x40]
}

function setAlign(n) {
    return [ESC, 0x61, n]
}

function setSize(n) {
    return [GS, 0x21, n]
}

function setBold(on) {
    return [ESC, 0x45, on ? 1 : 0]
}

function feed(n) {
    return Array(n).fill(0x0a)
}

function cut() {
    return [GS, 0x56, 0x00]
}

function line(str) {
    return [...encodeText(str), 0x0a]
}

function padRight(str, width) {
    if (str.length >= width) return str
    return str + ' '.repeat(width - str.length)
}

function padLeft(str, width) {
    if (str.length >= width) return str
    return ' '.repeat(width - str.length) + str
}

function buildSampleReceipt() {
    const items = [
        ['BANNER 3x1 METER', 2, 150000],
        ['STICKER CUTTING', 5, 25000],
        ['BROSUR A5', 100, 3000],
    ]
    let subtotal = 0
    items.forEach((it) => { subtotal += it[1] * it[2] })
    const total = subtotal

    const out = []
    out.push(...init())
    out.push(...setAlign(1), ...setSize(0x11))
    out.push(...encodeText('SENTOSA PRINT'))
    out.push(...feed(1))
    out.push(...setSize(0x00))
    out.push(...line('TEST PRINT QZ TRAY'))
    out.push(...feed(1))
    out.push(...setAlign(0))
    out.push(...line('--------------------------------'))
    out.push(...line('ITEM                 QTY   TOTAL'))
    out.push(...line('--------------------------------'))
    items.forEach(([nama, qty, harga]) => {
        const nameCol = nama.slice(0, 19)
        out.push(...line(padRight(nameCol, 20) + padLeft(String(qty), 4) + '  ' + padLeft(String(harga * qty).padStart(7, ' '), 7)))
    })
    out.push(...line('--------------------------------'))
    out.push(...line('Subtotal          ' + padLeft(String(subtotal).padStart(14, ' '), 14)))
    out.push(...setBold(true), ...line('TOTAL             ' + padLeft(String(total).padStart(14, ' '), 14)), ...setBold(false))
    out.push(...feed(1))
    out.push(...setAlign(1))
    out.push(...line('--- Terima kasih ---'))
    out.push(...feed(3))
    out.push(...cut())
    return new Uint8Array(out)
}

function buildSimpleTest() {
    const out = []
    out.push(...init())
    out.push(...setAlign(1))
    out.push(...setSize(0x11))
    out.push(...line('*** QZ TRAY TEST ***'))
    out.push(...setSize(0x00))
    out.push(...setAlign(0))
    out.push(...line('Printer OK'))
    out.push(...feed(3))
    out.push(...cut())
    return new Uint8Array(out)
}

function buildCustomText(text) {
    const lines = text.split('\n')
    const out = []
    out.push(...init())
    lines.forEach((ln) => out.push(...line(ln)))
    out.push(...feed(3))
    out.push(...cut())
    return new Uint8Array(out)
}

function buildHtmlReceipt() {
    return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Test QZ Tray</title></head>
<body style="font-family:Consolas,'Lucida Console',monospace;font-size:13px;width:76mm;color:#000;margin:0;">
  <h2 style="text-align:center;margin:0 0 4px 0;">SENTOSA PRINT</h2>
  <div style="text-align:center;font-size:11px;">Jl. Merdeka No. 123</div>
  <hr style="border:none;border-top:1px dashed #000;margin:6px 0;">
  <div style="display:flex;justify-content:space-between;font-size:12px;">
    <span>No. Nota</span><span>STR-2026-001</span>
  </div>
  <div style="display:flex;justify-content:space-between;font-size:12px;">
    <span>Tanggal</span><span>${new Date().toLocaleDateString('id-ID')}</span>
  </div>
  <table style="width:100%;font-size:12px;border-collapse:collapse;margin-top:4px;">
    <thead><tr>
      <th style="text-align:left;border-top:1px dashed #000;border-bottom:1px dashed #000;padding:3px 0;">Item</th>
      <th style="text-align:center;border-top:1px dashed #000;border-bottom:1px dashed #000;padding:3px 0;">Qty</th>
      <th style="text-align:right;border-top:1px dashed #000;border-bottom:1px dashed #000;padding:3px 0;">Total</th>
    </tr></thead>
    <tbody>
      <tr><td>Banner 3x1</td><td style="text-align:center;">2</td><td style="text-align:right;">300.000</td></tr>
      <tr><td>Sticker Cutting</td><td style="text-align:center;">5</td><td style="text-align:right;">125.000</td></tr>
    </tbody>
  </table>
  <hr style="border:none;border-top:1px dashed #000;margin:6px 0;">
  <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:bold;">
    <span>TOTAL</span><span>Rp 425.000</span>
  </div>
  <div style="text-align:center;font-size:11px;margin-top:8px;">Terima kasih!</div>
</body></html>`
}

function loadQz() {
    return new Promise((resolve, reject) => {
        if (window.qz) {
            resolve()
            return
        }
        const tryLoad = (index) => {
            if (index >= QZ_SCRIPTS.length) {
                reject(new Error('Semua sumber qz.js gagal dimuat'))
                return
            }
            const script = document.createElement('script')
            script.src = QZ_SCRIPTS[index]
            script.onload = () => resolve()
            script.onerror = () => tryLoad(index + 1)
            document.head.appendChild(script)
        }
        tryLoad(0)
    })
}

export default function TestPrintQz() {
    const [connected, setConnected] = useState(false)
    const [connecting, setConnecting] = useState(false)
    const [printers, setPrinters] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [logs, setLogs] = useState([])
    const [customText, setCustomText] = useState(
        () => localStorage.getItem('testPrintQz.customText') ||
            'PERCETAKAN SENTOSA\nJl. Merdeka No. 123\n\nBaris 1\nBaris 2\nBaris 3',
    )
    const [selectedPrinter, setSelectedPrinter] = useState(
        () => localStorage.getItem('testPrintQz.printer') || '',
    )
    const logRef = useRef(null)
    const loadedRef = useRef(false)
    const connectedRef = useRef(false)
    const connectingRef = useRef(false)
    const disconnectManualRef = useRef(false)
    const reconnectTimerRef = useRef(null)

    const setSelectedPrinterPersist = (value) => {
        localStorage.setItem('testPrintQz.printer', value || '')
        setSelectedPrinter(value)
    }

    const setCustomTextPersist = (value) => {
        localStorage.setItem('testPrintQz.customText', value)
        setCustomText(value)
    }

    const addLog = (msg) => {
        setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString('id-ID')}] ${msg}`])
    }

    const doConnect = async () => {
        if (connectingRef.current) return
        if (connectedRef.current) return
        disconnectManualRef.current = false
        connectingRef.current = true
        setConnecting(true)
        try {
            await qz.websocket.connect({ retries: 3 })
            connectedRef.current = true
            setConnected(true)
            addLog('WebSocket terhubung ke QZ Tray.')

            try {
                const version = await qz.api.showQZVersion()
                addLog(`Versi QZ Tray: ${version}`)
            } catch (err) {
                addLog(`Gagal baca versi: ${err.message}`)
            }

            await findPrinters()
        } catch (err) {
            connectedRef.current = false
            setConnected(false)
            addLog(`Gagal terhubung: ${err.message}. Pastikan aplikasi QZ Tray sudah terinstall & berjalan, dan domain diizinkan di App Settings → Whitelist.`)
            if (!disconnectManualRef.current) {
                scheduleReconnect()
            }
        } finally {
            connectingRef.current = false
            setConnecting(false)
        }
    }

    const scheduleReconnect = () => {
        if (reconnectTimerRef.current) return
        reconnectTimerRef.current = setTimeout(() => {
            reconnectTimerRef.current = null
            if (!connectedRef.current && !disconnectManualRef.current) {
                addLog('Mencoba koneksi ulang otomatis...')
                doConnect()
            }
        }, 3000)
    }

    useEffect(() => {
        loadQz()
            .then(() => {
                loadedRef.current = true
                setLoaded(true)
                addLog('Library qz.js dimuat. Menghubungkan otomatis...')
                doConnect()
            })
            .catch((err) => addLog(`Error: ${err.message}`))
        return () => {
            if (reconnectTimerRef.current) {
                clearTimeout(reconnectTimerRef.current)
                reconnectTimerRef.current = null
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight
        }
    }, [logs])

    useEffect(() => {
        if (connectedRef.current && reconnectTimerRef.current) {
            clearTimeout(reconnectTimerRef.current)
            reconnectTimerRef.current = null
        }
    }, [connected])

    const handleDisconnect = async () => {
        disconnectManualRef.current = true
        try {
            await qz.websocket.disconnect()
            addLog('Koneksi ke QZ Tray ditutup.')
        } catch (err) {
            addLog(`Gagal disconnect: ${err.message}`)
        }
        connectedRef.current = false
        setConnected(false)
        setPrinters([])
        setSelectedPrinterPersist('')
    }

    const findPrinters = async () => {
        try {
            const list = await qz.printers.find()
            setPrinters(list)
            addLog(`Ditemukan ${list.length} printer.`)
            list.forEach((p) => addLog(`  - ${p}`))

            const saved = localStorage.getItem('testPrintQz.printer')
            if (saved && list.includes(saved)) {
                setSelectedPrinterPersist(saved)
                addLog(`Printer tersimpan dipulihkan: ${saved}`)
            } else {
                setSelectedPrinter((prev) => {
                    if (list.includes(prev)) return prev
                    return list.length > 0 ? list[0] : ''
                })
            }

            if (list.length === 0) {
                addLog('Tidak ada printer terdeteksi oleh QZ Tray. Cek: (1) printer & driver terinstall di Windows, (2) izin di QZ Tray App Settings.')
            }
        } catch (err) {
            addLog(`Gagal mencari printer: ${err.message}`)
        }
    }
    const handleFindPrinters = async () => {
        if (!connected) {
            addLog('Belum terhubung ke QZ Tray.')
            return
        }
        await findPrinters()
    }

    const getPrinter = () => {
        if (!connected) {
            addLog('Belum terhubung ke QZ Tray.')
            return null
        }
        if (!selectedPrinter) {
            addLog('Pilih printer terlebih dahulu.')
            return null
        }
        return selectedPrinter
    }

    const printRaw = async (bytes) => {
        const printer = getPrinter()
        if (!printer) return
        try {
            const config = qz.configs.create(printer, { copies: 1 })
            const data = [
                { type: 'raw', format: 'command', flavor: 'plain', data: Array.from(bytes) },
            ]
            await qz.print(config, data)
            addLog(`Berhasil kirim ${bytes.length} byte ke "${printer}".`)
        } catch (err) {
            addLog(`Gagal print: ${err.message}`)
        }
    }

    const handlePrintRaw = () => printRaw(buildSimpleTest())

    const handlePrintReceipt = () => printRaw(buildSampleReceipt())

    const handlePrintCustom = () => printRaw(buildCustomText(customText))

    const handlePrintHtml = async () => {
        const printer = getPrinter()
        if (!printer) return
        try {
            const config = qz.configs.create(printer, { copies: 1 })
            await qz.print(config, [
                { type: 'pixel', format: 'html', flavor: 'plain', data: buildHtmlReceipt() },
            ])
            addLog(`Berhasil print HTML ke "${printer}".`)
        } catch (err) {
            addLog(`Gagal print HTML: ${err.message}`)
        }
    }

    return (
        <>
            <Head title="Test Print QZ Tray" />
            <div className="min-h-screen bg-base-200 p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="card bg-base-100 shadow-md border border-base-300">
                        <div className="card-body">
                            <h1 className="card-title text-xl">
                                <i className="fas fa-print text-success"></i> Test Print — QZ Tray
                            </h1>
                            <p className="text-sm text-base-content/70">
                                Menggunakan <strong>QZ Tray</strong> (native app). Install &amp; jalankan QZ Tray di
                                komputer, lalu pastikan domain aplikasi ini diizinkan di <em>App Settings → Whitelist</em>.
                            </p>
                            <div className="alert alert-info text-sm mt-2">
                                <i className="fas fa-info-circle"></i>
                                <div>
                                    Jika muncul dialog <strong>Allow / Deny</strong> dari QZ Tray, klik <strong>Allow</strong>{' '}
                                    <u>sambil mencentang</u> <strong>&quot;Remember this decision&quot;</strong> agar dialog
                                    tidak muncul lagi di PC tersebut (disimpan di <code>%APPDATA%\qz\allowed.dat</code>).
                                    Kalau tidak dicentang, dialog akan muncul lagi setiap halaman dibuka ulang.
                                </div>
                            </div>

                            {!loaded && (
                                <div className="alert alert-warning text-sm">
                                    <i className="fas fa-exclamation-triangle"></i>
                                    Memuat library qz.js...
                                </div>
                            )}

                            <div className="flex flex-wrap items-end gap-3 mt-2">
                                <div className={`badge badge-lg ${connected ? 'badge-success' : 'badge-neutral'} gap-2`}>
                                    <span className={`w-2 h-2 rounded-full ${connected ? 'bg-success' : 'bg-base-content/40'}`}></span>
                                    {connected ? 'Terhubung' : 'Belum terhubung'}
                                </div>

                                {!connected ? (
                                    <button className="btn btn-success btn-sm" onClick={doConnect} disabled={connecting || !loaded}>
                                        {connecting ? (
                                            <>
                                                <span className="loading loading-spinner loading-xs"></span> Menghubungkan...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-plug"></i> Hubungkan QZ Tray
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <button className="btn btn-error btn-sm" onClick={handleDisconnect}>
                                        <i className="fas fa-unlink"></i> Putuskan
                                    </button>
                                )}

                                <button className="btn btn-outline btn-sm" onClick={handleFindPrinters} disabled={!connected}>
                                    <i className="fas fa-search"></i> Cari Printer
                                </button>

                                <label className="form-control w-full max-w-xs">
                                    <span className="label-text text-xs">Pilih Printer</span>
                                    <select
                                        className="select select-bordered select-sm"
                                        value={selectedPrinter}
                                        onChange={(e) => {
                                            setSelectedPrinterPersist(e.target.value)
                                            addLog(`Printer dipilih: ${e.target.value}`)
                                        }}
                                        disabled={!connected}
                                    >
                                        <option value="">-- Pilih Printer --</option>
                                        {printers.map((p) => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            {connected && selectedPrinter && (
                                <div className="alert alert-success text-sm mt-2">
                                    <i className="fas fa-print"></i>
                                    Printer aktif: <strong>{selectedPrinter}</strong>
                                </div>
                            )}

                            {connected && printers.length === 0 && (
                                <div className="alert alert-info text-sm mt-2">
                                    <i className="fas fa-info-circle"></i>
                                    Tidak ada printer terdeteksi. Pastikan printer sudah terhubung ke Windows dan klik <strong>Cari Printer</strong>. Jika muncul dialog <strong>Allow / Deny</strong> dari QZ Tray, klik <strong>Allow</strong> <u>dengan mencentang &quot;Remember this decision&quot;</u>.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-md border border-base-300">
                        <div className="card-body">
                            <h2 className="card-title text-lg">
                                <i className="fas fa-paper-plane text-info"></i> Cetak Raw (ESC/POS)
                            </h2>
                            <div className="alert alert-warning text-sm">
                                <i className="fas fa-exclamation-triangle"></i>
                                Mode RAW hanya didukung printer thermal/kasir (Epson, TM-T20, TM-U220, dll).
                                Printer inkjet/laser seperti <strong>Canon iP2700</strong> tidak membaca ESC/POS —
                                untuk itu gunakan <strong>Cetak HTML</strong> di bawah.
                            </div>
                            <div className="flex flex-wrap gap-3 mt-2">
                                <button className="btn btn-primary" onClick={handlePrintRaw}>
                                    <i className="fas fa-tachometer-alt"></i> Test Cepat
                                </button>
                                <button className="btn btn-success" onClick={handlePrintReceipt}>
                                    <i className="fas fa-receipt"></i> Cetak Struk Contoh
                                </button>
                                <button className="btn btn-warning" onClick={handlePrintCustom}>
                                    <i className="fas fa-font"></i> Cetak Teks Kustom
                                </button>
                            </div>
                            <label className="form-control w-full mt-4">
                                <span className="label-text text-xs">Teks Kustom</span>
                                <textarea
                                    className="textarea textarea-bordered textarea-sm font-mono w-full"
                                    rows={6}
                                    value={customText}
                                    onChange={(e) => setCustomTextPersist(e.target.value)}
                                />
                            </label>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-md border border-base-300">
                        <div className="card-body">
                            <h2 className="card-title text-lg">
                                <i className="fas fa-file-alt text-accent"></i> Cetak HTML
                            </h2>
                            <p className="text-sm text-base-content/70">
                                Mencetak struk berbasis HTML melalui driver printer. <strong>Ini metode yang benar untuk
                                inkjet/laser</strong> (Canon, Epson inkjet, HP) dan juga thermal raster.
                            </p>
                            <div className="mt-2">
                                <button className="btn btn-accent" onClick={handlePrintHtml}>
                                    <i className="fas fa-file-code"></i> Print Struk HTML
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-md border border-base-300">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <h2 className="card-title text-lg">
                                    <i className="fas fa-terminal text-accent"></i> Log
                                </h2>
                                <button className="btn btn-ghost btn-xs" onClick={() => setLogs([])}>
                                    <i className="fas fa-trash"></i> Bersihkan
                                </button>
                            </div>
                            <pre
                                ref={logRef}
                                className="bg-neutral text-neutral-content rounded-lg p-3 text-xs font-mono h-48 overflow-y-auto whitespace-pre-wrap"
                            >
                                {logs.length === 0 ? 'Belum ada aktivitas...' : logs.join('\n')}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
