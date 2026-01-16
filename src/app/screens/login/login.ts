import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthApi } from '../../apis';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { LandingComponent } from '../../components/landing-component/landing-component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SignupComponent } from '../../components/signup-component/signup-component';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    LandingComponent,
    MatTooltipModule,
    SignupComponent
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {

  isEnabledLogin = false;
  isNewUser = false

  loginForm: FormGroup;
  projects = [{
    image: 'assets/varanasi.png',
    title: 'Varanasi',
    director: 'SS Rajamouli',
  },{
    image: 'baahubali.jpg',
    title: 'Avatar',
    director: 'James Cameron',
  }];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authApi: AuthApi,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      if(username === 'admin@cc.com' && password === 'admin123') {
        this.authService.login('dummy-jwt-token-for-admin');
        this.router.navigate(['/home']);
        return;
      } else {
        this.authApi.login({username: username, password: password})
        .subscribe({
          next: res => {
            this.authService.login(res.token);
            this.router.navigate(['/home']);
          },
          error: err => {
            if (err && err.status === 403) {
              this.toastr.error('Access denied. Please check your credentials.', 'Login Failed');
            } else {
              this.toastr.error('An error occurred. Please try again.', 'Login Failed');
            }
          }
        });
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  login(provider: string) {

    fetch('http://localhost:8080/oauth2/authorization/github', {
      method: 'HEAD',
      mode: 'no-cors'
    })
    .then(() => {
      window.location.href =
        'http://localhost:8080/oauth2/authorization/github';
    })
    .catch(() => {
      this.toastr.error(
        'Gateway is down. Please try later.',
        'Login Failed'
      );
    });
  }

  enableLogin(event: boolean) {
    this.isEnabledLogin = event;
  }
}
