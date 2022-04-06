import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../../users.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  @Input() Name!: string;
  @Input() userTitle!: string;
  @Input() userEmail!: string;
  @Input() userPhone!: string;
  @Input() userName!: string;
  @Input() userDept!: string;

  public mode = 'Add'; //default mode
  private id: any; //asset ID
  private user: any;

  constructor(private _myService: UsersService, 
    private router: Router, 
    public route: ActivatedRoute) { }



  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('_id')) {
        this.mode = 'Edit'; /*request had a parameter _id */
        this.id = paramMap.get('_id');

        //request asset info based on the id
      this._myService.getUser(this.id).subscribe(
        data => {
          //read data and assign to private variable asset
          this.user = data;
          //populate the name, model, desc, serial, cost, qty
          //notice that this is done through the two-way bindings
          this.Name = this.user.Name;
          this.userDept = this.user.userDept;
          this.userEmail = this.user.userEmail;
          this.userName = this.user.userName;
          this.userPhone = this.user.userPhone;
          this.userTitle = this.user.userTitle;
        },
        err => console.error(err),
        () => console.log('finished loading')
      );
    }
    else {
      this.mode = 'Add';
      this.id = null;
    }
  });

}
  onSubmit() {
    console.log("You submitted: " + this.Name + " " + this.userDept + " " + this.userEmail + " " + this.userName
      + " " + this.userPhone + " " + this.userTitle);

    if (this.mode == 'Add')
      this._myService.addUser(this.Name ,this.userDept, this.userEmail, this.userName, this.userPhone,
      this.userTitle);

    if (this.mode == 'Edit')
      this._myService.updateUser(this.id, this.Name ,this.userDept, this.userEmail, this.userName, this.userPhone,
        this.userTitle);
    this.router.navigate(['/list-users']);
  } 
}

