import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FilattractionService} from '../../../providers/filattraction-service';
import { AttractionService} from '../../../providers/attraction-service';
import {ListAttractionPage1 } from '../list-attraction1/list-attraction1';

/**
 * Generated class for the FilterAttraction page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-filter-attraction',
  templateUrl: 'filter-attraction.html',
})
export class FilterAttraction {
  listTypes: Array<any>;
  idAwal;
  idAkhir;
  des;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fil:FilattractionService, 
  public attr: AttractionService,
  public load : LoadingController) {
    this.idAwal = navParams.data['id']
    this.idAkhir = navParams.data['i']
    this.des = navParams.data['des']
  }

ionViewWillEnter() {
    let loader = this.load.create({
      content: 'Please wait...'
    });

    loader.present();
    //this.daily = this.ds.daily[this.idAwal].program_daily[this.idAkhir];
    //console.log(this.daily);
    this.listType();
    loader.dismiss();
  }

public listType(){
      this.fil.listAttractionType().subscribe(data=>{
            this.listTypes=data;
            console.log(this.listTypes);
            
            },err => {
                    console.log(err);
                },
                () => console.log('Types Search Complete')
            );
  }

  filterType(types){
    console.log(types);
    this.attr.setTypes(types);
  }

   listTapped(event) {
    this.navCtrl.pop();
    let des= this.des
    let id = this.idAwal;
    let i = this.idAkhir;
    this.navCtrl.push(ListAttractionPage1, {des,id, i});
    
  }
}
