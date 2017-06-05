import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AttractionService } from '../../../providers/attraction-service';
import {DailyService} from '../../../providers/daily-service';
@Component({
  selector: 'page-list-attraction1',
  templateUrl: 'list-attraction1.html',
  providers: [AttractionService]
})

export class ListAttractionPage1 {
  listattractions: Array<any>;
  attractions: Array<any>;
  selectedQuestions:string[] = [];
  idAwal;
  idAkhir;
  des;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private attSer: AttractionService,
    public ds: DailyService
  ) {
    
    this.des = navParams.data['des']
    this.idAwal = navParams.data['id']
    this.idAkhir = navParams.data['i']
  }

  ionViewWillEnter() {
    this.attSer.listAttractionDaily(this.des).subscribe(data => {
      this.listattractions = data;
      this.attractions = this.listattractions;
      console.log(this.listattractions);
    }, err => {
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

  printf2(attrac){
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


}
