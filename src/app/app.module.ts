import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { appRoutes } from './routes';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';

import {MaterialModule} from '../app/material';
import { ToastService } from './shared/toast.service';
import { InformativeModule } from './informative/informative.module';
import { UserModule } from './user/user.module';




@NgModule({
  declarations: [
    AppComponent,
  ],  
  imports: [
    BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    InformativeModule,
    UserModule
  ],
  exports: [
  ],
  providers: [
    AuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    },
    ToastService
  ],
  bootstrap: [AppComponent]
})  
export class AppModule { }
