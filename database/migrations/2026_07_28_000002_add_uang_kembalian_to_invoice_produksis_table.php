<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('invoice_produksis', function (Blueprint $table) {
            $table->string('uang', 15)->nullable()->after('harga_akhir');
            $table->string('kembalian', 15)->nullable()->after('uang');
        });
    }

    public function down(): void
    {
        Schema::table('invoice_produksis', function (Blueprint $table) {
            $table->dropColumn(['uang', 'kembalian']);
        });
    }
};
