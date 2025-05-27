<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
   public function register(Request $request)
{
    $request->validate([
        'name'          => 'required',
        'email'         => 'required|email|unique:users',
        'password'      => ['required','confirmed',Password::min(8)->letters()->mixedCase()->numbers()->symbols()],
        'role'          => 'required|string|max:250',
    ]);

     
    $user = User::create([
        'name'          => $request->input('name'),
        'email'         => $request->input('email'),
        'password'      => Hash::make($request->input('password')),
        'role'          => $request->input('role'),
    ]);

     
    Auth::login($user);

     
    return response()->json([
        'message' => 'User registered and logged in successfully',
        'user'    => $user,
    ], 201);
}
    public function login(Request $request)
    {
         
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string|min:8',
        ]);

         
        $user = User::where('email', $request->input('email'))->first();

         
        if (!$user || !Hash::check($request->input('password'), $user->password)) {
            return response()->json(['message' => 'Email or password is invalid '], 401);
        }

      
        Auth::login($user);

        return response()->json([
            'message' => 'you  logged in successfully',
            'user'    => $user,
        ]);
    }
  public function logout(Request $request)
    {
        if (!$request->user()) {
            return response()->json(['message' => 'unauthonthicated user'], 401);
        }

        Auth()-> guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'Logged out successfully'], 200);
    }
    public function user(Request $request){
        $user =Auth::user();
        return response()->json($user);
    }
}
