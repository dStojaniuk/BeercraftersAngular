import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      1,
      'pierwszy'
    ), new Recipe(
      2,
      'drugi'
    ), new Recipe(
      3,
      'trzeci'
    ), new Recipe(
      4,
      'czwarty'
    ), new Recipe(
      5,
      'piąty'
    )
   ];

  constructor() { }

  ngOnInit() {

  }

}
