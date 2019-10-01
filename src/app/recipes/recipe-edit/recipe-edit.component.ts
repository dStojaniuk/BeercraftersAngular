import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;

  constructor(private fb: FormBuilder, public authService: AuthService, private alertify: AlertifyService,
              private http: HttpClient) { }

  ngOnInit() {
    const yyeast = this.fb.group({
      name: '',
      count: ''
    });

    this.recipeForm = this.fb.group({
      name: '',
      type: '',
      originalGravity: '',
      finalGravity: '',
      alcohol: '',
      ibu: '',
      materials: this.fb.array([]),
      hops: this.fb.array([]),
      yeast: yyeast
    });

    this.addMaterial();
    this.addHop();
  }

  onSubmit() {
    const modelToSend = {
      ...this.recipeForm.value,
      userId: this.authService.currentUser.id
    };

    this.createRecipe(modelToSend);
  }

  private createRecipe(body: any) {
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };

    const url = 'https://localhost:5001/userrecipe/';

    this.http.post(url, body, header).subscribe(() => {
      this.alertify.success('Utworzono przepis!');
    }, error => {
      this.alertify.error(error.message);
    });

    this.alertify.success('Zapisano');
    console.log(this.recipeForm.value);
  }

  onClear() {
    this.recipeForm.reset();
    this.alertify.message('Wyczyszczono pola');
  }

  get materialsForm() {
    return this.recipeForm.get('materials') as FormArray;
  }

  addMaterial() {
    const material = this.fb.group({
      name: [],
      count: []
    });

    this.materialsForm.push(material);
  }

  deleteMaterial(i) {
    this.materialsForm.removeAt(i);
  }

  get hopsForm() {
    return this.recipeForm.get('hops') as FormArray;
  }

  addHop() {
    const hops = this.fb.group({
      name: [],
      count: []
    });

    this.hopsForm.push(hops);
  }

  deleteHop(i) {
    this.hopsForm.removeAt(i);
  }
}
