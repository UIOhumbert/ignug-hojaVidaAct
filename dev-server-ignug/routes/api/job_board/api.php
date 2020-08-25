<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
/*
Route::get('passwords', function () {
    $users = \App\User::orderBy('id')->get();
    $passwords = array();
    $users2 = array();
    foreach ($users as $user) {
        $passwords[] = \Illuminate\Support\Facades\Hash::make($user->identification);
        $users2[] = $user->first_lastname;
    }
    return response()->json(['users' => $users2, 'passwords' => $passwords]);
});

// Users
Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'v0\AuthController@login');
    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('logout', 'v0\AuthController@logout');
        Route::get('user', 'v0\AuthController@user');
        Route::put('users', 'v0\AuthController@updateUser');
        Route::put('password', 'v0\AuthController@changePassword');
        Route::post('users/avatar', 'v0\AuthController@uploadAvatarUri');
    });
});

Route::group(['prefix' => 'catalogues'], function () {
    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('', 'v0\CatalogueController@filter');
    });
});

Route::group(['prefix' => 'workdays'], function () {
    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('all', 'v0\WorkdayController@all');
        Route::get('current_day', 'v0\WorkdayController@getCurrenDate');
        Route::post('', 'v0\WorkdayController@store');
        Route::put('', 'v0\WorkdayController@update');
        Route::delete('{id}', 'v0\WorkdayController@destroy');
    });
});

Route::group(['prefix' => 'tasks'], function () {
    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('all', 'v0\TaskController@all');
        Route::get('catalogues', 'v0\TaskController@allCatalogues');
        Route::get('current_day', 'v0\TaskController@getCurrenDate');
        Route::get('history', 'v0\TaskController@getHistory');
        Route::post('', 'v0\TaskController@store');
        Route::put('', 'v0\TaskController@update');
        Route::delete('{id}', 'v0\TaskController@destroy');
    });
});

Route::group(['prefix' => 'attendances'], function () {
    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('summary', 'v0\AttendanceController@summary');
        Route::get('detail', 'v0\AttendanceController@detail');
        Route::get('{id}', 'v0\AttendanceController@show');
        Route::post('', 'v0\AttendanceController@store');
        Route::put('', 'v0\AttendanceController@update');
        Route::delete('{id}', 'v0\AttendanceController@destroy');
    });
});

Route::group(['prefix' => 'institutions'], function () {

    Route::group(['middleware' => 'auth:api'], function () {

    });
});

/**********************************************************************************************************************/
/*Rutas para obtener los datos personales de la persona*/

Route::group(['prefix' => 'dateperson'], function () {
    Route::group(['middleware' => 'auth:api'], function (){
        Route::get('/validate_cedula',  'UserController@validateCedula');
        Route::get('/users',  'UserController@getAllUsers');
        
        Route::get('/professionals/abilities',  'ProfessionalController@getAbilities');
        Route::get('/professionals/academicFormations',  'ProfessionalController@getAcademicFormations');
        Route::get('/professionals/courses',  'ProfessionalController@getCourses');
        Route::get('/professionals/languages',  'ProfessionalController@getLanguages');
        Route::get('/professionals/professionalExperiences',  'ProfessionalController@getProfessionalExperiences');
        Route::get('/professionals/professionalReferences',  'ProfessionalController@getProfessionalReferences');

        Route::get('/academicFormations',  'AcademicFormationController@getAcademicFormations');

        Route::get('/languages',  'LanguageController@getLanguages');

        Route::get('/abilities',  'AbilityController@getAbilities');

        Route::get('/courses',  'CourseController@getCourses');

        Route::get('/professionalExperiences',  'ProfessionalExperienceController@getProfessionalExperiences');


        Route::get('/professionalReferences',  'ProfessionalReferenceController@getProfessionalReferences');

    }); 
});

/*************************************************************************************************************************/
/* Rutas para los Formación Académica*/
Route::group(['middleware'=> 'auth:api'], function () {
Route::apiResource('academicFormations', 'JobBoard\AcademicFormationController');
});
/**********************************************************************************************************************/

/* Rutas para los idiomas*/
Route::group(['middleware'=> 'auth:api'], function () {
Route::apiResource('languages', 'v0\LanguageController');
});
/**********************************************************************************************************************/

/* Rutas para las fortalezas*/
Route::group(['middleware'=> 'auth:api'], function () {
    Route::apiResource('professionalExperience','v0\ProfessionalExperienceController');
    });
/* Rutas para los cursos  el Middleware es para filtar peticiones*/
//Route::group(['middleware'=> 'auth:api'], function () {
Route::apiResource('courses', 'JobBoard\CourseController');
//});
/**********************************************************************************************************************/

/* Rutas para las experiencias pofesionales*/
Route::group(['middleware'=> 'auth:api'], function () {
Route::apiResource('professionalExperiences', 'JobBoard\ProfessionalExperienceController');
});
/**********************************************************************************************************************/

/* Rutas para las referencias pofesionales*/
Route::group(['middleware'=> 'auth:api'], function () {
Route::apiResource('professionalReferences', 'v0\ProfessionalReferenceController');
});
/**********************************************************************************************************************/


/* Rutas para obtener todos los profesionales y ofertas*/
Route::group(['prefix' => 'institutions'], function () {
    //Route::group(['middleware' => 'auth:api'], function () {
        Route::get('/postulants', 'ProfessionalController@getProfessionals');
        Route::post('/postulants/apply', 'CompanyController@applyPostulant');
        Route::post('/postulants/detachCompany', 'ProfessionalController@detachCompany');
        Route::post('/companies/detachPostulant', 'CompanyController@detachPostulant');
        Route::get('/postulants/validateAppliedPostulant', 'ProfessionalController@validateAppliedPostulant');
        Route::get('/oportunities', 'OfferController@getOffers');
        Route::get('/oportunities/validateAppliedOffer', 'OfferController@validateAppliedOffer');
        Route::post('/oportunities/apply', 'OfferController@applyOffer');
        Route::get('/totalCompanies', function () {
            $totalCompanies = \App\Company::where('state', 'ACTIVE')->count();
            return response()->json(['totalCompanies' => $totalCompanies], 200);
        });
        Route::get('/totalOffers', function () {
            $now = Carbon::now();
            $totalOffers = \App\Offer::where('state', 'ACTIVE')
            ->where('finish_date', '>=', $now->format('Y-m-d'))
            ->where('start_date', '<=', $now->format('Y-m-d'))
            ->count();
            return response()->json(['totalOffers' => $totalOffers], 200);
        });
        Route::get('/totalProfessionals', function () {
            $totalProfessionals = \App\Professional::where('state', 'ACTIVE')->count();
            return response()->json(['totalProfessionals' => $totalProfessionals], 200);
        });
        Route::get('/offers', 'OfferController@getAllOffers');
    //});
});
/**********************************************************************************************************************/


Route::group(['prefix' => 'institutions'], function () {
    //Route::group(['middleware' => 'auth:api'], function () {
        Route::get('/professionals', 'ProfessionalController@getAllProfessionals');

        Route::get('/validate_cedula', 'UserController@validateCedula');
    //});
});
