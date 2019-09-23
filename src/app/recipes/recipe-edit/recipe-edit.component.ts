import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { WebService } from 'src/app/services/web.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  value: any;
  recipeForm: FormGroup;
  modelek =
    {
      userId: this.authService.currentUser.id,
      name: this.value,
      type: this.value,
      originalGravity: this.value,
      finalGravity: this.value,
      alcohol: this.value,
      ibu: this.value,
    };

constructor(public authService: AuthService, private alertify: AlertifyService, private webService: WebService) { }

  ngOnInit() {
    this.recipeForm = new FormGroup({
      userData: new FormGroup({
        name: new FormControl(null, [Validators.required]),
        type: new FormControl(null, [Validators.required]),
        originalGravity: new FormControl(null, [Validators.required]),
        finalGravity: new FormControl(null, [Validators.required]),
        alcohol: new FormControl(null, [Validators.required]),
        ibu: new FormControl(null, [Validators.required])
      })
    });
  }

  onSubmit() {
    this.modelek.name = this.recipeForm.value.userData.name;
    this.modelek.type = this.recipeForm.value.userData.type;
    this.modelek.originalGravity = this.recipeForm.value.userData.originalGravity;
    this.modelek.finalGravity = this.recipeForm.value.userData.finalGravity;
    this.modelek.alcohol = this.recipeForm.value.userData.alcohol;
    this.modelek.ibu = this.recipeForm.value.userData.ibu;
    this.create(this.modelek);
  }

  private create(model: any) {
    this.webService.create1(model).subscribe(() => {
      this.alertify.success('Utworzono przepis!');
    }, error => {
      this.alertify.error(error);
      console.log(error);
    });
  }

  onClear() {
    this.recipeForm.reset();
  }
}
