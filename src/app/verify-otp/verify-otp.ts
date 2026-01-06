import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';

@Component({
  selector: 'app-verify-otp',
  imports: [InputOtpModule, FormsModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.scss',
})
export class VerifyOtp {
  value: any;
  private _router = inject(Router);

  onSubmit() {
    this._router.navigate(['/first-sign-up']);
  }
}
