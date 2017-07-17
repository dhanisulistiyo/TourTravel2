import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransportDetailsPage } from './transport-details';

@NgModule({
  declarations: [
    TransportDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TransportDetailsPage),
  ],
  exports: [
    TransportDetailsPage
  ]
})
export class TransportDetailsPageModule {}
