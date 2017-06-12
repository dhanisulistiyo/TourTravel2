import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import {AuthService} from '../providers/auth-token-service'
import 'rxjs/add/operator/map';

/*
  Generated class for the UserandcompanyDetails provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserandcompanyDetails {

  constructor(public http: Http, public auth:AuthService) {
    console.log('Hello UserandcompanyDetails Provider');
  }

   getCompany() {
        var headers = new Headers();
        let token = this.auth.AuthToken;
        console.log(token);
        headers.append('Authorization', 'Bearer ' +token);
        var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/Companies/CompanyProfile'; 
        var response = this.http.get(url, {headers : headers}).map(res => res.json());        
        return response;
    }

      getUser() {
        var headers = new Headers();
        let token = this.auth.AuthToken;
        console.log(token);
        headers.append('Authorization', 'Bearer ' +token);
        var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/Account/UserInfo'; 
        var response = this.http.get(url, {headers : headers}).map(res => res.json());        
        return response;
    }



}
