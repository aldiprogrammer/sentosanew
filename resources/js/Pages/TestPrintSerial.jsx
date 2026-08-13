import { Head } from '@inertiajs/react'
import { useEffect, useRef, useState } from 'react'

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

function text(str) {
    return encodeText(str)
}

function line(str) {
    return [...text(str), 0x0a]
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
    out.push(...text('SENTOSA PRINT'))
    out.push(...feed(1))
    out.push(...setSize(0x00))
    out.push(...line('TEST PRINT SERIAL'))
    out.push(...line('Printer  : TM-U220'))
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
    out.push(...line('Bayar             ' + padLeft(String(total).padStart(14, ' '), 14)))
    out.push(...line('Kembali           ' + padLeft('0'.padStart(14, ' '), 14)))
    out.push(...feed(1))
    out.push(...setAlign(1))
    out.push(...line('--- Terima kasih ---'))
    out.push(...line('Barang yang sudah dibeli'))
    out.push(...line('tidak dapat dikembalikan'))
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
    return new Uint8Array(out)
}

function buildTickerTest() {
    return new Uint8Array([
        ...init(),
        ...setAlign(1),
        ...line('  ***  TEST PRINTER  ***'),
        ...setAlign(0),
        ...feed(2),
        ...cut(),
    ])
}

export default function TestPrintSerial() {
    const [port, setPort] = useState(null)
    const [baudRate, setBaudRate] = useState(9600)
    const [logs, setLogs] = useState([])
    const [customText, setCustomText] = useState('PERCETAKAN SENTOSA\nJl. Merdeka No. 123\n\n=== Contoh Struk ===\nBaris 1\nBaris 2\nBaris 3')
    const [supportsSerial, setSupportsSerial] = useState(true)
    const logRef = useRef(null)

    useEffect(() => {
        if (!('serial' in navigator)) {
            setSupportsSerial(false)
        }
    }, [])

    useEffect(() => {
        if (logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight
        }
    }, [logs])

    const addLog = (msg) => {
        setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString('id-ID')}] ${msg}`])
    }

    const handleConnect = async () => {
        try {
            const selected = await navigator.serial.requestPort()
            await selected.open({ baudRate, dataBits: 8, stopBits: 1, parity: 'none', flowControl: 'none' })
            setPort(selected)
            addLog(`Terhubung: ${selected.getInfo?.()?.usbVendorId ?? '-'}:${selected.getInfo?.()?.usbProductId ?? '-'} @ ${baudRate} baud`)

            selected.addEventListener('disconnect', () => {
                setPort(null)
                addLog('Printer terputus')
            })
        } catch (err) {
            addLog(`Gagal terhubung: ${err.message}`)
        }
    }

    const handleDisconnect = async () => {
        if (!port) return
        try {
            if (port.readable) {
                port.readable.cancel?.()
            }
            if (port.writable) {
                await port.writable.abort?.()
            }
            await port.close()
            addLog('Koneksi ditutup')
        } catch (err) {
            addLog(`Gagal menutup: ${err.message}`)
        }
        setPort(null)
    }

    const send = async (data) => {
        if (!port) {
            addLog('Belum terhubung ke printer!')
            return
        }
        if (!port.writable) {
            addLog('Port tidak dapat ditulis!')
            return
        }
        try {
            const writer = port.writable.getWriter()
            await writer.write(data)
            writer.releaseLock()
            addLog(`Berhasil kirim ${data.byteLength} byte ke printer`)
        } catch (err) {
            addLog(`Gagal kirim: ${err.message}`)
        }
    }

    const handleBaudChange = async (e) => {
        const next = Number(e.target.value)
        if (port) {
            addLog('Baud diubah, silakan hubungkan ulang printer.')
            await handleDisconnect()
        }
        setBaudRate(next)
    }

    return (
        <>
            <Head title="Test Print Serial (TM-U220)" />
            <div className="min-h-screen bg-base-200 p-6">
                <div className="max-w-3xl mx-auto space-y-6">
                    <div className="card bg-base-100 shadow-md border border-base-300">
                        <div className="card-body">
                            <h1 className="card-title text-xl">
                                <i className="fas fa-print text-success"></i> Test Print Serial — Epson TM-U220
                            </h1>
                            <p className="text-sm text-base-content/70">
                                Menggunakan <strong>Web Serial API</strong> (Chrome/Edge). Printer harus terhubung via USB (virtual COM port).
                                Tanpa dialog print browser.
                            </p>

                            {!supportsSerial && (
                                <div className="alert alert-error text-sm">
                                    <i className="fas fa-exclamation-triangle"></i>
                                    Web Serial API tidak didukung browser ini. Gunakan Chrome atau Edge versi terbaru.
                                </div>
                            )}

                            <div className="flex flex-wrap items-end gap-3 mt-2">
                                <div className={`badge badge-lg ${port ? 'badge-success' : 'badge-neutral'} gap-2`}>
                                    <span className={`w-2 h-2 rounded-full ${port ? 'bg-success' : 'bg-base-content/40'}`}></span>
                                    {port ? 'Terhubung' : 'Belum terhubung'}
                                </div>

                                <label className="form-control w-full max-w-[180px]">
                                    <span className="label-text text-xs">Baud Rate (sesuai DIP switch printer)</span>
                                    <select className="select select-bordered select-sm" value={baudRate} onChange={handleBaudChange}>
                                        <option value={9600}>9600 (default)</option>
                                        <option value={19200}>19200</option>
                                        <option value={38400}>38400</option>
                                        <option value={57600}>57600</option>
                                        <option value={115200}>115200</option>
                                    </select>
                                </label>

                                {!port ? (
                                    <button className="btn btn-success btn-sm" onClick={handleConnect} disabled={!supportsSerial}>
                                        <i className="fas fa-plug"></i> Hubungkan Printer
                                    </button>
                                ) : (
                                    <button className="btn btn-error btn-sm" onClick={handleDisconnect}>
                                        <i className="fas fa-unlink"></i> Putuskan
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-md border border-base-300">
                        <div className="card-body">
                            <h2 className="card-title text-lg">
                                <i className="fas fa-paper-plane text-info"></i> Kirim Data ESC/POS
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                <button className="btn btn-primary" onClick={() => send(buildTickerTest())}>
                                    <i className="fas fa-tachometer-alt"></i> Test Cepat
                                </button>
                                <button className="btn btn-success" onClick={() => send(buildSampleReceipt())}>
                                    <i className="fas fa-receipt"></i> Cetak Struk Contoh
                                </button>
                                <button className="btn btn-warning" onClick={() => send(buildCustomText(customText))}>
                                    <i className="fas fa-font"></i> Cetak Teks Kustom
                                </button>
                            </div>
                            <label className="form-control w-full mt-4">
                                <span className="label-text text-xs">Teks Kustom</span>
                                <textarea
                                    className="textarea textarea-bordered textarea-sm font-mono w-full"
                                    rows={6}
                                    value={customText}
                                    onChange={(e) => setCustomText(e.target.value)}
                                />
                            </label>
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
