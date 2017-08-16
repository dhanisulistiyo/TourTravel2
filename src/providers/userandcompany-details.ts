import { ConfigProvider } from './config';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../providers/auth-token-service'
import 'rxjs/add/operator/map';

/*
  Generated class for the UserandcompanyDetails provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserandcompanyDetails {
  userinfo;
  companyInfo;
  constructor(public http: Http, public auth: AuthService, public conf: ConfigProvider) {
    console.log('Hello UserandcompanyDetails Provider');
  }
  getDetails(){
     this.getUser().subscribe(data => {
              this.userinfo = data;
            }, err => {
              console.log(err);
            },
              () => console.log('Get Transaction Complete')
            );


            this.getCompany().subscribe(data => {
              this.companyInfo = data;
            }, err => {
              console.log(err);

            },
              () => console.log('Get Transaction Complete')
            );
  }


  getCompany() {
    var headers = new Headers();
    let token = this.auth.AuthToken;
    headers.append('Authorization', 'Bearer ' + token);
    var url = this.conf.baseUrl+'/Companies/CompanyProfile';
    var response = this.http.get(url, { headers: headers }).map(res => res.json());
    return response;
  }

  getUser() {
    var headers = new Headers();
    let token = this.auth.AuthToken;
    headers.append('Authorization', 'Bearer ' + token);
    var url = this.conf.baseUrl+'/Account/UserInfo';
    var response = this.http.get(url, { headers: headers }).map(res => res.json());
    return response;
  }

  changePassword(c) {
    let token = this.auth.AuthToken;
    let change = {
      "OldPassword": c.old_password,
      "NewPassword": c.new_password,
      "ConfirmPassword": c.con_password
    }
    var headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({ headers: headers });

    return new Promise(resolve => {
      this.http.post(this.conf.baseUrl+'/Account/ChangePassword', change, options).map(res => res
      ).subscribe(res => {
        if (res.status < 200 || res.status >= 300) {
          console.log(res);
          resolve(false);
        } else {
          console.log(res);
          resolve(true);
        }
      }, (error => {
        console.log(error)
        resolve(false);
      })

        );
    });
  }



}
