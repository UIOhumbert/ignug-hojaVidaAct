<?php

namespace App;

use App\Models\State;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Role extends Model implements Auditable
{

    use \OwenIt\Auditing\Auditable;

    /**
     * The attributeshyhy that are mass assignable.gbghbybhytggg
     *
     * @var array
     */
    protected $connection = 'pgsql-authentication';
    protected $fillable = [
        'code',
        'name',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function state()
    {
        return $this->belongsTo(State::class);
    }
}
