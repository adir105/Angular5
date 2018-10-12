import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAdmin: boolean = false;
  addUserShow: boolean;
  showCustomersShow: boolean;
  editUserShow: boolean;
  userName: string;

  constructor(private router: Router, private userService: UserService) { 
    this.userName = localStorage.getItem('userName');
    this.setIsAdmin();
  }

  private setIsAdmin(){
    if(localStorage.getItem("UserRoleId:"+this.userName) === "1"){
      this.isAdmin = true;
    }
  }

  ngOnInit() {}

  AddUser(){
    this.router.navigate(['home/addUser']);
  }
  EditUser(){
    this.router.navigate(['home/editUser']);
  }

  ShowCustomers(){
    this.router.navigate(['home/customerManagment']);
  }

  Logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('UserRoleId:'+this.userName);
    this.router.navigate(['/login']);
  }
}
