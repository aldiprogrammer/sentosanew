<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('produksis', function (Blueprint $table) {
            $table->id();
            $table->string('tanggal', 15);
            $table->string('id_desain', 11);
            $table->string('no_antrian', 50);
            $table->string('kode_spk', 50);
            $table->string('id_customer', 11);
            $table->string('id_bahan', 11);
            $table->string('keterangan');
            $table->string('satuan', 30);
            $table->string('tinggi', 11);
            $table->string('lebar', 11);
            $table->string('qty', 11);
            $table->string('sisi', 11);
            $table->string('id_kategori_desain', 30);
            $table->string('harga_bahan', 30);
            $table->string('total_harga', 30);
            $table->string('catatan');
            $table->string('metode_pengantaran', 50);
            $table->string('tgl_kirim', 15);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produksis');
    }
};
