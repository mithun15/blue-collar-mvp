// geocoding.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GeocodingService {
  //   private baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
  //   private apiKey = 'API_KEY';
  private baseUrl = 'https://nominatim.openstreetmap.org/reverse';

  constructor(private http: HttpClient) {}

  //   getLatLng(address: string): Observable<any> {
  //     const params = new HttpParams().set('address', address).set('key', this.apiKey);

  //     return this.http.get(this.baseUrl, { params });
  //   }

  //   getAddress(lat: number, lng: number): Observable<any> {
  //     const params = new HttpParams().set('latlng', `${lat},${lng}`).set('key', this.apiKey);

  //     return this.http.get(this.baseUrl, { params });
  //   }

  getAddress(lat: number, lon: number) {
    const headers = new HttpHeaders({
      'User-Agent': 'blue-collar-mvp',
    });

    const params = new HttpParams().set('lat', lat).set('lon', lon).set('format', 'json');

    return this.http.get<any>(this.baseUrl, { headers, params });
  }

  testEs() {
    return this.http.get('http://localhost:9200/my-index/_search', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Function to convert degrees to radians
  private degreesToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  // Function to calculate distance in kilometers
  public calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const earthRadiusKm = 6371; // Radius of the Earth in kilometers

    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);

    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadiusKm * c; // Distance in kilometers

    return distance;
  }
}
