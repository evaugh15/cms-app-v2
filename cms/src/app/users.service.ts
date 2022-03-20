import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//we know that response will be in JSON format
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class UsersService {

    constructor(private http:HttpClient) {}

     // Uses http.get() to load data 
     getUsers() {
      return this.http.get('http://localhost:8000/users');
  }

     //Uses http.post() to post data 
addUser(Name: string, userTitle: string, userEmail: string, userPhone: string, userName: string, userDept: string) 
{
this.http.post('http://localhost:8000/devices',{ Name, userTitle, userEmail, userPhone, userName, userDept })
    .subscribe((responseData) => {
        console.log(responseData);
    }); 
}

updateUser(capstoneId: string, Name: string, userTitle: string, userEmail: string, userPhone: string, userName: string, userDept: string) 
{
    //request path http://localhost:8000/assets/5xbd456xx 
    //asset information will be send as HTTP body parameters 
   this.http.put("http://localhost:8000/users/" + 
   capstoneId, { Name, userTitle, userEmail, userPhone, userName, userDept })
    .subscribe(() => {
        console.log('Updated: ' + capstoneId);
    });
}

 //Uses http.get() to request data based on student id 
 getUser(capstoneId: string) {
  return this.http.get('http://localhost:8000/users/'+ capstoneId);
}

deleteUser(capstoneId: string) {
  this.http.delete("http://localhost:8000/users/" + capstoneId)
      .subscribe(() => {
          console.log('Deleted: ' + capstoneId);
      });
  location.reload();
}

}
