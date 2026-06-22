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
        Schema::table('itemstokbahans', function (Blueprint $table) {
            $table->unsignedBigInteger('po_pembelian_bahan_id')->nullable();
            $table->unsignedBigInteger('po_pembelian_bahan_item_id')->nullable();
            $table->string('kode_po', 30)->nullable();
            $table->string('panjang', 30)->nullable();
            $table->string('lebar', 30)->nullable();
            $table->string('satuan', 30)->nullable();
            $table->text('keterangan')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('itemstokbahans', function (Blueprint $table) {
            $table->dropColumn(['po_pembelian_bahan_id', 'po_pembelian_bahan_item_id', 'kode_po', 'panjang', 'lebar', 'satuan', 'keterangan']);
        });
    }
};
