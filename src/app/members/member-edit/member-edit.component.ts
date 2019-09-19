import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  editForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.editForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null),
        description: new FormControl(null)
      })
    });
  }

  onSubmit() {
    console.log('Zapisano!');
  }
}
