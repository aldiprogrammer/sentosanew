<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produksi extends Model
{

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'id_customer');
    }

    public function bahan()
    {
        return $this->belongsTo(Bahan::class, 'id_bahan');
    }
}
