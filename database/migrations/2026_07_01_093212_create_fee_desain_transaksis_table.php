<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fee_desain_transaksis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('desain_id')->constrained('desains')->cascadeOnDelete();
            $table->foreignId('pengguna_id')->constrained('penggunas')->cascadeOnDelete();
            $table->foreignId('kategori_desain_id')->constrained('kategoridesains')->cascadeOnDelete();
            $table->decimal('fee', 15, 0)->default(0);
            $table->date('tanggal');
            $table->enum('status', ['belum_diambil', 'diambil'])->default('belum_diambil');
            $table->timestamp('diambil_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fee_desain_transaksis');
    }
};
