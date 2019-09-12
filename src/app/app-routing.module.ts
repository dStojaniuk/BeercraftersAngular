import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ValuesComponent } from './values/values.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'users', component: ValuesComponent },
    { path: 'register', component: RegisterComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
