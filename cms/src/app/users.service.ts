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
      return this.http.get('users');
  }

     //Uses http.post() to post data 
addUser(Name: string, userDept: string, userEmail: string, userName: string, userPhone: string, userTitle: string) 
{
this.http.post('users',{ Name, userDept, userEmail, userName, userPhone, userTitle })
    .subscribe((responseData) => {
        console.log(responseData);
    }); 
}

updateUser(peopleId: string, Name: string, userDept: string, userEmail: string, userName: string, userPhone: string, userTitle: string) 
{
    //request path http://localhost:8000/assets/5xbd456xx 
    //user information will be send as HTTP body parameters 
   this.http.put("users" + 
   peopleId, { Name, userDept, userEmail, userName, userPhone, userTitle})
    .subscribe(() => {
        console.log('Updated: ' +  peopleId);
    });
}

 //Uses http.get() to request data based on user id 
 getUser(peopleId: string) {
  return this.http.get('users'+ peopleId);
}

deleteUser(peopleId: string) {
  this.http.delete("users" + peopleId)
      .subscribe(() => {
          console.log('Deleted: ' + peopleId);
      });
  location.reload();
}

}
