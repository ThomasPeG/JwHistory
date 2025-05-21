import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PrimeraVisitaComponent } from './components/primera-visita/primera-visita.component';
import { RevisitaComponent } from './components/revisita/revisita.component';
import { EstudioComponent } from './components/estudio/estudio.component';
import { InformeMesComponent } from './components/informe-mes/informe-mes.component';
import { PorInvestigarComponent } from './components/por-investigar/por-investigar.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'home', 
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'primera-visita', 
    component: PrimeraVisitaComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'revisita', 
    component: RevisitaComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'estudio', 
    component: EstudioComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'informe-mes', 
    component: InformeMesComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'por-investigar', 
    component: PorInvestigarComponent,
    canActivate: [AuthGuard]
  },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];
