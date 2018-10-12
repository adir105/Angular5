import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { User } from '../../shared/user.model';
import { ToastService } from '../../shared/toast.service';
import { ResponseModel, State } from '../../shared/ResponseModel';
import { Router } from '@angular/router';


@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  private addUserForm: FormGroup;
  private passwordsEqualsValid: boolean;
  private userNamePatternValid: boolean;

  constructor(private userService: UserService,
              private toastService: ToastService,
              private router: Router) { 
    this.addUserForm = this.createFormGroup();
  }

  ngOnInit() {
    this.passwordsEqualsValid = false;
    this.userNamePatternValid = false;
  }
  addUser(){
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
          UserRoleId: this.addUserForm.value['userData'].admin? 1 : 2,
          IsActive: 1
        };

        this.toastService.setSettings(this.getOptionsSettings());
        this.addUserDB(user);
      }
      else{
        this.userNamePatternValid = true;
        console.log('user name not valid.');
      }
    }
  }

  addUserDB(user: User){
    this.userService.addUser(user).subscribe(
      (data: ResponseModel)=> {
        if(data.State == State.Success){
        this.toastService.Success('Success!', '.המשתמש נוסף בהצלחה');
        this.addUserForm.reset();
        this.router.navigate(['/home']);
        }
        else if(data.State == State.Conflict){
          this.addUserForm.reset();
          this.toastService.Error('Error - 409 Conflict', '.משתמש זה כבר קיים במערכת');    
        }
        else{
          this.toastService.Error(data.Error, data.Data);    
          this.addUserForm.reset();
        }
      },

      (error)=> {
          this.addUserForm.reset();
          this.toastService.Error('Error', error);
        }
    );
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

  getOptionsSettings(){
    var settings = {
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-bottom-full-width",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
    return settings;
  }
  }

