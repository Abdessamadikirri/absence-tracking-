<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:250',
            'major_id' => 'required|numeric'
        ]);

        Group::create([
            'name' => $request->input('name'),
            'major_id' => $request->input('major_id')
        ]);

        return response()->json(['message'=> 'group has been created successfully'],201);
    }

    public function index()
{
    $groups = Group::with('major')->get();

    // Inject the major name into each group
    $groupsWithMajorName = $groups->map(function ($group) {
        return [
            'id' => $group->id,
            'name' => $group->name,
            'major_id' => $group->major_id,
            'major_name' => $group->major ? $group->major->name : null,
        ];
    });

    return response()->json($groupsWithMajorName);
}

    

    public function update($id , Request $request){

        $request->validate([
            'name' => 'required|string|max:250',
            'major_id' => 'required|numeric'
        ]);

        $group = Group::find($id);

        if(!$group){
            return response()->json(['message' => 'group not found '],404);
        }

        $group->name = $request->input('name');
        $group->major_id = $request->input('major_id');

        $group->save();

        return response()->json(['message' => 'group has been updated successfully'],200);
    }

    public function delete ($id)
    {
        $group = Group::find($id);
        if(!$group){
            return response()->json(['message' => ' group not found '],404);
        }
        $group->delete();

        return response()->json(['message' => 'group has been deleted successfully'],200);
    }

    public function show ($id)
    {
        $group = Group::find($id);

        if(!$group){
            return response()->json(['message' => 'group not found '],404);
        }

        return response()->json(['group' => $group]);

    }
}
