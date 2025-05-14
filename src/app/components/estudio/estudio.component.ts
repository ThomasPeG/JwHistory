import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-estudio',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    ButtonModule,
    CardModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './estudio.component.html',
  styleUrls: ['./estudio.component.scss']
})
export class EstudioComponent {
  estudioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.estudioForm = this.fb.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      temaAnalizado: ['', Validators.required],
      temaPorAnalizar: ['', Validators.required],
      investigarResponder: ['']
    });
  }

  onSubmit(): void {
    if (this.estudioForm.valid) {
      const estudioData = this.estudioForm.value;
      console.log('Datos del formulario:', estudioData);
      
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Estudio guardado correctamente'
      });

      this.estudioForm.reset();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, complete todos los campos requeridos'
      });
    }
  }

  onCancel(): void {
    this.estudioForm.reset();
    this.messageService.add({
      severity: 'info',
      summary: 'Cancelado',
      detail: 'Formulario cancelado'
    });
  }
}
