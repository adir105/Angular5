import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserComponent } from './user.component';
import { UserService } from '../shared/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { userRoutes } from './routes';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material';




@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(userRoutes),
    SharedModule,
    MaterialModule
  ],
  exports:[
    SignUpComponent,
    UserComponent,
    SignInComponent,
    AddUserComponent,
    EditUserComponent,
  ],
  declarations: [
    SignUpComponent,
    UserComponent,
    SignInComponent,
    AddUserComponent,
    EditUserComponent
  ],
  providers:[
    UserService
  ]
})
export class UserModule { }
