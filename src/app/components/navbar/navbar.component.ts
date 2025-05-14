import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MenubarModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  items: MenuItem[];

  constructor() {
    this.items = [
      {
        label: 'Inicio',
        routerLink: '/',
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Primera Visita',
        routerLink: '/primera-visita'
      },
      {
        label: 'Revisitas',
        routerLink: '/revisita'
      },
      {
        label: 'Estudios',
        routerLink: '/estudio'
      },
      {
        label: 'Por Investigar',
        routerLink: '/por-investigar'
      }
    ];
  }
}