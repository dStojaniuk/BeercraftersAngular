import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  baseUrl = 'https://localhost:5001/';

constructor(private http: HttpClient) { }




  create1(model: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(this.baseUrl + 'userrecipe/', model, options);
    }
}
