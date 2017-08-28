import { AuthService } from './auth-token-service';
import { ConfigProvider } from './config';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MovementServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MovementServiceProvider {

  constructor(public http: Http, public auth:AuthService, public config:ConfigProvider) {
    console.log('Hello Movement Service Provider');
    console.log('Hello MovementServiceProvider Provider');
  }

  showMovement(){
    var headers = new Headers();
    let token = this.auth.AuthToken;
    headers.append('Authorization', 'Bearer ' + token);
    var url = this.config.baseUrl+'/TourTransactions/Movement?origin=The Bidadari Luxury Villa Canggu&destination=Bali White Water Rafting&mode=DRIVING'
    var response =this.http.get(url, {headers:headers}).map(res => res.json());
    return response;
  }

}
