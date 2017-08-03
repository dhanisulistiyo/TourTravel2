import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AttractionService } from '../../../providers/attraction-service';
import { DailyService } from '../../../providers/daily-service';
import { AttractionDetailsPage } from './../attraction-details/attraction-details';
import { FilterAttraction } from './../filter-attraction/filter-attraction';
@Component({
  selector: 'page-list-attraction1',
  templateUrl: 'list-attraction1.html',
  providers: [AttractionService]
})

export class ListAttractionPage1 {
  listattractions: Array<any>;
  attractions: Array<any>;
  selectedQuestions: string[] = [];
  selectedAttrc: string[] = [];
  idAwal;
  idAkhir;
  des;
  active1: boolean = true;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private attSer: AttractionService,
    public ds: DailyService,
    public load: LoadingController
  ) {

    this.des = navParams.data['des']
    this.idAwal = navParams.data['id']
    this.idAkhir = navParams.data['i']
  }

  ionViewWillEnter() {

    let loader = this.load.create({
      content: 'Please wait...'
    });
    loader.present();
    // this.selectedQuestions = this.ds.getAttraction(this.idAwal, this.idAkhir);
    // if(this.selectedQuestions == null) this.selectedQuestions = []
    // console.log(this.selectedQuestions);
    this.attSer.listAttractionDailyFilter(this.des).subscribe(data => {
      this.listattractions = data;
      this.attractions = this.listattractions;
      loader.dismiss();
      console.log(this.listattractions);
    }, err => {
      loader.dismiss();
      console.log(err);
    },
      () => console.log('Attraction Search Complete')
    );

  }

  listAttraction() {
    this.attractions = this.listattractions;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.attractions;
    // set q to the value of the searchbar
    var q = searchbar.target.value;
    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
      this.listAttraction();
      return;
    }

    this.attractions = this.attractions.filter((v) => {

      if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })

  }

  printf2(attrac) {
    const foundAt = this.selectedQuestions.indexOf(attrac);
    if (foundAt >= 0) {
      this.selectedQuestions.splice(foundAt, 1);
    } else {
      this.selectedQuestions.push(attrac);
    }
    console.log(this.selectedQuestions);
  }

  setSelectedAttraction() {
    console.log(this.selectedQuestions);
    let attrac = this.selectedQuestions;
    this.ds.setAttraction(this.idAwal, this.idAkhir, attrac);
    this.navCtrl.pop();
  }


  filterattracTapped(event) {
    this.attSer.delStorFilAttrac();
    this.navCtrl.pop();
    let id = this.idAwal;
    let i = this.idAkhir;
    this.navCtrl.push(FilterAttraction, { id, i });
  }

  filterAtt(attracs) {
    const foundAt = this.selectedAttrc.indexOf(attracs);
    if (foundAt >= 0) {
      this.selectedAttrc.splice(foundAt, 1);
      switch (attracs) {
        case 'REGULER':
          this.active1 = true;
          break;
      }
    } else {
      this.selectedAttrc.push(attracs);
      switch (attracs) {
        case 'REGULER':
          this.active1 = false;
          break;
      }
    }
    console.log(this.selectedAttrc);
    this.attSer.setTypes(this.selectedAttrc);

  }

  detailAtt() {
    this.navCtrl.push(AttractionDetailsPage);
  }


}
