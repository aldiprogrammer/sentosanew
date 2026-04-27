<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    function index()
    {
        $customer = Customer::all();
        $kode = 'CS-' . rand(0, 100000);
        return Inertia::render('Admin/Customer', compact('customer', 'kode'));
    }

    function store(Request $request)
    {
        $cs = new Customer();
        $cs->kode = $request->kode;
        $cs->nama = $request->nama;
        $cs->alamat = $request->alamat;
        $cs->nohp = $request->nohp;
        $cs->kategori = $request->kategori;
        $cs->save();
        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    function update(Request $request, $id)
    {
        $cs = Customer::find($id);
        $cs->kode = $request->kode;
        $cs->nama = $request->nama;
        $cs->alamat = $request->alamat;
        $cs->nohp = $request->nohp;
        $cs->kategori = $request->kategori;
        $cs->update();
        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    function delete($id)
    {
        $cs = Customer::find($id);
        $cs->delete();
        return redirect()->back()->with('success', 'Data berhasil diubah');
    }
}
