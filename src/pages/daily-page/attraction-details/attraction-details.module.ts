import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttractionDetailsPage } from './attraction-details';

@NgModule({
  declarations: [
    AttractionDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AttractionDetailsPage),
  ],
  exports: [
    AttractionDetailsPage
  ]
})
export class AttractionDetailsPageModule {}
