import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

interface RegisterResponse {
  message: string;
  user: {
    _id: string;
    email: string;
    name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = `${environment.apiUrl}/auth/register`;
  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

  constructor(private http: HttpClient) {}

  register(userData: RegisterData): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.apiUrl, userData).pipe(
      tap((response) => {
        console.log("RESPONSE", response);
        if (response && response.user) {
          const userData = {
            user: response.user
          };
          localStorage.setItem('userData', JSON.stringify(userData));
        }
      }),
      catchError((e) => {
        console.log("ERROR", e);
        throw e;
      })
    );
  }
}