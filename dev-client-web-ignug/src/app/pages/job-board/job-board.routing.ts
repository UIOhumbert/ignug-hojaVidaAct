import {Routes} from '@angular/router';

import {AuthGuard} from '../../shared/auth-guard/auth.guard';
import {AppHojaVidaComponent} from './hoja-vida/app.hoja-vida.component';
import {AppEmpresaComponentComponent} from './app-empresa-component/app-empresa-component.component';
import {AppEmpresaDosComponent} from './app-empresa-dos/app-empresa-dos.component';
<<<<<<< HEAD
import { AppAcademicFormationComponent } from './hoja-vida/app-academic-formation/app-academic-formation.component';
import { AppProfessionalReferencesComponent } from './hoja-vida/app-professional-references/app-professional-references.component';
import { AppProfessionalComponent } from './hoja-vida/app-professional/app-professional.component';
import { AppCourseComponent } from './hoja-vida/app-course/app-course.component';
import { AppProfessionalExperienceComponent } from './hoja-vida/app-professional-experience/app-professional-experience.component';
=======
import { AppCourseComponent } from './app-course/app-course.component';
import { AppAbilityComponent } from './app-ability/app-ability.component';
import { AppProfessionalExperienceComponent } from './app-professional-experience/app-professional-experience.component';
import { AppAcademicFormationComponent } from './app-academic-formation/app-academic-formation.component';
import { AppProfessionalReferencesComponent } from './app-professional-references/app-professional-references.component';
import { AppProfessionalComponent } from './app-professional/app-professional.component';
>>>>>>> 57192f44a4ef967a90fd60e9c77668fecb11e515

export const JobBoardRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'hoja-vida',
                loadChildren: () => import('./hoja-vida/hoja-vida.module').then(m => m.HojaVidaModule),
                // canActivate: [AuthGuard]
            },
            {
                path: 'empresa',
                component: AppEmpresaComponentComponent,
                // canActivate: [AuthGuard]
            },
            {
                path: 'empresa-dos',
                component: AppEmpresaDosComponent,
                // canActivate: [AuthGuard]
            },
           /* {
                path: 'course',
                component: AppCourseComponent,
                // canActivate: [AuthGuard]
            },
            {
                path: 'ability',
                component: AppAbilityComponent,
                // canActivate: [AuthGuard]
            },
            {
                path: 'ProfessionalExperience',
                component: AppProfessionalExperienceComponent,
                // canActivate: [AuthGuard]
            },
            {
                path: 'AcademicFormation',
                component: AppAcademicFormationComponent,
                // canActivate: [AuthGuard]
            },
            {
                path: 'ProfessionalReferences',
                component: AppProfessionalReferencesComponent,
                // canActivate: [AuthGuard]
            },
            {
                path: 'Professional',
                component: AppProfessionalComponent,
                // canActivate: [AuthGuard]
            },*/
        ]
    }
];
