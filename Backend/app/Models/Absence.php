<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Absence extends Model
{
    protected $fillable = [
        'student_id',
        'group_id',
        'date',
        'start_time',
        'end_time',
        'marked_by',
        'is_allowed',
        'is_justified'
    ];

    public function student():BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function group():BelongsTo
    {
        return $this->belongsTo(Group::class);
    }
}
