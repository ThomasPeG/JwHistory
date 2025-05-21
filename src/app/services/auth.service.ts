import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidSession());
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(credentials: LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        console.log("RESPONSE", response);
        if (response && response.user) {
          const userData = {
            user: response.user
          };
          localStorage.setItem('userData', JSON.stringify(userData));
          this.isAuthenticatedSubject.next(true);
        }
      }),
      catchError((e) => {
        console.log("ERROR", e);
        throw e;
      })
    );
  }

 

  getUserId(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userData = localStorage.getItem('userData');
      if (!userData) return null;
      
      try {
        const { userId } = JSON.parse(userData);
        return userId;
      } catch {
        return null;
      }
    }
    return null;
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('userData');
    }
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  hasValidSession(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userData = localStorage.getItem('userData');
      if (!userData) return false;

      try {
        const { timestamp } = JSON.parse(userData);
        const now = new Date().getTime();
        const fourHours = 4 * 60 * 60 * 1000;

        if (now - timestamp > fourHours) {
          this.logout();
          return false;
        }

        return true;
      } catch {
        this.logout();
        return false;
      }
    }
    return false;
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userData = localStorage.getItem('userData');
      if (!userData) return null;
      
      try {
        const { token } = JSON.parse(userData);
        return token;
      } catch {
        return null;
      }
    }
    return null;
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}