<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('kategoridesains', function (Blueprint $table) {
            $table->string('fee_cs', 20)->nullable()->after('fee');
        });
    }

    public function down(): void
    {
        Schema::table('kategoridesains', function (Blueprint $table) {
            $table->dropColumn('fee_cs');
        });
    }
};
