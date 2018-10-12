import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { RouterModule } from '@angular/router'
import { appRoutes } from '../routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),

  ],
  declarations: [
    HomeComponent,
  ],
  exports: [
    HomeComponent,
  ],
})
export class SharedModule { }
