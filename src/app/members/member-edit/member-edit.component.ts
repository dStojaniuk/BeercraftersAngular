import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

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

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) { }

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
    console.log('Zapisano!');
    this.saveChanges(this.editForm.value.userData);
  }

  onUserDelete() {
    console.log('Usunięto użytkownika!');
    this.removeMember(this.auth.currentUser.id);

    localStorage.clear();
    this.router.navigate(['/home']);
  }

  private saveChanges(model: any) {
    // const options = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   }),
    //   body: {
    //     Id: this.user.id,
    //     Description: model.description,
    //     Username: model.username
    //   }
    // };

    const body = {
      Id: this.user.id,
      Description: model.description,
      Username: model.username
    };

    this.http.put(this.url, body).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  private removeMember(model: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        UserId: model
      }
    };

    this.http.delete(this.url, options).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
}
