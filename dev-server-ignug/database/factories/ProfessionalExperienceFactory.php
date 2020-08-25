<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(ProfessionalExperience::class, function (Faker $faker) {
    return [
        'professional_id' => $faker->random_int(31, 38),
        'employer' => $faker->random_int(31, 38),
        'position_id' => $faker->random_int(31, 38),
        'job_description' => $faker->words($nb = 3, $asText = false),
        'start_date' => $faker->date($format = 'Y-m-d', $max = 'now'),
        'finish_date' => $faker->date($format = 'Y-m-d', $max = 'now'),
        'reason_leave' => $faker->words($nb = 3, $asText = false),
        'current_work' => $faker->words($nb = 3, $asText = false),
        'state_id' => 1,
        
    ];
});
