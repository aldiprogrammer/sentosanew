<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Distributor;
use App\Models\Kurir;
use App\Models\Pengguna;
use App\Models\Suplayer;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Home', [
            'totalPengguna' => Pengguna::count(),
            'totalCustomer' => Customer::count(),
            'totalKurir' => Kurir::count(),
            'totalDistributor' => Distributor::count(),
            'totalSuplayer' => Suplayer::count(),
        ]);
    }
}
