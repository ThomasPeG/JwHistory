import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PrimeraVisita } from '../models/formularios.model';

@Injectable({
  providedIn: 'root'
})
export class PrimeraVisitaService {
  private apiUrl = `${environment.apiUrl}/primera-visita`;

  constructor(private http: HttpClient) {}

  crearPrimeraVisita(visita: PrimeraVisita): Observable<PrimeraVisita> {
    return this.http.post<PrimeraVisita>(this.apiUrl, visita);
  }

  obtenerVisitas(userId: string): Observable<PrimeraVisita[]> {
    return this.http.get<PrimeraVisita[]>(`${this.apiUrl}/user/${userId}`);
  }
}