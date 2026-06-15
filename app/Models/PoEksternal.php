<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PoEksternal extends Model
{
    protected $fillable = [
        'tgl', 'no_po', 'hal', 'id_distributor', 'mata_uang', 'batas_bayar',
        'id_suplayer', 'invoice', 'id_bahan', 'spk',
        'tinggi', 'lebar', 'luas', 'qty', 'harga', 'total', 'keterangan',
    ];

    public function suplayer()
    {
        return $this->belongsTo(Suplayer::class, 'id_suplayer');
    }

    public function bahan()
    {
        return $this->belongsTo(Bahan::class, 'id_bahan');
    }

    public function distributor()
    {
        return $this->belongsTo(Distributor::class, 'id_distributor');
    }
}
