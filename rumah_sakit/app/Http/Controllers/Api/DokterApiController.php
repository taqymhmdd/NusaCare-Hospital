<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Dokter;
use Illuminate\Http\Request;

class DokterApiController extends Controller
{
    public function index()
    {
        return response()->json(Dokter::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'spesialis' => 'required|string|max:255',
            'jadwal_praktik' => 'required|string|max:255',
            'no_str' => 'required|string|unique:dokters,no_str',
        ]);

        $dokter = Dokter::create($validated);
        return response()->json($dokter, 201);
    }

    public function show($id)
    {
        return response()->json(Dokter::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $dokter = Dokter::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'sometimes|required|string|max:255',
            'spesialis' => 'sometimes|required|string|max:255',
            'jadwal_praktik' => 'sometimes|required|string|max:255',
            'no_str' => 'sometimes|required|string|unique:dokters,no_str,' . $id,
        ]);

        $dokter->update($validated);
        return response()->json($dokter);
    }

    public function destroy($id)
    {
        $dokter = Dokter::findOrFail($id);
        $dokter->delete();
        return response()->json(null, 204);
    }
}
