<?php

namespace App\Http\Controllers;

use App\Models\Absence;
use App\Models\Student;
use Illuminate\Http\Request;

class AbsenceController extends Controller
{

// index all the absence based on the group id 
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
// index the absence based on the student id 
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




// store method for absence 
  public function store(Request $request)
{
     
    $request->validate([
        '*.student_id'   => 'required|integer|exists:students,id',
        '*.group_id'     => 'required|integer|exists:groups,id',
        '*.date'         => 'required|date',
        '*.start_time'   => 'required|date_format:H:i',
        '*.end_time'     => 'required|date_format:H:i|after:start_time',
        '*.marked_by'    => 'required|string',
        '*.is_allowed'   => 'required|boolean',
        '*.is_justified' => 'required|boolean',
    ]);

     
    foreach ($request->all() as $absenceData) {
        Absence::create([
            'student_id'    => $absenceData['student_id'],
            'group_id'      => $absenceData['group_id'],
            'date'          => $absenceData['date'],
            'start_time'    => $absenceData['start_time'],
            'end_time'      => $absenceData['end_time'],
            'marked_by'     => $absenceData['marked_by'],
            'is_allowed'    => $absenceData['is_allowed'],
            'is_justified'  => $absenceData['is_justified'],
        ]);
    }

    return response()->json(['message' => 'Absences created successfully.'], 201);
}

//update method for the absence records 
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
//delete by student method 
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

     

//index method 
        public function index()
    {
        $absences = Absence::with(['student.group'])
            ->where('is_allowed', false)
            ->get();

        return response()->json($absences);
    }


    


    //allow method 
   public function allow(Request $request, $id)
{
    $request->validate([
        'is_allowed' => 'required|boolean',
    ]);

    $absence = Absence::findOrFail($id);
    $studentId = $absence->student_id;
    $isAllowed = $request->input('is_allowed');
    
   
    $student = $absence->student;
    $student->warning_count += 1;
    $student->save();
    
     
    $absences = Absence::where('student_id', $studentId)->get();
    
    foreach ($absences as $abs) {
        $abs->is_allowed = $isAllowed;
        $abs->save();
    }

    return response()->json([
        'message' => 'Absence permission updated successfully for all '.$student->name.' records',
         
    ]);
}



//justified method for the absence records 
public function justified(Request $request, $id){
        $request->validate([
        'is_justified' => 'required|boolean',
        'is_allowed' => 'required|boolean'

     
    ]);

       $absence = Absence::findOrFail($id);
       $studentID = $absence->student_id; 
       $student = Student::findOrFail($studentID);

       $Absences = Absence::where('student_id', $studentID)->get();
       $is_allowed = $request->input('is_allowed');
       $is_justified = $request->input('is_justified'); 
       foreach($Absences as $abs){
          $abs->is_allowed = $is_allowed;
          $abs->is_justified = $is_justified;
          $abs->save();
        }
    
       return response()->json([
         'message' => 'Absence justified  successfully for all '.$student->name.' records', 
         
    ]);
}

    
}
