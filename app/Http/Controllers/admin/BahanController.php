<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Bahan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BahanController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $bahan = Bahan::when($search, function ($q, $search) {
            $q->where('bahan', 'like', "%{$search}%")
              ->orWhere('kode', 'like', "%{$search}%");
        })->orderBy('id', 'desc')->paginate(10);
        $bahan->appends(['search' => $search]);
        $kode = 'BH-' . rand(0, 100000);

        return Inertia::render('Admin/Bahan', compact('bahan', 'kode'));
    }

    public function store(Request $request)
    {
        $bh = new Bahan;
        $bh->kode = $request->kode;
        $bh->bahan = $request->bahan;
        $bh->kategori = $request->kategori;
        $bh->jenis = $request->jenis;
        $bh->satuan = $request->satuan;
        $bh->kategori_cetak = $request->kategori_cetak;
        $bh->jenis_bahan = $request->jenis_bahan;
        $bh->klik = $request->klik;
        $bh->qty = $request->qty;
        $bh->harga = 0;
        $bh->harga_umum = $request->harga_umum;
        $bh->harga_khusus = $request->harga_khusus;
        $bh->harga_member = $request->harga_member;
        $bh->harga_custom = $request->harga_custom;
        $bh->cara_perhitungan = $request->cara_perhitungan;
        $bh->save();

        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $bh = Bahan::find($id);
        $bh->kode = $request->kode;
        $bh->bahan = $request->bahan;
        $bh->kategori = $request->kategori;
        $bh->jenis = $request->jenis;
        $bh->satuan = $request->satuan;
        $bh->kategori_cetak = $request->kategori_cetak;
        $bh->jenis_bahan = $request->jenis_bahan;
        $bh->klik = $request->klik;
        $bh->qty = $request->qty;
        $bh->harga = 0;
        $bh->harga_umum = $request->harga_umum;
        $bh->harga_khusus = $request->harga_khusus;
        $bh->harga_member = $request->harga_member;
        $bh->harga_custom = $request->harga_custom;
        $bh->cara_perhitungan = $request->cara_perhitungan;
        $bh->update();

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    public function delete($id)
    {
        $bh = Bahan::find($id);
        $bh->delete();

        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }
}
