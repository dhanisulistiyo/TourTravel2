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
  constructor(public http: Http) {
  }

   

   listTransportRatings() {
        var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/transportationRatings'; 
        var response = this.http.get(url).map(res => res.json());        
        return response;
    }

     listSeatTypes() {
        var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/transportationSeatTypes'; 
        var response = this.http.get(url).map(res => res.json());        
        return response;
    }

    listTransportTypes() {
        var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/transportationTypes'; 
        var response = this.http.get(url).map(res => res.json());        
        return response;
    }
}
