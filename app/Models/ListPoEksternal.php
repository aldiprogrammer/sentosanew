<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ListPoEksternal extends Model
{
    protected $fillable = ['satuan'];

    protected $table = 'list_po_eksternals';

    public function poEksternal()
    {
        return $this->belongsTo(PoEksternal::class, 'po_eksternal_id');
    }

    public function bahan()
    {
        return $this->belongsTo(Databahan::class, 'id_bahan');
    }

    public function produksi()
    {
        return $this->belongsTo(Produksi::class, 'invoice', 'no_invoice');
    }
}
