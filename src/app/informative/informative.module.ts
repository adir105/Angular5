import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersInfoComponent } from './customers-info/customers-info.component';
import { InformativeService } from './shared/informative.service';
import { TableDataComponent } from './table-data/table-data.component';
import { LengthPipe } from './shared/length.pipe';
import { DataService } from './shared/data.service';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { informativeRoutes } from './routes';
import { MaterialModule } from '../material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FiltersComponent } from './filters/filters.component';
import { DialogComponent } from './dialog/dialog.component'
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(informativeRoutes),
    FormsModule, ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    CustomersInfoComponent,
    TableDataComponent,
    FiltersComponent
  ],
  declarations: [
    CustomersInfoComponent,
    TableDataComponent,
    LengthPipe,
    FiltersComponent,
    DialogComponent
  ],
  providers: [
    InformativeService,
    DataService,
    DatePipe,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
    ],
    entryComponents: [
      DialogComponent,
      FiltersComponent
    ]
})
export class InformativeModule { }
