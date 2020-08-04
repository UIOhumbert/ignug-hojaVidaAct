<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'event_type' => 'required|min:4|max:200',
            'institution' => 'required|min:4|max:200',
            'event_name' => 'required|min:4|max:200',
            'start_date' => 'required|date_format:Y-m-d',
            'finish_date' => 'required|date_format:Y-m-d',
            'hours' => 'required|date',
            'type_certification' => 'required|min:4|max:198',
        ];
    }
}
