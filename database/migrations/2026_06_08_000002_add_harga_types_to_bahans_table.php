<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bahans', function (Blueprint $table) {
            $table->string('harga_umum', 20)->nullable()->after('harga');
            $table->string('harga_khusus', 20)->nullable()->after('harga_umum');
            $table->string('harga_member', 20)->nullable()->after('harga_khusus');
            $table->string('harga_custom', 20)->nullable()->after('harga_member');
        });
    }

    public function down(): void
    {
        Schema::table('bahans', function (Blueprint $table) {
            $table->dropColumn(['harga_umum', 'harga_khusus', 'harga_member', 'harga_custom']);
        });
    }
};
