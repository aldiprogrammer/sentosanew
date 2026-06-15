<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
$exists = DB::connection()->select('SHOW TABLES LIKE ?', ['po_eksternals']);
echo $exists ? "EXISTS\n" : "NOT EXISTS\n";
unlink(__FILE__);
