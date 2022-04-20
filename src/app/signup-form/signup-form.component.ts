import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, [ Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConf: new FormControl(null, [Validators.required])
  });

  // registerForm:any = {};

  constructor(private _authentication: AuthenticationService, private _router: Router) { }

  ngOnInit(): void {
  }

  register() {
    if(!this.registerForm.valid || (this.registerForm.value.password != this.registerForm.value.passwordConf)){ //this.registerForm.controls.password.value != this.registerForm.controls.passwordConf.value
      console.log('INVALID FORM !'); return;
    } else {
      this._authentication.registerEmployee(this.registerForm.value).subscribe( 
        res => {
          console.log(res)
          localStorage.setItem('token', res.token)
          this._router.navigate(['/home'])
        },
        err => console.log(err)
      );
    }
    
    // console.log(JSON.stringify(this.registerForm.value));
  }

}