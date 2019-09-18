import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getRecipes();
  }

  private getRecipes() {
    this.http.get('https://localhost:5001/recipe').subscribe((response: Recipe[]) => {
      this.recipes = response;
      console.log(response);

    }, error => {
      console.log(error);
    });
  }
}
