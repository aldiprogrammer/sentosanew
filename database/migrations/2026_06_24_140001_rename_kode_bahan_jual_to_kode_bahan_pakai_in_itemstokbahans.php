<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('itemstokbahans', 'kode_bahan_jual')) {
            Schema::table('itemstokbahans', function (Blueprint $table) {
                $table->renameColumn('kode_bahan_jual', 'kode_bahan_pakai');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('itemstokbahans', 'kode_bahan_pakai')) {
            Schema::table('itemstokbahans', function (Blueprint $table) {
                $table->renameColumn('kode_bahan_pakai', 'kode_bahan_jual');
            });
        }
    }
};
