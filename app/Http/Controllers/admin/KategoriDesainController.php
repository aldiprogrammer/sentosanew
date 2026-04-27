<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Kategoridesain;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KategoriDesainController extends Controller
{
    function index()
    {
        $kategori = Kategoridesain::all();
        $kode = 'KD-' . rand(0, 100000);
        return Inertia::render('Admin/Kategoridesain', compact('kategori', 'kode'));
    }

    function store(Request $request)
    {
        $cs = new Kategoridesain();
        $cs->kode = $request->kode;
        $cs->kategori = $request->kategori;
        $cs->harga = $request->harga;
        $cs->save();
        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    function update(Request $request, $id)
    {
        $cs = Kategoridesain::find($id);
        $cs->kode = $request->kode;
        $cs->kategori = $request->kategori;
        $cs->harga = $request->harga;
        $cs->update();
        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    function delete($id)
    {
        $cs = Kategoridesain::find($id);
        $cs->delete();
        return redirect()->back()->with('success', 'Data berhasil diubah');
    }
}
