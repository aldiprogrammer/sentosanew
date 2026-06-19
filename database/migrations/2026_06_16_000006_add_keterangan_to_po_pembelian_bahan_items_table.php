<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('po_pembelian_bahan_items', function (Blueprint $table) {
            $table->string('keterangan', 200)->nullable()->after('total_harga');
        });
    }

    public function down(): void
    {
        Schema::table('po_pembelian_bahan_items', function (Blueprint $table) {
            $table->dropColumn('keterangan');
        });
    }
};
