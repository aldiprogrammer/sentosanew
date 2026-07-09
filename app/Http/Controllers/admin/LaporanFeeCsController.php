<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\FeeCsTransaksi;
use App\Models\Pengguna;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LaporanFeeCsController extends Controller
{
    public function index(Request $request)
    {
        $pengguna_id = $request->query('pengguna_id');
        $bulan = $request->query('bulan', date('m'));
        $tahun = $request->query('tahun', date('Y'));
        $tgl_awal = $request->query('tgl_awal');
        $tgl_akhir = $request->query('tgl_akhir');

        $query = FeeCsTransaksi::with(['desain.customer', 'pengguna', 'kategoriDesain']);

        if (auth()->user()->role === 'Customer Service') {
            $query->where('pengguna_id', auth()->id());
        } elseif ($pengguna_id) {
            $query->where('pengguna_id', $pengguna_id);
        }

        if ($tgl_awal && $tgl_akhir) {
            $query->whereBetween('tanggal', [$tgl_awal, $tgl_akhir]);
        } elseif ($bulan && $tahun) {
            $query->whereMonth('tanggal', $bulan)->whereYear('tanggal', $tahun);
        }

        $transaksis = $query->orderBy('tanggal', 'desc')->orderBy('id', 'desc')->paginate(20);
        $transaksis->appends($request->query());

        $penggunas = Pengguna::where('role', 'Customer Service')->orderBy('username')->get(['id', 'username']);

        $totals = FeeCsTransaksi::selectRaw('
            COALESCE(SUM(CASE WHEN status = "belum_diambil" THEN fee_cs ELSE 0 END), 0) as total_belum_diambil,
            COALESCE(SUM(CASE WHEN status = "diambil" THEN fee_cs ELSE 0 END), 0) as total_diambil,
            COALESCE(SUM(fee_cs), 0) as total_semua
        ')
            ->when(auth()->user()->role === 'Customer Service', fn ($q) => $q->where('pengguna_id', auth()->id()))
            ->when(auth()->user()->role !== 'Customer Service' && $pengguna_id, fn ($q) => $q->where('pengguna_id', $pengguna_id))
            ->when($tgl_awal && $tgl_akhir, fn ($q) => $q->whereBetween('tanggal', [$tgl_awal, $tgl_akhir]))
            ->when(! $tgl_awal && $bulan && $tahun, fn ($q) => $q->whereMonth('tanggal', $bulan)->whereYear('tanggal', $tahun))
            ->first();

        return Inertia::render('Admin/LaporanFeeCs', compact(
            'transaksis', 'penggunas', 'pengguna_id',
            'bulan', 'tahun', 'tgl_awal', 'tgl_akhir', 'totals'
        ));
    }

    public function ambilFee(Request $request)
    {
        $ids = $request->input('ids', []);
        $pengguna_id = $request->input('pengguna_id');

        if (empty($ids) && ! $pengguna_id) {
            return back()->with('error', 'Pilih fee yang akan diambil');
        }

        $query = FeeCsTransaksi::where('status', 'belum_diambil');

        if (auth()->user()->role === 'Customer Service') {
            $query->where('pengguna_id', auth()->id());
        } elseif (! empty($ids)) {
            $query->whereIn('id', $ids);
        } elseif ($pengguna_id) {
            $query->where('pengguna_id', $pengguna_id);
        }

        $updated = $query->update([
            'status' => 'diambil',
            'diambil_at' => now(),
        ]);

        return back()->with('success', $updated.' fee berhasil diambil');
    }

    public function pdf(Request $request)
    {
        $data = $this->getFilteredData($request);

        $totalBelumDiambil = collect($data)->where('status', 'belum_diambil')->sum('fee_cs');
        $totalDiambil = collect($data)->where('status', 'diambil')->sum('fee_cs');
        $grandTotal = $totalBelumDiambil + $totalDiambil;

        $filters = $request->only(['pengguna_id', 'bulan', 'tahun', 'tgl_awal', 'tgl_akhir']);

        $pdf = Pdf::loadView('pdf.laporan-fee-cs', compact(
            'data', 'totalBelumDiambil', 'totalDiambil', 'grandTotal', 'filters'
        ))->setPaper('a4', 'landscape');

        return $pdf->stream('laporan-fee-cs.pdf');
    }

    private function getFilteredData(Request $request)
    {
        $pengguna_id = $request->query('pengguna_id');
        $bulan = $request->query('bulan', date('m'));
        $tahun = $request->query('tahun', date('Y'));
        $tgl_awal = $request->query('tgl_awal');
        $tgl_akhir = $request->query('tgl_akhir');

        $query = FeeCsTransaksi::with(['desain.customer', 'pengguna', 'kategoriDesain']);

        if (auth()->user()->role === 'Customer Service') {
            $query->where('pengguna_id', auth()->id());
        } elseif ($pengguna_id) {
            $query->where('pengguna_id', $pengguna_id);
        }

        if ($tgl_awal && $tgl_akhir) {
            $query->whereBetween('tanggal', [$tgl_awal, $tgl_akhir]);
        } elseif ($bulan && $tahun) {
            $query->whereMonth('tanggal', $bulan)->whereYear('tanggal', $tahun);
        }

        return $query->orderBy('tanggal', 'desc')->orderBy('id', 'desc')->get();
    }
}
