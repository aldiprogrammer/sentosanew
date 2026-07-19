<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('hargabahans', function (Blueprint $table) {
            $table->dropColumn('harga_khusus');
        });
    }

    public function down(): void
    {
        Schema::table('hargabahans', function (Blueprint $table) {
            $table->string('harga_khusus', 20)->nullable()->after('harga_umum');
        });
    }
};
