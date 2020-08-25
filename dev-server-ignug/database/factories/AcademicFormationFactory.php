<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\JobBoard;
use Faker\Generator as Faker;

$factory->define(AcademicFormation::class, function (Faker $faker) {
    return [
        'professional_id' => random_int(1,10),
        'institution_id'=> random_int(1,10),
        'career_id' => random_int(1,10),
        'professional_degree_id' => random_int(1,10),
        'registration_date' => $Faker->date($format = 'Y-m-d', $max = 'now'),
        'senescyt_code' => $Faker->word,
        'has_titling' => $Faker->boolean,
        'state_id' => 1,
    ];
});
