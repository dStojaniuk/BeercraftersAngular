import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserWebService } from 'src/app/services/userWeb.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  editForm: FormGroup;
  jwtHelper = new JwtHelperService();
  user: User;

  constructor(private userWebService: UserWebService, private router: Router, private auth: AuthService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.user = this.auth.currentUser;

    this.editForm = new FormGroup({
      userData: new FormGroup({
        description: new FormControl(this.user.description),
        username: new FormControl(this.user.username.charAt(0).toUpperCase() + this.user.username.slice(1))
      })
    });
  }

  onSubmit() {
    const body = {
      ...this.editForm.value.userData,
      id: this.user.id
    };

    this.userWebService.updateUser(body).subscribe(response => {
      if (response == null) {
        this.alertify.success('Zapisano zmiany');
      }
    }, error => {
      this.alertify.error('Wystąpił błąd!');
    });
  }

  onUserDelete() {
    this.alertify.confirm('Czy na pewno chcesz usunąć konto?', () => {
      this.userWebService.removeUser(this.auth.currentUser.id).subscribe(response => {
        this.alertify.error('Usunięto użytkownika');
      }, error => {
        this.alertify.error('Wystąpił błąd!');
      });

      localStorage.clear();
      this.router.navigate(['/home']);
    });
  }
}
