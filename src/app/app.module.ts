import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
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
import { RecipesComponent } from './recipes/recipes.component';
import { MembersComponent } from './members/members.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { HomeComponent } from './home/home.component';
import { MemberDetailsComponent } from './members/member-card/member-details/member-details.component';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    DropdownDirective,
    RecipeCardComponent,
    RecipeDetailsComponent,
    RecipeEditComponent,
    RecipesComponent,
    MembersComponent,
    MemberCardComponent,
    MemberEditComponent,
    HomeComponent,
    MemberDetailsComponent
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
    AlertifyService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
