<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HargaKhususCustomer extends Model
{
    protected $fillable = [
        'hargabahan_id',
        'customer_id',
        'harga',
    ];

    public function hargabahan()
    {
        return $this->belongsTo(Hargabahan::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
