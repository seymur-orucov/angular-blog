import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  public get token(): string {
    return '';
  }

  login(user: User): Observable<any> {
    console.log(user);
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        user
      )
      .pipe(tap(this.setToken));
  }

  private setToken(response: any) {
    console.log(response);
  }

  logout() {}

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
