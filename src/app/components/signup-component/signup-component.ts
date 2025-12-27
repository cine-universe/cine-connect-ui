import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { AuthApi } from '../../apis';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup-component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup-component.html',
  styleUrl: './signup-component.scss',
})
export class SignupComponent {

  @Output() backToLogin = new EventEmitter<boolean>();

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authApi: AuthApi,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Clear 'usernameTaken' error when user edits the username field so the message disappears on change
    this.loginForm.get('username')?.valueChanges.subscribe(() => {
      const ctrl = this.loginForm.get('username');
      if (!ctrl) return;
      const errors = ctrl.errors as any;
      if (errors && errors.usernameTaken) {
        const { usernameTaken, ...rest } = errors;
        if (Object.keys(rest).length === 0) {
          ctrl.setErrors(null);
        } else {
          ctrl.setErrors(rest);
        }
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      const confirmPassword = this.loginForm.value.confirmPassword;

      const registerRequest = { username, email, password };
      if(password !== confirmPassword) {
        const confirmCtrl = this.loginForm.get('confirmPassword');
        confirmCtrl?.setErrors({ mismatch: true });
        confirmCtrl?.markAsTouched();
        this.toastr.error('Passwords do not match', 'Error');
        return;
      }

      if (username) {
        // First check if username already exists
        this.authApi.checkUsernameExists(username).subscribe({
          next: (exists) => {
            if (exists) {
              const usernameControl = this.loginForm.get('username');
              usernameControl?.setErrors({ usernameTaken: true });
              usernameControl?.markAsTouched();
              return;
            }

            // Then check email (if provided)
            if(email) {
              this.authApi.checkEmailExists(email).subscribe({
                next: (existsEmail) => {
                  if(existsEmail) {
                    this.toastr.error('Email already in use', 'Error');
                    return;
                  }
                  // Proceed with signup
                  this.authApi.register(registerRequest).subscribe({
                    next: (response) => {
                      this.toastr.success('Signup successful! Please login.', 'Success');
                      this.router.navigate(['/login']);
                    },
                    error: (err) => {
                      this.toastr.error('Signup failed. Please try again.', 'Error');
                    }
                  });
                },
                error: (err) => {
                  this.toastr.error('Error checking email. Please try again.', 'Error');
                }
              });
            } else {
              // No email to check, proceed with signup
              this.authApi.register(registerRequest).subscribe({
                next: (response) => {
                  this.toastr.success('Signup successful! Please login.', 'Success');
                  this.router.navigate(['/login']);
                },
                error: (err) => {
                  this.toastr.error('Signup failed. Please try again.', 'Error');
                }
              });
            }
          },
          error: (err) => {
            this.toastr.error('Error checking username. Please try again.', 'Error');
          }
        });
      }
    }
  }

  backToLoginClicked() {
    this.backToLogin.emit(true);
  }
}
