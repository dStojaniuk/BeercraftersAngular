import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Recipe } from '../models/recipe';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RecipeWebService {
  recipe: BehaviorSubject<Recipe> = new BehaviorSubject(null);

  private baseRecipeUrl = 'https://localhost:5001/recipe/';
  private baseUserRecipeUrl = 'https://localhost:5001/userrecipe/';

  constructor(private http: HttpClient) {}

  getRecipes() {
    return this.http.get<Recipe[]>(this.baseRecipeUrl);
  }

  getRecipeById(id: number) {
    this.http.get<Recipe>(this.baseRecipeUrl + id).subscribe(response => {
      this.recipe.next({ ...response });
    });

    return this.recipe;
  }

  removeRecipe(bodyToSend: any) {
    return this.http.delete(this.baseUserRecipeUrl, this.setOptions(bodyToSend));
  }

  createRecipe(bodyToSend: any) {
    return this.http.post(this.baseUserRecipeUrl, this.setOptions(bodyToSend));
  }

  updateRecipe(bodyToSend: any) {
    return this.http.put(this.baseUserRecipeUrl, bodyToSend, this.setHeader());
  }

  private setOptions(body: any) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }),
      body: {
        ...body
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
