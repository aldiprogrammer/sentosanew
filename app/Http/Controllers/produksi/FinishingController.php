<?php

namespace App\Http\Controllers\produksi;

use App\Http\Controllers\Controller;
use App\Models\Produksi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FinishingController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $tglAwal = $request->query('tgl_awal');
        $tglAkhir = $request->query('tgl_akhir');

        $produksi = Produksi::with('customer', 'bahan', 'pinising', 'mataAyam')
            ->where('status_finishing', 1)
            ->where(function ($q) {
                $q->where('status_logistik', 0)->orWhereNull('status_logistik');
            })
            ->when($search, function ($q, $search) {
                $q->where(function ($qq) use ($search) {
                    $qq->where('kode_spk', 'like', "%{$search}%")
                        ->orWhere('no_invoice', 'like', "%{$search}%")
                        ->orWhere('keterangan', 'like', "%{$search}%")
                        ->orWhereHas('customer', function ($qqq) use ($search) {
                            $qqq->where('nama', 'like', "%{$search}%");
                        });
                });
            })
            ->when($tglAwal, fn ($q, $v) => $q->where('tanggal', '>=', $v))
            ->when($tglAkhir, fn ($q, $v) => $q->where('tanggal', '<=', $v))
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('Produksi/Finishing', compact('produksi', 'search', 'tglAwal', 'tglAkhir'));
    }

    public function proses($id)
    {
        $pr = Produksi::find($id);
        $pr->status_logistik = 1;
        $pr->update();

        return back()->with('success', 'Finishing berhasil diproses');
    }

    public function kembalikan($id)
    {
        $pr = Produksi::findOrFail($id);
        $pr->status_finishing = 0;
        $pr->update();

        return back()->with('success', 'Berhasil dikembalikan ke produksi');
    }
}
