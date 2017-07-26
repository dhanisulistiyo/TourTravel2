import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FixedpackageDetailsPage } from './fixedpackage-details';

@NgModule({
  declarations: [
    FixedpackageDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(FixedpackageDetailsPage),
  ],
  exports: [
    FixedpackageDetailsPage
  ]
})
export class FixedpackageDetailsPageModule {}
