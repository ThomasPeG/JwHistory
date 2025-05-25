import { Component, OnInit } from '@angular/core';
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
import { PrimeraVisitaService } from '../../services/primera-visita.service';
import { Amo, Visit } from '../../models/formularios.model';
import { AuthService } from '../../services/auth.service';

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
    InputNumberModule,
    DialogModule,
    TableModule
  ],
  providers: [MessageService],
  templateUrl: './revisita.component.html',
  styleUrls: ['./revisita.component.scss']
})
export class RevisitaComponent implements OnInit {
  form: FormGroup;
  displayDialog: boolean = false;
  revisitas: any[] = [];
  amos: Amo[] = [];
  selectedAmo: Amo | null = null;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private primeraVisitaService: PrimeraVisitaService,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      date: ['', Validators.required],
      nextVisitDate: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      ownerConcern: [''],
      pendingQuestion: [''],
      notes: [''],
    });
  }

  filteredAmos: Amo[] = [];

  ngOnInit() {
    this.loadAmos();
  }

  filterAmosWithMultipleVisits(amos: Amo[]): void {
    const amosWithMultipleVisits = amos.filter(amo => amo.visit.length >= 2);
    this.revisitas = amosWithMultipleVisits.map(amo => {
      const lastVisit : any = amo.visit[amo.visit.length - 1];
      return {
        fecha: lastVisit.date,
        duracion: lastVisit.duration,
        temaAnalizado: lastVisit.ownerConcern,
        temaPorAnalizar: lastVisit.pendingQuestion,
        proximaVisita: lastVisit.nextVisitDate,
        totalVisitas: amo.visit.length
      };
    });
  }

  loadAmos(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.primeraVisitaService.obtenerAmos(userId).subscribe({
        next: (amos) => {
          this.amos = amos;
          this.filteredAmos = amos;
          this.filterAmosWithMultipleVisits(amos);
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

  filterTable(event: any): void {
    const filterValue = event.target.value.toLowerCase();
    this.filteredAmos = this.amos.filter(amo => 
      amo.names.toLowerCase().includes(filterValue)
    );
  }
  showingTable: boolean = false;

  showDialog() {
    this.displayDialog = true;
    this.selectedAmo = null;
    this.showingTable = false;
    this.form.reset();
  }

  selectVisit(amo: Amo) {
    this.selectedAmo = amo;
    this.showingTable = false;
  }

  showAmoTable() {
    this.showingTable = true;
    this.selectedAmo = null;
  }

  onSubmit(): void {
    if (this.form.valid && this.selectedAmo) {
      const newVisit: Visit = {
        date: this.form.value.date,
        nextVisitDate: this.form.value.nextVisitDate,
        duration: this.form.value.duration,
        ownerConcern: this.form.value.ownerConcern,
        pendingQuestion: this.form.value.pendingQuestion,
        notes: this.form.value.notes,
        initialQuestion: '' // Este campo no se usa en revisitas
      };

      const amoId = this.selectedAmo._id;
      
      this.primeraVisitaService.agregarVisita(amoId, newVisit).subscribe({
        next: (updatedAmo) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Visita guardada correctamente'
          });
          this.displayDialog = false;
          this.form.reset();
          this.selectedAmo = null;
          this.loadAmos(); // Recargar la lista de amos
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
}
