<?php

namespace App\Models\JobBoard;

use Illuminate\Database\Eloquent\Model;

class Professional extends Model
{
    protected $connection = 'pgsql-job-board';
    protected $fillable = [
        'about_me',
    ];

    public function offers()
    {
        return $this->belongsToMany('App\Offer')->withTimestamps();
    }

    public function companies()
    {
        return $this->belongsToMany('App\Company')->withTimestamps();
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function academicFormations()
    {
        return $this->hasMany('App\AcademicFormation');
    }

    public function abilities()
    {
        return $this->hasMany('App\Ability');
    }

    public function languages()
    {
        return $this->hasMany('App\Language');
    }

    public function courses()
    {
        return $this->hasMany('App\Course');
    }

    public function professionalExperiences()
    {
        return $this->hasMany('App\ProfessionalExperience');
    }

    public function professionalReferences()
    {
        return $this->hasMany('App\ProfessionalReference');
    }


}
