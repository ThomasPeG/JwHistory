import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-informe-mes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule
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
