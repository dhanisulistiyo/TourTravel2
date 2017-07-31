import { ConfigProvider } from './config';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {AuthService} from '../providers/auth-token-service'
import 'rxjs/add/operator/map';

/*
  Generated class for the LocationService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocationService {

  constructor(public http: Http, public auth:AuthService, public conf: ConfigProvider) {
    console.log('Hello LocationService Provider');
    this.http = http;
  }


  searchLocation(locationName) {
        var headers = new Headers();
        let token = this.auth.AuthToken;
        console.log(token);
        headers.append('Authorization', 'Bearer ' +token);
        var url = this.conf.baseUrl+'/cities?id='+encodeURI(locationName); 
        var response = this.http.get(url, {headers : headers}).map(res => res.json());        
        return response;
    }

    searchAllLocation() {
        var headers = new Headers();
        let token = this.auth.AuthToken;
        console.log(token);
        headers.append('Authorization', 'Bearer ' +token);
        var url = this.conf.baseUrl+'/cities/CityInCountry'; 
        var response = this.http.get(url, {headers : headers}).map(res => res.json());        
        return response;
    }

     searchCountry() {
        var url = this.conf.baseUrl+'/countries'; 
        var response = this.http.get(url).map(res => res.json());        
        return response;
    }



}
