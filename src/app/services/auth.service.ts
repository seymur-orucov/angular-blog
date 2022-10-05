import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { FbAuthResponse } from '../models/fbauthresponse.model';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  // * GET TOKEN
  public get token() {
    const expDate = new Date(localStorage.getItem('fb-token-exp')!);

    if (new Date() > expDate) {
      this.logout();
      return null;
    }

    return localStorage.getItem('fb-token');
  }

  // * LOGIN
  login(user: User): Observable<any> {
    user.returnSecureToken = true;

    return this.http
      .post<FbAuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        user
      )
      .pipe(tap(this.setToken));
  }

  // * LOGOUT
  logout() {
    this.setToken(null);
  }

  // * SET TOKEN
  private setToken(response: FbAuthResponse | null) {
    if (response) {
      const expDate = new Date(
        new Date().getTime() + +response.expiresIn * 1000
      );
      console.log(expDate);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
