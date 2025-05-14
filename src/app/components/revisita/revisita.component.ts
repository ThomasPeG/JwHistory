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
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-revisita',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    CardModule,
    ToastModule,
    CalendarModule,
    InputNumberModule
  ],
  providers: [MessageService],
  templateUrl: './revisita.component.html',
  styleUrls: ['./revisita.component.scss']
})
export class RevisitaComponent {
  revisitaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.revisitaForm = this.fb.group({
      fecha: ['', Validators.required],
      duracion: ['', [Validators.required, Validators.min(1)]],
      temaAnalizado: ['', Validators.required],
      temaPorAnalizar: ['', Validators.required],
      observaciones: [''],
      preguntaPendiente: ['']
    });
  }

  onSubmit(): void {
    if (this.revisitaForm.valid) {
      console.log('Datos del formulario:', this.revisitaForm.value);
      
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Revisita guardada correctamente'
      });

      this.revisitaForm.reset();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, complete todos los campos requeridos'
      });
    }
  }

  onCancel(): void {
    this.revisitaForm.reset();
    this.messageService.add({
      severity: 'info',
      summary: 'Cancelado',
      detail: 'Formulario cancelado'
    });
  }
}
