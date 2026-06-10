<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('produksis', function (Blueprint $table) {
            $table->tinyInteger('status_selesai')->default(0)->after('status_logistik');
        });
    }

    public function down(): void
    {
        Schema::table('produksis', function (Blueprint $table) {
            $table->dropColumn('status_selesai');
        });
    }
};
