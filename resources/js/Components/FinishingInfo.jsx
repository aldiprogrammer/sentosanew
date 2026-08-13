import React from 'react'

function SideBox({ label, value, eyelet, sideClass }) {
    return (
        <div className={`flex flex-col items-center justify-center rounded-lg border border-base-300 bg-base-200/60 px-2 py-2 text-center ${sideClass}`}>
            <span className="text-[10px] font-bold uppercase tracking-wide text-base-content/50">{label}</span>
            <span className={`text-[11px] font-semibold leading-tight ${value ? 'text-base-content' : 'text-base-content/30'}`}>
                {value || '-'}
            </span>
            {eyelet && (
                <span className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-medium text-success">
                    <i className="fas fa-circle text-[6px]"></i> Mata Ayam
                </span>
            )}
        </div>
    )
}

export default function FinishingInfo({ item }) {
    if (!item) return null

    const pinising = item.pinising || item.pinisingData || {}
    const rawMata = item.mataAyam || item.mata_ayam || item.mataAyamArray || {}
    const mataAyam = Array.isArray(rawMata)
        ? {
            atas: rawMata.some((s) => String(s).toLowerCase() === 'atas'),
            bawah: rawMata.some((s) => String(s).toLowerCase() === 'bawah'),
            kanan: rawMata.some((s) => String(s).toLowerCase() === 'kanan'),
            kiri: rawMata.some((s) => String(s).toLowerCase() === 'kiri'),
        }
        : rawMata

    const sides = [
        { key: 'atas', label: 'Atas', value: pinising.atas || '', eyelet: Boolean(mataAyam.atas) },
        { key: 'bawah', label: 'Bawah', value: pinising.bawah || '', eyelet: Boolean(mataAyam.bawah) },
        { key: 'kanan', label: 'Kanan', value: pinising.kanan || '', eyelet: Boolean(mataAyam.kanan) },
        { key: 'kiri', label: 'Kiri', value: pinising.kiri || '', eyelet: Boolean(mataAyam.kiri) },
    ]

    const getSide = (key) => sides.find((s) => s.key === key)
    const hasAny = sides.some((s) => s.value || s.eyelet) || pinising.catatan

    if (!hasAny) return null

    return (
        <div className="rounded-xl border border-success/20 p-3">
            <div className="flex items-center gap-2 mb-2">
                <i className="fas fa-tools text-success"></i>
                <span className="text-xs font-bold uppercase tracking-wide text-success">Keterangan Finishing</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
                <div></div>
                <SideBox {...getSide('atas')} />
                <div></div>

                <SideBox {...getSide('kiri')} />
                <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-base-300 bg-base-100 p-2 text-center">
                    <div className="text-[10px] text-base-content/40 leading-tight">
                        <span className="block font-semibold">{item.bahan?.kode || ''} {item.bahan?.bahan || ''}</span>
                        <span className="block">{item.tinggi} × {item.lebar} {item.satuan}</span>
                        <span className="block">Qty: {item.qty} | {item.sisi}</span>
                    </div>
                </div>
                <SideBox {...getSide('kanan')} />

                <div></div>
                <SideBox {...getSide('bawah')} />
                <div></div>
            </div>

            {pinising.catatan && (
                <div className="mt-2 rounded-lg bg-base-100 border border-base-300 px-2 py-1.5 text-[11px]">
                    <span className="font-semibold text-base-content/60">Catatan: </span>
                    <span className="text-base-content">{pinising.catatan}</span>
                </div>
            )}
        </div>
    )
}
