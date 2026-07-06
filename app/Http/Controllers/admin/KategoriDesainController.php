<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Kategoridesain;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KategoriDesainController extends Controller
{
    public function index()
    {
        $kategori = Kategoridesain::all();
        $kode = 'KD-'.rand(0, 100000);

        return Inertia::render('Admin/Kategoridesain', compact('kategori', 'kode'));
    }

    public function show($id)
    {
        $kategori = Kategoridesain::find($id);

        return response()->json($kategori);
    }

    public function store(Request $request)
    {
        $cs = new Kategoridesain;
        $cs->kode = $request->kode;
        $cs->kategori = $request->kategori;
        $cs->harga = str_replace('.', '', $request->harga ?: 0);
        $cs->qty = $request->qty;
        $cs->fee = $request->fee;
        $cs->fee_cs = str_replace('.', '', $request->fee_cs ?: 0);
        $cs->status_point = $request->status_point ? 1 : 0;
        $cs->save();

        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $cs = Kategoridesain::find($id);
        $cs->kode = $request->kode;
        $cs->kategori = $request->kategori;
        $cs->harga = str_replace('.', '', $request->harga ?: 0);
        $cs->qty = $request->qty;
        $cs->fee = $request->fee;
        $cs->fee_cs = str_replace('.', '', $request->fee_cs ?: 0);
        $cs->status_point = $request->status_point ? 1 : 0;
        $cs->update();

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    public function delete($id)
    {
        $cs = Kategoridesain::find($id);
        $cs->delete();

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }
}
