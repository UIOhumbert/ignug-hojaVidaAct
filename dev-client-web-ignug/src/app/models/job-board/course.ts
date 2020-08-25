import {Catalogue} from '../attendance/models.index';
import {State} from '../ignug/models.index';
import {Attendance2} from './models.index';
////
export class Course {
    id: number;
    catalogue: Catalogue;
    state: State;
    attendance2: Attendance2;
    constructor() {
        ///this.date = new Date();

    }
}
