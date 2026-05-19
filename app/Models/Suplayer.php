<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Suplayer extends Model
{
    public function rekening()
    {
        return $this->hasMany(RekeningSuplayer::class, 'id_suplayer');
    }
}
