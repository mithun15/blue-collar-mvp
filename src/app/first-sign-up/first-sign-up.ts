import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-first-sign-up',
  imports: [ButtonModule, TranslateModule],
  templateUrl: './first-sign-up.html',
  styleUrl: './first-sign-up.scss',
})
export class FirstSignUp {
  private _router = inject(Router);
  workerSelected() {
    this._router.navigate(['/worker-sign-up']);
  }

  emplyerSignUp() {
    this._router.navigate(['/employer-sign-up']);
  }
}
