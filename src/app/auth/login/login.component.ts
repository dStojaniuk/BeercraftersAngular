import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      userData: new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required]),
      })
    });
  }

  onSubmit() {
    this.login(this.loginForm.value.userData);
    this.loginForm.reset();
  }

  private login(model: any) {
    this.authService.login(model).subscribe(next => {
      this.alertify.success('Zalogowano!');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/users']);
    });
  }
}
