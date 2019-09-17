import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  baseUrl = 'https://localhost:5001/recipe/';

constructor(private http: HttpClient) { }

  create(model: any) {
      return this.http.post(this.baseUrl + 'create/', model);
    }
}
