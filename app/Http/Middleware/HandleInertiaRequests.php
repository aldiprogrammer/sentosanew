<?php

namespace App\Http\Middleware;

use App\Models\Jabatan;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $user = $request->user();
        $menuAkses = [];

        if ($user) {
            $jabatan = Jabatan::where('jabatan', $user->role)->first();
            $menuAkses = $jabatan ? ($jabatan->menu_akses ?? []) : [];
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'menu_akses' => $menuAkses,
            ],
        ];
    }
}
