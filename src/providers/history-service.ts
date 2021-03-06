import { ConfigProvider } from './config';
import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthService} from '../providers/auth-token-service';
import {IteneraryService} from '../providers/itenerary-service';

/*
  Generated class for the HistoryService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HistoryService {

  constructor(public http: Http, public auth:AuthService, public ite:IteneraryService, public conf:ConfigProvider) {
    console.log('Hello HistoryService Provider');
  }


   getHistoryTransactions(){
        var headers = new Headers();
        let token = this.auth.AuthToken;
        headers.append('Authorization', 'Bearer ' +token);
        var url = this.conf.baseUrl+'/TourTransactions/TransactionHistoryDetailed?status=Booking_created'; 
        var response = this.http.get(url, {headers : headers}).map(res => res.json());        
        return response;
    }

     getTransactionsSumarry(id){
        var headers = new Headers();
        let token = this.auth.AuthToken;
        headers.append('Authorization', 'Bearer ' +token);
        var url = this.conf.baseUrl+'/TourTransactions/TransactionSummary?id='+id; 
        var response = this.http.get(url, {headers : headers}).map(res => res.json());        
        return response;
    }



    getHistoryTransactionsConfirm(){
        var headers = new Headers();
        let token = this.auth.AuthToken;
        headers.append('Authorization', 'Bearer ' +token);
        var url = this.conf.baseUrl+'/TourTransactions/TransactionHistoryDetailed?status=Done'; 
        var response = this.http.get(url, {headers : headers}).map(res => res.json());        
        return response;
    }

    getHistoryTransactionsCancel(){
        var headers = new Headers();
        let token = this.auth.AuthToken;
        headers.append('Authorization', 'Bearer ' +token);
        var url = this.conf.baseUrl+'/TourTransactions/TransactionHistoryDetailed?status=Booking_cancelled'; 
        var response = this.http.get(url, {headers : headers}).map(res => res.json());        
        return response;
    }

 generateInvoice(id){
    let token = this.auth.AuthToken;
    var headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({ headers: headers });
    var url = this.conf.baseUrl+'/TourTransactions/GeneratePDFTransaction?id='+id;
    var response = this.http.get(url, options).map(res => res.json());
    return response;

  }

}
