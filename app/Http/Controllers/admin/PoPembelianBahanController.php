<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Bahan;
use App\Models\PoPembelianBahan;
use App\Models\PoPembelianBahanItem;
use App\Models\Suplayer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PoPembelianBahanController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $po = PoPembelianBahan::with('suplayer')
            ->when($search, function ($q, $search) {
                $q->where('no_po', 'like', "%{$search}%")
                    ->orWhere('hal', 'like', "%{$search}%");
            })
            ->orderBy('id', 'desc')
            ->paginate(10);
        $po->appends(['search' => $search]);

        $prefix = 'PB-' . date('ym') . '-';
        $last = PoPembelianBahan::where('no_po', 'like', $prefix . '%')->orderBy('no_po', 'desc')->first();
        $no_po = $prefix . str_pad($last ? ((int) substr($last->no_po, -4)) + 1 : 1, 4, '0', STR_PAD_LEFT);
        $suplayers = Suplayer::orderBy('nama_suplayer')->get(['id', 'kode', 'nama_suplayer']);

        return Inertia::render('Admin/PoPembelianBahan', compact('po', 'no_po', 'suplayers'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'tgl' => 'required|date',
            'no_po' => 'nullable|string|max:30',
            'id_suplayer' => 'nullable|exists:suplayers,id',
            'hal' => 'nullable|string|max:200',
        ]);

        PoPembelianBahan::create($data);

        return redirect()->back()->with('success', 'PO Pembelian Bahan berhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'tgl' => 'required|date',
            'no_po' => 'nullable|string|max:30',
            'id_suplayer' => 'nullable|exists:suplayers,id',
            'hal' => 'nullable|string|max:200',
        ]);

        $po = PoPembelianBahan::findOrFail($id);
        $po->update($data);

        return redirect()->back()->with('success', 'PO Pembelian Bahan berhasil diubah');
    }

    public function detail($id)
    {
        $po = PoPembelianBahan::with('suplayer', 'items.bahan')->findOrFail($id);
        $totalHarga = PoPembelianBahanItem::where('po_pembelian_bahan_id', $po->id)->sum('total_harga');
        $diskonAmount = $totalHarga * ($po->diskon / 100);
        $ppnAmount = $totalHarga * ($po->ppn / 100);
        $po->sub_total = $totalHarga - $diskonAmount + $ppnAmount;
        $po->update();

        $bahans = Bahan::orderBy('bahan')->get(['id', 'kode', 'bahan', 'satuan']);

        return Inertia::render('Admin/PoPembelianBahanDetail', compact('po', 'bahans'));
    }

    public function storeItem(Request $request, $id)
    {
        $po = PoPembelianBahan::findOrFail($id);

        $data = $request->validate([
            'id_bahan' => 'nullable|exists:bahans,id',
            'panjang' => 'nullable|numeric',
            'lebar' => 'nullable|numeric',
            'luas' => 'nullable|numeric',
            'harga' => 'nullable|numeric',
            'qty' => 'nullable|numeric',
            'satuan' => 'nullable|string|max:50',
            'keterangan' => 'nullable|string|max:200',
            'total_harga' => 'nullable|numeric',
        ]);

        $data['po_pembelian_bahan_id'] = $po->id;
        PoPembelianBahanItem::create($data);

        $this->recalculateTotalHarga($po->id);

        return redirect()->back()->with('success', 'Item berhasil ditambah');
    }

    public function updateItem(Request $request, $id)
    {
        $data = $request->validate([
            'id_bahan' => 'nullable|exists:bahans,id',
            'panjang' => 'nullable|numeric',
            'lebar' => 'nullable|numeric',
            'luas' => 'nullable|numeric',
            'harga' => 'nullable|numeric',
            'qty' => 'nullable|numeric',
            'satuan' => 'nullable|string|max:50',
            'keterangan' => 'nullable|string|max:200',
            'total_harga' => 'nullable|numeric',
        ]);

        $item = PoPembelianBahanItem::findOrFail($id);
        $poId = $item->po_pembelian_bahan_id;
        $item->update($data);

        $this->recalculateTotalHarga($poId);

        return redirect()->back()->with('success', 'Item berhasil diubah');
    }

    public function deleteItem($id)
    {
        $item = PoPembelianBahanItem::findOrFail($id);
        $poId = $item->po_pembelian_bahan_id;
        $item->delete();

        $this->recalculateTotalHarga($poId);

        return redirect()->back()->with('success', 'Item berhasil dihapus');
    }

    public function delete($id)
    {
        PoPembelianBahan::findOrFail($id)->delete();

        return redirect()->back()->with('success', 'PO Pembelian Bahan berhasil dihapus');
    }

    public function updateHeader(Request $request, $id)
    {
        $po = PoPembelianBahan::findOrFail($id);

        $data = $request->validate([
            'diskon' => 'nullable|numeric',
            'ppn' => 'nullable|numeric',
        ]);

        $totalHarga = PoPembelianBahanItem::where('po_pembelian_bahan_id', $po->id)->sum('total_harga');
        $diskon = $data['diskon'] ?? 0;
        $ppn = $data['ppn'] ?? 0;
        $diskonAmount = $totalHarga * ($diskon / 100);
        $ppnAmount = $totalHarga * ($ppn / 100);
        $subTotal = $totalHarga - $diskonAmount + $ppnAmount;

        $po->diskon = $diskon;
        $po->ppn = $ppn;
        $po->sub_total = $subTotal;
        $po->update();

        return redirect()->back()->with('success', 'Header berhasil diupdate');
    }

    private function recalculateTotalHarga($poId)
    {
        $totalHarga = PoPembelianBahanItem::where('po_pembelian_bahan_id', $poId)->sum('total_harga');
        $po = PoPembelianBahan::find($poId);
        if ($po) {
            $diskonAmount = $totalHarga * ($po->diskon / 100);
            $ppnAmount = $totalHarga * ($po->ppn / 100);
            $po->sub_total = $totalHarga - $diskonAmount + $ppnAmount;
            $po->update();
        }
    }
}
