import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { InputNumberModule } from 'primeng/inputnumber';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [InputNumberModule, FormsModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  public loginForm = new FormGroup({
    mobileNumber: new FormControl(''),
  });

  private _router = inject(Router);
  private _authService = inject(AuthService);

  onContinue() {
    const mobile = this.loginForm.get('mobileNumber')?.value;

    if (!mobile) return;

    this._authService.signIn(mobile).subscribe((res) => {
      const { loggedIn, user } = res.data;
      if (!loggedIn) {
        return;
      }

      if (!user.role) {
        this._router.navigate(['/first-sign-up']);
      }

      if (user.role === 'worker') {
        this._router.navigate(['/jobs-list']);
      }
    });
  }
}
