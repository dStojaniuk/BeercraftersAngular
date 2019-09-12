import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required]),
      })
    });
  }

  onSubmit() {
    console.log(this.loginForm);
    this.loginForm.reset();
  }
}
