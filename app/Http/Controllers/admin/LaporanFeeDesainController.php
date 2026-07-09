<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\FeeDesainTransaksi;
use App\Models\Pengguna;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LaporanFeeDesainController extends Controller
{
    public function index(Request $request)
    {
        $pengguna_id = $request->query('pengguna_id');
        $bulan = $request->query('bulan', date('m'));
        $tahun = $request->query('tahun', date('Y'));
        $tgl_awal = $request->query('tgl_awal');
        $tgl_akhir = $request->query('tgl_akhir');

        $query = FeeDesainTransaksi::with(['desain.customer', 'pengguna', 'kategoriDesain']);

        if (auth()->user()->role === 'Desainer') {
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

        $penggunas = Pengguna::where('role', 'Desainer')->orderBy('username')->get(['id', 'username']);

        $totals = FeeDesainTransaksi::selectRaw('
            COALESCE(SUM(CASE WHEN status = "belum_diambil" THEN fee ELSE 0 END), 0) as total_belum_diambil,
            COALESCE(SUM(CASE WHEN status = "diambil" THEN fee ELSE 0 END), 0) as total_diambil,
            COALESCE(SUM(fee), 0) as total_semua
        ')
            ->when(auth()->user()->role === 'Desainer', fn ($q) => $q->where('pengguna_id', auth()->id()))
            ->when(auth()->user()->role !== 'Desainer' && $pengguna_id, fn ($q) => $q->where('pengguna_id', $pengguna_id))
            ->when($tgl_awal && $tgl_akhir, fn ($q) => $q->whereBetween('tanggal', [$tgl_awal, $tgl_akhir]))
            ->when(! $tgl_awal && $bulan && $tahun, fn ($q) => $q->whereMonth('tanggal', $bulan)->whereYear('tanggal', $tahun))
            ->first();

        return Inertia::render('Admin/LaporanFeeDesain', compact(
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

        $query = FeeDesainTransaksi::where('status', 'belum_diambil');

        if (auth()->user()->role === 'Desainer') {
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

        $totalBelumDiambil = collect($data)->where('status', 'belum_diambil')->sum('fee');
        $totalDiambil = collect($data)->where('status', 'diambil')->sum('fee');
        $grandTotal = $totalBelumDiambil + $totalDiambil;

        $filters = $request->only(['pengguna_id', 'bulan', 'tahun', 'tgl_awal', 'tgl_akhir']);

        $pdf = Pdf::loadView('pdf.laporan-fee-desain', compact(
            'data', 'totalBelumDiambil', 'totalDiambil', 'grandTotal', 'filters'
        ))->setPaper('a4', 'landscape');

        return $pdf->stream('laporan-fee-desain.pdf');
    }

    private function getFilteredData(Request $request)
    {
        $pengguna_id = $request->query('pengguna_id');
        $bulan = $request->query('bulan', date('m'));
        $tahun = $request->query('tahun', date('Y'));
        $tgl_awal = $request->query('tgl_awal');
        $tgl_akhir = $request->query('tgl_akhir');

        $query = FeeDesainTransaksi::with(['desain.customer', 'pengguna', 'kategoriDesain']);

        if (auth()->user()->role === 'Desainer') {
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
