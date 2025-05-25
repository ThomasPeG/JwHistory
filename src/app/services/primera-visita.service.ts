import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Amo, Visit } from '../models/formularios.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PrimeraVisitaService {
  private apiUrl = `${environment.apiUrl}/amo`;

  constructor(private http: HttpClient,
    private authService: AuthService
  ) {}

  crearPrimeraVisita(visita: Amo): Observable<Amo> {
    const userId = this.authService.getUserId(); // Obtén el ID del usuario desde el servicio de autenticación
    return this.http.post<Amo>(`${this.apiUrl}/${userId}`, visita);
  }

  obtenerAmos(userId: string): Observable<Amo[]> {
    return this.http.get<Amo[]>(`${this.apiUrl}/${userId}`);
  }

  agregarVisita(amoId: string, visita: Visit): Observable<Amo> {
    const userId = this.authService.getUserId();
    return this.http.post<Amo>(`${this.apiUrl}/${userId}/revisit/${amoId}`, visita);
  }
}