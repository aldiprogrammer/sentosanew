<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bahans', function (Blueprint $table) {
            $table->string('qty', 20)->nullable()->after('klik');
        });
    }

    public function down(): void
    {
        Schema::table('bahans', function (Blueprint $table) {
            $table->dropColumn('qty');
        });
    }
};
