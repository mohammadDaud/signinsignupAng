import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private logger:NGXLogger) {

  }
  ngOnInit(): void {
    this.logger.debug("home");
  }

  getData() { }

  getCount(status: any) {

  }
}
