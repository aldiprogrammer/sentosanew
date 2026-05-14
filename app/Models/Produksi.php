<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produksi extends Model
{
    protected $fillable = ['sisi'];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'id_customer');
    }

    public function bahan()
    {
        return $this->belongsTo(Bahan::class, 'id_bahan');
    }

    public function pinising()
    {
        return $this->hasOne(Pinising::class, 'kode_spk', 'kode_spk');
    }

    public function mataAyam()
    {
        return $this->hasOne(MataAyam::class, 'kode_spk', 'kode_spk');
    }
}
