import {Catalogue} from '../attendance/models.index';
import {State} from '../ignug/models.index';
import {Attendance2} from './models.index';
import {Professional} from './models.index';
////
export class Course {
    id: number;
    professional: Professional;
    event_type: Catalogue;
    institution: Catalogue;
    event_name: string;
    start_date: Date;
    finish_date: Date;
    hours: string;
    type_certification: Catalogue;
    catalogue: Catalogue;
    state: State;
    attendance2: Attendance2;
    constructor() {
        this.professional = new Professional();
        this.event_type = new Catalogue();
        this.institution = new Catalogue();
        this.type_certification = new Catalogue();
        this.state = new State();
    }
}
