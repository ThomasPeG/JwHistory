import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrimeraVisita } from '../models/formularios.model';

@Injectable({
  providedIn: 'root'
})
export class PrimeraVisitaService {
  private apiUrl = 'http://localhost:3000/api/primera-visita'; // Asegúrate que este puerto coincida con tu backend

  constructor(private http: HttpClient) {}

  crearPrimeraVisita(data: PrimeraVisita): Observable<PrimeraVisita> {
    return this.http.post<PrimeraVisita>(this.apiUrl, data);
  }

  obtenerPrimeraVisitas(): Observable<PrimeraVisita[]> {
    return this.http.get<PrimeraVisita[]>(this.apiUrl);
  }

  obtenerPrimeraVisitaPorId(id: string): Observable<PrimeraVisita> {
    return this.http.get<PrimeraVisita>(`${this.apiUrl}/${id}`);
  }

  actualizarPrimeraVisita(id: string, data: PrimeraVisita): Observable<PrimeraVisita> {
    return this.http.put<PrimeraVisita>(`${this.apiUrl}/${id}`, data);
  }

  eliminarPrimeraVisita(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}