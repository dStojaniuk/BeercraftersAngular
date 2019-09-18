import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members: User[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getMembers();
  }

  private getMembers() {
    this.http.get('https://localhost:5001/users').subscribe((response: User[]) => {
      this.members = response;
    }, error => {
      console.log(error);
    });
  }
}
