<?php

namespace App\Models\JobBard;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use App\Models\Ignug\State;

class AcademicFormation extends Model implements Auditable
{
    
    use OwenIt\Auditing\Auditable;
    protected $connection = 'pgsql-job-board';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'registration_date',
        'senescyt_code',
        'has_titling',
    ];


    public function professional()
    {
        return $this->belongsTo(Professional::class);
    }

    public function institution()
    {
        return $this->belongsTo(Institution::class);
    }

    public function career()
    {
        return $this->belongsTo(Career::class);
    }
    
    public function state()
    {
        return $this->belongsTo(State :: class);
    }

}
