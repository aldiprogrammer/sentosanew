<?php

use App\Http\Controllers\admin\BahanController;
use App\Http\Controllers\admin\CustomerController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\DesainController;
use App\Http\Controllers\admin\DistributorController;
use App\Http\Controllers\admin\HomeController;
use App\Http\Controllers\admin\JabatanController;
use App\Http\Controllers\admin\KategoriDesainController;
use App\Http\Controllers\admin\KurirController;
use App\Http\Controllers\admin\PenggunaController;
use App\Http\Controllers\admin\ProduksiController;
use App\Http\Controllers\admin\SuplayerController;
use App\Http\Controllers\produksi\ProduksiController as ProduksiProduksiController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [HomeController::class, 'index'])->name('app');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/home', [DashboardController::class, 'index'])->name('home');

    Route::get('/customer', [CustomerController::class, 'index'])->name('customer');
    Route::get('/customer/{id}', [CustomerController::class, 'show'])->name('show.customer');
    Route::post('/customer', [CustomerController::class, 'store'])->name('store.customer');
    Route::delete('/customer/{id}', [CustomerController::class, 'delete'])->name('delete.customer');
    Route::put('/customer/{id}', [CustomerController::class, 'update'])->name('update.customer');

    Route::get('/jabatan', [JabatanController::class, 'index'])->name('jabatan');
    Route::post('/jabatan', [JabatanController::class, 'store'])->name('store.jabatan');
    Route::delete('/jabatan/{id}', [JabatanController::class, 'delete'])->name('delete.jabatan');
    Route::put('/jabatan/{id}', [JabatanController::class, 'update'])->name('update.jabatan');

    Route::get('/kategoridesain', [KategoriDesainController::class, 'index'])->name('kategoridesain');
    Route::get('/kategoridesain/{id}', [KategoriDesainController::class, 'show'])->name('show.kategoridesain');
    Route::post('/kategoridesain', [KategoriDesainController::class, 'store'])->name('store.kategoridesain');
    Route::delete('/kategoridesain/{id}', [KategoriDesainController::class, 'delete'])->name('delete.kategoridesain');
    Route::put('/kategoridesain/{id}', [KategoriDesainController::class, 'update'])->name('update.kategoridesain');

    Route::get('/pengguna', [PenggunaController::class, 'index'])->name('pengguna');
    Route::post('/pengguna', [PenggunaController::class, 'store'])->name('store.pengguna');
    Route::delete('/pengguna/{id}', [PenggunaController::class, 'delete'])->name('delete.pengguna');
    Route::put('/pengguna/{id}', [PenggunaController::class, 'update'])->name('update.pengguna');

    Route::get('/bahan', [BahanController::class, 'index'])->name('bahan');
    Route::post('/bahan', [BahanController::class, 'store'])->name('store.bahan');
    Route::delete('/bahan/{id}', [BahanController::class, 'delete'])->name('delete.bahan');
    Route::put('/bahan/{id}', [BahanController::class, 'update'])->name('update.bahan');

    Route::get('/desain', [DesainController::class, 'index'])->name('desain');
    Route::post('/desain', [DesainController::class, 'store'])->name('store.desain');
    Route::put('/desain/{id}', [DesainController::class, 'update'])->name('update.desain');
    Route::delete('/desain/{id}', [DesainController::class, 'delete'])->name('delete.desain');

    Route::get('/produksi', [ProduksiController::class, 'index'])->name('produksi');
    Route::post('/produksi', [ProduksiController::class, 'store'])->name('store.produksi');
    Route::put('/produksi/{id}', [ProduksiController::class, 'update'])->name('update.produksi');
    Route::delete('/produksi/{id}', [ProduksiController::class, 'delete'])->name('delete.produksi');

    Route::get('/distributor', [DistributorController::class, 'index'])->name('distributor');
    Route::post('/distributor', [DistributorController::class, 'store'])->name('store.distributor');
    Route::put('/distributor/{id}', [DistributorController::class, 'update'])->name('update.distributor');
    Route::delete('/distributor/{id}', [DistributorController::class, 'delete'])->name('delete.distributor');

    Route::get('/kurir', [KurirController::class, 'index'])->name('kurir');
    Route::post('/kurir', [KurirController::class, 'store'])->name('store.kurir');
    Route::put('/kurir/{id}', [KurirController::class, 'update'])->name('update.kurir');
    Route::delete('/kurir/{id}', [KurirController::class, 'delete'])->name('delete.kurir');

    Route::get('/suplayer', [SuplayerController::class, 'index'])->name('suplayer');
    Route::post('/suplayer', [SuplayerController::class, 'store'])->name('store.suplayer');
    Route::put('/suplayer/{id}', [SuplayerController::class, 'update'])->name('update.suplayer');
    Route::delete('/suplayer/{id}', [SuplayerController::class, 'delete'])->name('delete.suplayer');

    Route::get('/produksi/produksi', [ProduksiProduksiController::class, 'index'])->name('produksi.produksi');
    Route::put('/produksi/produksi/{id}/proses', [ProduksiProduksiController::class, 'proses'])->name('produksi.produksi');
});

require __DIR__ . '/auth.php';
