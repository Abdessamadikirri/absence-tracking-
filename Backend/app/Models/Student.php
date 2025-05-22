<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model


{

    protected $fillable = [
        'name',
        'email',
        'national_id',
        'group_id',
        'warning_count',

    ];
     public function absence():HasMany
     {
        return $this->hasMany(Absence::class);
     }

     public function group():BelongsTo
     {
        return $this->belongsTo(Group::class);
     }
}
