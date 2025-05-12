import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-revisita',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './revisita.component.html',
  styleUrls: ['./revisita.component.scss']
})
export class RevisitaComponent {
  revisitaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.revisitaForm = this.fb.group({
      direccion: ['', Validators.required],
      preguntaPendiente: ['', Validators.required],
      respuestaAnalizada: ['', Validators.required],
      observaciones: ['']
    });
  }

  onSubmit(): void {
    if (this.revisitaForm.valid) {
      const revisitaData = this.revisitaForm.value;
      console.log('Datos del formulario:', revisitaData);
      
      this.snackBar.open('Revisita guardada con éxito', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });

      this.revisitaForm.reset();
    } else {
      this.snackBar.open('Por favor, complete todos los campos requeridos', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }

  onCancel(): void {
    this.revisitaForm.reset();
    this.snackBar.open('Formulario cancelado', 'Cerrar', {
      duration: 3000
    });
  }
}
