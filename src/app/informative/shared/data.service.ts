import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Options } from './Options.model';

@Injectable()
export class DataService {

  //data for table.
  private localData = new BehaviorSubject<any>(null);
  searchData = this.localData.asObservable(); 

  //options of filters.
  private localOptions = new BehaviorSubject<Options>(null);
  optionssData = this.localOptions.asObservable(); 

  
  constructor() { }

  updateData(data : any ){
       this.localData.next(data);
  }

  updateOptions(data : Options ){
    this.localOptions.next(data);
}
}
