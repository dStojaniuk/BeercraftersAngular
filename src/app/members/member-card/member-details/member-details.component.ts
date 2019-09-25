import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  member: User;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.getUser(id);
  }

  private getUser(id: any) {
    this.http.get('https://localhost:5001/users/' + id + '/').subscribe((response: User) => {
      this.member = response;
    }, error => {
      console.log(error);
    });
  }
}
