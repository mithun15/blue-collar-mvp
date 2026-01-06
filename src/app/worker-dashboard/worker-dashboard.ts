import { Component, inject, OnInit, signal } from '@angular/core';
import { GeocodingService } from '../services/geocoding.service';

@Component({
  selector: 'app-worker-dashboard',
  imports: [],
  templateUrl: './worker-dashboard.html',
  styleUrl: './worker-dashboard.scss',
})
export class WorkerDashboard implements OnInit {
  public myAddress = signal('');
  private _geoCodingService = inject(GeocodingService);

  ngOnInit(): void {
    console.log(navigator);
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

    // this._geoCodingService.testEs().subscribe((res) => {
    //   console.log('testing', res);
    // });

    const distance = this._geoCodingService.calculateDistance(
      28.613539372673912,
      77.22938577423851,
      28.60076336918705,
      77.44933405891697
    );
    console.log(distance);
  }
}
// 28.613539372673912, 77.22938577423851 -- India Gate
// 28.60076336918705, 77.44933405891697 -- Greenarch
