<?php

use App\Http\Controllers\admin\CustomerController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\JabatanController;
use App\Http\Controllers\admin\KategoriDesainController;
use App\Http\Controllers\admin\PenggunaController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/home', [DashboardController::class, 'index'])->name('home');
Route::get('/customer', [CustomerController::class, 'index'])->name('customer');
Route::post('/customer', [CustomerController::class, 'store'])->name('store.customer');
Route::delete('/customer/{id}', [CustomerController::class, 'delete'])->name('delete.customer');
Route::put('/customer/{id}', [CustomerController::class, 'update'])->name('update.customer');


Route::get('/jabatan', [JabatanController::class, 'index'])->name('jabatan');
Route::post('/jabatan', [JabatanController::class, 'store'])->name('store.jabatan');
Route::delete('/jabatan/{id}', [JabatanController::class, 'delete'])->name('delete.jabatan');
Route::put('/jabatan/{id}', [JabatanController::class, 'update'])->name('update.jabatan');

Route::get('/kategoridesain', [KategoriDesainController::class, 'index'])->name('kategoridesain');
Route::post('/kategoridesain', [KategoriDesainController::class, 'store'])->name('store.kategoridesain');
Route::delete('/kategoridesain/{id}', [KategoriDesainController::class, 'delete'])->name('delete.kategoridesain');
Route::put('/kategoridesain/{id}', [KategoriDesainController::class, 'update'])->name('update.kategoridesain');

Route::get('/pengguna', [PenggunaController::class, 'index'])->name('kategoridesain');
Route::post('/pengguna', [PenggunaController::class, 'store'])->name('store.pengguna');
Route::delete('/pengguna/{id}', [PenggunaController::class, 'delete'])->name('delete.pengguna');
Route::put('/pengguna/{id}', [PenggunaController::class, 'update'])->name('update.pengguna');




require __DIR__ . '/auth.php';
