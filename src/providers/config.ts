import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ConfigProvider {
baseUrl:string;
  constructor(public http: Http) {
    this.baseUrl= 'http://cloud.basajans.com:8868/tripplannerdev/api'
  }

  
}
