<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Desain;
use App\Models\Kategoridesain;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DesainController extends Controller
{
    public function index()
    {
        $desain = Desain::with('customer', 'kategoridesain', 'desainer')->get();

        $kategoridesain = Kategoridesain::all();
        $customer = Customer::all();
        $kodespk = 'SPK-' . date('ymd') . rand(0, 10000);
        $cek = Desain::first();
        if ($cek == false) {
            $kode_antrian = 'ANT-00001';
        } else {
            $ant = Desain::orderBy('id', 'desc')->first();
            $number = (int) substr($ant->no_antrian, 4);
            $number++;
            $kode_antrian = 'ANT-' . str_pad($number, 5, '0', STR_PAD_LEFT);
        }

        $tanggal = date('Y-m-d');

        return Inertia::render('Admin/Desain', compact('customer', 'kategoridesain', 'kodespk', 'kode_antrian', 'tanggal', 'desain'));
    }

    public function store(Request $request)
    {
        $kategori = Kategoridesain::find($request->id_kategori_desain);
        $harga = $kategori->harga ?? 0;
        $total_harga = $harga * $request->qty;

        $cs = new Desain;
        $cs->no_antrian = $request->kodeantiran;
        // $cs->kode_spk = $request->kodespk;
        $cs->tanggal = $request->tanggal;
        $cs->id_customer = $request->id_customer;
        $cs->id_kategori_desain = $request->id_kategori_desain;
        $cs->qty = $request->qty;
        $cs->total_harga = $total_harga;
        $cs->id_desain = auth()->id();
        $cs->status = 0;
        $cs->save();

        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $kategori = Kategoridesain::find($request->id_kategori_desain);
        $harga = $kategori->harga ?? 0;
        $total_harga = $harga * $request->qty;

        $cs = Desain::find($id);
        $cs->id_customer = $request->id_customer;
        $cs->id_kategori_desain = $request->id_kategori_desain;
        $cs->qty = $request->qty;
        $cs->total_harga = $total_harga;
        $cs->id_desain = auth()->id();
        $cs->update();

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    public function delete($id)
    {
        $cs = Desain::find($id);
        $cs->delete();

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }
}
