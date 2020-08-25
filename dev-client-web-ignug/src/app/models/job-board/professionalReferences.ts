import {Professional} from './professional';
import {State} from '../ignug/models.index';

////
export class ProfessionalReferences {
    id: number;
    professional: Professional;
    institution: String;
    position:String;
    contact:String;
    phone:String;
    state: State;

    constructor() {
        ///this.date = new Date();

    }
}


  
