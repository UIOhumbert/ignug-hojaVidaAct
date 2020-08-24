<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\JobBoard;
use Faker\Generator as Faker;

$factory->define(Model::class, function (Faker $faker) {
    return [

        'professional_id'=> random_int (1,10),
        'institution' => $Faker->company,
        'position' => $Faker-> titleMale    ,
        'contact' => $Faker-> tollFreePhoneNumber,
        'phone' =>$Faker-> phoneNumber ,
        'state_id' =>1,
    ];
});
