import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ValuesComponent } from './values/values.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AlertifyService } from './services/alertify.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { RecipeCardComponent } from './recipes/recipe-card/recipe-card.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { BeerStylesComponent } from './beer-styles/beer-styles.component';
import { RecipesComponent } from './recipes/recipes.component';
import { MembersComponent } from './members/members.component';
import { MemberCardComponent } from './members/member-card/member-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ValuesComponent,
    LoginComponent,
    RegisterComponent,
    DropdownDirective,
    RecipeCardComponent,
    RecipeDetailsComponent,
    RecipeEditComponent,
    BeerStylesComponent,
    RecipesComponent,
    MembersComponent,
    MemberCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AlertifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
