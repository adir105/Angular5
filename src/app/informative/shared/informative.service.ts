import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Options } from './Options.model';

@Injectable()
export class InformativeService {

  private readonly rootUrl = 'https://localhost:44364/';

  constructor(private http: HttpClient) { }

  getAllCards(){
  var reqHeader = new HttpHeaders({'Authorization': 'bearer ' + localStorage.getItem('userToken')});
    return this.http.get(this.rootUrl + 'api/GroupCard/GetAllCards', { headers: reqHeader });
  }

  getData(groupName: string, cardId: number){
    var reqHeader = new HttpHeaders({'Authorization': 'bearer ' + localStorage.getItem('userToken')});
    return this.http.get(this.rootUrl + 'api/GroupCard/GetData?groupName='+groupName+
                                                              '&cardId='+cardId, { headers: reqHeader });
  }
}
