import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from './user.model';

@Injectable()
export class UserService {
  private readonly rootUrl = 'https://localhost:44364';
  
  constructor(private http: HttpClient) { }

  // registerUser(user: User) {
  //   const body: User = {
  //     UserName: user.UserName,
  //     Password: user.Password,
  //     // Email: user.Email,
  //     // FirstName: user.FirstName,
  //     // LastName: user.LastName
  //   }
  //   var reqHeader = new HttpHeaders({'No-Auth':'True'});
  //   return this.http.post(this.rootUrl + '/api/User/Register', body,{headers : reqHeader});
  // }

  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True', 'Access-Control-Allow-Origin': '*' });
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }

  addUser(user: User){
    var reqHeader = new HttpHeaders({'Authorization': 'bearer ' + localStorage.getItem('userToken')});
    return this.http.post(this.rootUrl + '/api/user/Add', user, { headers: reqHeader });
  }

  editUser(user: User){
    var reqHeader = new HttpHeaders({'Authorization': 'bearer ' + localStorage.getItem('userToken')});
    return this.http.post(this.rootUrl + '/api/user/Update', user, { headers: reqHeader });
  }

  deleteUser(userName: string){
    var reqHeader = new HttpHeaders({'Authorization': 'bearer ' + localStorage.getItem('userToken')});
    return this.http.post(this.rootUrl + '/api/user/Delete?userName='+userName, { headers: reqHeader });
  }

  getUsers(){
    var reqHeader = new HttpHeaders({'Authorization': 'bearer ' + localStorage.getItem('userToken')});
    return this.http.get(this.rootUrl + '/api/user/GetUsers', { headers: reqHeader });
  }
}
