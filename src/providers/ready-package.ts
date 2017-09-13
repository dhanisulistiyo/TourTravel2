import { ConfigProvider } from './config';
import { AuthService } from './auth-token-service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ReadyPackageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ReadyPackageProvider {
  destination
  constructor(public http: Http, public auth:AuthService, public config:ConfigProvider,) { 
    console.log('Hello ReadyPackageProvider Provider');
    this.http = http;
  }

  public setDestination(des){
    this.destination = des;
  }

  showReadyPackage() {
    var headers = new Headers();    
    let token = this.auth.AuthToken;
    headers.append('Authorization', 'Bearer ' + token);
    var url = this.config.baseUrl+'/BookingTemplates/GetTemplates/FixedPackage/All'
    var response = this.http.get(url, {headers:headers}).map(res => res.json());
    return response;
  }

  showReadyPackagebyFilter() {
    var headers = new Headers();
    let des = this.destination.Id  
    let type = 'Honeymoon';
    let token = this.auth.AuthToken;
    headers.append('Authorization', 'Bearer ' + token);
    var url = this.config.baseUrl+'/BookingTemplates/GetTemplates/ReadyPackage?desiredDays&cityId='+des+'&tourType='+type+'&accommodationType&AccommodationRating&AccommodationLocation&StartingDate'
    var response = this.http.get(url, {headers:headers}).map(res => res.json());
    return response;
  }

  detailsPackage(id){
    var headers = new Headers();
    let token = this.auth.AuthToken;
    headers.append('Authorization', 'Bearer ' +token);
    var url = this.config.baseUrl+'/BookingTemplates/GetTemplates/Ready/'+id;
    var response = this.http.get(url, {headers:headers}).map(res => res.json());
    return response;
  }
}
