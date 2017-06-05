import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyDetails } from './daily-details';

@NgModule({
  declarations: [
    DailyDetails,
  ],
  imports: [
    IonicPageModule.forChild(DailyDetails),
  ],
  exports: [
    DailyDetails
  ]
})
export class DailyDetailsModule {}
