import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-por-investigar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    CardModule,
    ToastModule,
    CalendarModule
  ],
  providers: [MessageService],
  templateUrl: './por-investigar.component.html',
  styleUrls: ['./por-investigar.component.scss']
})
export class PorInvestigarComponent {
  investigacionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.investigacionForm = this.fb.group({
      tema: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      referencias: [''],
      notas: ['']
    });
  }

  onSubmit(): void {
    if (this.investigacionForm.valid) {
      console.log('Datos del formulario:', this.investigacionForm.value);
      
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Tema para investigar guardado correctamente'
      });

      this.investigacionForm.reset();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, complete todos los campos requeridos'
      });
    }
  }

  onCancel(): void {
    this.investigacionForm.reset();
    this.messageService.add({
      severity: 'info',
      summary: 'Cancelado',
      detail: 'Formulario cancelado'
    });
  }
}
