import { Component, OnInit } from '@angular/core';
import { SimplerequestService } from '../simplerequest.service';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  homeRequest = []
  constructor(private _simpleRequestService:SimplerequestService) { }

  ngOnInit() {
    this._simpleRequestService.getHome().subscribe(
      res => this.homeRequest = res,
      err => console.log(err)
    )
  }

}
