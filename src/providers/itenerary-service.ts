import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {AuthService} from '../providers/auth-token-service'
import 'rxjs/add/operator/map';



@Injectable()
export class IteneraryService {
    locations;
    toursname;
    destination;
    passengger;
    acomodation;
    attraction: any = {};
    datetour;
    roomtype;
    roomallocate;
    roomservice;
    transportation;
    transportservice;

    //versi 2

  constructor(public http: Http, public auth:AuthService) {
    this.locations;
    this.toursname;
    this.destination="Selected Destination";
    this.passengger=null;
    this.acomodation=null;
    this.transportation=null;
    this.transportservice=null;

    this.attraction=null;
    this.datetour=null;

    this.roomtype=null;
    this.roomallocate=null;
    this.roomservice=null;
    
  
    //versi 2
  }



  delLocalStorage(){
            localStorage.removeItem('guest');
            localStorage.removeItem('tNames');
            localStorage.removeItem('date');
            localStorage.removeItem('hot');
            localStorage.removeItem('trans');
            localStorage.removeItem('att');
            
  }



  public setDestination(des) {
        var firstDes = window.localStorage.getItem('des');
        if(firstDes != des){
            this.delLocalStorage();
        }
        
        window.localStorage.setItem('des', des);
        this.destination=des;
        this.searchObjctLocation();
    }

     public getDestination() {
        var des = window.localStorage.getItem('des');
        this.destination=des;
        return this.destination;
    }

   public setTransportSer(tSer) {
        window.localStorage.setItem('tSer', tSer);
        this.transportservice=tSer;
    }
    
     public getTransportSer() {
        var tSer = JSON.parse(window.localStorage.getItem('tSer'));
        this.transportservice=tSer;
        return this.transportservice;
    }


  public setDateTour(datetour) {
        window.localStorage.setItem('date', datetour);
        this.datetour=datetour;
    }
    
     public getDateTour() {
        var datetour = JSON.parse(window.localStorage.getItem('date'));
        this.datetour=datetour;
        return this.datetour;
    }


  public setPassenger(guest) {
        window.localStorage.setItem('guest', guest);
        this.passengger=guest;
    }
    
     public getPassenger() {
        var guest = JSON.parse(window.localStorage.getItem('guest'));
        this.passengger=guest;
        return this.passengger;
    }


   public setToursName(name){
        window.localStorage.setItem('tNames', name);
        this.toursname=name;
    }


    public getToursName() {
        var name = window.localStorage.getItem('tNames');
        this.toursname=name;
        return this.toursname;
    }

    public setAttraction(att) {
        window.localStorage.setItem('att', att);
        this.attraction=att;
    }

     public getAttraction() {
        var att = JSON.parse(window.localStorage.getItem('att'));
        this.attraction=att;
        return this.attraction;
    }

     public setTransport(trans) {
        window.localStorage.setItem('trans', trans);
        this.transportation=trans;
    }

     public getTransport() {
        var trans = JSON.parse(window.localStorage.getItem('trans'));
        this.transportation=trans;
        return this.transportation;
    }


     public setAcomodation(hot) {
        window.localStorage.setItem('hot', hot);
        this.acomodation=hot;
    }

     public getAcomodation() {
        var hot = JSON.parse(window.localStorage.getItem('hot'));
        this.acomodation=hot;
        return this.acomodation;
    }

     public setRoomType(room) {
        window.localStorage.setItem('room', room);
        this.roomtype=room;
    }
    
     public getRoomType() {
        var room = JSON.parse(window.localStorage.getItem('room'));
        this.roomtype=room;
        return this.roomtype;
    }

    public setRoomAllo(aloc) {
        window.localStorage.setItem('aloc', aloc);
        this.roomallocate=aloc;
    }
    
     public getRoomAllo() {
        var aloc = JSON.parse(window.localStorage.getItem('aloc'));
        this.roomallocate=aloc;
        return this.roomallocate;
    }

     public setRoomSer(ser) {
        window.localStorage.setItem('ser', ser);
        this.roomservice=ser;
    }
    
     public getRoomSer() {
        var ser = JSON.parse(window.localStorage.getItem('ser'));
        this.roomservice=ser;
        return this.roomservice;
    }

    getObjectLocation(){
        var oLoc = JSON.parse(window.localStorage.getItem('oLoc'));
        this.locations=oLoc;
        return this.locations;
  
    }

     searchObjctLocation() {
        var headers = new Headers();
        let locationName = this.getDestination();
        if(locationName != "Selected Destination"){
        let token = this.auth.AuthToken;
        console.log(token);
        headers.append('Authorization', 'Bearer ' +token);
        var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/cities?id='+encodeURI(locationName); 
        this.http.get(url, {headers : headers}).map(res => res).subscribe(data=>{
            console.log(data['_body']);
            this.locations = data['_body'];
            window.localStorage.setItem('oLoc',this.locations);

        },err => {
                    console.log(err);
                },
                () => console.log('location Search Complete')
            ); 
            
        }

    }

}
