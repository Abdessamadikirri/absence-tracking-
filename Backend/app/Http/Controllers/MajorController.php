<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Major;
use Illuminate\Http\Request;
 

class MajorController extends Controller
{
    public function  store(Request $request){
        $request->validate([
            'name' => 'required|string|max:250',
            'code' => 'required|string|max:250',
            'level' => 'required|string|max:250'
        ]);

        Major::create([
            'name' => $request->input('name'),
            'code' => $request->input('code'),
            'level' => $request->input('level')
        ]);

        return response()->json(['message' => ' major Has been created successfully'],201);
    }

    public function index(){
        $majors=Major::all();
        
        return response()->json($majors);

    }

    public function delete($id){
        $major = Major::find($id);

       if(!$major){
            return response()->json(['message' => 'major not found '],404);
       }

        $major->delete();

        return response()->json(['message'=>'user has been deleted successfully '],200);
    }

    public function update($id ,Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:250',
            'code' => 'required|string|max:250',
            'level' => 'required|string|max:250'
        ]);

        $major = Major::find($id);

        if(!$major){
            return response()->json(['message' => ' major not found'],404);
        }

        
        $major->name = $request->input('name');
        $major->code = $request->input('code');
        $major->level = $request->input('level');

        $major->save();

        return response()->json(['message'=>'major has been updated successfully'],200);

    }

    public function show($id)
    {
        $major = Major::find($id);

        if(!$major){
            return response()->json(['message' => 'major not found '],404);

        }

        return response()->json(['major' => $major]);
    }
}
