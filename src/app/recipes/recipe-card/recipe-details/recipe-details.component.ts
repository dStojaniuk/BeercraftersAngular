import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.getRecipes(id);
  }

  private getRecipes(id: any) {
    this.http.get('https://localhost:5001/recipe/' + id + '/').subscribe((response: Recipe) => {
      this.recipe = response;
      // console.log(response);
    }, error => {
      console.log(error);
    });
  }
}
