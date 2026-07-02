<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Desain;
use App\Models\Produksi;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LaporanPembukuanController extends Controller
{
    public function index(Request $request)
    {
        $data = $this->getFilteredData($request);

        $totalLunas = $data->where('pembayaran', 'lunas')->sum('total_harga');
        $totalHutang = $data->where('pembayaran', 'utang')->sum('total_harga');

        return Inertia::render('Admin/LaporanPembukuan', [
            'data' => $data,
            'totalLunas' => $totalLunas,
            'totalHutang' => $totalHutang,
            'today' => date('Y-m-d'),
            'filters' => $request->only(['tanggal_awal', 'tanggal_akhir', 'bulan', 'jenis']),
        ]);
    }

    public function pdf(Request $request)
    {
        $data = $this->getFilteredData($request);

        $totalLunas = $data->where('pembayaran', 'lunas')->sum('total_harga');
        $totalHutang = $data->where('pembayaran', 'utang')->sum('total_harga');
        $grandTotal = $totalLunas + $totalHutang;

        $pdf = Pdf::loadView('pdf.laporan-pembukuan', [
            'data' => $data,
            'totalLunas' => $totalLunas,
            'totalHutang' => $totalHutang,
            'grandTotal' => $grandTotal,
            'filters' => $request->only(['tanggal_awal', 'tanggal_akhir', 'bulan', 'jenis']),
        ])->setPaper('a4', 'landscape');

        return $pdf->stream('laporan-pembukuan.pdf');
    }

    private function getFilteredData(Request $request)
    {
        $tanggalAwal = $request->tanggal_awal;
        $tanggalAkhir = $request->tanggal_akhir;
        $bulan = $request->bulan;
        $jenisFilter = $request->jenis;

        $desain = collect();
        $produksi = collect();

        if (! $jenisFilter || $jenisFilter === 'Desain') {
            $desain = Desain::with('customer')
                ->whereNotNull('pembayaran')
                ->when($tanggalAwal, fn ($q) => $q->where('tanggal', '>=', $tanggalAwal))
                ->when($tanggalAkhir, fn ($q) => $q->where('tanggal', '<=', $tanggalAkhir))
                ->when($bulan, fn ($q) => $q->whereMonth('tanggal', $bulan))
                ->get()
                ->map(fn ($item) => $this->formatItem($item, 'Desain'));
        }

        if (! $jenisFilter || $jenisFilter === 'Produksi') {
            $produksi = Produksi::with('customer')
                ->whereNotNull('pembayaran')
                ->when($tanggalAwal, fn ($q) => $q->where('tanggal', '>=', $tanggalAwal))
                ->when($tanggalAkhir, fn ($q) => $q->where('tanggal', '<=', $tanggalAkhir))
                ->when($bulan, fn ($q) => $q->whereMonth('tanggal', $bulan))
                ->get()
                ->map(fn ($item) => $this->formatItem($item, 'Produksi'));
        }

        return collect($desain)
            ->concat($produksi)
            ->sortByDesc('tanggal')
            ->values();
    }

    private function formatItem($item, $jenis)
    {
        $jatuhTempo = null;
        $overdue = false;

        if ($item->customer && $item->customer->jatuh_tempo) {
            $jatuhTempo = date('Y-m-d', strtotime($item->tanggal.' + '.$item->customer->jatuh_tempo.' days'));
            $overdue = $item->pembayaran === 'utang' && strtotime($jatuhTempo) < strtotime(date('Y-m-d'));
        }

        return [
            'id' => $item->id,
            'tanggal' => $item->tanggal,
            'customer' => $item->customer->nama ?? '-',
            'id_customer' => $item->id_customer,
            'kode_spk' => $item->kode_spk,
            'no_invoice' => $item->no_invoice ?? null,
            'no_antrian' => $item->no_antrian ?? null,
            'jenis' => $jenis,
            'total_harga' => (int) $item->total_harga,
            'pembayaran' => $item->pembayaran,
            'jatuh_tempo' => $jatuhTempo,
            'overdue' => $overdue,
        ];
    }
}
