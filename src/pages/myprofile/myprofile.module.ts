import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Myprofile } from './myprofile';

@NgModule({
  declarations: [
    Myprofile,
  ],
  imports: [
    IonicPageModule.forChild(Myprofile),
  ],
  exports: [
    Myprofile
  ]
})
export class MyprofileModule {}
