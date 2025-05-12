import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-por-investigar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './por-investigar.component.html',
  styleUrls: ['./por-investigar.component.scss']
})
export class PorInvestigarComponent {
  investigarForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.investigarForm = this.fb.group({
      porInvestigar: ['', Validators.required],
      pregunta: ['', Validators.required],
      fecha: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.investigarForm.valid) {
      const investigarData = this.investigarForm.value;
      console.log('Datos del formulario:', investigarData);
      
      // Aquí iría la llamada al servicio para guardar en el backend
      this.snackBar.open('Tema guardado con éxito', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });

      this.investigarForm.reset();
    } else {
      this.snackBar.open('Por favor, complete todos los campos requeridos', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }

  onCancel(): void {
    this.investigarForm.reset();
    this.snackBar.open('Formulario cancelado', 'Cerrar', {
      duration: 3000
    });
  }
}
