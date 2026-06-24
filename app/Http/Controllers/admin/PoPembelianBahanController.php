<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Bahanpakai;
use App\Models\Itemstokbahan;
use App\Models\PoPembelianBahan;
use App\Models\PoPembelianBahanItem;
use App\Models\SuplayerPembelianBahan;
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
        $suplayers = SuplayerPembelianBahan::orderBy('nama_suplayer')
            ->get(['id', 'kode', 'nama_suplayer']);

        return Inertia::render('Admin/PoPembelianBahan', compact('po', 'no_po', 'suplayers'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'tgl' => 'required|date',
            'no_po' => 'nullable|string|max:30',
            'id_suplayer' => 'nullable|exists:suplayer_pembelian_bahans,id',
            'hal' => 'nullable|string|max:200',
            'pembayaran' => 'nullable|in:CASH,CREDIT',
        ]);

        PoPembelianBahan::create($data);

        return redirect()->back()->with('success', 'PO Pembelian Bahan berhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'tgl' => 'required|date',
            'no_po' => 'nullable|string|max:30',
            'id_suplayer' => 'nullable|exists:suplayer_pembelian_bahans,id',
            'hal' => 'nullable|string|max:200',
            'pembayaran' => 'nullable|in:CASH,CREDIT',
        ]);

        $po = PoPembelianBahan::findOrFail($id);
        $po->update($data);

        return redirect()->back()->with('success', 'PO Pembelian Bahan berhasil diubah');
    }

    public function detail($id)
    {
        $po = PoPembelianBahan::with('suplayer', 'items.bahan.masterBahan')->findOrFail($id);
        $totalHarga = PoPembelianBahanItem::where('po_pembelian_bahan_id', $po->id)->sum('total_harga');
        $diskonAmount = $totalHarga * ($po->diskon / 100);
        $ppnAmount = $totalHarga * ($po->ppn / 100);
        $po->sub_total = $totalHarga - $diskonAmount + $ppnAmount;
        $po->update();

        $bahanpakais = Bahanpakai::with('masterBahan')->orderBy('kode_bahan')->get();

        return Inertia::render('Admin/PoPembelianBahanDetail', compact('po', 'bahanpakais'));
    }

    public function storeItem(Request $request, $id)
    {
        $po = PoPembelianBahan::findOrFail($id);

        $data = $request->validate([
            'id_bahan' => 'nullable|exists:bahanpakais,id',
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
            'id_bahan' => 'nullable|exists:bahanpakais,id',
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

    public function updateStok($id)
    {
        $po = PoPembelianBahan::with('items.bahan')->findOrFail($id);

        if ($po->status == 1) {
            return redirect()->back()->with('success', 'Stok sudah diupdate');
        }

        foreach ($po->items as $item) {
            $qty = (int) $item->qty ?: 1;
            for ($i = 0; $i < $qty; $i++) {
                $kodeLabel = 'LB' . $po->id . '-' . $item->id . '-' . ($i + 1);
                Itemstokbahan::create([
                    'po_pembelian_bahan_id' => $po->id,
                    'po_pembelian_bahan_item_id' => $item->id,
                    'kode_po' => $po->no_po,
                    'kode_label' => $kodeLabel,
                    'kode_bahan_jual' => $item->bahan?->kode_bahan ?? '-',
                    'panjang' => $item->panjang,
                    'lebar' => $item->lebar,
                    'luas' => $item->luas,
                    'qty' => 1,
                    'satuan' => $item->satuan,
                    'keterangan' => $item->keterangan,
                ]);
            }
        }

        $po->status = 1;
        $po->update();

        return redirect()->back()->with('success', 'Stok berhasil diupdate');
    }

    public function tarikStok($id)
    {
        $po = PoPembelianBahan::findOrFail($id);

        if ($po->status == 0) {
            return redirect()->back()->with('success', 'Stok sudah ditarik');
        }

        Itemstokbahan::where('po_pembelian_bahan_id', $po->id)->delete();

        $po->status = 0;
        $po->update();

        return redirect()->back()->with('success', 'Stok berhasil ditarik');
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
