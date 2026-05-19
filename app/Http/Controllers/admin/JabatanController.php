<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Jabatan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JabatanController extends Controller
{
    public function index()
    {
        $jabatan = Jabatan::all();
        $kode = 'JB-'.rand(0, 100000);

        return Inertia::render('Admin/Jabatan', compact('jabatan', 'kode'));
    }

    public function store(Request $request)
    {
        $cs = new Jabatan;
        $cs->kode = $request->kode;
        $cs->jabatan = $request->jabatan;
        $cs->save();

        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $cs = Jabatan::find($id);
        $cs->kode = $request->kode;
        $cs->jabatan = $request->jabatan;
        $cs->update();

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    public function delete($id)
    {
        $cs = Jabatan::find($id);
        $cs->delete();

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }
}
