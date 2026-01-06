import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { GeocodingService } from '../services/geocoding.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-worker-sign-up',
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    RadioButtonModule,
    CardModule,
    DividerModule,
  ],
  templateUrl: './worker-sign-up.html',
  styleUrl: './worker-sign-up.scss',
})
export class WorkerSignUp {
  public step = signal(1);
  public workerSignUpForm = new FormGroup({
    fullName: new FormControl(''),
    work: new FormControl(''),
    availability: new FormControl(''),
  });

  categories: any[] = [
    { name: 'Helper', key: 'HEL' },
    { name: 'Labour', key: 'LAB' },
    { name: 'Plumber', key: 'PLU' },
    { name: 'Electrician', key: 'ELE' },
  ];

  public myAddress = signal('');
  private _geoCodingService = inject(GeocodingService);
  private _router = inject(Router);

  continue() {
    this.step.set(2);

    navigator.geolocation.getCurrentPosition(
      (loc) => {
        this._geoCodingService
          .getAddress(loc.coords.latitude, loc.coords.longitude)
          .subscribe((add) => {
            console.log(add['display_name']);
            this.myAddress.set(add['display_name']);
            // const address = add.results[0].formatted_address;
            // console.log('Address:', address);
          });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onFinish() {
    this._router.navigate(['/jobs-list']);
  }
}
