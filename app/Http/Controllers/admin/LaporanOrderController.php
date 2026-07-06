<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Desain;
use App\Models\Produksi;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LaporanOrderController extends Controller
{
    public function index(Request $request)
    {
        $tglAwal = $request->query('tgl_awal');
        $tglAkhir = $request->query('tgl_akhir');
        $search = $request->query('search');
        $pembayaran = $request->query('pembayaran');

        $desain = Desain::with('customer', 'kategoridesain', 'desainer')
            ->when($search, function ($q, $search) {
                $q->where('no_invoice', 'like', "%{$search}%");
            })
            ->when($pembayaran, function ($q, $pembayaran) {
                $q->where('pembayaran', $pembayaran);
            })
            ->when($tglAwal, fn($q) => $q->where('tanggal', '>=', $tglAwal))
            ->when($tglAkhir, fn($q) => $q->where('tanggal', '<=', $tglAkhir))
            ->orderBy('id', 'desc')
            ->paginate(20)
            ->withQueryString();

        $produksi = Produksi::with('customer', 'bahan')
            ->when($search, function ($q, $search) {
                $q->where(function ($q) use ($search) {
                    $q->where('no_invoice', 'like', "%{$search}%")
                        ->orWhere('kode_spk', 'like', "%{$search}%");
                });
            })
            ->when($pembayaran, function ($q, $pembayaran) {
                $q->where('pembayaran', $pembayaran);
            })
            ->when($tglAwal, fn($q) => $q->where('tanggal', '>=', $tglAwal))
            ->when($tglAkhir, fn($q) => $q->where('tanggal', '<=', $tglAkhir))
            ->orderBy('id', 'desc')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/LaporanOrder', compact(
            'desain', 'produksi', 'tglAwal', 'tglAkhir', 'search', 'pembayaran'
        ));
    }

    public function pdfDesain(Request $request)
    {
        $data = $this->getFilteredDesain($request);
        $filters = $request->only(['tgl_awal', 'tgl_akhir', 'search', 'pembayaran']);
        $totalKeseluruhan = $data->sum('total_harga');

        $pdf = Pdf::loadView('pdf.laporan-order-desain', compact('data', 'filters', 'totalKeseluruhan'))
            ->setPaper('a4', 'landscape');

        return $pdf->stream('laporan-order-desain.pdf');
    }

    public function pdfProduksi(Request $request)
    {
        $data = $this->getFilteredProduksi($request);
        $filters = $request->only(['tgl_awal', 'tgl_akhir', 'search', 'pembayaran']);
        $totalKeseluruhan = $data->sum('total_harga');

        $pdf = Pdf::loadView('pdf.laporan-order-produksi', compact('data', 'filters', 'totalKeseluruhan'))
            ->setPaper('a4', 'landscape');

        return $pdf->stream('laporan-order-produksi.pdf');
    }

    private function getFilteredDesain(Request $request)
    {
        $tglAwal = $request->query('tgl_awal');
        $tglAkhir = $request->query('tgl_akhir');
        $search = $request->query('search');
        $pembayaran = $request->query('pembayaran');

        return Desain::with('customer', 'kategoridesain', 'desainer')
            ->when($search, function ($q, $search) {
                $q->where('no_invoice', 'like', "%{$search}%");
            })
            ->when($pembayaran, fn($q) => $q->where('pembayaran', $pembayaran))
            ->when($tglAwal, fn($q) => $q->where('tanggal', '>=', $tglAwal))
            ->when($tglAkhir, fn($q) => $q->where('tanggal', '<=', $tglAkhir))
            ->orderBy('id', 'desc')
            ->get();
    }

    private function getFilteredProduksi(Request $request)
    {
        $tglAwal = $request->query('tgl_awal');
        $tglAkhir = $request->query('tgl_akhir');
        $search = $request->query('search');
        $pembayaran = $request->query('pembayaran');

        return Produksi::with('customer', 'bahan')
            ->when($search, function ($q, $search) {
                $q->where(function ($q) use ($search) {
                    $q->where('no_invoice', 'like', "%{$search}%")
                        ->orWhere('kode_spk', 'like', "%{$search}%");
                });
            })
            ->when($pembayaran, fn($q) => $q->where('pembayaran', $pembayaran))
            ->when($tglAwal, fn($q) => $q->where('tanggal', '>=', $tglAwal))
            ->when($tglAkhir, fn($q) => $q->where('tanggal', '<=', $tglAkhir))
            ->orderBy('id', 'desc')
            ->get();
    }
}
