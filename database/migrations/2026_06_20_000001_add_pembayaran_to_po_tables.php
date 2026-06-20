<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('po_eksternals', function (Blueprint $table) {
            $table->string('pembayaran', 10)->nullable()->after('batas_bayar');
        });

        Schema::table('po_pembelian_bahans', function (Blueprint $table) {
            $table->string('pembayaran', 10)->nullable()->after('hal');
        });
    }

    public function down(): void
    {
        Schema::table('po_eksternals', function (Blueprint $table) {
            $table->dropColumn('pembayaran');
        });

        Schema::table('po_pembelian_bahans', function (Blueprint $table) {
            $table->dropColumn('pembayaran');
        });
    }
};
