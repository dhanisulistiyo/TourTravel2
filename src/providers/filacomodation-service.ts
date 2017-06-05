import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from '../providers/auth-token-service'
import { IteneraryService } from '../providers/itenerary-service'
import 'rxjs/add/operator/map';

/*
  Generated class for the FilacomodationService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FilacomodationService {

    constructor(public http: Http, public auth: AuthService, public ite: IteneraryService) { 
    }



    listAcomodationRatings() {
        var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/AccommodationRatings';
        var response = this.http.get(url).map(res => res.json());
        return response;
    }


    listAcomodationAreas() {
        var headers = new Headers();
        let des = this.ite.getDestination();
        let token = this.auth.AuthToken;
        console.log(token);
        headers.append('Authorization', 'Bearer ' + token);
        var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/Areas/ByCity?cityId=' + des;
        var response = this.http.get(url, { headers: headers }).map(res => res.json());
        return response;
    }

    getAcomodationAreas(des) {
        var headers = new Headers();
        let token = this.auth.AuthToken;
        console.log(token);
        headers.append('Authorization', 'Bearer ' + token);
        var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/Areas/ByCity?cityId=' + des;
        var response = this.http.get(url, { headers: headers }).map(res => res.json());
        return response;
    }


    listAcomodationLocations() {
        var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/AccommodationLocations';
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    listAcomodationTypes() {
        var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/AccommodationTypes';
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    listAcomodationFacilities() {
        var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/AccommodationFacilities';
        var response = this.http.get(url).map(res => res.json());
        return response;
    }



}
