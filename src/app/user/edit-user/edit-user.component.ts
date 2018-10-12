import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';
import { ToastService } from '../../shared/toast.service';
import { ResponseModel, State } from '../../shared/ResponseModel';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  private  userName: string;
  private  isAdmin: string;
  private isActive: string;
  private users: any;

  toppings = new FormControl();
  toppingList: Array<string>;


  constructor(private userService: UserService, private toastService: ToastService) {
    this.resetFields();
    this.toppingList = new Array<string>();
   }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe(
      (data: ResponseModel) => {
        if(data.State == State.Success){
          this.users = data.Data;
          data.Data.forEach(user => {
            this.toppingList.push(user['UserName']);
          });
          return;
        }
        console.log(data.Error);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editUser(){
    let user: User = {
      UserName: this.userName,
      IsActive: 0,
      UserRoleId: 2,
      Password: ''
    };
    if(this.isAdmin.toString() === "true"){
      user.UserRoleId = 1;
    }
    if(this.isActive.toString() === "true"){
      user.IsActive = 1;
    }
    if(this.userName.length === 0){
      this.toastService.Info('.שם משתמש לא יכול להיות ריק', '.הזן שם משתמש');
      return;
    }
    this.userService.editUser(user).subscribe(
      (data) => {
        this.toastService.Success('.הפעולה בוצעה בהצלחה', '.המשתמש עודכן');
        this.resetFields();
      },
      (error) => {
        if(error['status'] === 404){
          this.toastService.Error('.שגיאה', '.המשתמש אינו קיים');
          this.resetFields();
          return;
        }
        this.toastService.Error('.שגיאה', error['status'].toString() + ' ' + error['statusText'].toString());
        this.resetFields();
      }
    );
  }

  removeUserName(userName: string){
    this.toppingList.forEach((username, index) => {
      if(username === userName){
        this.toppingList.splice(index, 1);
        return;
      }
    });
  }
  
  deleteUser(){
    this.userService.deleteUser(this.userName).subscribe(
      (data: ResponseModel) => {
        if(data.State == State.Success){
          this.toastService.Success('.המשתמש נמחק בהצלחה');
          this.removeUserName(this.userName);
          this.resetFields();
        }
        else if(data.State == State.NotFound){
          this.toastService.Error('.המשתמש אינו קיים במערכת');
          this.resetFields();
        }
        else{
          console.log(data);
        }
      },
      (error) => {
        this.toastService.Error(error['status'] + ' ' + error['statusText']);
        this.resetFields();
      }
    );
  }

  resetFields(){
    this.userName = "";
    this.isAdmin = "";
    this.isActive = "";
  }

  getOptionsSettings(){
    var setting = {
      tapToDismiss: false
      , timeOut: 0
      , extendedTimeOut: 0
      , allowHtml: true
      , preventDuplicates: true
      , preventOpenDuplicates: true
      , newestOnTop: true
      , closeButton: true
      , closeHtml: '<button class="btn" (click)="Yes()" style="background-color: grey; padding: 5px;">OK</button>'
    };
    return setting;
  }
}
