<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Kurir;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KurirController extends Controller
{
    public function index()
    {
        $kurir = Kurir::all();
        $cek = Kurir::first();
        if ($cek == false) {
            $kode = 'KR-'.'00001';
        } else {
            $ant = Kurir::orderBy('id', 'desc')->first();
            $number = (int) substr($ant->kode, 4);
            $number++;
            $kode = 'KR-'.str_pad($number, 5, '0', STR_PAD_LEFT);
        }

        return Inertia::render('Admin/Kurir', compact('kurir', 'kode'));
    }

    public function store(Request $request)
    {
        $kr = new Kurir;
        $kr->kode = $request->kode;
        $kr->nama = $request->nama;
        $kr->nohp = $request->nohp;
        $kr->save();

        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $kr = Kurir::find($id);
        $kr->kode = $request->kode;
        $kr->nama = $request->nama;
        $kr->nohp = $request->nohp;
        $kr->update();

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    public function delete($id)
    {
        $kr = Kurir::find($id);
        $kr->delete();

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }
}
