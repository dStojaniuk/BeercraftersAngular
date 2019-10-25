import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user';

@Injectable()
export class UserWebService {
  private baseUrl = 'https://localhost:5001/users/';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUserById(id: number) {
    return this.http.get(this.baseUrl + id);
  }

  removeUser(userId: any) {
    return this.http.delete(this.baseUrl, this.setOptions(userId));
  }

  updateUser(bodyToSend: any) {
    return this.http.put(this.baseUrl, bodyToSend, this.setHeader());
  }

  private setOptions(id: any) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }),
      body: {
        userId: id
      }
    };
  }

  private setHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
  }
}
