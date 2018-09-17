import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {}

  ngAfterViewInit(){
    
  }




  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
  UserManagment(){

  }


}
