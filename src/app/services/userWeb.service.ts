import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
