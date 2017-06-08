import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransportLocationservice } from './transport-locationservice';

@NgModule({
  declarations: [
    TransportLocationservice,
  ],
  imports: [
    IonicPageModule.forChild(TransportLocationservice),
  ],
  exports: [
    TransportLocationservice
  ]
})
export class TransportLocationserviceModule {}
