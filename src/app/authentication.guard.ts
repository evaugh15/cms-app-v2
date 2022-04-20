import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  
  constructor(private _authenticationService: AuthenticationService, private _router: Router){}

  canActivate(): boolean {
    if(this._authenticationService.loggedIn()){ //if a token is present or logged in
      return true
    } else {
      this._router.navigate(['/login']) //if a token is not present or the user is not logged in
      return false
    }
  }
  
}