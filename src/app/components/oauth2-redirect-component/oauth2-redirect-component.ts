import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-oauth2-redirect-component',
  imports: [RouterModule],
  templateUrl: './oauth2-redirect-component.html',
  styleUrl: './oauth2-redirect-component.scss',
})
export class Oauth2RedirectComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];

      if (token) {
        this.authService.login(token);
        this.router.navigate(['/home']);
      }
    });
  }
}
