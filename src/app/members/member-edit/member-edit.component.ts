import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TitleCasePipe } from '@angular/common';
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

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.currentUser;

    this.editForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(this.user.username.charAt(0).toUpperCase() + this.user.username.slice(1)),
        description: new FormControl(null)
      })
    });
  }

  onSubmit() {
    console.log('Zapisano!');
  }

  onUserDelete() {
    console.log('Usunięto użytkownika!');
    this.removeMember(this.auth.currentUser.id);

    localStorage.clear();
    this.router.navigate(['/home']);
  }

  private removeMember(model: any) {
    const url = 'https://localhost:5001/users/' + model;
    this.http.delete(url).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
}
