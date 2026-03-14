import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { CheckboxModule } from 'primeng/checkbox';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Role, User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-employer-sign-up',
  imports: [
    CardModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DividerModule,
    InputTextModule,
    FloatLabel,
    CheckboxModule,
    TranslateModule,
  ],
  templateUrl: './employer-sign-up.html',
  styleUrl: './employer-sign-up.scss',
})
export class EmployerSignUp {
  employerSignUpForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    company: new FormControl(''),
    mobile: new FormControl('', [Validators.pattern('^[0-9]{10}$'), Validators.required]),
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required),
  });

  private _router = inject(Router);
  private _authService = inject(AuthService);

  signUp() {
    const { firstName, lastName, company, mobile, email, password } = this.employerSignUpForm.value;

    const data = {
      firstName: firstName,
      lastName: lastName,
      company: company,
      mobile: mobile,
      email: email,
      password: password,
      role: Role.Employer,
    };

    this._authService.signUp(data as User).subscribe({
      next: (response) => {
        if (response) {
          this._router.navigate(['/employer-dashboard']);
        }
      },
      error: (error) => {
        console.error('Sign up error:', error);
      },
    });
  }
}
