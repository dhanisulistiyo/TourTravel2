import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AttractionService } from '../../providers/attraction-service';
import { IteneraryService } from '../../providers/itenerary-service';
@Component({
  selector: 'page-list-attraction',
  templateUrl: 'list-attraction.html',
  providers: [AttractionService, IteneraryService]
})
export class ListAttractionPage {
  listattractions: Array<any>;
  attractions: Array<any>;
  selectedQuestions:string[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private attSer: AttractionService,
    public ite: IteneraryService,

  ) {

  }

  ionViewWillEnter() {
    this.attSer.searchListAttraction().subscribe(data => {
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

  // setSelectedAttraction(attrac) {
  //   console.log(attrac);
  //   var data = JSON.stringify({ attrac });
  //   console.log(data);
  //   this.ite.setAttraction(data);
  //   this.navCtrl.pop();
  // }


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
        var data = JSON.stringify({ attrac });
        console.log(data);
        this.ite.setAttraction(data);
        this.navCtrl.pop();
    }


}
