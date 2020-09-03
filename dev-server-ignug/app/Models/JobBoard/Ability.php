<?php

namespace App\Models\JobBoard;

use Illuminate\Database\Eloquent\Model;

class Ability extends Model
{


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'category',
        'description',
        'state',
    ];

    public function profesional()
    {
        return $this->belongsTo(Professional::class);
    }

}
