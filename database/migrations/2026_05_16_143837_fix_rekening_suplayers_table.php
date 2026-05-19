<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('rekening_suplayers', function (Blueprint $table) {
            $table->dropColumn('id_suplayaer');
        });

        Schema::table('rekening_suplayers', function (Blueprint $table) {
            $table->foreignId('id_suplayer')->after('id')->constrained('suplayers')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('rekening_suplayers', function (Blueprint $table) {
            $table->dropForeign(['id_suplayer']);
            $table->dropColumn('id_suplayer');
        });

        Schema::table('rekening_suplayers', function (Blueprint $table) {
            $table->string('id_suplayaer', 11)->after('id');
        });
    }
};
