<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('invoice_produksis', function (Blueprint $table) {
            $table->string('diskon', 30)->nullable()->after('harga_awal');
            $table->enum('mode_diskon', ['persen', 'rupiah'])->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('invoice_produksis', function (Blueprint $table) {
            $table->dropColumn('diskon');
        });
    }
};
