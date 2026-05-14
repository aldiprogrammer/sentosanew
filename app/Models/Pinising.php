<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pinising extends Model
{
    protected $fillable = ['kode_spk', 'atas', 'bawah', 'kanan', 'kiri'];

    public function produksi()
    {
        return $this->belongsTo(Produksi::class, 'kode_spk', 'kode_spk');
    }
}
