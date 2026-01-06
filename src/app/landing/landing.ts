import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-landing',
  imports: [ButtonModule, CardModule, TranslateModule],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  public _router = inject(Router);

  getStarted() {
    this._router.navigate(['/first-sign-up']);
  }
}
