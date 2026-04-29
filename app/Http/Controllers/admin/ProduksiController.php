<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Bahan;
use App\Models\Desain;
use App\Models\Produksi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProduksiController extends Controller
{
    function index()
    {
        $produksi = Produksi::with('customer', 'bahan')->get();
        $desain = Desain::where('status', 0)->with('customer', 'kategoridesain')->get();
        $bahan = Bahan::all();
        return Inertia::render('Admin/Produksi', compact('produksi', 'desain', 'bahan'));
    }

    function store(Request $request)
    {
        $pr = new Produksi();
        $pr->tanggal = date('Y-m-d');
        $pr->id_customer = $request->id_customer;
        $pr->id_desain = $request->id_desain;
        $pr->no_antrian = $request->no_antrian;
        $pr->kode_spk = $request->kode_spk;
        $pr->id_bahan = $request->id_bahan;
        $pr->keterangan = $request->keterangan;
        $pr->satuan = $request->satuan;
        $pr->lebar = $request->lebar;
        $pr->tinggi = $request->tinggi;
        $pr->qty = $request->qty;
        $pr->catatan = '1';
        $pr->metode_pengantaran = $request->metode_pengambilan;
        $pr->tgl_kirim = $request->tgl_kirim;
        $pr->save();
        return redirect()->back()->with('success', 'Data barhasil ditambah');
    }

    function update(Request $request, $id)
    {
        $pr = Produksi::find($id);
        // $pr->tanggal = date('Y-m-d');
        $pr->id_customer = $request->id_customer;
        // $pr->id_desain = $request->id_desain;
        $pr->no_antrian = $request->no_antrian;
        $pr->kode_spk = $request->kode_spk;
        $pr->id_bahan = $request->id_bahan;
        $pr->keterangan = $request->keterangan;
        $pr->satuan = $request->satuan;
        $pr->lebar = $request->lebar;
        $pr->tinggi = $request->tinggi;
        $pr->qty = $request->qty;
        $pr->catatan = '1';
        $pr->metode_pengantaran = $request->metode_pengambilan;
        $pr->tgl_kirim = $request->tgl_kirim;
        $pr->update();
        return redirect()->back()->with('success', 'Data barhasil diubah');
    }

    function delete($id)
    {
        $pr = Produksi::find($id);
        $pr->delete();
        return redirect()->back()->with('success', 'Data barhasil dihapus');
    }
}
