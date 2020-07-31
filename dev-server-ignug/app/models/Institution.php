<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use OwenIt\Auditing\Contracts\Auditable;

class Institution extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;

    protected $connection = 'pgsql-ignug';
    protected $fillable = [
        'code',
        'name',
        'slogan',
    ];

    public function setCodeAttribute($value)
    {
        $this->attributes['code'] = strtolower($value);
    }

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = strtoupper($value);
    }

    public function state()
    {
        return $this->belongsTo(State::class);
    }

    public function careers()
    {
        return $this->hasMany(Career::class);
    }
}
