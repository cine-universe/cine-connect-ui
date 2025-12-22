import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInSignal = signal<boolean>(
    !!localStorage.getItem('auth_token')
  );

  isLoggedIn = this.loggedInSignal.asReadonly();

  login(token: string) {
    localStorage.setItem('auth_token', token);
    this.loggedInSignal.set(true);
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedInSignal.set(false);
  }
}
