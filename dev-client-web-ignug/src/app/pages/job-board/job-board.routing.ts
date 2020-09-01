import {Routes} from '@angular/router';

import {AuthGuard} from '../../shared/auth-guard/auth.guard';
import {AppHojaVidaComponent} from './hoja-vida/app.hoja-vida.component';
import {AppEmpresaComponentComponent} from './app-empresa-component/app-empresa-component.component';
import {AppEmpresaDosComponent} from './app-empresa-dos/app-empresa-dos.component';
import { AppAcademicFormationComponent } from './hoja-vida/app-academic-formation/app-academic-formation.component';
import { AppProfessionalReferencesComponent } from './hoja-vida/app-professional-references/app-professional-references.component';
import { AppProfessionalComponent } from './hoja-vida/app-professional/app-professional.component';
import { AppCourseComponent } from './hoja-vida/app-course/app-course.component';
import { AppProfessionalExperienceComponent } from './hoja-vida/app-professional-experience/app-professional-experience.component';

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
