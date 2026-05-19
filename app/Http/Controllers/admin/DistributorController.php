<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Distributor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DistributorController extends Controller
{
    public function index()
    {
        $ds = Distributor::all();
        $kode = 'DS-'.rand(0, 100000);

        return Inertia::render('Admin/Distributor', compact('ds', 'kode'));
    }

    public function store(Request $request)
    {
        $ds = new Distributor;
        $ds->kode = $request->kode;
        $ds->nama = $request->nama;
        $ds->alamat = $request->alamat;
        $ds->kota = $request->kota;
        $ds->nohp = $request->nohp;
        $ds->bank = $request->bank;
        $ds->norek = $request->norek;
        $ds->jt = $request->jt;

        $ds->save();

        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $ds = Distributor::find($id);
        $ds->kode = $request->kode;
        $ds->nama = $request->nama;
        $ds->alamat = $request->alamat;
        $ds->kota = $request->kota;
        $ds->nohp = $request->nohp;
        $ds->bank = $request->bank;
        $ds->norek = $request->norek;
        $ds->jt = $request->jt;
        $ds->update();

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    public function delete($id)
    {
        $ds = Distributor::find($id);
        $ds->delete();

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }
}
