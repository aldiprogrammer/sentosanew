<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Materbahan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaterbahanController extends Controller
{
    public function index()
    {
        $mater = Materbahan::orderBy('id', 'desc')->get();
        $cek = Materbahan::first();
        if ($cek == false) {
            $kode = 'MB-' . '00001';
        } else {
            $ant = Materbahan::orderBy('id', 'desc')->first();
            $number = (int) substr($ant->kode_bahan_pakai, 4);
            $number++;
            $kode = 'MB-' . str_pad($number, 5, '0', STR_PAD_LEFT);
        }

        return Inertia::render('Admin/Materbahan', compact('mater', 'kode'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'kode_bahan_pakai' => ['required', 'string', 'max:30'],
            'keterangan' => ['required', 'string'],
            'tanggal' => ['required', 'string', 'max:20'],
        ]);

        $mb = new Materbahan;
        $mb->kode_bahan_pakai = $request->kode_bahan_pakai;
        $mb->keterangan = $request->keterangan;
        $mb->tanggal = $request->tanggal;
        $mb->save();

        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'kode_bahan_pakai' => ['required', 'string', 'max:30'],
            'keterangan' => ['required', 'string'],
            'tanggal' => ['required', 'string', 'max:20'],
        ]);

        $mb = Materbahan::findOrFail($id);
        $mb->kode_bahan_pakai = $request->kode_bahan_pakai;
        $mb->keterangan = $request->keterangan;
        $mb->tanggal = $request->tanggal;
        $mb->update();

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    public function delete($id)
    {
        $mb = Materbahan::findOrFail($id);
        $mb->delete();

        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }
}
