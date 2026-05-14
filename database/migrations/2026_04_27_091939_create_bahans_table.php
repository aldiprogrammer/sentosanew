<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bahans', function (Blueprint $table) {
            $table->id();
            $table->string('kode', 30);
            $table->string('bahan', 35);
            $table->string('kategori', 35);
            $table->string('satuan', 20)->nullable();
            $table->string('jenis', 20)->nullable();
            $table->string('kategori_cetak', 30)->nullable();
            $table->string('jenis_bahan', 30)->nullable();
            $table->string('klik', 50)->nullable();
            $table->string('cara_perhitungan', 20)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bahans');
    }
};
