<?php

namespace App\Models\JobBoard;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class ProfessionalExperience extends Model implements Auditable
{

    use \OwenIt\Auditing\Auditable;

    protected $connection = 'pgsql-job-board';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'employer',
        'position',
        'job_description',
        'start_date',
        'finish_date',
        'reason_leave',
        'current_work',
        'state',
    ];

    public function profsesional()
    {
        return $this->belongsTo('App\Professional');
    }

}
