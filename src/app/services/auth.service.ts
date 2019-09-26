import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://localhost:5001/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;

constructor(private http: HttpClient) {
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
 }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login/', model)
      .pipe(
        map((response: any) => {
          if (response) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            this.decodedToken = this.jwtHelper.decodeToken(response.token);
            this.currentUser = response.user;
          }
        })
      );
  }

  register(model: any) {
      return this.http.post(this.baseUrl + 'register/', model);
    }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
