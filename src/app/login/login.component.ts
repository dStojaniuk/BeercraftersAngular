import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  baseUrl = 'https://localhost:5001/auth/login/';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      userData: new FormGroup({
        email: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required]),
      })
    });
  }

  onSubmit() {
    console.log(this.loginForm);
    this.login(this.loginForm.value.userData);
  }

  private login(model: any) {
    this.http.post(this.baseUrl, model).subscribe(error => {
      console.log(error);
    });
  }
}
