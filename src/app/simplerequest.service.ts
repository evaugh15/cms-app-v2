import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SimplerequestService {
  
  private homeRequestUrl = "http://localhost:3000/api/home";
  private assetsRequestUrl = "http://localhost:3000/api/listassets";
  private usersRequest1Url = "http://localhost:3000/api/list-users";

  constructor(private http: HttpClient) { }

  getHome(){
    return this.http.get<any>(this.homeRequestUrl)
  }
  getAssets(){
    return this.http.get<any>(this.assetsRequestUrl)
  }
  getUsers(){
    return this.http.get<any>(this.usersRequest1Url)
  }
}
