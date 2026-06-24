<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Bahanpakai;
use App\Models\Materbahan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BahanpakaiController extends Controller
{
    public function index()
    {
        $bahanpakai = Bahanpakai::with('masterBahan')->orderBy('id', 'desc')->get();
        $masterBahan = Materbahan::orderBy('kode_bahan_jual')->get();
        $cek = Bahanpakai::first();
        if ($cek == false) {
            $kode = 'BB-' . '00001';
        } else {
            $ant = Bahanpakai::orderBy('id', 'desc')->first();
            $number = (int) substr($ant->kode_bahan, 4);
            $number++;
            $kode = 'BB-' . str_pad($number, 5, '0', STR_PAD_LEFT);
        }

        return Inertia::render('Admin/Bahanpakai', compact('bahanpakai', 'masterBahan', 'kode'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_master_bahan' => ['required', 'string', 'max:30'],
            'kode_bahan' => ['required', 'string', 'max:30'],
            'keterangan' => ['required', 'string'],
            'panjang' => ['required', 'string', 'max:30'],
            'lebar' => ['required', 'string', 'max:30'],
            'total' => ['required', 'string', 'max:30'],
            'satuan' => ['required', 'string', 'max:30'],
        ]);

        $bb = new Bahanpakai;
        $bb->id_master_bahan = $request->id_master_bahan;
        $bb->kode_bahan = $request->kode_bahan;
        $bb->keterangan = $request->keterangan;
        $bb->panjang = $request->panjang;
        $bb->lebar = $request->lebar;
        $bb->total = $request->total;
        $bb->satuan = $request->satuan;
        $bb->save();

        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'id_master_bahan' => ['required', 'string', 'max:30'],
            'kode_bahan' => ['required', 'string', 'max:30'],
            'keterangan' => ['required', 'string'],
            'panjang' => ['required', 'string', 'max:30'],
            'lebar' => ['required', 'string', 'max:30'],
            'total' => ['required', 'string', 'max:30'],
            'satuan' => ['required', 'string', 'max:30'],
        ]);

        $bb = Bahanpakai::findOrFail($id);
        $bb->id_master_bahan = $request->id_master_bahan;
        $bb->kode_bahan = $request->kode_bahan;
        $bb->keterangan = $request->keterangan;
        $bb->panjang = $request->panjang;
        $bb->lebar = $request->lebar;
        $bb->total = $request->total;
        $bb->satuan = $request->satuan;
        $bb->update();

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    public function delete($id)
    {
        $bb = Bahanpakai::findOrFail($id);
        $bb->delete();

        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }
}
