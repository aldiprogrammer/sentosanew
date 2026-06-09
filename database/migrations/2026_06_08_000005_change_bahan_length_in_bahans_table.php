<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement('SET SESSION sql_mode = ""');
        DB::statement('UPDATE bahans SET created_at = NULL WHERE created_at = "0000-00-00 00:00:00"');
        DB::statement('UPDATE bahans SET updated_at = NULL WHERE updated_at = "0000-00-00 00:00:00"');
        DB::statement('ALTER TABLE bahans MODIFY bahan VARCHAR(200) NOT NULL');
    }

    public function down(): void
    {
        DB::statement('ALTER TABLE bahans MODIFY bahan VARCHAR(35) NOT NULL');
    }
};
