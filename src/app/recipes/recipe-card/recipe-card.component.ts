import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() isUserRecipes: boolean;

  constructor() { }

  ngOnInit() {
  }

}
