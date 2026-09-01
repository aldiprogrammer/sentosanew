<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('patty_cash', function (Blueprint $table) {
            $table->text('keterangan')->nullable()->after('nominal_transaksi');
        });
    }

    public function down(): void
    {
        Schema::table('patty_cash', function (Blueprint $table) {
            $table->dropColumn('keterangan');
        });
    }
};
