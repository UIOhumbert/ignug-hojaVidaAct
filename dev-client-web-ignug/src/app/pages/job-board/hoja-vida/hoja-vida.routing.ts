import {Routes} from '@angular/router';

import {AuthGuard} from '../../../shared/auth-guard/auth.guard';
import { AppHojaVidaComponent } from './app.hoja-vida.component';



export const HojaVidaRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: AppHojaVidaComponent,
                // canActivate: [AuthGuard]
            },
        ]
    }
];
