<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('po_eksternals', function (Blueprint $table) {
            $table->decimal('sub_total', 15, 2)->default(0)->after('ppn');
        });
    }

    public function down(): void
    {
        Schema::table('po_eksternals', function (Blueprint $table) {
            $table->dropColumn('sub_total');
        });
    }
};
