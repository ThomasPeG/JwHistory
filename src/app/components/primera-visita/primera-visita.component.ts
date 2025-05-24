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
import { PrimeraVisita } from '../../models/formularios.model';
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
  visitas: PrimeraVisita[] = [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private primeraVisitaService: PrimeraVisitaService,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      userId: [''],
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
    if (this.form.valid) {

      const userId = this.authService.getUserId();
      console.log("DESDE EL COMPONENTE ID",userId);


      let visitaData = this.form.value;
      visitaData.userId = userId;
      
      this.primeraVisitaService.crearPrimeraVisita(visitaData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Visita guardada correctamente'
          });
          this.form.reset();
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
  }

  showDialog(): void {
    this.displayDialog = true;
    this.loadVisitas();
  }

  loadVisitas(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.primeraVisitaService.obtenerVisitas(userId).subscribe({
        next: (visitas) => {
          this.visitas = visitas;
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
