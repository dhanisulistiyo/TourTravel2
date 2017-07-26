import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FixedpackageGuestPage } from './fixedpackage-guest';

@NgModule({
  declarations: [
    FixedpackageGuestPage,
  ],
  imports: [
    IonicPageModule.forChild(FixedpackageGuestPage),
  ],
  exports: [
    FixedpackageGuestPage
  ]
})
export class FixedpackageGuestPageModule {}
