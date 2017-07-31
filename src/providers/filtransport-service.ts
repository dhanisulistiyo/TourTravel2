import { ConfigProvider } from './config';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the FiltransportService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FiltransportService {
  constructor(public http: Http, public conf: ConfigProvider) {
  }

   

   listTransportRatings() {
        var url = this.conf.baseUrl+'/transportationRatings'; 
        var response = this.http.get(url).map(res => res.json());        
        return response;
    }

     listSeatTypes() {
        var url = this.conf.baseUrl+'/transportationSeatTypes'; 
        var response = this.http.get(url).map(res => res.json());        
        return response;
    }

    listTransportTypes() {
        var url = this.conf.baseUrl+'/transportationTypes'; 
        var response = this.http.get(url).map(res => res.json());        
        return response;
    }
}
