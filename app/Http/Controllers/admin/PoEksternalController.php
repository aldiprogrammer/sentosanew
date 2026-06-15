<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Bahan;
use App\Models\Distributor;
use App\Models\PoEksternal;
use App\Models\Produksi;
use App\Models\Suplayer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PoEksternalController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $poEksternal = PoEksternal::with('suplayer', 'bahan')
            ->when($search, function ($q, $search) {
                $q->where('no_po', 'like', "%{$search}%")
                  ->orWhere('invoice', 'like', "%{$search}%")
                  ->orWhere('spk', 'like', "%{$search}%");
            })
            ->orderBy('id', 'desc')
            ->paginate(10);
        $poEksternal->appends(['search' => $search]);

        $prefix = 'PO-' . date('ym') . '-';
        $last = PoEksternal::where('no_po', 'like', $prefix . '%')->orderBy('no_po', 'desc')->first();
        $no_po = $prefix . str_pad($last ? ((int) substr($last->no_po, -4)) + 1 : 1, 4, '0', STR_PAD_LEFT);
        $bahans = Bahan::orderBy('bahan')->get(['id', 'kode', 'bahan', 'satuan']);
        $suplayers = Suplayer::orderBy('nama_suplayer')->get(['id', 'kode', 'nama_suplayer', 'jatuh_tempo']);
        $distributors = Distributor::orderBy('nama')->get(['id', 'kode', 'nama']);

        return Inertia::render('Admin/PoEksternal', compact('poEksternal', 'no_po', 'bahans', 'suplayers', 'distributors'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'tgl' => 'required|date',
            'no_po' => 'nullable|string|max:30',
            'hal' => 'nullable|string|max:200',
            'id_distributor' => 'nullable|exists:distributors,id',
            'mata_uang' => 'nullable|string|max:10',
            'batas_bayar' => 'nullable|date',
            'id_suplayer' => 'nullable|exists:suplayers,id',
            'invoice' => 'nullable|string|max:100',
            'id_bahan' => 'nullable|exists:bahans,id',
            'spk' => 'nullable|string|max:100',
            'tinggi' => 'nullable|numeric',
            'lebar' => 'nullable|numeric',
            'luas' => 'nullable|numeric',
            'qty' => 'nullable|numeric',
            'harga' => 'nullable|numeric',
            'total' => 'nullable|numeric',
            'keterangan' => 'nullable|string',
        ]);

        $no_po = $data['no_po'] ?? null;
        if (! $no_po) {
            $prefix = 'PO-' . date('ym') . '-';
            $last = PoEksternal::where('no_po', 'like', $prefix . '%')->orderBy('no_po', 'desc')->first();
            $no_po = $prefix . str_pad($last ? ((int) substr($last->no_po, -4)) + 1 : 1, 4, '0', STR_PAD_LEFT);
        }

        $po = new PoEksternal;
        $po->tgl = $data['tgl'];
        $po->no_po = $no_po;
        $po->hal = $data['hal'];
        $po->id_distributor = $data['id_distributor'] ?: null;
        $po->mata_uang = $data['mata_uang'];
        $po->batas_bayar = $data['batas_bayar'];
        $po->id_suplayer = $data['id_suplayer'] ?: null;
        $po->invoice = $data['invoice'];
        $po->id_bahan = $data['id_bahan'] ?: null;
        $po->spk = $data['spk'];
        $po->tinggi = $data['tinggi'] ?: 0;
        $po->lebar = $data['lebar'] ?: 0;
        $po->luas = $data['luas'] ?: 0;
        $po->qty = $data['qty'] ?: 0;
        $po->harga = $data['harga'] ?: 0;
        $po->total = $data['total'] ?: 0;
        $po->keterangan = $data['keterangan'];
        $po->save();

        return redirect()->back()->with('success', 'PO Eksternal berhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $po = PoEksternal::findOrFail($id);

        $data = $request->validate([
            'tgl' => 'required|date',
            'no_po' => 'required|string|max:30|unique:po_eksternals,no_po,' . $id,
            'hal' => 'nullable|string|max:200',
            'id_distributor' => 'nullable|exists:distributors,id',
            'mata_uang' => 'nullable|string|max:10',
            'batas_bayar' => 'nullable|date',
            'id_suplayer' => 'nullable|exists:suplayers,id',
            'invoice' => 'nullable|string|max:100',
            'id_bahan' => 'nullable|exists:bahans,id',
            'spk' => 'nullable|string|max:100',
            'tinggi' => 'nullable|numeric',
            'lebar' => 'nullable|numeric',
            'luas' => 'nullable|numeric',
            'qty' => 'nullable|numeric',
            'harga' => 'nullable|numeric',
            'total' => 'nullable|numeric',
            'keterangan' => 'nullable|string',
        ]);

        $po->tgl = $data['tgl'];
        $po->no_po = $data['no_po'];
        $po->hal = $data['hal'];
        $po->id_distributor = $data['id_distributor'] ?: null;
        $po->mata_uang = $data['mata_uang'];
        $po->batas_bayar = $data['batas_bayar'];
        $po->id_suplayer = $data['id_suplayer'] ?: null;
        $po->invoice = $data['invoice'];
        $po->id_bahan = $data['id_bahan'] ?: null;
        $po->spk = $data['spk'];
        $po->tinggi = $data['tinggi'] ?: 0;
        $po->lebar = $data['lebar'] ?: 0;
        $po->luas = $data['luas'] ?: 0;
        $po->qty = $data['qty'] ?: 0;
        $po->harga = $data['harga'] ?: 0;
        $po->total = $data['total'] ?: 0;
        $po->keterangan = $data['keterangan'];
        $po->update();

        return redirect()->back()->with('success', 'PO Eksternal berhasil diubah');
    }

    public function delete($id)
    {
        $po = PoEksternal::findOrFail($id);
        $po->delete();

        return redirect()->back()->with('success', 'PO Eksternal berhasil dihapus');
    }

    public function cariInvoice(Request $request)
    {
        $invoice = $request->query('invoice');
        if (! $invoice) {
            return response()->json(['data' => null]);
        }

        $pr = Produksi::with('bahan')
            ->where('no_invoice', $invoice)
            ->orderBy('id', 'desc')
            ->first();

        if (! $pr) {
            return response()->json(['data' => null]);
        }

        return response()->json([
            'data' => [
                'id_bahan' => $pr->id_bahan,
                'bahan_kode' => $pr->bahan?->kode,
                'bahan_nama' => $pr->bahan?->bahan,
                'kode_spk' => $pr->kode_spk,
                'lebar' => $pr->lebar,
                'tinggi' => $pr->tinggi,
                'harga' => $pr->harga_bahan,
                'qty' => $pr->qty,
            ],
        ]);
    }
}
