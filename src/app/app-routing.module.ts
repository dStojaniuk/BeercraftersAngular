import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { MembersComponent } from './members/members.component';
import { HomeComponent } from './home/home.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'options', component: MemberEditComponent, canActivate: [AuthGuard] },
  { path: 'users', component: MembersComponent },
  { path: 'users/details/:id', component: MemberDetailsComponent },
  { path: 'users/recipes/:id', component: RecipesComponent },
  { path: 'users/recipes/edit/:id', component: RecipeEditComponent, canActivate: [AuthGuard] },
  { path: 'recipes', component: RecipesComponent},
  { path: 'recipes/details/:id', component: RecipeDetailsComponent },
  { path: 'detail', component: RecipeDetailsComponent },
  { path: 'edit', component: RecipeEditComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
