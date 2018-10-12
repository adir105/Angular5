import { Component, OnInit, OnChanges, SimpleChanges, Input, Inject } from '@angular/core';
import { Options } from '../shared/Options.model';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';



@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  constructor(private datePipe: DatePipe, public dialog: MatDialog) { }
  
  ngOnInit() {
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }



}
