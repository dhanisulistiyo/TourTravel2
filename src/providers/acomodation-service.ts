import { ConfigProvider } from './config';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from '../providers/auth-token-service'
import { IteneraryService } from '../providers/itenerary-service'
import 'rxjs/add/operator/map';


@Injectable()
export class AcomodationService {
    ratings;
    areas;
    locations;
    types;
    facilities;

    constructor(public http: Http, public auth: AuthService, public ite: IteneraryService, public conf: ConfigProvider) {
        this.ratings = "";
        this.areas = "";
        this.locations = "";
        this.types = "";
        this.facilities = "";
    }

    setRatings(rat) {
        window.localStorage.setItem('ratHot', rat);
        this.ratings = rat;
    }

    setAreas(ar) {
        window.localStorage.setItem('arHot', ar);
        this.areas = ar;
    }
    
    setLocations(loc) {
        window.localStorage.setItem('locHot', loc);
        this.locations = loc;
    }

    setTypes(ty) {
        window.localStorage.setItem('tyHot', ty);
        this.types = ty;
    }

    setFacilities(fac) {
        window.localStorage.setItem('facHot', fac);
        this.facilities = fac;
    }


   delStorFilHot(){
            localStorage.removeItem('ratHot');
            localStorage.removeItem('arHot');
            localStorage.removeItem('locHot');
            localStorage.removeItem('tyHot');
            localStorage.removeItem('facHot');
  }

    //List Acomodation by Destination
    searchListAcomodation() {
        var headers = new Headers();
        let des = this.ite.getDestination();
        let token = this.auth.AuthToken;
        console.log(token);
        headers.append('Authorization', 'Bearer ' + token);
        var url = this.conf.baseUrl+'/AccommodationProfiles/ByCity?city=' + des;
        var response = this.http.get(url, { headers: headers }).map(res => res.json());
        return response;
    }
    //List Acomodation by Full Filter
    searchListAcomodationFilter() {
        var headers = new Headers();
        let des = this.ite.getDestination();
        let rat = window.localStorage.getItem('ratHot');
        let ar = window.localStorage.getItem('arHot');
        let loc = window.localStorage.getItem('locHot');
        let ty = window.localStorage.getItem('tyHot');
        let fac = window.localStorage.getItem('facHot');

        if(rat == null) rat=this.ratings;
        if(ar == null) ar=this.areas;
        if(loc == null) loc=this.locations;
        if(ty == null) ty=this.types;
        if(fac == null) fac=this.facilities;

        let token = this.auth.AuthToken;
        console.log(token);
        headers.append('Authorization', 'Bearer ' + token);
        var url = this.conf.baseUrl+'/AccommodationProfiles/Filter?cityId=' + des + '&ratingId=' + rat + '&areaId=' + ar + '&locationId=' + loc + '&typeId=' + ty + '&facilityId=' + fac+'&promoOnly=False';
        var response = this.http.get(url, { headers: headers }).map(res => res.json());
        return response;
    }


    getListAcomodationFilter(des) {
        var headers = new Headers();
        let rat = window.localStorage.getItem('ratHot');
        let ar = window.localStorage.getItem('arHot');
        let loc = window.localStorage.getItem('locHot');
        let ty = window.localStorage.getItem('tyHot');
        let fac = window.localStorage.getItem('facHot');

        if(rat == null) rat=this.ratings;
        if(ar == null) ar=this.areas;
        if(loc == null) loc=this.locations;
        if(ty == null) ty=this.types;
        if(fac == null) fac=this.facilities;

        let token = this.auth.AuthToken;
        console.log(token);
        headers.append('Authorization', 'Bearer ' + token);
        var url = this.conf.baseUrl+'/AccommodationProfiles/Filter?cityId=' + des + '&ratingId=' + rat + '&areaId=' + ar + '&locationId=' + loc + '&typeId=' + ty + '&facilityId=' + fac+'&promoOnly=False';
        var response = this.http.get(url, { headers: headers }).map(res => res.json());
        return response;
    }
    //Item Acomodation
    searchListItemAcomodation() {
        var headers = new Headers();
        let token = this.auth.AuthToken;
        let id = this.ite.getAcomodation();
        console.log(token);
        headers.append('Authorization', 'Bearer ' + token);
        var url = this.conf.baseUrl+'/AccommodationItems/byprofile?profileid=' + id.hot.Id;
        var response = this.http.get(url, { headers: headers }).map(res => res.json());
        return response;
    }

     getListItemAcomodation(id) {
        var headers = new Headers();
        let token = this.auth.AuthToken;
        console.log(token);
        headers.append('Authorization', 'Bearer ' + token);
        var url = this.conf.baseUrl+'/AccommodationItems/byprofile?profileid=' + id;
        var response = this.http.get(url, { headers: headers }).map(res => res.json());
        return response;
    }
}
