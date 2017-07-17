import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotelDetailsPage } from './hotel-details';

@NgModule({
  declarations: [
    HotelDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(HotelDetailsPage),
  ],
  exports: [
    HotelDetailsPage
  ]
})
export class HotelDetailsPageModule {}
