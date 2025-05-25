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
import { AuthService } from '../../services/auth.service';
import { Amo } from '../../models/formularios.model';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

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
    ToastModule,
    DialogModule,
    TableModule
  ],
  providers: [MessageService],
  templateUrl: './primera-visita.component.html',
  styleUrls: ['./primera-visita.component.scss']
})
export class PrimeraVisitaComponent {
  form: FormGroup;
  tiposPersona = [
    { label: 'Ateo', value: 'ateo' },
    { label: 'Cristiano', value: 'cristiano' },
    { label: 'Católico', value: 'catolico' }
  ];

  displayDialog: boolean = false;
  amos: Amo[] = [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private primeraVisitaService: PrimeraVisitaService,
    private authService: AuthService
  ) {
    this.loadAmos()
    this.form = this.fb.group({
      date: ['', Validators.required],
      nextVisitDate: ['', Validators.required],
      names: ['', Validators.required],
      initialQuestion: ['', Validators.required],
      address: ['', Validators.required],
      personType: ['', Validators.required],
      ownerConcern: [''],
      personalData: [''],
      pendingQuestion: [''],
      duration: ['', [Validators.required, Validators.min(1)]],
      notes: ['']
    });
  }

  onSubmit(): void {
    console.log(this.form.value)
    if (this.form.valid) {
      console.log("IN",this.form.value)
      
      this.primeraVisitaService.crearPrimeraVisita(this.form.value).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Visita guardada correctamente'
          });
          this.loadAmos()
          this.form.reset();
          this.displayDialog = false;
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
    this.form.reset();
    this.messageService.add({
      severity: 'info',
      summary: 'Cancelado',
      detail: 'Formulario cancelado'
    });
    this.displayDialog = false;
  }

  showDialog(): void {
    this.displayDialog = true;
  }

  loadAmos(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.primeraVisitaService.obtenerAmos(userId).subscribe({
        next: (amos) => {
          // Filtrar solo los amos que tienen exactamente una visita
          this.amos = amos.filter(amo => amo.visit.length === 1);
        },
        error: (error) => {
          console.error('Error al cargar las visitas:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al cargar las visitas'
          });
        }
      });
    }
  }
}
