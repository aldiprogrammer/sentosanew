<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PoPembelianBahan extends Model
{
    protected $fillable = ['tgl', 'no_po', 'id_suplayer', 'hal', 'pembayaran', 'diskon', 'diskon_type', 'ppn', 'sub_total', 'status'];

    public function suplayer()
    {
        return $this->belongsTo(SuplayerPembelianBahan::class, 'id_suplayer');
    }

    public function items()
    {
        return $this->hasMany(PoPembelianBahanItem::class, 'po_pembelian_bahan_id');
    }

    public function itemStok()
    {
        return $this->hasMany(Itemstokbahan::class, 'po_pembelian_bahan_id');
    }
}
