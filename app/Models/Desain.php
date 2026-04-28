<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Desain extends Model
{

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'id_customer');
    }

    public function kategoridesain()
    {
        return $this->belongsTo(Kategoridesain::class, 'id_kategori_desain');
    }
}
