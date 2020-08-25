import {Catalogue} from '../attendance/models.index';
import {State} from '../ignug/models.index';
import {Attendance2} from './models.index';
import {Professional} from './models.index';
////
export class Course {
    id: number;
    catalogue: Catalogue;
    state: State;
    attendance2: Attendance2;
    professional: Professional;
    event_name: string;
    start_date: Date;
    finish_date: Date;
    hours: string;
    constructor() {
        //this.date = new Date();

    }
}
