<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\JobBoard\Course;
use Faker\Generator as Faker;

$factory->define(Course::class, function (Faker $faker) {
    return [
        'professional_id' => random_int(31, 38),
        'event_type_id' => random_int(44, 45),
        'institution_id' => 62,
        'event_name' => $faker->word,
        'start_date' => $faker->date($format = 'Y-m-d', $max = 'now'),
        'finish_date' => $faker->date($format = 'Y-m-d', $max = 'now'),
        'hours' => $faker->time($format = 'H:i:s', $max = 'now'),
        'type_certification_id' => random_int(46, 53),
        'state_id' => 1,
    ];
});
