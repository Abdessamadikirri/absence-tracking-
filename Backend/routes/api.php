<?php

 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\AbsenceController;
 
 
use App\Http\Controllers\GroupController;
use App\Http\Controllers\MajorController;
use App\Http\Controllers\StudentController;
 
 

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware(['auth:sanctum']);

Route::middleware(['auth:sanctum'])->group(function(){


    Route::get('/majors/{id}',[MajorController::class,'show']);

    Route::get('/groups',[GroupController::class,'index']);
    Route::get('/groups/{id}',[GroupController::class,'show']);

     

    Route::get('/student/by-group', [StudentController::class, 'indexByGroup']);

    Route::get('/student',[StudentController::class,'index']);
    Route::get('/student/{id}',[StudentController::class,'show']);
});


Route::middleware(['auth:sanctum'])->group(function(){
    Route::get('/user',[AuthController::class, 'user']);

    Route::get('/majors',[MajorController::class,'index']);

    Route::post('/student',[StudentController::class,'store']);
    Route::put('/student/{id}',[StudentController::class,'update']);
    Route::delete('/student/{id}',[StudentController::class,'delete']);
    
    Route::post('/majors',[MajorController::class,'store']);
    Route::put('/majors/{id}',[MajorController::class,'update']);
    Route::delete('/majors/{id}',[MajorController::class,'delete']);
    
    Route::post('/groups',[GroupController::class,'store']);
    Route::put('/groups/{id}',[GroupController::class,'update']);
    Route::delete('/groups/{id}',[GroupController::class,'delete']);
    
    Route::patch('/absence/justified/{id}',[AbsenceController::class,'justified']);
    Route::patch('/absence/allow/{id}', [AbsenceController::class, 'allow']);
    Route::get('/absence',[AbsenceController::class,'index']);
    Route::post('/absence',[AbsenceController::class ,'store']);
    Route::put('/absence/{id}',[AbsenceController::class ,'update']);
    
    
});