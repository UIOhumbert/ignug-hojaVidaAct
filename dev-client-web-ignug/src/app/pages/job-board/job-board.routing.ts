import {Routes} from '@angular/router';

import {AuthGuard} from '../../shared/auth-guard/auth.guard';
import {AppHojaVidaComponent} from './hoja-vida/app.hoja-vida.component';
import {AppEmpresaComponentComponent} from './app-empresa-component/app-empresa-component.component';
import {AppEmpresaDosComponent} from './app-empresa-dos/app-empresa-dos.component';
import { AppCourseComponent } from './app-course/app-course.component';
import { AppProfessionalExperienceComponent } from './app-professional-experience/app-professional-experience.component';
import { AppAcademicFormationComponent } from './app-academic-formation/app-academic-formation.component';
import { AppProfessionalReferencesComponent } from './app-professional-references/app-professional-references.component';
import { AppProfessionalComponent } from './app-professional/app-professional.component';

export const JobBoardRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'hoja-vida',
                component: AppHojaVidaComponent,
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
            {
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
            },
        ]
    }
];
