import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service';
import { SimplerequestService } from '../../simplerequest.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

 //declare variable to hold response and make it public to be accessible from components.html 
  public users: any;
  
  usersRequest = [];
  constructor(private _myService: UsersService, private _simpleRequestService:SimplerequestService, private _router: Router) { }

  ngOnInit(){
    this.getUsers();

    this._simpleRequestService.getUsers().subscribe(
      res => this.usersRequest = res,
      err => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401) {
            this._router.navigate(['/login'])
          }
        }
      }
    )
  }

  //method called OnInit
  getUsers() {
    console.log(this.users)
    this._myService.getUsers().subscribe(
       //read data and assign to public variable assets
      data => { this.users = data},
       
        err => console.error(err),
        () => console.log('finished loading')
    );
}

onDelete(userId: string) {
  this._myService.deleteUser(userId);
}
}
