import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  editForm: FormGroup;
  jwtHelper = new JwtHelperService();
  user: User;
  url = 'https://localhost:5001/users/';

  constructor(private http: HttpClient, private router: Router, private auth: AuthService, private alertify: AlertifyService) { }

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
    this.saveChanges(this.editForm.value.userData);
  }

  onUserDelete() {
    this.alertify.confirm('Czy na pewno chcesz usunąć konto?', () => {
      this.removeMember(this.auth.currentUser.id);

      localStorage.clear();
      this.router.navigate(['/home']);
    });
  }

  private saveChanges(model: any) {
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };

    const body = {
      Id: this.user.id,
      Description: model.description,
      Username: model.username
    };

    this.http.put(this.url, body, header).subscribe(response => {
      if (response == null) {
        this.alertify.success('Zapisano zmiany');
      }
    }, error => {
      // console.log(error);
      this.alertify.error('Wystąpił błąd!');
    });
  }

  private removeMember(model: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }),
      body: {
        UserId: model
      }
    };

    this.http.delete(this.url, options).subscribe(response => {
      this.alertify.error('Usunięto użytkownika');
    }, error => {
      this.alertify.error('Wystąpił błąd!');
    });
  }
}
