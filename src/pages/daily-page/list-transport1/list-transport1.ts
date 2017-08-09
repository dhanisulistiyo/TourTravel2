import { ConfigProvider } from './../../../providers/config';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
//import {FilterTransportPage} from '../filter-transport/filter-transport';
import { FilterTransport1Page } from '../filter-transport1/filter-transport1';
import { TransportAirportservice1Page } from '../transport-airportservice1/transport-airportservice1';
import { TransportService } from '../../../providers/transport-service';
import { DailyService } from '../../../providers/daily-service';

@Component({
  selector: 'page-list-transport1',
  templateUrl: 'list-transport1.html',
  providers: [TransportService]
})
export class ListTransportPage1 {
  listtransports: Array<any>;
  transport: Array<any>;
  idAwal;
  idAkhir;
  from;
  to;
  baseUrl;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ds: DailyService,
    public tra: TransportService,
    public load: LoadingController,
    public conf: ConfigProvider
  ) {
    this.from = navParams.data['from']
    this.to = navParams.data['to']
    this.idAwal = navParams.data['id']
    this.idAkhir = navParams.data['i']
    this.baseUrl = this.conf.baseUrlImage;
  }

  ionViewWillEnter() {
    let loader = this.load.create({
      content: 'Please wait...'
    });
    loader.present();
    this.tra.listTransportDaily(this.from, this.to).subscribe(data => {
      this.listtransports = data;
      this.transport = this.listtransports;
      loader.dismiss();
      console.log(this.listtransports);
    }, err => {
      loader.dismiss();
      console.log(err);
    },
      () => console.log('Transport Search Complete')
    );
  }

  listTransport() {
    this.transport = this.listtransports;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.transport;
    // set q to the value of the searchbar
    var q = searchbar.target.value;
    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
      this.listTransport();
      return;
    }

    this.transport = this.transport.filter((v) => {

      if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })

  }


  setSelectedTransport(trans) {
    console.log(trans)
    let ser = (trans['TransportationItemServiceTypes']);
    let id = this.idAwal;
    let i = this.idAkhir;
    this.ds.setTransportation(id, i, trans)
    this.navCtrl.push(TransportAirportservice1Page, {id,i,ser});
  }

  filtertransTapped(event) {
    this.tra.delStorFilTra();
    this.navCtrl.pop();
    let id = this.idAwal;
    let i = this.idAkhir;
    this.navCtrl.push(FilterTransport1Page,{ id, i});
  }


}
