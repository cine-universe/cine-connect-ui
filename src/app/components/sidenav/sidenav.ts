import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { ScrollHide } from '../../directives/scroll-hide';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-sidenav',
  imports: [RouterModule, MatIconModule, CommonModule, ScrollHide],
  standalone: true,
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {

  constructor(
    public authService: AuthService,
    public router: Router
  ) {}
  
  signOut() {
    localStorage.removeItem('auth_token');
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
