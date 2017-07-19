import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuestDetailsPage } from './guest-details';

@NgModule({
  declarations: [
    GuestDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(GuestDetailsPage),
  ],
  exports: [
    GuestDetailsPage
  ]
})
export class GuestDetailsPageModule {}
