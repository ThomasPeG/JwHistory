import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PrimeraVisitaComponent } from './components/primera-visita/primera-visita.component';
import { RevisitaComponent } from './components/revisita/revisita.component';
import { EstudioComponent } from './components/estudio/estudio.component';
import { InformeMesComponent } from './components/informe-mes/informe-mes.component';
import { PorInvestigarComponent } from './components/por-investigar/por-investigar.component';

export const routes: Routes = [
    { 
        path: '', 
        component: HomeComponent 
    },
    { 
        path: 'primera-visita', 
        component: PrimeraVisitaComponent 
    },
    { 
        path: 'revisita', 
        component: RevisitaComponent 
    },
    { 
        path: 'estudio', 
        component: EstudioComponent 
    },
    { 
        path: 'informe-mes', 
        component: InformeMesComponent 
    },
    { 
        path: 'por-investigar', 
        component: PorInvestigarComponent 
    },
    { 
        path: '**', 
        redirectTo: '' 
    }
];
