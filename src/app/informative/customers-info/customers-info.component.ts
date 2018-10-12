import { Component, OnInit, ElementRef, HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { InformativeService } from '../shared/informative.service';
import { GiftSeries } from '../shared/GiftSeries.model';
import { Club } from '../shared/Club.model';
import { GiftCard } from '../shared/GiftCard';
import { DataService } from '../shared/data.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Options } from '../shared/Options.model';
import { ResponseModel, State } from '../../shared/ResponseModel';
import { DatePipe } from '@angular/common';
import {FormControl} from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { createWiresService } from 'selenium-webdriver/firefox';




@Component({
  selector: 'customers-info',
  templateUrl: './customers-info.component.html',
  styleUrls: ['./customers-info.component.css']
})
export class CustomersInfoComponent implements OnInit {


  giftSeries: GiftSeries;
  clubs: Club;
  groupSelected: any;
  cardName: string;
  cardId: number;
  groupName: string;
  groupsNames: string[];
  disableCardBtn: boolean;
  disableShowBtn: boolean;
  disableTableData: boolean;
  dataParent: any;
  numPages: number[] = [5];
  currentCards: any;

  breadcrumbTitle: string = "";

  constructor(private informativeService: InformativeService, private dataService: DataService,
     private router: Router, private activetedRoute: ActivatedRoute, private datePipe: DatePipe,
     public dialog: MatDialog) {

        this.resetFields();
   }

   resetFields(){
    this.cardName = "בחר כרטיס";
    this.cardId = -1;
    this.groupName = "בחר קבוצה";
    this.groupsNames = ['Gift Card', 'Club'];
    this.disableCardBtn = true;
    this.disableTableData = true;
    // //Todo: change to true;
    this.disableShowBtn = true;
   }

  ngOnInit() {
     this.getGift_Club_Series();
  }

  show(){
    this.getData();
  }

  getData(){
    this.informativeService.getData(this.groupName, this.cardId).subscribe(
      (data: ResponseModel) => {
        if(data.State === State.Success){
          this.dataParent = data.Data;
          this.dataService.updateData(this.dataParent);
          this.router.navigate(['home/customerManagment/tableData', this.cardId.toString()]);
          return;
        }
        else if(data.State === State.NotFound){
          this.dataService.updateData(null);
          return;
        }
        console.log(data.Error);
      },
      (error) => {
        console.log(error);
      }
    );
    // this.disableShowBtn = true;
  }

  clickDropDown1(groupName){
      this.cardName = 'בחר כרטיס';
      this.groupName = groupName;
      this.currentCards = 
      this.disableCardBtn = false;
      this.disableShowBtn = true;
      switch(groupName){
        case 'Club':
          this.currentCards = this.clubs;
        break;
        case 'Gift Card':
          this.currentCards = this.giftSeries;
        break;
      }
  }

  clickDropDown2(card){
    //iSeriesId/iClubId    
    this.cardId = card[Object.keys(card)[0]];
    this.cardName = card.sDescription;
    this.disableShowBtn = false;
    this.breadcrumbTitle = this.cardName;
  }


  getGift_Club_Series(){
    this.informativeService.getAllCards().subscribe(
      (data: ResponseModel) => {
        if(data.State == 1){
          this.giftSeries = <GiftSeries> data.Data[0];
          this.clubs = <Club>data.Data[1];
          return;
        }
       console.log(data.Error);
      },
      (error) => {
       console.log(error);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('afterCLosed.');
    });
  }
}
