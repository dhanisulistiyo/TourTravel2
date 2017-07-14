import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransportHoursPage } from './transport-hours';

@NgModule({
  declarations: [
    TransportHoursPage,
  ],
  imports: [
    IonicPageModule.forChild(TransportHoursPage),
  ],
  exports: [
    TransportHoursPage
  ]
})
export class TransportHoursPageModule {}
