<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('itemstokbahans', 'kode_bahan_beli')) {
            Schema::table('itemstokbahans', function (Blueprint $table) {
                $table->renameColumn('kode_bahan_beli', 'kode_bahan_pakai');
            });
        }

        if (Schema::hasColumn('produksis', 'kode_bahanbeli')) {
            Schema::table('produksis', function (Blueprint $table) {
                $table->renameColumn('kode_bahanbeli', 'kode_bahanpakai');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('itemstokbahans', 'kode_bahan_pakai')) {
            Schema::table('itemstokbahans', function (Blueprint $table) {
                $table->renameColumn('kode_bahan_pakai', 'kode_bahan_beli');
            });
        }

        if (Schema::hasColumn('produksis', 'kode_bahanpakai')) {
            Schema::table('produksis', function (Blueprint $table) {
                $table->renameColumn('kode_bahanpakai', 'kode_bahanbeli');
            });
        }
    }
};
