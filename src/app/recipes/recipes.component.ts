import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { Recipe } from '../models/recipe';
import { RecipeWebService } from '../services/recipeWeb.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[];
  isUserRecipes: boolean;

  constructor(private recipeWebService: RecipeWebService, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;

    if (id === undefined) {
      this.getRecipes();
    } else {
      this.getUserRecipes(id);
      this.isUserRecipes = true;
    }
  }

  private getRecipes() {
    this.recipeWebService.getRecipes().subscribe((response: Recipe[]) => {
      this.recipes = response;
    }, error => {
      console.log(error);
    });
  }

  private getUserRecipes(id: any) {
    this.recipeWebService.getUserRecipes(id).subscribe((response: Recipe[]) => {
      this.recipes = response;
    }, error => {
      console.log(error);
    });
  }
}
