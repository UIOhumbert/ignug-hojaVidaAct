import {Catalogue} from '../attendance/models.index';
import {State} from '../ignug/models.index';
import {Attendance2} from './models.index';
import {Professional} from './models.index';
////
export class Ability {
    id: number;
    category: Catalogue;
    professional: Professional;
    description: string;
    state: State;
    constructor() {
        //this.date = new Date();

    }
}
