<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfessionalsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'identity' => 'identity',
            'first_name' => 'first_name',
            'last_name' => 'last_name',
            'email' => 'email',
            'nationality' => 'nationality',
            'civil_state' => 'civil_state',
            'birthdate' => 'birthdate',
            'gender' => 'gender',
            'phone' => 'phone',
            'address' => 'address',
            'about_me' => 'about_me',
        ];
    }
}
