<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Bahan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BahanController extends Controller
{
    function index()
    {
        $bahan = Bahan::all();
        return Inertia::render('Admin/Bahan', compact('bahan'));
    }

    function store(Request $request)
    {
        $bh = new Bahan();
        $bh->kode = $request->kode;
        $bh->bahan = $request->bahan;
        $bh->kategori = $request->kategori;
        $bh->save();
        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    function update(Request $request, $id)
    {
        $bh = Bahan::find($id);
        $bh->kode = $request->kode;
        $bh->bahan = $request->bahan;
        $bh->kategori = $request->kategori;
        $bh->update();
        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    function delete($id)
    {
        $bh = Bahan::find($id);
        $bh->delete();
        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }
}
