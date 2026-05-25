<?php

namespace App\Http\Controllers\produksi;

use App\Http\Controllers\Controller;
use App\Models\Produksi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FinishingController extends Controller
{
    function index()
    {
        $produksi = Produksi::with('customer', 'bahan', 'pinising', 'mataAyam')->where('status_finishing', 1)->get();
        return Inertia::render('Produksi/Finishing', compact('produksi'));
    }

    function proses($id)
    {
        $pr = Produksi::find($id);
        if ($pr->selesai == 1) {
            $pr->selesai = 0;
        } else {
            $pr->selesai = 1;
        }
        $pr->update();
        return back()->with('success', 'Finishing berhasil diproses');
    }
}
