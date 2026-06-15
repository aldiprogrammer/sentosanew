<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Desain;
use App\Models\Produksi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataOrderController extends Controller
{
    public function index(Request $request)
    {
        $searchDesain = $request->query('search_desain');
        $searchProduksi = $request->query('search_produksi');
        $tglAwal = $request->query('tgl_awal');
        $tglAkhir = $request->query('tgl_akhir');

        $desain = Desain::with('customer', 'kategoridesain', 'desainer')
            ->when(auth()->user()->role === 'Desainer', function ($q) {
                $q->where('id_desain', auth()->id());
            })
            ->when($searchDesain, function ($q, $search) {
                $q->where(function ($q) use ($search) {
                    $q->where('no_invoice', 'like', "%{$search}%")
                      ->orWhereHas('customer', function ($q) use ($search) {
                          $q->where('nama', 'like', "%{$search}%");
                      });
                });
            })
            ->when($tglAwal, function ($q, $tglAwal) {
                $q->where('tanggal', '>=', $tglAwal);
            })
            ->when($tglAkhir, function ($q, $tglAkhir) {
                $q->where('tanggal', '<=', $tglAkhir);
            })
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString();

        $produksi = Produksi::with('customer', 'bahan')
            ->when(auth()->user()->role === 'Desainer', function ($q) {
                $q->where('id_desainer', auth()->id());
            })
            ->when($searchProduksi, function ($q, $search) {
                $q->where(function ($q) use ($search) {
                    $q->where('no_invoice', 'like', "%{$search}%")
                      ->orWhere('kode_spk', 'like', "%{$search}%")
                      ->orWhereHas('customer', function ($q) use ($search) {
                          $q->where('nama', 'like', "%{$search}%");
                      });
                });
            })
            ->when($tglAwal, function ($q, $tglAwal) {
                $q->where('tanggal', '>=', $tglAwal);
            })
            ->when($tglAkhir, function ($q, $tglAkhir) {
                $q->where('tanggal', '<=', $tglAkhir);
            })
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/DataOrder', compact('desain', 'produksi', 'tglAwal', 'tglAkhir', 'searchDesain', 'searchProduksi'));
    }
}
