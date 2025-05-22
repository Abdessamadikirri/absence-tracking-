<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Group extends Model
{
    protected $fillable = [
        'name',
        'major_id',
        
    ];

    public function major():BelongsTo
    {
        return $this->belongsTo(Major::class);
    }
    public function absences():HasMany
    {
        return $this->hasMany(Absence::class);
    }

    public function student():HasMany
    {
        return $this->hasMany(Student::class);
    }
}
