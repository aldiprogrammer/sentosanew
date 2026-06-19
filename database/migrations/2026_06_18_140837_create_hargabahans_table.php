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
        Schema::create('hargabahans', function (Blueprint $table) {
            $table->id();
            $table->string('kode_bahan', 30);
            $table->string('sisi', 50)->nullable();
            $table->string('qty_min', 50)->nullable();
            $table->string('qty_max', 50)->nullable();
            $table->string('harga_po', 50)->nullable();
            $table->string('harga_umum', 50)->nullable();
            $table->string('harga_member', 50)->nullable();
            $table->string('harga_khusus', 50)->nullable();
            $table->string('harga_custome', 50)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hargabahans');
    }
};
