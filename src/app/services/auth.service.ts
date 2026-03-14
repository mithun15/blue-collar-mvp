import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // private _baseUrl = 'https://blue-collar-api.onrender.com/';
  private _baseUrl = 'http://localhost:3000/';
  private _http = inject(HttpClient);

  public signIn(mobile: string): Observable<{ data: { loggedIn: boolean; user: User } }> {
    return this._http.post<{ data: { loggedIn: boolean; user: User } }>(
      `${this._baseUrl}auth/signin`,
      { mobile },
    );
  }

  public signUp(user: User): Observable<{ data: { registered: boolean; user: User } }> {
    return this._http.post<{ data: { registered: boolean; user: User } }>(
      `${this._baseUrl}auth/signup`,
      user,
    );
  }
}
