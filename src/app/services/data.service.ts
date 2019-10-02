import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Recipe } from '../models/recipe';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  recipe: BehaviorSubject<Recipe> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    this.getRecipe('4261b945-8ca7-4fb4-bed0-29dd5d166872').subscribe((response) => {
      this.recipe.next({ ...response });
      console.log(this.recipe.getValue());
    });
   }

  getRecipe(id: any): Observable<Recipe> {
    const API_URL = 'https://localhost:5001/recipe/' + id + '/';
    return this.http.get<Recipe>(API_URL);
  }
}
