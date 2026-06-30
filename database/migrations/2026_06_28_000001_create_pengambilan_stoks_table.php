<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pengambilan_stoks', function (Blueprint $table) {
            $table->id();
            $table->string('kode_bahan_pakai', 30);
            $table->text('item_stok_data')->nullable();
            $table->string('total_qty', 30);
            $table->unsignedBigInteger('user_id');
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pengambilan_stoks');
    }
};
