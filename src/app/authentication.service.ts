import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _registerUrl = "http://localhost:3000/api/signup";
  private _loginUrl = "http://localhost:3000/api/login"; // backend api returns logged in user details as a response 

  constructor(private http: HttpClient, private _router: Router) { }

  registerEmployee(employee){
    return this.http.post<any>(this._registerUrl, employee);
  }

  loginEmployee(employee){
    return this.http.post<any>(this._loginUrl, employee); //this service makes an http call to the backend api coded in api.js
  }
  loggedIn(){
    return !!localStorage.getItem('token')
  }
  logoutEmployee(){
    localStorage.removeItem('token')
    // localStorage.clear()
    this._router.navigate(['/home']);
  }
  getToken(){
    return localStorage.getItem('token')
  }
  
}

