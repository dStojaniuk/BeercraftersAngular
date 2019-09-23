import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  baseUrl = 'https://localhost:5001/';

constructor(private http: HttpClient) { }

  create1(model: any) {
      return this.http.post(this.baseUrl + 'userrecipe/create/', model);
    }
  create2(model: any) {
      return this.http.post(this.baseUrl + 'recipe/create/', model);
    }
}
