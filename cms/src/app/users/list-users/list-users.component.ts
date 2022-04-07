import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

 //declare variable to hold response and make it public to be accessible from components.html 
  public user: any;

  constructor(private _myService: UsersService) { }

  ngOnInit(){
    this.getUsers();
  }

  //method called OnInit
  getUsers() {
    console.log(this.user)
    this._myService.getUsers().subscribe(
       //read data and assign to public variable assets
      data => { this.user = data},
       
        err => console.error(err),
        () => console.log('finished loading')
    );
}

onDelete(userId: string) {
  this._myService.deleteUser(userId);
}
}
