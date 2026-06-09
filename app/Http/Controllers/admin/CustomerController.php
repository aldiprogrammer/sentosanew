<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        $customer = Customer::all();
        $kode = $this->kodeCustomer();

        return Inertia::render('Admin/Customer', compact('customer', 'kode'));
    }

    public function show($id)
    {
        $customer = Customer::find($id);

        return response()->json($customer);
    }

    public function store(Request $request)
    {
        $cs = new Customer;
        $cs->kode = $request->kode ?: $this->kodeCustomer();
        $cs->sapaan = $request->sapaan;
        $cs->nama = $request->nama;
        $cs->alamat = $request->alamat;
        $cs->nohp = str_replace('-', '', $request->nohp);
        $cs->kategori = $request->kategori;
        $cs->limit = str_replace('.', '', $request->limit ?: 0);
        $cs->save();

        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $cs = Customer::find($id);
        $cs->kode = $request->kode;
        $cs->sapaan = $request->sapaan;
        $cs->nama = $request->nama;
        $cs->alamat = $request->alamat;
        $cs->nohp = str_replace('-', '', $request->nohp);
        $cs->kategori = $request->kategori;
        $cs->limit = str_replace('.', '', $request->limit ?: 0);
        $cs->update();

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    public function delete($id)
    {
        $cs = Customer::find($id);
        $cs->delete();

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    private function kodeCustomer()
    {
        return 'CS-' . rand(100, 999);
    }
}
