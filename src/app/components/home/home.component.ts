import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  cards = [
    {
      title: 'Primera Visita',
      description: 'Registra los detalles de tus primeras visitas y seguimiento inicial.',
      buttonText: 'Registrar Visita',
      route: '/primera-visita',
      icon: 'pi-user-plus'
    },
    {
      title: 'Revisitas',
      description: 'Gestiona y da seguimiento a tus revisitas.',
      buttonText: 'Ver Revisitas',
      route: '/revisita',
      icon: 'pi-users'
    },
    {
      title: 'Estudios',
      description: 'Administra tus estudios bíblicos en curso.',
      buttonText: 'Gestionar Estudios',
      route: '/estudio',
      icon: 'pi-book'
    },
    {
      title: 'Por Investigar',
      description: 'Registra temas pendientes por investigar.',
      buttonText: 'Añadir Tema',
      route: '/por-investigar',
      icon: 'pi-search'
    },
    {
      title: 'Informe del mes',
      description: 'informa las cantidades del mes.',
      buttonText: 'Ver',
      route: '/informe-mes',
      icon: 'pi-book'

    }
  ];
}
