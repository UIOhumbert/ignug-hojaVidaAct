import { Component, OnInit } from '@angular/core';
import { JobBoardServiceService } from '../../../../services/job-board/job-board-service.service';
import { Course } from '../../../../models/job-board/models.index';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {AuthenticationServiceService} from '../../../../services/authentication/authentication-service.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-app-course',
  templateUrl: './app-course.component.html',
})
export class AppCourseComponent implements OnInit {
    displayCourse: boolean; // para visualizar el modal nuevo usuario - modificiar usuario
    eventTypes: SelectItem[]; // para almacenar el catalogo de las etnias
    typeCertifications: SelectItem[]; // para almacenar el catalogo de las los cantones
   
    selectedCourse: Course; // para guardar el usuario seleccionado o para poder editar la informacion
    courses: Array<Course>; // para almacenar el listado de todos los usuarios
    colsCourse: any[]; // para almacenar las columnas para la tabla usuarios
    courseForm: FormGroup;

    headerDialogCourse: string; // para cambiar de forma dinamica la cabecear del  modal de creacion o actualizacion de usuario
    validationBirthdate: string;
    institution: string;
  constructor(private messageService: MessageService,
              private jobBoardService: JobBoardServiceService,
              private spinnerService: NgxSpinnerService,
              private authenticationService: AuthenticationServiceService,
              private confirmationService: ConfirmationService,
              private fb: FormBuilder) {
        this.selectedCourse = new Course();
        this.courses = new Array<Course>();

        this.colsCourse = [
            {field: 'institution', header: 'Institución'},
            {field: 'event_type', header: 'Tipo'},
            {field: 'event_name', header: 'Descripción'},
            {field: 'type_certification', header: 'Certificado'},
            {field: 'hours', header: 'Horas'},
        ];
        this.courseForm = this.fb.group({
            'institution': new FormControl('', Validators.required),
            'event_type': new FormControl('', Validators.required),
            'event_name': new FormControl('', Validators.required),
            'start_date': new FormControl('', Validators.required),
            'finish_date': new FormControl('', Validators.required),
            'hours': new FormControl('', Validators.required),
            'type_certification': new FormControl('', Validators.required),

        });
    }

    // Esta funcion se ejectuta apenas inicie el componente
    ngOnInit(): void {
        this.getCourses(); 
        this.getInstitutions(); 
        this.getEventTypes(); 
        this.getTypeCertifications();
    }

    // obtiene la lista del catalogo de tipo de evento
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
    getInstitutions(): void {
        const parameters = '?type=institution';
        this.jobBoardService.get('catalogues' + parameters).subscribe(
            response => {
                const institution = response['data']['catalogues'];
                this.institution = [{label: 'Seleccione', value: ''}];
                institution.forEach(item => {
                    this.institution.push({label: item.name, value: item.id});
                });

            }, error => {
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Oops! Problemas al cargar el catálogo Tipos de Documentos',
                    detail: 'Vuelve a intentar más tarde',
                    life: 5000
                });
            });
    }
    getTypeCertifications(): void {
        const parameters = '?type=type_certification';
        this.jobBoardService.get('catalogues' + parameters).subscribe(
            response => {
                const typeCertifications = response['data']['catalogues'];
                this.typeCertifications = [{label: 'Seleccione', value: ''}];
                typeCertifications.forEach(item => {
                    this.typeCertifications.push({label: item.name, value: item.id});
                });

            }, error => {
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Oops! Problemas al cargar el catálogo Tipos de Documentos',
                    detail: 'Vuelve a intentar más tarde',
                    life: 5000
                });
            });
    }
    getCourses() {
        this.spinnerService.show();
        this.jobBoardService.get('auth/courses').subscribe(
            response => {
                this.spinnerService.hide();
                this.courses = response['data']['courses'];
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

    createCourse() {
        this.selectedCourse = this.getCourse();
        this.selectedCourse.course_name = this.selectedCourse.identification;
        this.selectedCourse.password = '123';
        this.spinnerService.show();
        this.jobBoardService.post('auth/course', {'course': this.selectedCourse}).subscribe(
            response => {
                this.courses.unshift(this.selectedCourse);

                this.spinnerService.hide();
                this.messageService.add({
                    key: 'tst',
                    severity: 'success',
                    summary: 'Se creó correctamente',
                    detail: this.selectedCourse.event_name,
                    life: 3000
                });
                this.displayCourse = false;
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

    updateCourse() {
        this.selectedCourse = this.getCourse();
        this.selectedCourse.course_name = this.selectedCourse.identification;
        this.spinnerService.show();
        this.jobBoardService.update('auth/courses', {'course': this.selectedCourse}).subscribe(
            response => {
                this.spinnerService.hide();
                this.messageService.add({
                    key: 'tst',
                    severity: 'success',
                    summary: 'Se actualizó correctamente',
                    detail: this.selectedCourse.event_name,
                    life: 3000
                });
                this.displayCourse = false;
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

    deleteCourse(course: Course) {
        this.confirmationService.confirm({
            header: 'Eliminar ' + course.first_lastname + ' ' + course.first_name,
            message: '¿Estás seguro de eliminar?',
            acceptButtonStyleClass: 'ui-button-danger',
            rejectButtonStyleClass: 'ui-button-primary',
            icon: 'pi pi-trash',
            accept: () => {
                this.spinnerService.show();
                this.jobBoardService.delete('auth/courses/' + course.id).subscribe(
                    response => {
                        const indiceCourse = this.courses
                            .findIndex(element => element.id === course.id);
                        this.courses.splice(indiceCourse, 1);
                        this.spinnerService.hide();
                        this.messageService.add({
                            key: 'tst',
                            severity: 'success',
                            summary: 'Se eliminó correctamente',
                            detail: course.first_lastname + ' ' + course.first_name,
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

    selectCourse(course: Course): void {
        if (course) {
            this.selectedCourse = course ;
            this.courseForm.controls['institution_id'].setValue(course.institution.id);
            this.courseForm.controls['event_type_id'].setValue(course.event_type.id);
            this.courseForm.controls['event_name'].setValue(course.event_name);
            this.courseForm.controls['start_date'].setValue(course.start_date);
            this.courseForm.controls['finish_date'].setValue(course.finish_date);
            this.courseForm.controls['hours'].setValue(course.hours);
            this.courseForm.controls['type_certification_id'].setValue(course.type_certification.id);
            this.headerDialogCourse = 'Modificar Curso';
        } else {
            this.selectedCourse = new Course();
            this.courseForm.reset();
            this.headerDialogCourse = 'Nuevo Curso';
        }
        this.displayCourse = true;
    }

    getCourse(): Course {
        return {
            institution: {id: this.courseForm.controls['institution_id'].value},
            event_type: {id: this.courseForm.controls['event_type_id'].value},
            event_name: this.courseForm.controls['event_name'].value,
            start_date: this.courseForm.controls['start_date'].value,
            finish_date: this.courseForm.controls['finish_date'].value,
            hours: this.courseForm.controls['hours'].value,
            type_certification: {id: this.courseForm.controls['type_certification_id'].value},
        } as Course;
    }
}
/*import { Component, OnInit } from '@angular/core';
import { JobBoardServiceService } from '../../../../services/job-board/job-board-service.service';
import { Course } from '../../../../models/job-board/models.index';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import { Course } from '../../../../services/job-board/job-board-service.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-app-course',
  templateUrl: './app-course.component.html'
})
export class AppCourseComponent implements OnInit {
    displayCourse: boolean; // para visualizar el modal nuevo usuario - modificiar usuario
    ethnicOrigins: SelectItem[]; // para almacenar el catalogo de las etnias
    cantones: SelectItem[]; // para almacenar el catalogo de las los cantones
    identificationTypes: SelectItem[]; // para almacenar el catalogo de los tipos de documento
    sexs: SelectItem[]; // para almacenar el catalogo de las sexos
    genders: SelectItem[]; // para almacenar el catalogo de las generos
    selectedCourse: Course; // para guardar el usuario seleccionado o para poder editar la informacion
    courses: Array<Course>; // para almacenar el listado de todos los usuarios
    colsCourse: any[]; // para almacenar las columnas para la tabla usuarios
    headerDialogCourse: string; // para cambiar de forma dinamica la cabecear del  modal de creacion o actualizacion de usuario
    courseForm: FormGroup;
    validationBirthdate: string;

    constructor(private messageService: MessageService,
                private ignugService: IgnugServiceService,
                private jobBoardService: JobBoardServiceService,
                private spinnerService: NgxSpinnerService,
                private authenticationService: AuthenticationServiceService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) {
        this.selectedCourse = new Course();
        this.courses = new Array<Course>();
        this.colsCourse = [
            {field: 'identification', header: 'Cédula/Pasaporte'},
            {field: 'first_name', header: 'Nombre'},
            {field: 'first_lastname', header: 'Apellido'},
            {field: 'email', header: 'Correo Institucional'},
        ];
        this.courseForm = this.fb.group({
            'first_name': new FormControl('', Validators.required),
            'first_lastname': new FormControl('', Validators.required),
            'identification': new FormControl('', Validators.compose(
                [Validators.required, Validators.minLength(9), Validators.maxLength(10)])),
            'ethnic_origin_id': new FormControl('', Validators.required),
            'email': new FormControl('', Validators.compose([Validators.required, Validators.email])),
            'location_id': new FormControl('', Validators.required),
            'identification_type_id': new FormControl('', Validators.required),
            'sex_id': new FormControl('', Validators.required),
            'gender_id': new FormControl('', Validators.required),
            'birthdate': new FormControl('', Validators.required),

        });
        const currentDate = new Date();
        this.validationBirthdate = (currentDate.getFullYear() - 70).toString() + ':' + currentDate.getFullYear().toString();
    }

    // Esta funcion se ejectuta apenas inicie el componente
    ngOnInit(): void {
        this.getCourses(); // obtiene la lista de todos los usuarios
        this.getEthnicOrigins(); // obtiene la lista del catalogo de etnias
        this.getLocations(); // obtiene la lista del catalogo de ubicaciones para los cantones
        this.getIdentificationTypes(); // obtiene la lista del catalogo de tipos de documento
        this.getSexs(); // obtiene la lista del catalogo de sexos
        this.getGenders(); // obtiene la lista del catalogo de generos
    }

    // obtiene la lista del catalogo de etnias
    getEthnicOrigins(): void {
        const parameters = '?type=ethnic_origin';
        this.ignugService.get('catalogues' + parameters).subscribe(
            response => {
                const ethnicOrigins = response['data']['catalogues'];
                this.ethnicOrigins = [{label: 'Seleccione', value: ''}];
                ethnicOrigins.forEach(item => {
                    this.ethnicOrigins.push({label: item.name, value: item.id});
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

    getIdentificationTypes(): void {
        const parameters = '?type=identification_type';
        this.ignugService.get('catalogues' + parameters).subscribe(
            response => {
                const identificationTypes = response['data']['catalogues'];
                this.identificationTypes = [{label: 'Seleccione', value: ''}];
                identificationTypes.forEach(item => {
                    this.identificationTypes.push({label: item.name, value: item.id});
                });

            }, error => {
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Oops! Problemas al cargar el catálogo Tipos de Documentos',
                    detail: 'Vuelve a intentar más tarde',
                    life: 5000
                });
            });
    }

    getSexs(): void {
        const parameters = '?type=sex';
        this.ignugService.get('catalogues' + parameters).subscribe(
            response => {
                const sexs = response['data']['catalogues'];
                this.sexs = [{label: 'Seleccione', value: ''}];
                sexs.forEach(item => {
                    this.sexs.push({label: item.name, value: item.id});
                });

            }, error => {
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Oops! Problemas al cargar el catálogo Sexos',
                    detail: 'Vuelve a intentar más tarde',
                    life: 5000
                });
            });
    }

    getGenders(): void {
        const parameters = '?type=gender';
        this.ignugService.get('catalogues' + parameters).subscribe(
            response => {
                const genders = response['data']['catalogues'];
                this.genders = [{label: 'Seleccione', value: ''}];
                genders.forEach(item => {
                    this.genders.push({label: item.name, value: item.id});
                });

            }, error => {
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Oops! Problemas al cargar el catálogo Géneros',
                    detail: 'Vuelve a intentar más tarde',
                    life: 5000
                });
            });
    }

    getLocations(): void {
        const parameters = '?type=canton';
        this.ignugService.get('catalogues' + parameters).subscribe(
            response => {
                const cantones = response['data']['catalogues'];
                this.cantones = [{label: 'Seleccione', value: ''}];
                cantones.forEach(item => {
                    this.cantones.push({label: item.name, value: item.id});
                });

            }, error => {
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Oops! Problemas al cargar el catálogo Cantones',
                    detail: 'Vuelve a intentar más tarde',
                    life: 5000
                });
            });
    }

    getCourses() {
        this.spinnerService.show();
        this.jobBoardService.get('auth/courses').subscribe(
            response => {
                this.spinnerService.hide();
                this.courses = response['data']['courses'];
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

    createCourse() {
        this.selectedCourse = this.getCourse();
        this.selectedCourse.course_name = this.selectedCourse.identification;
        this.selectedCourse.password = '123';
        this.spinnerService.show();
        this.jobBoardService.post('auth/course', {'course': this.selectedCourse}).subscribe(
            response => {
                this.courses.unshift(this.selectedCourse);

                this.spinnerService.hide();
                this.messageService.add({
                    key: 'tst',
                    severity: 'success',
                    summary: 'Se creó correctamente',
                    detail: this.selectedCourse.first_lastname + ' ' + this.selectedCourse.first_name,
                    life: 3000
                });
                this.displayCourse = false;
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

    updateCourse() {
        this.selectedCourse = this.getCourse();
        this.selectedCourse.course_name = this.selectedCourse.identification;
        this.spinnerService.show();
        this.jobBoardService.update('auth/courses', {'course': this.selectedCourse}).subscribe(
            response => {
                this.spinnerService.hide();
                this.messageService.add({
                    key: 'tst',
                    severity: 'success',
                    summary: 'Se actualizó correctamente',
                    detail: this.selectedCourse.first_lastname + ' ' + this.selectedCourse.first_name,
                    life: 3000
                });
                this.displayCourse = false;
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

    deleteCourse(course: Course) {
        this.confirmationService.confirm({
            header: 'Eliminar ' + course.first_lastname + ' ' + course.first_name,
            message: '¿Estás seguro de eliminar?',
            acceptButtonStyleClass: 'ui-button-danger',
            rejectButtonStyleClass: 'ui-button-primary',
            icon: 'pi pi-trash',
            accept: () => {
                this.spinnerService.show();
                this.jobBoardService.delete('auth/courses/' + course.id).subscribe(
                    response => {
                        const indiceCourse = this.courses
                            .findIndex(element => element.id === course.id);
                        this.courses.splice(indiceCourse, 1);
                        this.spinnerService.hide();
                        this.messageService.add({
                            key: 'tst',
                            severity: 'success',
                            summary: 'Se eliminó correctamente',
                            detail: course.first_lastname + ' ' + course.first_name,
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

    selectCourse(course: Course): void {
        if (course) {
            this.selectedCourse = ;
            this.courseForm.controls['first_name'].setValue(course.first_name);
            this.courseForm.controls['first_lastname'].setValue(course.first_lastname);
            this.courseForm.controls['identification'].setValue(course.identification);
            this.courseForm.controls['ethnic_origin_id'].setValue(course.ethnic_origin.id);
            this.courseForm.controls['email'].setValue(course.email);
            this.courseForm.controls['location_id'].setValue(course.location.id);
            this.courseForm.controls['identification_type_id'].setValue(course.identification_type.id);
            this.courseForm.controls['sex_id'].setValue(course.sex.id);
            this.courseForm.controls['gender_id'].setValue(course.gender.id);
            this.courseForm.controls['birthdate'].setValue(course.birthdate);
            this.headerDialogCourse = 'Modificar Usuario';
        } else {
            this.selectedCourse = new Course();
            this.courseForm.reset();
            this.headerDialogCourse = 'Nuevo Usuario';
        }
        this.displayCourse = true;
    }

    getCourse(): Course {
        return {
            identification: this.courseForm.controls['identification'].value,
            first_name: this.courseForm.controls['first_name'].value,
            first_lastname: this.courseForm.controls['first_lastname'].value,
            event_type: {id: this.courseForm.controls['event_type_id'].value},
            location: {id: this.courseForm.controls['location_id'].value},
            identification_type: {id: this.courseForm.controls['identification_type_id'].value},
            sex: {id: this.courseForm.controls['sex_id'].value},
            gender: {id: this.courseForm.controls['gender_id'].value},
            birthdate: this.courseForm.controls['birthdate'].value,
            email: this.courseForm.controls['email'].value,
        } as Course;
    }
}
*/
