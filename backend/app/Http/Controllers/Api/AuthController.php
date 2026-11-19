<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
public function register(Request $request)
{
$validated = $request->validate([
    'name' => 'required|string|max:255',
    'email' => 'required|email|unique:users,email',
    'password' => 'required|string|min:8|confirmed',
], [
    'name.required' => 'Ime je obavezno.',
    'name.max' => 'Ime može sadržati najviše 255 karaktera.',

    'email.required' => 'Email adresa je obavezna.',
    'email.unique' => 'Korisnik sa ovom email adresom već postoji.',

    'password.required' => 'Lozinka je obavezna.',
    'password.min' => 'Lozinka mora sadržati najmanje 8 karaktera.',
    'password.confirmed' => 'Lozinka i potvrda lozinke se ne podudaraju.',
]);

$user = User::create([
'name' => $validated['name'],
'email' => $validated['email'],
'password' => Hash::make($validated['password']),
]);

return response()->json([
'message' => 'Registracija uspešna.',
'user' => $user,
], 201);
}

public function login(Request $request)
{
$credentials = $request->validate([
    'email' => 'required|email',
    'password' => 'required|string',
], [
    'email.required' => 'Email adresa je obavezna.',
    'password.required' => 'Lozinka je obavezna.',
]);

if (!Auth::attempt($credentials)) {
throw ValidationException::withMessages([
'email' => ['Email ili lozinka nisu ispravni.'],
]);
}

$user = Auth::user();

$token = $user->createToken('auth_token')->plainTextToken;

return response()->json([
'message' => 'Prijava uspešna.',
'user' => $user,
'token' => $token,
]);
}

public function logout(Request $request)
{
  $request->user()->currentAccessToken()->delete();

    return response()->json([
        'message' => 'Odjava uspešna.'
    ]);
}
}
