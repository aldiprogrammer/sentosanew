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
        Schema::table('list_po_eksternals', function (Blueprint $table) {
            $table->string('satuan', 30)->nullable()->after('qty');
        });
    }

    public function down(): void
    {
        Schema::table('list_po_eksternals', function (Blueprint $table) {
            $table->dropColumn('satuan');
        });
    }
};
