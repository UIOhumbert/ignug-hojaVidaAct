import {User} from '../authentication/models.index';
import {State} from '../ignug/models.index';
import {Attendance2} from './models.index';
import {Professional} from './professional';
import { Catalogue } from '../attendance/catalogue';

export class ProfessionalExperience {

    professional: Professional;
    employer: String;
    catalogue: Catalogue;
    job_description: String;
    start_date: Date;
    finish_date:Date;
    reason_leave: String;
    current_work: Boolean;
    state_id: State;
    constructor() {
        //this.date = new Date();

    }
}
