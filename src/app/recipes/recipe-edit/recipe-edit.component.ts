import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';

import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { Recipe } from 'src/app/models/recipe';
import { RecipeWebService } from 'src/app/services/recipeWeb.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  editMode = false;
  id: any;
  recipe: BehaviorSubject<Recipe> = new BehaviorSubject(null);

  constructor(private recipeWebService: RecipeWebService, private fb: FormBuilder, private route: ActivatedRoute,
              public authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.editMode = params.id != null;
      this.initForm();
    });
  }

  onSubmit() {
    let bodyToSend = {
      ...this.recipeForm.value,
      userId: this.authService.currentUser.id
    };

    if (this.editMode) {
      bodyToSend = {
        id: this.id,
        ...bodyToSend
      };

      this.recipeWebService.updateRecipe(bodyToSend).subscribe(() => {
        this.alertify.success('Zaktualizowano przepis!');
      }, error => {
        this.alertify.error(error.message);
      });
    } else {
      this.recipeWebService.createRecipe(bodyToSend).subscribe(() => {
        this.alertify.success('Utworzono przepis!');
      }, error => {
        this.alertify.error(error.message);
      });
    }
  }

  onClear() {
    this.recipeForm.reset();
    this.alertify.message('Wyczyszczono pola');
  }

  private initForm() {
    let recipeName = '';
    let recipeType = '';
    let recipeOriginalGravity: number;
    let recipeFinalGravity: number;
    let recipeAlcohol: number;
    let recipeIbu: number;
    const recipeMaterials = new FormArray([]);
    const recipeHops = new FormArray([]);
    let recipeYeast = '';
    const recipeMashing = new FormArray([]);
    const recipeBrewing = new FormArray([]);
    const recipeFermentation = new FormArray([]);

    if (this.editMode) {
      this.recipe = this.recipeWebService.getRecipeById(this.id);

      recipeName = this.recipe.getValue().name;
      recipeType = this.recipe.getValue().type;
      recipeOriginalGravity = this.recipe.getValue().originalGravity;
      recipeFinalGravity = this.recipe.getValue().finalGravity;
      recipeAlcohol = this.recipe.getValue().alcohol;
      recipeIbu = this.recipe.getValue().ibu;
      recipeYeast = this.recipe.getValue().yeast;

      if (this.recipe.getValue().materials) {
        for (const material of this.recipe.getValue().materials) {
          recipeMaterials.push(
            new FormGroup({
              name: new FormControl(material.name, Validators.required),
              count: new FormControl(material.count, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
      if (this.recipe.getValue().hops) {
        for (const hop of this.recipe.getValue().hops) {
          recipeHops.push(
            new FormGroup({
              name: new FormControl(hop.name, Validators.required),
              count: new FormControl(hop.count, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
      if (this.recipe.getValue().brewing) {
        for (const brewing of this.recipe.getValue().brewing) {
          recipeBrewing.push(
            new FormGroup({
              name: new FormControl(brewing.name, Validators.required),
              count: new FormControl(brewing.count, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)]),
              time: new FormControl(brewing.time, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
      if (this.recipe.getValue().fermentation) {
        for (const fermentation of this.recipe.getValue().fermentation) {
          recipeFermentation.push(
            new FormGroup({
              name: new FormControl(fermentation.name, Validators.required),
              count: new FormControl(fermentation.count, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)]),
              time: new FormControl(fermentation.count, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    this.recipeForm = this.fb.group({
    name: recipeName,
    type: recipeType,
    originalGravity: recipeOriginalGravity,
    finalGravity: recipeFinalGravity,
    alcohol: recipeAlcohol,
    ibu: recipeIbu,
    materials: recipeMaterials,
    hops: recipeHops,
    yeast: recipeYeast,
    mashing: recipeMashing,
    brewing: recipeBrewing,
    fermentation: recipeFermentation
  });

    if (!this.editMode) {
    this.addMaterial();
    this.addHop();
    this.addMashing();
    this.addBrewing();
    this.addFermentation();
  }
}

  get materialsForm() {
    return this.recipeForm.get('materials') as FormArray;
  }

  addMaterial() {
    const material = this.fb.group({
      count: [],
      name: [],
      time: 0
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
      count: [],
      name: [],
      time: 0
    });

    this.hopsForm.push(hops);
  }

  deleteHop(i) {
    this.hopsForm.removeAt(i);
  }

  get mashingForm() {
    return this.recipeForm.get('mashing') as FormArray;
  }

  addMashing() {
    const mashing = this.fb.group({
      count: [],
      name: [],
      time: 0
    });

    this.mashingForm.push(mashing);
  }

  deleteMashing(i) {
    this.mashingForm.removeAt(i);
  }

  get brewingForm() {
    return this.recipeForm.get('brewing') as FormArray;
  }

  addBrewing() {
    const brewing = this.fb.group({
      count: [],
      name: [],
      time: []
    });

    this.brewingForm.push(brewing);
  }

  deleteBrewing(i) {
    this.brewingForm.removeAt(i);
  }

  get fermentationForm() {
    return this.recipeForm.get('fermentation') as FormArray;
  }

  addFermentation() {
    const fermentation = this.fb.group({
      count: [],
      name: [],
      time: []
    });

    this.fermentationForm.push(fermentation);
  }

  deleteFermentation(i) {
    this.fermentationForm.removeAt(i);
  }
}
