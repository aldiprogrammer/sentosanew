<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('suplayers', 'jenis_suplayer')) {
            Schema::table('suplayers', function (Blueprint $table) {
                $table->dropColumn('jenis_suplayer');
            });
        }

        Schema::create('suplayer_pembelian_bahans', function (Blueprint $table) {
            $table->id();
            $table->string('kode', 30);
            $table->string('nama_suplayer', 40);
            $table->string('alamat');
            $table->string('nohp', 16);
            $table->string('produk', 50);
            $table->string('harga', 50);
            $table->string('jatuh_tempo', 50)->nullable();
            $table->timestamps();
        });

        Schema::create('rekening_suplayer_pembelian_bahans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_suplayer_pembelian_bahan')
                ->constrained('suplayer_pembelian_bahans')
                ->cascadeOnDelete();
            $table->string('nama_bank', 30);
            $table->string('no_rekening', 30);
            $table->string('nama_rekening');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rekening_suplayer_pembelian_bahans');
        Schema::dropIfExists('suplayer_pembelian_bahans');
    }
};
