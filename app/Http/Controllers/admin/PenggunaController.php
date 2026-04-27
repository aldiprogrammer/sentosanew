<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Jabatan;
use App\Models\Pengguna;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class PenggunaController extends Controller
{
    function index()
    {
        $pengguna = Pengguna::all();
        $jabatan = Jabatan::all();
        return Inertia::render('Admin/Pengguna', compact('pengguna', 'jabatan'));
    }

    function store(Request $request)
    {
        $pg = new Pengguna();
        $pg->username = $request->username;
        $pg->role = $request->roele;
        $pg->password = Hash::make($request->password);
        $pg->save();
        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    function update(Request $request, $id)
    {
        $pg = Pengguna::find($id);
        $pg->username = $request->username;
        $pg->role = $request->roele;
        $pg->password = Hash::make($request->password);
        $pg->update();
        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    function delete($id)
    {
        $pg = Pengguna::find($id);
        $pg->update();
        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }
}
