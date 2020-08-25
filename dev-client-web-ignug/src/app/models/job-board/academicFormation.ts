import {Catalogue} from '../attendance/models.index';
import {Professional} from './professional';
import {State} from '../ignug/models.index';

////
export class AcademicFormation {
    id: number;
    professional_id: Professional;
    catalogue: Catalogue;
    registration_date:Date;
    senescyt_code:String;
    has_titling:Boolean;
    state: State;

    constructor() {
        ///this.date = new Date();

    }
}


  
