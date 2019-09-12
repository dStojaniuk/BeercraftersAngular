import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css']
})
export class ValuesComponent implements OnInit {
  values: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();
  }

  private getValues() {
    this.http.get('https://localhost:5001/users').subscribe(response => {
      this.values = response;
    }, error => {
      console.log(error);
    });
  }
}
