import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { filter } from 'rxjs/operators';
import { from } from 'rxjs/observable/from';
import { DataService } from '../shared/data.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { 
  Router,
  Event, 
  NavigationStart, RoutesRecognized,RouteConfigLoadStart, 
  RouteConfigLoadEnd, NavigationEnd, NavigationCancel, NavigationError} from '@angular/router'

  export interface User {
    name: string;
  }
  
@Component({
  selector: 'table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})

export class TableDataComponent implements OnInit {
  
  dataChild: any;
  headersTable: any;
  dataToShow: any;
  show: boolean = false;
  tableData: any;

  currentPage: number = 1;
  countInPage: number = 50;
  countPages: number;

  dropDownICardNumbers: Set<string>;
  iCardNumber: string;

  years: Array<string> = [];
  year: string;

  months: Array<number>;
  month: string;

  iCardNumberOrdCUstomerId: string;
  dtUpdateOrdtMembershipStart: string;

  currentData: any;

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  test1: any = "";

  constructor(private dataService: DataService) { 
      this.createDropDownYears();    
      this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }

    ngOnInit() {
      this.getData();    
    }

    setAutoCompleteSettings(){
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    }

    private _filter(value: string): string[] {  
      return Array.from(this.dropDownICardNumbers).filter(option => option.toString().includes(value));
    }
    
    getData(){
      this.dataService.searchData.subscribe(
        (data) => {
          if(data !== null && data.length > 0){
            this.dataChild = data;
            this.headersTable = Object.keys(data[0]);
            this.fillTable(this.dataChild);
            return;
          }
          this.show = false;
        },
        (error) => {
          console.log(error);
          this.show = false;
        }
      );
     }

     changeData(){
      let temp: any;
       //All - undefined.
       if(this.iCardNumber === this.year && this.month === this.iCardNumber){
        this.fillTable(this.dataChild);
       }
       //value, undefined,undefined.
       else if(this.iCardNumber !== undefined && this.year === undefined && this.month === undefined){
        const source = from (this.dataChild);
         temp = source.pipe(filter(record => record[this.iCardNumberOrdCUstomerId] === this.iCardNumber));
       }
       //value, value, undefined.
       else if(this.iCardNumber !== undefined && this.year !== undefined && this.month === undefined){
        const source = from (this.dataChild);
         temp = source.pipe(filter(record => new Date(record[this.dtUpdateOrdtMembershipStart]).getFullYear().toString() === this.year &&
                                            record[this.iCardNumberOrdCUstomerId] === this.iCardNumber));
       }
       //value, value, value.
       else if(this.iCardNumber !== undefined && this.year !== undefined && this.month !== undefined){
        const source = from (this.dataChild);
        temp = source.pipe(filter(record => new Date(record[this.dtUpdateOrdtMembershipStart]).getFullYear().toString() === this.year &&
                                           record[this.iCardNumberOrdCUstomerId] === this.iCardNumber &&
                                           (new Date(record[this.dtUpdateOrdtMembershipStart]).getMonth() + 1).toString() == this.month));
       }
       //value, undefined, value.
       else if(this.iCardNumber !== undefined && this.year === undefined && this.month !== undefined){
        const source = from (this.dataChild);
        temp = source.pipe(filter(record => record[this.iCardNumberOrdCUstomerId] === this.iCardNumber &&
                                          (new Date(record[this.dtUpdateOrdtMembershipStart]).getMonth() + 1).toString() == this.month));
       }
       //undefined, value, value.
       else if(this.iCardNumber === undefined && this.year !== undefined && this.month !== undefined){
        const source = from (this.dataChild);
        temp = source.pipe(filter(record => new Date(record[this.dtUpdateOrdtMembershipStart]).getFullYear().toString() === this.year &&
                                            (new Date(record[this.dtUpdateOrdtMembershipStart]).getMonth() + 1).toString() == this.month));
       }
       //undefined, undefined, value.
       else if(this.iCardNumber === undefined && this.year === undefined && this.month !== undefined){
        const source = from (this.dataChild);
        temp = source.pipe(filter(record => 
          (new Date(record[this.dtUpdateOrdtMembershipStart]).getMonth() + 1).toString() == this.month));
      }
      //undefined, value, undefined.
      else if(this.iCardNumber === undefined && this.year !== undefined && this.month === undefined){
        const source = from (this.dataChild);
        temp = source.pipe(filter(record => new Date(record[this.dtUpdateOrdtMembershipStart]).getFullYear().toString() === this.year));
      }
      this.subscribeData(temp);
      // this.setAutoCompleteSettings();
     }

     subscribeData(newData: any){
       let tempData: any = [];
       if(newData !== undefined){
        newData.subscribe(
          (data) => {
            tempData.push(data);
          },
          (error) => {
            console.log(error);
          }
        );
        this.fillTable(tempData);
       }
     }

     fillTable(data: any){
       this.currentData = data;
      this.tableData = data;
      if(data !== null && data.length > 0){
       this.show = true;
       this.dataToShow = data.slice(0, this.countInPage);
       this.resetNumPages(data);
       this.setiCardNumberOrdCustomerId();
       this.setIcardNumbers()
       this.setAutoCompleteSettings();
     }
     else{
       this.show = false;
       this.dataToShow = [];
       this.resetNumPages(data);
     }
    }

    setiCardNumberOrdCustomerId(){
      if(this.dataChild[0]['iCardNumber'] === undefined){
        this.iCardNumberOrdCUstomerId = "dCustomerId";
        this.dtUpdateOrdtMembershipStart = "dtMembershipStart";
      }
      else{
        this.iCardNumberOrdCUstomerId = "iCardNumber";
        this.dtUpdateOrdtMembershipStart = "dtUpdate";
      }
    }

    setIcardNumbers(){
      this.dropDownICardNumbers = new Set<string>();
      this.dataChild.map((item) => {
           this.dropDownICardNumbers.add(item[this.iCardNumberOrdCUstomerId]);
         });
    }

    goToPage(current){
      if(this.currentPage != current){
        this.currentPage = current;
      }
      this.dataToShow = this.currentData.slice(this.countInPage*(this.currentPage-1), this.countInPage*(this.currentPage));
    }

   resetNumPages(data: any){
     if(this.show){
       if(data.length < this.countInPage){
        this.countPages = 1;
        return;
       }
       this.countPages = ((data.length)/this.countInPage);
       
       if(this.countPages % 2 != 0){
        this.countPages += 1;
        this.countPages = Math.floor(this.countPages);
       }
     }
   }

   createDropDownYears(){
    var todayYear = new Date().getFullYear();
    for(let i = 0; i < 5; i++){
      this.years.push((todayYear - i).toString());
    }
  }

   resetDropDowns(){
    this.iCardNumber = "ALL";
    this.year = "All";
  }

  createArray(): any[] {    
    if(this.show){
      return Array(this.countPages);
    }
  }
  }


