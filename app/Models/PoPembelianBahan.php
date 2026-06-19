<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PoPembelianBahan extends Model
{
    protected $fillable = ['tgl', 'no_po', 'id_suplayer', 'hal', 'diskon', 'ppn', 'sub_total'];

    public function suplayer()
    {
        return $this->belongsTo(Suplayer::class, 'id_suplayer');
    }

    public function items()
    {
        return $this->hasMany(PoPembelianBahanItem::class, 'po_pembelian_bahan_id');
    }
}
