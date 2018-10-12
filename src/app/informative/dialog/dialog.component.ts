import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../shared/data.service';
import { Options } from '../shared/Options.model';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  filterForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<DialogComponent>,
              private dataService: DataService,
              private datePipe: DatePipe) {

      this.filterForm = this.createFormGroup();
    }

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  createFormGroup() {
    return new FormGroup({
        actives: new FormControl(true),
        fromDate: new FormControl(),
        endDate: new FormControl()
      })
  }

  saveFilters(){

    let options: Options = {
      isActives: this.filterForm.value['actives'],
      startDate: this.datePipe.transform(this.filterForm.value['fromDate']),
      endDate: this.datePipe.transform(this.filterForm.value['endDate']),
    };
    this.dataService.updateOptions(options);
    
    this.filterForm = this.createFormGroup();
    this.onNoClick();
  }
}
