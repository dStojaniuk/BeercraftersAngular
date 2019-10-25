import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from 'src/app/models/user';
import { UserWebService } from 'src/app/services/userWeb.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  member: User;

  constructor(private userWebService: UserWebService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userWebService.getUserById(this.route.snapshot.params.id).subscribe((response: User) => {
      this.member = response;
    }, error => {
      console.log(error);
    });
  }
}
