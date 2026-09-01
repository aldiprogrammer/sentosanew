<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\PattyCash;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PattyCashController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $tglDari = $request->query('tgl_dari');
        $tglSampai = $request->query('tgl_sampai');
        $bulan = $request->query('bulan');

        $patty = PattyCash::with('user')
            ->when($search, function ($q, $search) {
                $q->where('kode_transaksi', 'like', "%{$search}%")
                    ->orWhere('jenis_biaya', 'like', "%{$search}%")
                    ->orWhere('type', 'like', "%{$search}%");
            })
            ->when($bulan, function ($q, $bulan) {
                $q->whereMonth('tanggal_transaksi', substr($bulan, 5, 2))
                    ->whereYear('tanggal_transaksi', substr($bulan, 0, 4));
            })
            ->when($tglDari && ! $bulan, function ($q) use ($tglDari) {
                $q->where('tanggal_transaksi', '>=', $tglDari);
            })
            ->when($tglSampai && ! $bulan, function ($q) use ($tglSampai) {
                $q->where('tanggal_transaksi', '<=', $tglSampai);
            })
            ->orderBy('id', 'desc')
            ->paginate(10);
        $patty->appends([
            'search' => $search,
            'tgl_dari' => $tglDari,
            'tgl_sampai' => $tglSampai,
            'bulan' => $bulan,
        ]);

        $saldo = PattyCash::orderBy('id', 'desc')->value('saldo_setelah_transaksi') ?? 0;
        $kode = $this->kodeTransaksi();

        return Inertia::render('Admin/PattyCash', compact('patty', 'saldo', 'kode'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'kode_transaksi' => ['required', 'string', 'max:30'],
            'tanggal_transaksi' => ['required', 'date'],
            'type' => ['required', 'in:MASUK,KELUAR'],
            'jenis_biaya' => ['required', 'string', 'max:100'],
            'nominal_transaksi' => ['required', 'numeric', 'min:0'],
            'keterangan' => ['nullable', 'string'],
        ]);

        $saldoAwal = PattyCash::orderBy('id', 'desc')->value('saldo_setelah_transaksi') ?? 0;
        $nominal = (float) $data['nominal_transaksi'];

        if ($data['type'] === 'KELUAR' && $nominal > $saldoAwal) {
            return redirect()->back()->with('error', 'Saldo tidak mencukupi untuk transaksi pengeluaran');
        }

        $saldoAkhir = $data['type'] === 'MASUK'
            ? $saldoAwal + $nominal
            : $saldoAwal - $nominal;

        $patty = new PattyCash;
        $patty->kode_transaksi = $data['kode_transaksi'];
        $patty->tanggal_transaksi = $data['tanggal_transaksi'];
        $patty->type = $data['type'];
        $patty->jenis_biaya = $data['jenis_biaya'];
        $patty->nominal_transaksi = $nominal;
        $patty->saldo_awal = $saldoAwal;
        $patty->saldo_setelah_transaksi = $saldoAkhir;
        $patty->keterangan = $data['keterangan'];
        $patty->id_user = auth()->id();
        $patty->save();

        return redirect()->back()->with('success', 'Transaksi berhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $patty = PattyCash::findOrFail($id);

        $data = $request->validate([
            'kode_transaksi' => ['required', 'string', 'max:30'],
            'tanggal_transaksi' => ['required', 'date'],
            'type' => ['required', 'in:MASUK,KELUAR'],
            'jenis_biaya' => ['required', 'string', 'max:100'],
            'nominal_transaksi' => ['required', 'numeric', 'min:0'],
            'keterangan' => ['nullable', 'string'],
        ]);

        $patty->kode_transaksi = $data['kode_transaksi'];
        $patty->tanggal_transaksi = $data['tanggal_transaksi'];
        $patty->type = $data['type'];
        $patty->jenis_biaya = $data['jenis_biaya'];
        $patty->nominal_transaksi = (float) $data['nominal_transaksi'];
        $patty->keterangan = $data['keterangan'];
        $patty->id_user = auth()->id();
        $patty->update();

        $this->recalculateSaldo();

        return redirect()->back()->with('success', 'Transaksi berhasil diubah');
    }

    public function delete($id)
    {
        $patty = PattyCash::findOrFail($id);
        $patty->delete();

        $this->recalculateSaldo();

        return redirect()->back()->with('success', 'Transaksi berhasil dihapus');
    }

    private function recalculateSaldo()
    {
        $saldo = 0;
        PattyCash::orderBy('id')->get()->each(function ($p) use (&$saldo) {
            $p->saldo_awal = $saldo;
            $saldo = $p->type === 'MASUK'
                ? $saldo + $p->nominal_transaksi
                : $saldo - $p->nominal_transaksi;
            $p->saldo_setelah_transaksi = $saldo;
            $p->save();
        });
    }

    private function kodeTransaksi()
    {
        $prefix = 'PC-'.date('ym').'-';
        $last = PattyCash::where('kode_transaksi', 'like', $prefix.'%')
            ->orderBy('kode_transaksi', 'desc')
            ->first();

        return $prefix.str_pad($last ? ((int) substr($last->kode_transaksi, -4)) + 1 : 1, 4, '0', STR_PAD_LEFT);
    }
}
