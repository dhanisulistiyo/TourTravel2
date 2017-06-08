import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MybookingCancel } from './mybooking-cancel';

@NgModule({
  declarations: [
    MybookingCancel,
  ],
  imports: [
    IonicPageModule.forChild(MybookingCancel),
  ],
  exports: [
    MybookingCancel
  ]
})
export class MybookingCancelModule {}
