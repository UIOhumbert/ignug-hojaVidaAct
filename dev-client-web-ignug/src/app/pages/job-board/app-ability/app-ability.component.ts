import { Component, OnInit } from '@angular/core';
import { Professional } from 'src/app/models/job-board/professional';
import { JobBoardServiceService } from 'src/app/services/job-board/job-board-service.service';

@Component({
  selector: 'app-app-ability',
  templateUrl: './app-ability.component.html'
})
export class AppAbilityComponent implements OnInit {

  professional: Professional;
  professionals: Array <Professional>;
  professionalSelected: Professional;


  constructor( private jobBoardService: JobBoardServiceService ) {
    this.professional = new Professional();
    this.professionalSelected = new Professional ();
    this.professionals = new Array <Professional>();

   }

  ngOnInit(): void {
    
  }

  getProfessional():void{
    this.jobBoardService.get('ProfessionalExperienceController')
  }
}
