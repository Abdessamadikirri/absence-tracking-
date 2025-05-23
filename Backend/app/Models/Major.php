<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Major extends Model
{
    protected $fillable = [
        'name',
        'code',
        'level'
    ];

    public function groups():HasMany
    {
        return $this->hasMany(Group::class);
    }
}
