import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _http = inject(HttpClient);

  public signIn(mobile: string): Observable<{ data: { loggedIn: boolean; user: User } }> {
    return this._http.post<{ data: { loggedIn: boolean; user: User } }>(
      'http://localhost:3000/auth/signin',
      { mobile }
    );
  }
}
