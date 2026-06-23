<?php

use App\Http\Controllers\admin\BahanController;
use App\Http\Controllers\admin\BahanbeliController;
use App\Http\Controllers\admin\CustomerController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\DataOrderController;
use App\Http\Controllers\admin\DesainController;
use App\Http\Controllers\admin\DistributorController;
use App\Http\Controllers\admin\HomeController;
use App\Http\Controllers\admin\JabatanController;
use App\Http\Controllers\admin\KategoriDesainController;
use App\Http\Controllers\admin\KurirController;
use App\Http\Controllers\admin\LaporanPembukuanController;
use App\Http\Controllers\admin\MaterbahanController;
use App\Http\Controllers\admin\PenggunaController;
use App\Http\Controllers\admin\PoPembelianBahanController;
use App\Http\Controllers\admin\PoEksternalController;
use App\Http\Controllers\admin\ProduksiController;
use App\Http\Controllers\admin\SuplayerController;
use App\Http\Controllers\admin\SuplayerPembelianBahanController;
use App\Http\Controllers\admin\OtorisasiController;
use App\Http\Controllers\produksi\FinishingController;
use App\Http\Controllers\produksi\LogistikController;
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
    Route::post('/bahan/{kode}/harga', [BahanController::class, 'storeHarga'])->name('store.harga-bahan');
    Route::put('/bahan/harga/{id}', [BahanController::class, 'updateHarga'])->name('update.harga-bahan');
    Route::delete('/bahan/harga/{id}', [BahanController::class, 'deleteHarga'])->name('delete.harga-bahan');
    Route::delete('/bahan/{id}', [BahanController::class, 'delete'])->name('delete.bahan');
    Route::put('/bahan/{id}', [BahanController::class, 'update'])->name('update.bahan');

    Route::get('/materbahan', [MaterbahanController::class, 'index'])->name('materbahan');
    Route::post('/materbahan', [MaterbahanController::class, 'store'])->name('store.materbahan');
    Route::put('/materbahan/{id}', [MaterbahanController::class, 'update'])->name('update.materbahan');
    Route::delete('/materbahan/{id}', [MaterbahanController::class, 'delete'])->name('delete.materbahan');

    Route::get('/bahanbeli', [BahanbeliController::class, 'index'])->name('bahanbeli');
    Route::post('/bahanbeli', [BahanbeliController::class, 'store'])->name('store.bahanbeli');
    Route::put('/bahanbeli/{id}', [BahanbeliController::class, 'update'])->name('update.bahanbeli');
    Route::delete('/bahanbeli/{id}', [BahanbeliController::class, 'delete'])->name('delete.bahanbeli');

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

    Route::get('/otorisasi', [OtorisasiController::class, 'index'])->name('otorisasi');
    Route::get('/otorisasi/cari/{kode_spk}', [OtorisasiController::class, 'cariSpk']);
    Route::post('/otorisasi', [OtorisasiController::class, 'store'])->name('store.otorisasi');
    Route::put('/otorisasi/{id}', [OtorisasiController::class, 'update'])->name('update.otorisasi');
    Route::put('/otorisasi/{id}/proses', [OtorisasiController::class, 'proses'])->name('proses.otorisasi');
    Route::delete('/otorisasi/{id}', [OtorisasiController::class, 'delete'])->name('delete.otorisasi');

    Route::get('/suplayer', [SuplayerController::class, 'index'])->name('suplayer');
    Route::post('/suplayer', [SuplayerController::class, 'store'])->name('store.suplayer');
    Route::put('/suplayer/{id}', [SuplayerController::class, 'update'])->name('update.suplayer');
    Route::delete('/suplayer/{id}', [SuplayerController::class, 'delete'])->name('delete.suplayer');

    Route::get('/suplayer-pembelian-bahan', [SuplayerPembelianBahanController::class, 'index'])->name('suplayer-pembelian-bahan');
    Route::post('/suplayer-pembelian-bahan', [SuplayerPembelianBahanController::class, 'store'])->name('store.suplayer-pembelian-bahan');
    Route::put('/suplayer-pembelian-bahan/{id}', [SuplayerPembelianBahanController::class, 'update'])->name('update.suplayer-pembelian-bahan');
    Route::delete('/suplayer-pembelian-bahan/{id}', [SuplayerPembelianBahanController::class, 'delete'])->name('delete.suplayer-pembelian-bahan');

    Route::get('/dataproduksi', [ProduksiProduksiController::class, 'dataproduksi'])->name('dataproduksi');
    Route::put('/dataproduksi/proses-produksi', [ProduksiProduksiController::class, 'prosesProduksi'])->name('proses.produksi');
    Route::get('/data-order', [DataOrderController::class, 'index'])->name('data-order');
    Route::get('/data-desain', [DesainController::class, 'dataDesain'])->name('data-desain');
    Route::put('/data-desain/proses-pembayaran', [DesainController::class, 'prosesPembayaran'])->name('proses.pembayaran.desain');
    Route::get('/produksi/produksi', [ProduksiProduksiController::class, 'index'])->name('produksi.produksi');
    Route::put('/produksi/produksi/{id}/proses', [ProduksiProduksiController::class, 'proses'])->name('produksi.produksi');

    Route::get('/produksi/finishing', [FinishingController::class, 'index'])->name('finishing.finishing');
    Route::put('/finishing/finishing/{id}/proses', [FinishingController::class, 'proses'])->name('finishing.finishing');

    Route::get('/produksi/logistik', [LogistikController::class, 'index'])->name('logistik.logistik');
    Route::put('/logistik/logistik/{id}/proses', [LogistikController::class, 'proses'])->name('logistik.logistik');

    Route::get('/laporan-pembukuan', [LaporanPembukuanController::class, 'index'])->name('laporan-pembukuan');

    Route::get('/po-eksternal', [PoEksternalController::class, 'index'])->name('po-eksternal');
    Route::post('/po-eksternal', [PoEksternalController::class, 'store'])->name('store.po-eksternal');
    Route::put('/po-eksternal/{id}', [PoEksternalController::class, 'update'])->name('update.po-eksternal');
    Route::delete('/po-eksternal/{id}', [PoEksternalController::class, 'delete'])->name('delete.po-eksternal');
    Route::get('/po-eksternal/cari-invoice', [PoEksternalController::class, 'cariInvoice']);
    Route::get('/po-eksternal/{id}/detail', [PoEksternalController::class, 'detail'])->name('detail.po-eksternal');
    Route::get('/po-eksternal/{id}/detail/pdf', [PoEksternalController::class, 'pdf'])->name('pdf.po-eksternal');
    Route::post('/po-eksternal/{id}/item', [PoEksternalController::class, 'storeItem'])->name('store-item.po-eksternal');
    Route::put('/po-eksternal/item/{id}', [PoEksternalController::class, 'updateItem'])->name('update-item.po-eksternal');
    Route::delete('/po-eksternal/item/{id}', [PoEksternalController::class, 'deleteItem'])->name('delete-item.po-eksternal');
    Route::put('/po-eksternal/{id}/header', [PoEksternalController::class, 'updateHeader'])->name('update-header.po-eksternal');

    Route::get('/po-pembelian-bahan', [PoPembelianBahanController::class, 'index'])->name('po-pembelian-bahan');
    Route::post('/po-pembelian-bahan', [PoPembelianBahanController::class, 'store'])->name('store.po-pembelian-bahan');
    Route::put('/po-pembelian-bahan/{id}', [PoPembelianBahanController::class, 'update'])->name('update.po-pembelian-bahan');
    Route::delete('/po-pembelian-bahan/{id}', [PoPembelianBahanController::class, 'delete'])->name('delete.po-pembelian-bahan');
    Route::get('/po-pembelian-bahan/{id}/detail', [PoPembelianBahanController::class, 'detail'])->name('detail.po-pembelian-bahan');
    Route::post('/po-pembelian-bahan/{id}/item', [PoPembelianBahanController::class, 'storeItem'])->name('store-item.po-pembelian-bahan');
    Route::put('/po-pembelian-bahan/item/{id}', [PoPembelianBahanController::class, 'updateItem'])->name('update-item.po-pembelian-bahan');
    Route::delete('/po-pembelian-bahan/item/{id}', [PoPembelianBahanController::class, 'deleteItem'])->name('delete-item.po-pembelian-bahan');
    Route::put('/po-pembelian-bahan/{id}/header', [PoPembelianBahanController::class, 'updateHeader'])->name('update-header.po-pembelian-bahan');
    Route::put('/po-pembelian-bahan/{id}/update-stok', [PoPembelianBahanController::class, 'updateStok'])->name('update-stok.po-pembelian-bahan');
    Route::put('/po-pembelian-bahan/{id}/tarik-stok', [PoPembelianBahanController::class, 'tarikStok'])->name('tarik-stok.po-pembelian-bahan');
});

require __DIR__ . '/auth.php';
