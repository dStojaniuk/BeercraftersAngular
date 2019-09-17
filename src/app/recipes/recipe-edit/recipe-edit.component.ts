import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from 'src/app/services/alertify.service';
import { WebService } from 'src/app/services/web.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;

constructor(private alertify: AlertifyService, private webService: WebService) { }

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
    this.create(this.recipeForm.value.userData);
    // this.recipeForm.reset();
  }

  private create(model: any) {
    this.webService.create(model).subscribe(() => {
      this.alertify.success('Utworzono przepis!');
    }, error => {
      this.alertify.error(error);
    });
}
}
