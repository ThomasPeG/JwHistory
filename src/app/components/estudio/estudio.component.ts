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
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-estudio',
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
    InputNumberModule,
    DialogModule,
    TableModule
  ],
  providers: [MessageService],
  templateUrl: './estudio.component.html',
  styleUrls: ['./estudio.component.scss']
})
export class EstudioComponent {
  estudioForm: FormGroup;
  displayDialog: boolean = false;
  estudios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.estudioForm = this.fb.group({
      fecha: ['', Validators.required],
      duracion: ['', [Validators.required, Validators.min(1)]],
      publicacion: ['', Validators.required],
      temaEstudiado: ['', Validators.required],
      proximoTema: ['', Validators.required],
      observaciones: [''],
      preguntaPendiente: ['']
    });
  }

  onSubmit(): void {
    if (this.estudioForm.valid) {
      console.log('Datos del formulario:', this.estudioForm.value);
      
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Estudio guardado correctamente'
      });

      this.estudioForm.reset();
      this.displayDialog = false;
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
    this.displayDialog = false;
    this.messageService.add({
      severity: 'info',
      summary: 'Cancelado',
      detail: 'Formulario cancelado'
    });
  }

  showDialog(): void {
    this.displayDialog = true;
  }
}
