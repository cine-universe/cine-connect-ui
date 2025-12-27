import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';
import { LoginRequest } from './models/LoginRequest';
import { TokenResponse } from './models/TokenResponse';
import { RegisterRequest } from './models/RegisterRequest';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  
  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.baseUrl}/login`, credentials);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout`, {});
  }

  checkEmailExists(email: string) : Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check/${email}`);
  }

  checkUsernameExists(username: string) : Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check/user/${username}`);
  }

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post<RegisterRequest>(`${this.baseUrl}/register`, registerRequest);
  }
}
