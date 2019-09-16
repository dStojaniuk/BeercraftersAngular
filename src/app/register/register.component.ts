import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  baseUrl = 'https://localhost:5001/auth/register/';
  values: any;

  constructor(private http: HttpClient) { }

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
    // this.registerForm.reset();
    console.log(this.registerForm.value.userData);
    this.register(this.registerForm.value.userData);
  }

  private register(model: any) {
    this.http.post(this.baseUrl, model).subscribe(error => {
      console.log(error);
    });
  }
}
