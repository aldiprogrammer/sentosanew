<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Itemstokbahan extends Model
{
    protected $guarded = [];

    public function po()
    {
        return $this->belongsTo(PoPembelianBahan::class, 'po_pembelian_bahan_id');
    }

    public function item()
    {
        return $this->belongsTo(PoPembelianBahanItem::class, 'po_pembelian_bahan_item_id');
    }
}
