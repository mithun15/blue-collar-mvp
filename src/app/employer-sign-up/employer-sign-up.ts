import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { CheckboxModule } from 'primeng/checkbox';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

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
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    company: new FormControl(''),
    mobile: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  private _router = inject(Router);

  signUp() {
    this._router.navigate(['/employer-dashboard']);
  }
}
