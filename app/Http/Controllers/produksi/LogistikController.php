<?php

namespace App\Http\Controllers\produksi;

use App\Http\Controllers\Controller;
use App\Models\Kurir;
use App\Models\Produksi;
use Inertia\Inertia;

class LogistikController extends Controller
{
    function index()
    {
        $produksi = Produksi::with('customer', 'bahan', 'pinising', 'mataAyam')
            ->where('status_logistik', 1)
            ->where('status_selesai', 0)
            ->orderBy('id', 'desc')
            ->get();
        $kurir = Kurir::all();
        return Inertia::render('Produksi/Logistik', compact('produksi', 'kurir'));
    }

    function proses($id)
    {
        $pr = Produksi::find($id);
        $pr->status_selesai = 1;
        $pr->update();
        return back()->with('success', 'Logistik berhasil diproses');
    }
}
