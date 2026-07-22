<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hargabahan extends Model
{
    protected $fillable = [
        'kode_bahan',
        'sisi',
        'qty_min',
        'qty_max',
        'harga_po',
        'harga_umum',
        'harga_member',
        'harga_khusus',
        'harga_custom',
    ];

    public function hargaKhususCustomer()
    {
        return $this->hasMany(HargaKhususCustomer::class, 'hargabahan_id');
    }

    public function databahan()
    {
        return $this->belongsTo(Databahan::class, 'kode_bahan', 'kode');
    }
}
