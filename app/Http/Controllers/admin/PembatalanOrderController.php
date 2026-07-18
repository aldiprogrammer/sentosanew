<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Desain;
use App\Models\Produksi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PembatalanOrderController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $tglAwal = $request->query('tgl_awal');
        $tglAkhir = $request->query('tgl_akhir');

        $desainBatal = Desain::with('customer', 'kategoridesain', 'desainer')
            ->whereNotNull('alasan_pembatalan')
            ->when($search, function ($q, $search) {
                $q->where(function ($qq) use ($search) {
                    $qq->where('no_invoice', 'like', "%{$search}%")
                        ->orWhereHas('customer', function ($qqq) use ($search) {
                            $qqq->where('nama', 'like', "%{$search}%");
                        })
                        ->orWhereHas('desainer', function ($qqq) use ($search) {
                            $qqq->where('username', 'like', "%{$search}%");
                        });
                });
            })
            ->when($tglAwal, fn ($q) => $q->where('tanggal', '>=', $tglAwal))
            ->when($tglAkhir, fn ($q) => $q->where('tanggal', '<=', $tglAkhir))
            ->orderBy('id', 'desc')
            ->paginate(20)
            ->withQueryString();

        $produksiBatal = Produksi::with('customer', 'bahan')
            ->whereNotNull('alasan_pembatalan')
            ->when($search, function ($q, $search) {
                $q->where(function ($qq) use ($search) {
                    $qq->where('kode_spk', 'like', "%{$search}%")
                        ->orWhere('no_invoice', 'like', "%{$search}%")
                        ->orWhereHas('customer', function ($qqq) use ($search) {
                            $qqq->where('nama', 'like', "%{$search}%");
                        });
                });
            })
            ->when($tglAwal, fn ($q) => $q->where('tanggal', '>=', $tglAwal))
            ->when($tglAkhir, fn ($q) => $q->where('tanggal', '<=', $tglAkhir))
            ->orderBy('id', 'desc')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/PembatalanOrder', compact('desainBatal', 'produksiBatal', 'search', 'tglAwal', 'tglAkhir'));
    }
}
