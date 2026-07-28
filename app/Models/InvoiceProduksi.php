<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InvoiceProduksi extends Model
{
    protected $fillable = [
        'no_invoice',
        'id_customer',
        'customer',
        'harga_awal',
        'diskon',
        'mode_diskon',
        'harga_akhir',
        'uang',
        'kembalian',
        'minimum_faktur',
        'tanggal',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'id_customer');
    }
}
