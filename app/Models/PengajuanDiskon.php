<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PengajuanDiskon extends Model
{
    protected $fillable = [
        'no_invoice',
        'id_customer',
        'customer',
        'harga_awal',
        'mode_diskon',
        'diskon',
        'harga_diskon',
        'status',
        'tanggal',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'id_customer');
    }
}
