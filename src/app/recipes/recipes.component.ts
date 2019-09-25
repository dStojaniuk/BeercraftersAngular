import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;

    if (id == null) {
      this.getRecipes();
    }

    this.getUserRecipes(id);
  }

  private getRecipes() {
    this.http.get('https://localhost:5001/recipe').subscribe((response: Recipe[]) => {
      this.recipes = response;
      console.log(response);

    }, error => {
      console.log(error);
    });
  }

  private getUserRecipes(id: any) {
    this.http.get('https://localhost:5001/userrecipe/' + id).subscribe((response: Recipe[]) => {
      this.recipes = response;
      console.log(response);

    }, error => {
      console.log(error);
    });
  }
}
