import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from '../providers/auth-token-service'
import { IteneraryService } from '../providers/itenerary-service'
import { DailyService } from '../providers/daily-service'
import 'rxjs/add/operator/map';

@Injectable()
export class TransportService {
    ratings;
    types;
    seats;

    constructor(public http: Http, public auth: AuthService, public ite: IteneraryService, public ds: DailyService) {
    }

    public setRatings(rat) {
        console.log(rat)
        window.localStorage.setItem('ratTrans', rat);
        this.ratings = rat;
    }

    public setTypes(ty) {
        window.localStorage.setItem('tyTrans', ty);
        this.types = ty;
    }
    public setSeats(se) {
        window.localStorage.setItem('seTrans', se);
        this.seats = se;
    }

  delStorFilTra(){
            localStorage.removeItem('ratTrans');
            localStorage.removeItem('seTrans');
            localStorage.removeItem('tyTrans');
  }

    listTransportFilter() {
        var headers = new Headers();
        let token = this.auth.AuthToken;
        let des = this.ite.getDestination();
        let rat = window.localStorage.getItem('ratTrans');
        let se = window.localStorage.getItem('seTrans');
        let ty = window.localStorage.getItem('tyTrans');

        if (rat == null) { rat = ''; }
        if (se == null) { se = ''; }
        if (ty == null) { ty = ''; }

        headers.append('Authorization', 'Bearer ' + token);
        var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/TransportationUnits/AirportService?CityId=' + des + '&RatingId=' + rat + '&seatTypeId=' + se + '&typeId=' + ty;
        var response = this.http.get(url, { headers: headers }).map(res => res.json());
        return response;
    }

     listTransportAirport() {
        var headers = new Headers();
        let token = this.auth.AuthToken;
        let des = this.ds.transairport[this.ds.getID()].location.Id;
        let ser = this.ds.transairport[this.ds.getID()].transportservice;
        let rat = window.localStorage.getItem('ratTrans');
        let se = window.localStorage.getItem('seTrans');
        let ty = window.localStorage.getItem('tyTrans');

        if (rat == null) { rat = ''; }
        if (se == null) { se = ''; }
        if (ty == null) { ty = ''; }

        headers.append('Authorization', 'Bearer ' + token);
        var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/TransportationUnits/AirportService?CityId=' + des + '&RatingId=' + rat + '&seatTypeId=' + se + '&typeId=' + ty + '&servicetype=' + ser;
        var response = this.http.get(url, { headers: headers }).map(res => res.json());
        return response;
    }

    listTransportFilterDaily(des) {
        var headers = new Headers();
        let token = this.auth.AuthToken;
        let rat = window.localStorage.getItem('ratTrans');
        let se = window.localStorage.getItem('seTrans');
        let ty = window.localStorage.getItem('tyTrans');

        if (rat == null) { rat = ''; }
        if (se == null) { se = ''; }
        if (ty == null) { ty = ''; }

        headers.append('Authorization', 'Bearer ' + token);
        var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/TransportationUnits/TransportationService?CityId=' + des + '&RatingId=' + rat + '&seatTypeId=' + se + '&typeId=' + ty;
        var response = this.http.get(url, { headers: headers }).map(res => res.json());
        return response;
    }

    listTransportDaily(from, to) {

        var headers = new Headers();
        let token = this.auth.AuthToken;
        console.log(from)
        console.log(to)
        let fr = from.Region.Id;
        let fc = from.Id ;
        let tr = to.Region.Id ;
        let tc = to.Id;
        let rat = window.localStorage.getItem('ratTrans');
        let se = window.localStorage.getItem('seTrans');
        let ty = window.localStorage.getItem('tyTrans');

        if (rat == null) { rat = ''; }
        if (se == null) { se = ''; }
        if (ty == null) { ty = ''; }

        headers.append('Authorization', 'Bearer ' + token);
        var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/TransportationUnits/TransportationService?fromRegion='+fr+'&fromCity='+fc+'&toRegion='+tr+'&toCity='+tc+'&RatingId=' + rat + '&seatTypeId=' + se + '&typeId=' + ty;
        //var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/TransportationUnits/TransportationService?fromLocation='+from+'&toLocation='+to+'&RatingId=' + rat + '&seatTypeId=' + se + '&typeId=' + ty;
        var response = this.http.get(url, { headers: headers }).map(res => res.json());
        return response;
    }

    listTransport() {
        var headers = new Headers();
        let token = this.auth.AuthToken;
        headers.append('Authorization', 'Bearer ' + token);
        var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/TransportationUnits';
        var response = this.http.get(url, { headers: headers }).map(res => res.json());
        return response;
    }

    listTransportbyCity() {
        var headers = new Headers();
        let token = this.auth.AuthToken;
        let des = this.ite.getDestination();
        headers.append('Authorization', 'Bearer ' + token);
        var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/TransportationUnits/ByCity?CityId=' + des;
        var response = this.http.get(url, { headers: headers }).map(res => res.json());
        return response;
    }



    listTransportbyFilter() {
        var headers = new Headers();
        let token = this.auth.AuthToken;
        headers.append('Authorization', 'Bearer ' + token);
        var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/TransportationUnits/GetTransportationUnit?ratingId=3&seatTypeId=1&typeId=1&servicetypeid=1';
        var response = this.http.get(url, { headers: headers }).map(res => res.json());
        return response;

    }

}
