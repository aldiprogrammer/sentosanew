<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\NomorRekening;
use App\Models\TransaksiBank;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransaksiBankController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $tglDari = $request->query('tgl_dari');
        $tglSampai = $request->query('tgl_sampai');
        $bulan = $request->query('bulan');
        $idRekening = $request->query('id_nomor_rekening');

        $transaksi = TransaksiBank::with('rekening', 'user')
            ->when($search, function ($q, $search) {
                $q->where('kode_transaksi', 'like', "%{$search}%")
                    ->orWhere('jenis_biaya', 'like', "%{$search}%")
                    ->orWhere('type', 'like', "%{$search}%");
            })
            ->when($idRekening, function ($q) use ($idRekening) {
                $q->where('id_nomor_rekening', $idRekening);
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
        $transaksi->appends([
            'search' => $search,
            'tgl_dari' => $tglDari,
            'tgl_sampai' => $tglSampai,
            'bulan' => $bulan,
            'id_nomor_rekening' => $idRekening,
        ]);

        $rekenings = NomorRekening::orderBy('nama_bank')->get(['id', 'nama_bank', 'nomor_rekening', 'atas_nama']);
        $kode = $this->kodeTransaksi();

        $saldo = 0;
        if ($idRekening) {
            $saldo = TransaksiBank::where('id_nomor_rekening', $idRekening)
                ->orderBy('id', 'desc')
                ->value('saldo_setelah_transaksi') ?? 0;
        } else {
            foreach ($rekenings as $r) {
                $saldo += TransaksiBank::where('id_nomor_rekening', $r->id)
                    ->orderBy('id', 'desc')
                    ->value('saldo_setelah_transaksi') ?? 0;
            }
        }

        return Inertia::render('Admin/TransaksiBank', compact('transaksi', 'rekenings', 'kode', 'saldo'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'id_nomor_rekening' => ['required', 'exists:nomor_rekenings,id'],
            'kode_transaksi' => ['required', 'string', 'max:30'],
            'tanggal_transaksi' => ['required', 'date'],
            'type' => ['required', 'in:MASUK,KELUAR'],
            'jenis_biaya' => ['required', 'string', 'max:100'],
            'nominal_transaksi' => ['required', 'numeric', 'min:0'],
            'keterangan' => ['nullable', 'string'],
        ]);

        $saldoAwal = TransaksiBank::where('id_nomor_rekening', $data['id_nomor_rekening'])
            ->orderBy('id', 'desc')
            ->value('saldo_setelah_transaksi') ?? 0;
        $nominal = (float) $data['nominal_transaksi'];

        if ($data['type'] === 'KELUAR' && $nominal > $saldoAwal) {
            return redirect()->back()->with('error', 'Saldo rekening tidak mencukupi untuk transaksi pengeluaran');
        }

        $saldoAkhir = $data['type'] === 'MASUK'
            ? $saldoAwal + $nominal
            : $saldoAwal - $nominal;

        $transaksi = new TransaksiBank;
        $transaksi->id_nomor_rekening = $data['id_nomor_rekening'];
        $transaksi->kode_transaksi = $data['kode_transaksi'];
        $transaksi->tanggal_transaksi = $data['tanggal_transaksi'];
        $transaksi->type = $data['type'];
        $transaksi->jenis_biaya = $data['jenis_biaya'];
        $transaksi->nominal_transaksi = $nominal;
        $transaksi->keterangan = $data['keterangan'];
        $transaksi->saldo_awal = $saldoAwal;
        $transaksi->saldo_setelah_transaksi = $saldoAkhir;
        $transaksi->id_user = auth()->id();
        $transaksi->save();

        return redirect()->back()->with('success', 'Transaksi bank berhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $transaksi = TransaksiBank::findOrFail($id);

        $data = $request->validate([
            'id_nomor_rekening' => ['required', 'exists:nomor_rekenings,id'],
            'kode_transaksi' => ['required', 'string', 'max:30'],
            'tanggal_transaksi' => ['required', 'date'],
            'type' => ['required', 'in:MASUK,KELUAR'],
            'jenis_biaya' => ['required', 'string', 'max:100'],
            'nominal_transaksi' => ['required', 'numeric', 'min:0'],
            'keterangan' => ['nullable', 'string'],
        ]);

        $oldRekening = $transaksi->id_nomor_rekening;

        $transaksi->id_nomor_rekening = $data['id_nomor_rekening'];
        $transaksi->kode_transaksi = $data['kode_transaksi'];
        $transaksi->tanggal_transaksi = $data['tanggal_transaksi'];
        $transaksi->type = $data['type'];
        $transaksi->jenis_biaya = $data['jenis_biaya'];
        $transaksi->nominal_transaksi = (float) $data['nominal_transaksi'];
        $transaksi->keterangan = $data['keterangan'];
        $transaksi->id_user = auth()->id();
        $transaksi->update();

        $this->recalculateSaldo($oldRekening);
        $this->recalculateSaldo($data['id_nomor_rekening']);

        return redirect()->back()->with('success', 'Transaksi bank berhasil diubah');
    }

    public function delete($id)
    {
        $transaksi = TransaksiBank::findOrFail($id);
        $rekeningId = $transaksi->id_nomor_rekening;
        $transaksi->delete();

        $this->recalculateSaldo($rekeningId);

        return redirect()->back()->with('success', 'Transaksi bank berhasil dihapus');
    }

    private function recalculateSaldo($rekeningId)
    {
        $saldo = 0;
        TransaksiBank::where('id_nomor_rekening', $rekeningId)
            ->orderBy('id')
            ->get()
            ->each(function ($t) use (&$saldo) {
                $t->saldo_awal = $saldo;
                $saldo = $t->type === 'MASUK'
                    ? $saldo + $t->nominal_transaksi
                    : $saldo - $t->nominal_transaksi;
                $t->saldo_setelah_transaksi = $saldo;
                $t->save();
            });
    }

    private function kodeTransaksi()
    {
        $prefix = 'BK-'.date('ym').'-';
        $last = TransaksiBank::where('kode_transaksi', 'like', $prefix.'%')
            ->orderBy('kode_transaksi', 'desc')
            ->first();

        return $prefix.str_pad($last ? ((int) substr($last->kode_transaksi, -4)) + 1 : 1, 4, '0', STR_PAD_LEFT);
    }
}
