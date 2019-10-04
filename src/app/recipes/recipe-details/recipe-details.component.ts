import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from 'src/app/models/recipe';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { RecipeWebService } from 'src/app/services/recipeWeb.service';
import { UserWebService } from 'src/app/services/userWeb.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  username: string;
  isUserLogged: boolean;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService,
              private recipeWebService: RecipeWebService, private userWebService: UserWebService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.recipeWebService.getRecipeById(this.route.snapshot.params.id).subscribe((result: Recipe) => {
      this.userWebService.getUserById(result.userId).subscribe((user: User) => {
        this.recipe = result;
        this.username = user.username;
        this.UserLoggedRecipe();
      });
    });
  }

  countStars(star) {
    this.selectedValue = star;
    console.log('Value of star', star);
  }

  onRecipeDelete() {
    this.alertify.confirm('Jesteś pewny, że chcesz usunąć przepis?', () => {
      const bodyToSend = {
        userId: this.authService.currentUser.id,
        recipeId: this.route.snapshot.params.id
      };

      this.recipeWebService.removeRecipe(bodyToSend).subscribe(response => {
        this.alertify.error('Usunięto przepis');
        this.router.navigate(['/recipes']);
      }, error => {
        this.alertify.error('Wystąpił błąd!');
      });
    });
  }

  onRecipeEdit() {
    this.router.navigate(['users/recipes/edit/' + this.recipe.id]);
    this.alertify.message('Edycja przepisu');
  }

  private UserLoggedRecipe() {
    if (this.authService.currentUser == null) {
      return;
    }

    if ( this.authService.currentUser.id === this.recipe.userId) {
      this.isUserLogged = true;
    }
  }
}
