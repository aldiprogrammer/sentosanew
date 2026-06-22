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
        Schema::table('produksis', function (Blueprint $table) {
            $table->string('sisa_putih_panjang', 20)->nullable();
            $table->string('sisa_putih_lebar', 20)->nullable();
            $table->string('sisa_putih_total', 20)->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('produksis', function (Blueprint $table) {
            $table->dropColumn('sisa_putih_panjang');
            $table->dropColumn('sisa_putih_lebar');
            $table->dropColumn('sisa_putih_total');
        });
    }
};
