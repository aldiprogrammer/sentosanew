<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Databahan;
use App\Models\Hargabahan;
use App\Models\HargaKhususCustomer;
use App\Models\Materbahan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BahanController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $databahan = Databahan::with(['hargaBahan' => function ($q) {
            $q->with('hargaKhususCustomer.customer')->orderBy('qty_min')->orderBy('id');
        }])
            ->when($search, function ($q, $search) {
                $q->where(function ($query) use ($search) {
                    $query->where('bahan', 'like', "%{$search}%")
                        ->orWhere('kode', 'like', "%{$search}%")
                        ->orWhereHas('hargaBahan', function ($harga) use ($search) {
                            $harga->where('sisi', 'like', "%{$search}%")
                                ->orWhere('qty_min', 'like', "%{$search}%")
                                ->orWhere('qty_max', 'like', "%{$search}%");
                        });
                });
            })->orderBy('id', 'desc')->paginate(10);
        $databahan->appends(['search' => $search]);
        $kode = 'BH-'.rand(0, 100000);
        $materbahans = Materbahan::orderBy('kode_bahan_jual')->get(['id', 'kode_bahan_jual', 'keterangan', 'satuan']);
        $customers = Customer::orderBy('nama')->get(['id', 'kode', 'nama', 'kategori']);

        return Inertia::render('Admin/Bahan', compact('databahan', 'kode', 'materbahans', 'customers'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'kode' => ['required', 'string', 'max:30', 'unique:databahans,kode'],
            'bahan' => ['required', 'string', 'max:200'],
            'kategori' => ['required', 'string', 'max:35'],
        ]);

        DB::transaction(function () use ($request) {
            $db = Databahan::create($this->bahanPayload($request));

            if ($this->hasHargaPayload($request)) {
                Hargabahan::create($this->hargaPayload($request, $db->kode));
            }
        });

        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'kode' => ['required', 'string', 'max:30', 'unique:databahans,kode,'.$id],
            'bahan' => ['required', 'string', 'max:200'],
            'kategori' => ['required', 'string', 'max:35'],
        ]);

        DB::transaction(function () use ($request, $id) {
            $db = Databahan::findOrFail($id);
            $kodeLama = $db->kode;
            $db->update($this->bahanPayload($request));

            if ($kodeLama !== $request->kode) {
                Hargabahan::where('kode_bahan', $kodeLama)->update([
                    'kode_bahan' => $request->kode,
                ]);
            }
        });

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    public function storeHarga(Request $request, $kode)
    {
        Databahan::where('kode', $kode)->firstOrFail();
        Hargabahan::create($this->hargaPayload($request, $kode));

        return redirect()->back()->with('success', 'Harga bahan berhasil ditambah');
    }

    public function updateHarga(Request $request, $id)
    {
        $hb = Hargabahan::findOrFail($id);
        $hb->update($this->hargaPayload($request, $hb->kode_bahan));

        return redirect()->back()->with('success', 'Harga bahan berhasil diubah');
    }

    public function deleteHarga($id)
    {
        Hargabahan::findOrFail($id)->delete();

        return redirect()->back()->with('success', 'Harga bahan berhasil dihapus');
    }

    public function delete($id)
    {
        $db = Databahan::findOrFail($id);
        Hargabahan::where('kode_bahan', $db->kode)->delete();
        $db->delete();

        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }

    public function storeHargaKhususCustomer(Request $request, $hargabahanId)
    {
        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'harga' => 'nullable|string|max:20',
        ]);

        HargaKhususCustomer::updateOrCreate(
            ['hargabahan_id' => $hargabahanId, 'customer_id' => $request->customer_id],
            ['harga' => $this->cleanNumber($request->harga)]
        );

        return redirect()->back()->with('success', 'Harga khusus customer berhasil disimpan');
    }

    public function updateHargaKhususCustomer(Request $request, $id)
    {
        $request->validate([
            'harga' => 'nullable|string|max:20',
        ]);

        $hk = HargaKhususCustomer::findOrFail($id);
        $hk->update(['harga' => $this->cleanNumber($request->harga)]);

        return redirect()->back()->with('success', 'Harga khusus customer berhasil diubah');
    }

    public function deleteHargaKhususCustomer($id)
    {
        HargaKhususCustomer::findOrFail($id)->delete();

        return redirect()->back()->with('success', 'Harga khusus customer berhasil dihapus');
    }

    private function bahanPayload(Request $request): array
    {
        return [
            'kode' => $request->kode,
            'bahan' => $request->bahan,
            'kategori' => $request->kategori,
            'jenis' => $request->jenis,
            'satuan' => $request->satuan,
            'kategori_cetak' => $request->kategori_cetak,
            'jenis_bahan' => $request->jenis_bahan,
            'klik' => $request->klik,
            'cara_perhitungan' => $request->cara_perhitungan,
        ];
    }

    private function hargaPayload(Request $request, string $kode): array
    {
        return [
            'kode_bahan' => $kode,
            'sisi' => $request->sisi ?: null,
            'qty_min' => $this->cleanNumber($request->qty_min),
            'qty_max' => $this->cleanNumber($request->qty_max),
            'harga_po' => $this->cleanNumber($request->harga_po ?? $request->harga_beli),
            'harga_umum' => $this->cleanNumber($request->harga_umum),
            'harga_member' => $this->cleanNumber($request->harga_member),
            'harga_custom' => $this->cleanNumber($request->harga_custome ?? $request->harga_custom),
        ];
    }

    private function hasHargaPayload(Request $request): bool
    {
        return collect([
            'sisi',
            'qty_min',
            'qty_max',
            'harga_po',
            'harga_beli',
            'harga_umum',
            'harga_member',
            'harga_custome',
            'harga_custom',
        ])->contains(fn ($field) => filled($request->input($field)));
    }

    private function cleanNumber($value): ?string
    {
        if (! filled($value)) {
            return null;
        }

        return preg_replace('/\D/', '', $value);
    }
}
