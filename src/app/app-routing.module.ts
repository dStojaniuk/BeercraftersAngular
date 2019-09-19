import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RecipesComponent } from './recipes/recipes.component';
import { BeerStylesComponent } from './beer-styles/beer-styles.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailsComponent } from './recipes/recipe-card/recipe-details/recipe-details.component';
import { MembersComponent } from './members/members.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: MembersComponent },
  { path: 'recipes', component: RecipesComponent, children: [
    // { path: 'details', component: RecipeDetailsComponent, children: [
    //   { path: ':id', component: RecipeDetailsComponent }
    // ]}
  ]},
  { path: 'recipes/details/:id', component: RecipeDetailsComponent },
  { path: 'styles', component: BeerStylesComponent },
  { path: 'detail', component: RecipeDetailsComponent },
  { path: 'edit', component: RecipeEditComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
