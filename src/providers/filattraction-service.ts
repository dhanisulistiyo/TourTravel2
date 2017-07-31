import { ConfigProvider } from './config';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the FilattractionService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FilattractionService {

  constructor(public http: Http, public conf: ConfigProvider) {
    console.log('Hello FilattractionService Provider');
  }


   listAttractionType() {
        var url = this.conf.baseUrl+'/AttractionTypes'; 
        var response = this.http.get(url).map(res => res.json());        
        return response;
    }

}
