<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Group;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function store(Request $request)
    {
       $request->validate([
            'name' => 'required|string|max:250',
            'email' => 'required|email|max:250',
            'national_id' => 'required|string|min:7',
            'group_id' => 'required|string',
            'warning_count' => 'required|numeric'
       ]);
       $group=Group::where('name',$request->input('group_id'))->first();
       Student::create([
        'name' => $request->input('name'),
        'email' => $request->input('email'),
        'national_id' => $request->input('national_id'),
        'group_id' =>$group->id,
        'warning_count' => $request->input('warning_count'),
       ]);


       return response()->json(['message' => 'student has been created successfully '],201);
    }
    
    public function index()
{
    $students = Student::with('group')->get();

    $students = $students->map(function ($student) {
        return [
            'id' => $student->id,
            'name' => $student->name,
            'email' => $student->email,
            'national_id' => $student->national_id,
            'warning_count' => $student->warning_count,
            'group_id' => $student->group_id,
            'group_name' => $student->group ? $student->group->name : null,
        ];
    });

    return response()->json($students);
}
     
        public function indexByGroup(Request $request)
{
    // Get group name from the request
    $groupName = $request->group_name;

    if (!$groupName) {
        return response()->json(['error' => 'Group name is required'], 400);
    }

    // Find the group by name
    $group = Group::where('name', $groupName)->first();

    if (!$group) {
        return response()->json(['error' => 'Group not found'], 404);
    }

    // Get all students in that group
    $students = Student::where('group_id', $group->id)->get();

    // Add the group name to each student
    $data = $students->map(function ($student) use ($request) {
        return [
            'id' => $student->id,
            'name' => $student->name,
            'email' => $student->email,
            'national_id' => $student->national_id,
            'warning_count' => $student->warning_count,
            'group_id' => $student->group_id,
            'group_name' => $request->group_name,
        ];
    });

    return response()->json($data);
}

    

     public function update($id , Request $request)
    {
        $student = Student::find($id);

        if(!$student){
            return response()->json(['message' => 'student not found '],404);
        }

        $request->validate([
            'name' => 'required|string|max:250',
            'email' => 'required|email|max:250',
            'national_id' => 'required|string|min:7',
            'group_id' => 'required|numeric',
            'warning_count' => 'required|numeric'
        ]);

        $student->name = $request->input('name');
        $student->email = $request->input('email');
        $student->national_id = $request->input('national_id');
        $student->group_id = $request->input('group_id');
        $student->warning_count = $request->input('warning_count');

        $student->save();

        return response()->json(['message' => 'student updated successfully'],200);
        
    }
     public function delete($id)
    {
        $student = Student::find($id);

        if(!$student){
            return response()->json(['message' => 'student not found '],404);
        }
        $student->delete();

        return response()->json(['message' => 'student has been deleted successfully'],200);
    }
     public function show($id)
    {
        $student = Student::find($id);

        if(!$student){
            return response()->json(['message' => 'student not found '],404);
        }

        return response()->json(['student' => $student]);
    }

    
}
