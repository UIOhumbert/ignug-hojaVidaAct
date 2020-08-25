<?php

namespace App\Models\JobBoard;


use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use App\Models\Ignug\State;

    class ProfessionalReference extends Model implements Auditable
{

    use OwenIt\Auditing\Auditable;
    protected $connection = 'pgsql-job-board';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'institution',
        'position',
        'contact',
        'phone',
        'state',
    ];

    public function professional()
    {
        return $this->belongsTo(Professional::class);
    }

}
