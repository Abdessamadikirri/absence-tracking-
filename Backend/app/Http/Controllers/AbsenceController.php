<?php

namespace App\Http\Controllers;

use App\Models\Absence;
use Illuminate\Http\Request;

class AbsenceController extends Controller
{
    public function groupAbsence($groupID)
    {
        $absences = Absence::where('group_id',$groupID)
                            ->where('is_allowed',false)
                            ->with('student')
                            ->get();
        if($absences->isEmpty()){
            return response()->json(['message' => ' there is no absence in this group '],404);
        }

        $newAbsences= $absences->map(function($absence){
            $absence->student_name = $absence->student->name;

            return $absence ;
        });

        return response()->json(['groupAbsence' => $newAbsences],200);

    }
    public function studentAbsence($studentID){
        $absences = Absence::where('student_id',$studentID)
                            ->with('student')
                            ->get();

        if($absences->isEmpty()){
            return response()->json(['mesaage' => "this student has no Absence records "],404);
        };

        $newAbsences = $absences->map(function($absence){
            $absence->student_name = $absence->student->name;

            return $absence;
        });

        return response()->json(['studentAbsence' =>$newAbsences],200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'student_id'=> 'required|numeric',
            'group_id' => 'required|numeric',
            'date' => 'required|string',
            'start_time' => 'required|string',
            'end_time' => 'required|string',
            'marked_by' => 'required|string',
            'is_allowed' => 'required|boolean',
            'is_justified' => 'required|boolean'
        ]);

        Absence::create([
            'student_id' =>$request->input('student_id'),
            'group_id'=>$request->input('group_id'),
            'date'=>$request->input('date'),
            'start_time' =>$request->input('start_time'),
            'end_time' =>$request->input('end_time'),
            'marked_by' =>$request->input('marked_by'),
            'is_allowed' =>$request->input('is_allowed'),
            'is_justified' =>$request->input('is_justified'),
        ]);

        return response()->json(["message" => 'Absence created successfully' ],201);
    }

    public function update($id ,Request $request)
    {
        $request->validate([
            'user_id'=> 'required|numeric',
            'group_id' => 'required|numeric',
            'date' => 'required|string',
            'start_time' => 'required|string',
            'end_time' => 'required|string',
            'marked_by' => 'required|string',
            'is_allowed' => 'required|boolean',
            'is_justified' => 'required|boolean'
        ]);

        $absence = Absence::find($id);

        if(!$absence){
            return response()->json(['message' => ' not found '],404);
        }
        $absence->user_id = $request->input('user_id');
        $absence->group_id= $request->input('group_id');
        $absence->date = $request->input('date');
        $absence->start_time = $request->input('start_time');
        $absence->end_time = $request->input('end_time');
        $absence->marked_by = $request->input('marked_by');
        $absence->is_allowed = $request->input('is_allowed');
        $absence->is_justified = $request->input('is_justified');

        $absence->save();
            
        return response()->json(['message' => 'Absence record has been updated successfully'],200);


    }

    public function deleteAbsenceForStudent($studentId)
    {
        $absences = Absence::where('user_id',$studentId)->get();

         if($absences->isEmpty()){
            return response()->json(['message' => 'not found '],404);
        }

         $absences->each(function($absence){
            $absence->delete();
         });

         return response()->json(['message' => 'Absence record has been deleted successfully'],200);
    }

    public function studentSentToAdministration()
    {
        $absences = Absence::where('is_allowed',false)->with('student')->get();

        $students = $absences->pluck('student')->unique('id')->values();


        return response()->json(['to administration' => $students]);
    }

    
}
