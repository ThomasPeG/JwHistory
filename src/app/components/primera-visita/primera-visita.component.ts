import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-primera-visita',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './primera-visita.component.html',
  styleUrls: ['./primera-visita.component.scss']
})
export class PrimeraVisitaComponent {
  tiposPersona = [
    { value: 'ateo', viewValue: 'Ateo' },
    { value: 'cristiano', viewValue: 'Cristiano' },
    { value: 'catolico', viewValue: 'Católico' }
  ];
}
