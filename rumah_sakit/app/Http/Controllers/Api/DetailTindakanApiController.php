<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DetailTindakan;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class DetailTindakanApiController extends Controller
{
    public function index()
    {
        $details = DetailTindakan::with(['kunjungan', 'tindakan'])->get();
        return response()->json($details);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'kunjungan_id' => 'required|exists:kunjungans,id',
                'tindakan_id' => 'required|exists:tindakans,id',
                'keterangan' => 'nullable|string',
                'subtotal' => 'required|integer',
            ]);

            $detail = DetailTindakan::create($validated);

            return response()->json($detail, 201);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Internal Server Error', 'error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $detail = DetailTindakan::with(['kunjungan', 'tindakan'])->findOrFail($id);
        return response()->json($detail);
    }

    public function update(Request $request, $id)
    {
        try {
            $detail = DetailTindakan::findOrFail($id);

            $validated = $request->validate([
                'kunjungan_id' => 'sometimes|exists:kunjungans,id',
                'tindakan_id' => 'sometimes|exists:tindakans,id',
                'keterangan' => 'nullable|string',
                'subtotal' => 'sometimes|integer',
            ]);

            $detail->update($validated);

            return response()->json($detail);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Internal Server Error', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $detail = DetailTindakan::findOrFail($id);
        $detail->delete();

        return response()->json(null, 204);
    }
}
