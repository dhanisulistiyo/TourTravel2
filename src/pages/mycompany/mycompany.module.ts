import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MycompanyPage } from './mycompany';

@NgModule({
  declarations: [
    MycompanyPage,
  ],
  imports: [
    IonicPageModule.forChild(MycompanyPage),
  ],
  exports: [
    MycompanyPage
  ]
})
export class MycompanyPageModule {}
