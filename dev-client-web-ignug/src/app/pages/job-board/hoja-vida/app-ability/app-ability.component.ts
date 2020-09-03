import { Component, OnInit } from '@angular/core';
import { JobBoardServiceService } from '../../../../services/job-board/job-board-service.service';
import { Ability} from '../../../../models/job-board/models.index';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {AuthenticationServiceService} from '../../../../services/authentication/authentication-service.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';



@Component({
  selector: 'app-app-ability',
  templateUrl: './app-ability.component.html'
})
export class AppAbilityComponent implements OnInit {
  displayAbility: boolean;
  eventTypes: SelectItem[];
  typeCertifications: SelectItem[];

  selectedAbility: Ability; 
  abilities: Array<Ability>; 
  colsAbility: any[];
  abilityForm: FormGroup;
  headerDialogAbility: string;
  validationBirthdate: string;
    institution: string;
    

  constructor( private jobBoardService: JobBoardServiceService, 
    private fb: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private messageService: MessageService,
    private authenticationService: AuthenticationServiceService,
    private confirmationService: ConfirmationService,
    ) {
   //this.ability = new Ability();
    //this.abilitiesSelected = new Ability ();
    //this.abilities = new Array <Ability>();
    this.selectedAbility = new Ability();
    this.abilities = new Array<Ability>();

    this.colsAbility = [
      {field: 'category', header: 'Categoria'},
      {field: 'professional', header: 'Profesional'},
      {field: 'description', header: 'Descripción'},

     
  ];
  this.abilityForm = this.fb.group({
    'category': new FormControl('', Validators.required),
    'professional': new FormControl('', Validators.required),
    'description': new FormControl('', Validators.required),
});

   }

  ngOnInit(): void {
      this.getAbilities(); 
}
getEventTypes(): void {
  const parameters = '?type=event_type';
  this.jobBoardService.get('catalogues' + parameters).subscribe(
      response => {
          const eventTypes = response['data']['catalogues'];
          this.eventTypes = [{label: 'Seleccione', value: ''}];
          this.eventTypes.forEach(item => {
          this.eventTypes.push({label: item.name, value: item.id});
          });

      }, error => {
          this.messageService.add({
              key: 'tst',
              severity: 'error',
              summary: 'Oops! Problemas al cargar el catálogo Etninas',
              detail: 'Vuelve a intentar más tarde',
              life: 5000
          });
      });
}
  
getAbilities(){

   this.spinnerService.show();
        this.jobBoardService.get('auth/abilities').subscribe(
            response => {
                this.spinnerService.hide();
                this.abilities = response['data']['abilities'];
            }, error => {
                this.spinnerService.hide();
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Oops! Problemas con el servidor',
                    detail: 'Vuelve a intentar más tarde',
                    life: 5000
                });
            });
    }
    createAbility() {
      this.selectedAbility = this.getAbility();
      this.selectedAbility.category = this.selectedAbility.category;
      this.spinnerService.show();
      this.jobBoardService.post('auth/ability', {'ability': this.selectedAbility}).subscribe(
        response => {
          this.abilities.unshift(this.selectedAbility);

          this.spinnerService.hide();
          this.messageService.add({
              key: 'tst',
              severity: 'success',
              summary: 'Se creó correctamente',
              detail: this.selectedAbility.description,
              life: 3000
          });
              this.displayAbility = false;
            }, error => {
              this.spinnerService.hide();
              this.messageService.add({
                  key: 'tst',
                  severity: 'error',
                  summary: 'Oops! Problemas con el servidor',
                  detail: 'Vuelve a intentar más tarde',
                  life: 5000
              });
          });
  }
  updateAbility() {
    this.selectedAbility = this.getAbility();
    this.selectedAbility.category = this.selectedAbility.category;
    this.spinnerService.show();
    this.jobBoardService.update('auth/courses', {'course': this.selectedAbility}).subscribe(
        response => {
            this.spinnerService.hide();
            this.messageService.add({
                key: 'tst',
                severity: 'success',
                summary: 'Se actualizó correctamente',
                detail: this.selectedAbility.description,
                life: 3000
            });
            this.displayAbility = false;
        }, error => {
            this.spinnerService.hide();
            this.messageService.add({
                key: 'tst',
                severity: 'error',
                summary: 'Oops! Problemas con el servidor',
                detail: 'Vuelve a intentar más tarde',
                life: 5000
            });
          });
        }
    
            deleteAbility (ability: Ability) {
              this.confirmationService.confirm({
                  header: 'Eliminar ' + ability.category + ' ' + ability.category,
                  message: '¿Estás seguro de eliminar?',
                  acceptButtonStyleClass: 'ui-button-danger',
                  rejectButtonStyleClass: 'ui-button-primary',
                  icon: 'pi pi-trash',
                  accept: () => {
                      this.spinnerService.show();
                      this.jobBoardService.delete('auth/ability/' + ability.id).subscribe(
                          response => {
                              const indiceCourse = this.abilities
                                  .findIndex(element => element.id === ability.id);
                              this.abilities.splice(indiceCourse, 1);
                              this.spinnerService.hide();
                              this.messageService.add({
                                  key: 'tst',
                                  severity: 'success',
                                  summary: 'Se eliminó correctamente',
                                  detail: ability.category + ' ' + ability.category,
                                  life: 3000
                              });
                          }, error => {
                              this.spinnerService.hide();
                              this.messageService.add({
                                  key: 'tst',
                                  severity: 'error',
                                  summary: 'Oops! Problemas con el servidor',
                                  detail: 'Vuelve a intentar más tarde',
                                  life: 5000
                              });
                          });
                  }
                });

              }
                  selectAbility(ability: Ability): void {
                    if (ability) {
                        this.selectedAbility = ability ;
                        this.abilityForm.controls['category_id'].setValue(ability.category.id);
                        this.abilityForm.controls['description'].setValue(ability.description);   
                        this.abilityForm.controls['professional_id'].setValue(ability.professional.id);
                        this.headerDialogAbility = 'Modificar Fortaleza';
                    } else {
                        this.selectedAbility = new Ability();
                        this.abilityForm.reset();
                        this.headerDialogAbility = 'Nueva Fortaleza';
                    }
                    this.displayAbility = true;
                }
                getAbility(): Ability {
                  return {
                    category: {id: this.abilityForm.controls['category_id'].value},
                    description: {id: this.abilityForm.controls['description'].value},
                   professional: {id: this.abilityForm.controls['professional_id'].value},
                        } as ability;
              
                      }}