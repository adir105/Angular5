import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { User } from '../../shared/user.model';
import { AlertsService } from 'angular-alert-module';
import { ToastService } from '../../shared/toast.service';


@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addUserForm: FormGroup;
  passwordsEqualsValid: boolean;
  userNamePatternValid: boolean;
  private isFormValid: boolean;

  constructor(private userService: UserService, private toastService: ToastService) { 
    this.addUserForm = this.createFormGroup();

  }

  ngOnInit() {
    this.isFormValid = false;
    this.passwordsEqualsValid = false;
    this.userNamePatternValid = false;
  }
  AddUser(isadmin){
    if(this.addUserForm.value['userData'].password1 !== this.addUserForm.value['userData'].password2){
        this.passwordsEqualsValid = true;
    }
    //passwords are equals.
    else{
      this.passwordsEqualsValid = false;
      if(this.addUserForm.valid){
        this.passwordsEqualsValid = false;
        this.userNamePatternValid = false;
        
        let user: User = {
          UserName: this.addUserForm.value['userData'].username,
          Password: this.addUserForm.value['userData'].password1,
          UserRoleId: 0,
          IsActive: 1
        };
        if(this.addUserForm.value['userData'].admin === true){
          user.UserRoleId = 1;
        }
        this.userService.addUser(user).subscribe(
          (data)=> {
            this.toastService.Success('Successfully', 'The user added.');
            this.addUserForm.reset();
          },

          (error)=> {
            if(error['status'] === 409){
              this.addUserForm.reset();
              this.toastService.Error('Error - 409', 'The Username is already exist.');    
            }
            else{
              this.addUserForm.reset();
              this.toastService.Error('Error', error.status);
            }
          }
        );
      }
      else{
        this.userNamePatternValid = true;
        console.log('user name not valid.');
      }
    }
  }
  
  checkValidation(){
    
  }

  createFormGroup() {
    return new FormGroup({
      userData: new FormGroup({
        username: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9]+$')]),
        password1: new FormControl('', [Validators.required]),
        password2: new FormControl('', [Validators.required]),
        admin: new FormControl('')
       }),
    });
  }

}
