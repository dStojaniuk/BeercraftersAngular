import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ok } from 'assert';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  member: User;
  isUserLoggedRecipe: boolean;
  result: any;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,
              private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;

    this.http.get('https://localhost:5001/recipe/' + id + '/').subscribe((result: Recipe) => {
      this.http.get('https://localhost:5001/users/' + result.userId + '/').subscribe((user: User) => {
        this.recipe = result;
        this.member = user;
        this.UserLoggedRecipe();
        console.log(result);
        console.log(user);
      });
    });
  }

  private UserLoggedRecipe() {
    const userLoggedId = this.authService.currentUser.id;

    if ( userLoggedId === this.recipe.userId) {
      this.isUserLoggedRecipe = true;
    }
  }

  onRecipeDelete() {
    this.alertify.confirm('Jesteś pewny, że chcesz usunąć przepis?', () => {
      console.log('Usunięto przepis!');
      this.alertify.error('Usunięto przepis!');
    });
  }

  onRecipeEdit() {
    this.router.navigate(['']);
    this.alertify.message('Edycja przepisu');
  }
}
