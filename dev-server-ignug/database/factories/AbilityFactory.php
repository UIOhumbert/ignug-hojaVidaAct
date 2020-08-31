<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\JobBoard;
use Faker\Generator as Faker;

$factory->define(Ability::class, function (Faker $faker) {
    return [
        'professional_id' => 30,
        'category_id' => random_int(44, 45),
        'description' => $faker->word,   
        'state_id' => 1,

    ];
});


