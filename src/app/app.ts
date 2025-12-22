import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidenav } from './components/sidenav/sidenav';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidenav],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('cine-connect-ui');
  isLoggedIn = computed(() => this.authService.isLoggedIn());

  constructor(private authService: AuthService) {
    console.log(this.authService.isLoggedIn())
  }
}
