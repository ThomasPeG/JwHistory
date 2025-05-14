import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-informe-mes',
  standalone: true,
  imports: [
    CommonModule,
    CardModule
  ],
  templateUrl: './informe-mes.component.html',
  styleUrls: ['./informe-mes.component.scss']
})
export class InformeMesComponent {
  informeMensual = {
    mes: 'Noviembre 2023',
    dias: 20,
    horas: 45,
    revisitas: 15,
    videos: 8,
    estudios: 3
  };
}
