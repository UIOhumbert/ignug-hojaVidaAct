<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateCourseRequest extends FormRequest
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
            'event_name' => ['required', 'min:4', 'max:200'],
            'start_date' => ['required', 'date_format:d.m.Y' ],
            'finish_date' => ['required', 'date_format:d.m.Y' ],
            'hours' => ['required', 'date'],
        ];
    }
}
