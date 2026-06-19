<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('po_pembelian_bahan_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('po_pembelian_bahan_id');
            $table->unsignedBigInteger('id_bahan')->nullable();
            $table->decimal('panjang', 12, 2)->default(0);
            $table->decimal('lebar', 12, 2)->default(0);
            $table->decimal('luas', 12, 2)->default(0);
            $table->decimal('harga', 15, 2)->default(0);
            $table->decimal('qty', 12, 2)->default(0);
            $table->decimal('total_harga', 15, 2)->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('po_pembelian_bahan_items');
    }
};
