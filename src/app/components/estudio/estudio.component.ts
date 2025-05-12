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
  selector: 'app-estudio',
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
  templateUrl: './estudio.component.html',
  styleUrls: ['./estudio.component.scss']
})
export class EstudioComponent {
  estudioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.estudioForm = this.fb.group({
      nombre: ['', Validators.required],
      fecha: [''],
      temaAnalizado: [''],
      temaPorAnalizar: [''],
      investigarResponder: ['']
    });
  }

  onSubmit(): void {
    if (this.estudioForm.valid) {
      const estudioData = this.estudioForm.value;
      console.log('Datos del formulario:', estudioData);
      
      // Aquí iría la llamada al servicio para guardar en el backend
      // Por ahora mostraremos un mensaje de éxito
      this.snackBar.open('Estudio guardado con éxito', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });

      // Resetear el formulario después de guardar
      this.estudioForm.reset();
    } else {
      this.snackBar.open('Por favor, complete todos los campos requeridos', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }

  onCancel(): void {
    this.estudioForm.reset();
    this.snackBar.open('Formulario cancelado', 'Cerrar', {
      duration: 3000
    });
  }
}
