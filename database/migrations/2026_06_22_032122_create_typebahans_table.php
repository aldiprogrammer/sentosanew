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
        Schema::create('typebahans', function (Blueprint $table) {
            $table->id();
            $table->string('id_master_bahan', 11);
            $table->string('kode_bahan', 30);
            $table->string('keterangan');
            $table->string('panjang', 30);
            $table->string('lebar', 30);
            $table->string('total', 30);
            $table->string('satuan', 30);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('typebahans');
    }
};
