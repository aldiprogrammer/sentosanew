<?php

namespace App\Http\Controllers\produksi;

use App\Http\Controllers\Controller;
use App\Models\Produksi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProduksiController extends Controller
{
    function index()
    {
        $produksi = Produksi::with('customer', 'bahan', 'pinising', 'mataAyam')->get();
        return Inertia::render('Produksi/Produksi', compact('produksi'));
    }

    function proses($id)
    {
        $pr = Produksi::find($id);
        if ($pr->status_finishing == 1) {
            $pr->status_finishing = 0;
        } else {
            $pr->status_finishing = 1;
        }
        $pr->update();
        return back()->with('success', 'Finishing berhasil diproses');
    }
}
