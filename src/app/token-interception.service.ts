import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptionService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next){
    let authenticationService = this.injector.get(AuthenticationService)
    let tokenizedRed = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authenticationService.getToken()} `
      }
    })
    return next.handle(tokenizedRed);
  }
}
