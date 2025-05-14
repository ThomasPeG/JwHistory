import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PrimeraVisitaService } from '../../services/primera-visita.service';
import { PrimeraVisita } from '../../models/formularios.model';

@Component({
  selector: 'app-primera-visita',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    InputNumberModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './primera-visita.component.html',
  styleUrls: ['./primera-visita.component.scss']
})
export class PrimeraVisitaComponent {
  visitaForm: FormGroup;
  tiposPersona = [
    { label: 'Ateo', value: 'ateo' },
    { label: 'Cristiano', value: 'cristiano' },
    { label: 'Católico', value: 'catolico' }
  ];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
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
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Visita guardada correctamente'
          });
          this.visitaForm.reset();
        },
        error: (error) => {
          console.error('Error al guardar la visita:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al guardar la visita'
          });
        }
      });
    }
  }

  onCancel(): void {
    this.visitaForm.reset();
    this.messageService.add({
      severity: 'info',
      summary: 'Cancelado',
      detail: 'Formulario cancelado'
    });
  }
}
