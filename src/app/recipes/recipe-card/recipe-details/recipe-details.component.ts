import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';

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
  id: string;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,
              private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.http.get('https://localhost:5001/recipe/' + this.route.snapshot.params.id + '/').subscribe((result: Recipe) => {
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
    if (this.authService.currentUser == null) {
      return;
    }

    if ( this.authService.currentUser.id === this.recipe.userId) {
      this.isUserLoggedRecipe = true;
    }
  }

  onRecipeDelete() {
    this.alertify.confirm('Jesteś pewny, że chcesz usunąć przepis?', () => {
      const model = {
        userId: this.authService.currentUser.id,
        recipeId: this.route.snapshot.params.id
      };

      this.removeRecipe(model);
    });
  }

  onRecipeEdit() {
    this.router.navigate(['']);
    this.alertify.message('Edycja przepisu');
  }

  private removeRecipe(model: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }),
      body: {
        UserId: model.userId,
        RecipeId: model.recipeId
      }
    };

    this.http.delete('https://localhost:5001/userrecipe/', options).subscribe(response => {
      this.alertify.error('Usunięto przepis');
      this.router.navigate(['/recipes']);
    }, error => {
      this.alertify.error('Wystąpił błąd!');
    });
  }
}
