import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

constructor(private _authentication: AuthenticationService, private _router: Router) { }

  ngOnInit(): void {
  }

  login(){ //this is the login user/employee method
    if(!this.loginForm.valid){
      console.log('INVALID FORM!'); return;
    }
    else {
      this._authentication.loginEmployee(this.loginForm.value).subscribe(  // we pass the the data from the register from to the method
        res => {
          console.log(res)
          localStorage.setItem('token', res.token)
          this._router.navigate(['/home'])
        },
        err => console.log(err) // response is sent here
      );
    }
  
      // console.log(JSON.stringify(this.loginForm.value));
  }

}
