import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [InputTextModule, FormsModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  public loginForm = new FormGroup({
    userId: new FormControl(''),
    password: new FormControl(''),
  });

  private _router = inject(Router);
  private _authService = inject(AuthService);

  onContinue() {
    const userId = this.loginForm.get('userId')?.value;
    const password = this.loginForm.get('password')?.value;

    if (!userId || !password) return;

    this._authService.signIn({ userId, password }).subscribe((res) => {
      // const { loggedIn, user } = res.data;
      // if (!loggedIn) {
      //   return;
      // }

      // if (!user.role) {
      //   this._router.navigate(['/first-sign-up']);
      // }

      this._router.navigate(['/employer-dashboard']);
      // if (user.role === 'employer') {
      //   this._router.navigate(['/jobs-list']);
      // }
    });
  }
}
