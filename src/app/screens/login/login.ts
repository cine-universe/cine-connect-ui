import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  @Output() loggedIn = new EventEmitter<boolean>();
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
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login Data:', this.loginForm.value);
      this.loggedIn.emit(true);
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
}
