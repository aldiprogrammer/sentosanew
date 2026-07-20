<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Databahan;
use App\Models\HargaKhususCustomer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HargaKhususCustomerController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $data = HargaKhususCustomer::with(['customer', 'hargabahan.databahan'])
            ->when($search, function ($q, $search) {
                $q->whereHas('customer', function ($cq) use ($search) {
                    $cq->where('nama', 'like', "%{$search}%")
                        ->orWhere('kode', 'like', "%{$search}%");
                })->orWhereHas('hargabahan.databahan', function ($bq) use ($search) {
                    $bq->where('kode', 'like', "%{$search}%")
                        ->orWhere('bahan', 'like', "%{$search}%");
                });
            })
            ->orderBy('id', 'desc')
            ->paginate(20);
        $data->appends(['search' => $search]);

        $customers = Customer::orderBy('nama')->get(['id', 'kode', 'nama', 'kategori']);
        $bahan = Databahan::with('hargaBahan')->orderBy('id', 'desc')->get();

        return Inertia::render('Admin/HargaKhususCustomer', compact('data', 'customers', 'bahan'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'hargabahan_id' => 'required|exists:hargabahans,id',
            'customer_id' => 'required|exists:customers,id',
            'harga' => 'required|string',
        ]);

        HargaKhususCustomer::updateOrCreate(
            ['hargabahan_id' => $request->hargabahan_id, 'customer_id' => $request->customer_id],
            ['harga' => preg_replace('/\D/', '', $request->harga)]
        );

        return redirect()->back()->with('success', 'Harga khusus customer berhasil disimpan');
    }

    public function delete($id)
    {
        HargaKhususCustomer::findOrFail($id)->delete();

        return redirect()->back()->with('success', 'Data harga khusus berhasil dihapus');
    }
}
