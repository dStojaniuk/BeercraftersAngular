import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { UserWebService } from '../services/userWeb.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members: User[];

  constructor(private userWebService: UserWebService, private http: HttpClient) { }

  ngOnInit() {
    this.userWebService.getUsers().subscribe((response: User[]) => {
      this.members = response;
    }, error => {
      console.log(error);
    });
  }
}
