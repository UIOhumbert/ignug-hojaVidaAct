<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfessionalExperienceRequest extends FormRequest
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
            'employer' => ['requiere'],
            'position' => ['requiere'],
            'job_description' => ['requiere'],
            'start_date' => ['requiere'],
            'finish_date' => ['requiere'],
            'reason_leave' => ['requiere'],
            'current_work' => ['requiere']
        ];
    }
}
