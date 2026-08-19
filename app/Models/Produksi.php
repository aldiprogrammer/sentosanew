<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produksi extends Model
{
    protected $fillable = ['sisi', 'sisa_putih_panjang', 'sisa_putih_lebar', 'sisa_putih_total', 'kode_bahanpakai', 'id_cs', 'tarik_bon', 'alasan_pembatalan'];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'id_customer');
    }

    public function bahan()
    {
        return $this->belongsTo(Databahan::class, 'id_bahan');
    }

    public function pinising()
    {
        return $this->hasOne(Pinising::class, 'kode_spk', 'kode_spk');
    }

    public function mataAyam()
    {
        return $this->hasOne(MataAyam::class, 'kode_spk', 'kode_spk');
    }

    public function cs()
    {
        return $this->belongsTo(Pengguna::class, 'id_cs');
    }

    public function desainer()
    {
        return $this->belongsTo(Pengguna::class, 'id_desainer');
    }
}
