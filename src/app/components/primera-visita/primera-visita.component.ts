import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrimeraVisitaService } from '../../services/primera-visita.service';
import { PrimeraVisita } from '../../models/formularios.model';

@Component({
  selector: 'app-primera-visita',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './primera-visita.component.html',
  styleUrls: ['./primera-visita.component.scss']
})
export class PrimeraVisitaComponent {
  visitaForm: FormGroup;
  tiposPersona = [
    { value: 'ateo', viewValue: 'Ateo' },
    { value: 'cristiano', viewValue: 'Cristiano' },
    { value: 'catolico', viewValue: 'Católico' }
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private primeraVisitaService: PrimeraVisitaService
  ) {
    this.visitaForm = this.fb.group({
      fecha: ['', Validators.required],
      nombres: ['', Validators.required],
      preguntaInicial: ['', Validators.required],
      direccion: ['', Validators.required],
      tipoPersona: ['', Validators.required],
      inquietudAmo: [''],
      datosPersonales: [''],
      preguntaPendiente: [''],
      duracion: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.visitaForm.valid) {
      const visitaData: PrimeraVisita = this.visitaForm.value as PrimeraVisita;
      
      this.primeraVisitaService.crearPrimeraVisita(visitaData).subscribe({
        next: (response) => {
          this.snackBar.open('Visita guardada con éxito', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.visitaForm.reset();
        },
        error: (error) => {
          console.error('Error al guardar la visita:', error);
          this.snackBar.open('Error al guardar la visita', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      });
    }
  }
  onCancel(): void {
    this.visitaForm.reset();
    this.snackBar.open('Formulario cancelado', 'Cerrar', {
      duration: 3000
    });
  }
}
