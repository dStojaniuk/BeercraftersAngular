import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      userData: new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        username: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required]),
      })
    });
  }

  onSubmit() {
    this.register(this.registerForm.value.userData);
    this.registerForm.reset();
  }

  cancel() {
    this.registerForm.reset();
  }

  private register(model: any) {
    this.authService.register(model).subscribe(() => {
      this.alertify.success('Zarejestrowano użytkownika');
    }, error => {
      this.alertify.error(error);
    });
  }
}
