<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Materbahan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaterbahanController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');

        $mater = Materbahan::when($search, function ($q, $search) {
            $q->where('kode_bahan_jual', 'like', "%{$search}%")
              ->orWhere('keterangan', 'like', "%{$search}%")
              ->orWhere('satuan', 'like', "%{$search}%");
        })
            ->orderBy('id', 'desc')
            ->paginate(10);
        $mater->appends(['search' => $search]);

        $kode = $this->kodeBahanJual();

        return Inertia::render('Admin/Materbahan', compact('mater', 'kode'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'kode_bahan_jual' => ['required', 'string', 'max:30'],
            'keterangan' => ['required', 'string'],
            'tanggal' => ['required', 'string', 'max:20'],
            'satuan' => ['nullable', 'string', 'max:30'],
        ]);

        $mb = new Materbahan;
        $mb->kode_bahan_jual = $request->kode_bahan_jual;
        $mb->keterangan = $request->keterangan;
        $mb->tanggal = $request->tanggal;
        $mb->satuan = $request->satuan;
        $mb->save();

        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'kode_bahan_jual' => ['required', 'string', 'max:30'],
            'keterangan' => ['required', 'string'],
            'tanggal' => ['required', 'string', 'max:20'],
            'satuan' => ['nullable', 'string', 'max:30'],
        ]);

        $mb = Materbahan::findOrFail($id);
        $mb->kode_bahan_jual = $request->kode_bahan_jual;
        $mb->keterangan = $request->keterangan;
        $mb->tanggal = $request->tanggal;
        $mb->satuan = $request->satuan;
        $mb->update();

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    public function delete($id)
    {
        $mb = Materbahan::findOrFail($id);
        $mb->delete();

        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }

    private function kodeBahanJual()
    {
        $cek = Materbahan::first();
        if ($cek == false) {
            return 'MB-' . '00001';
        }
        $ant = Materbahan::orderBy('id', 'desc')->first();
        $number = (int) substr($ant->kode_bahan_jual, 4);
        $number++;

        return 'MB-' . str_pad($number, 5, '0', STR_PAD_LEFT);
    }
}
