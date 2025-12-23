import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, filter, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly ACCESS_TOKEN_KEY = 'auth_token';

  private loggedInSignal = signal<boolean>(
    !!localStorage.getItem(this.ACCESS_TOKEN_KEY)
  );

  isLoggedIn = this.loggedInSignal.asReadonly();

  private refreshing = false;
  private refreshSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  login(token: string) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
    this.loggedInSignal.set(true);
  }

  logout() {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    this.loggedInSignal.set(false);
    this.refreshSubject.next(null);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  refreshToken() {
    if (this.refreshing) {
      return this.refreshSubject.pipe(
        filter(token => token !== null),
        take(1)
      );
    }

    this.refreshing = true;

    return this.http
      .post<any>('http://localhost:8080/refresh-token', {}, {
        withCredentials: true // refresh token cookie
      })
      .pipe(
        switchMap(response => {
          const newToken = response.accessToken;
          localStorage.setItem(this.ACCESS_TOKEN_KEY, newToken);

          this.loggedInSignal.set(true);
          this.refreshing = false;
          this.refreshSubject.next(newToken);

          return this.refreshSubject;
        })
      );
  }
}
