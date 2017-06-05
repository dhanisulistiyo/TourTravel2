import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Mycompany } from './mycompany';

@NgModule({
  declarations: [
    Mycompany,
  ],
  imports: [
    IonicPageModule.forChild(Mycompany),
  ],
  exports: [
    Mycompany
  ]
})
export class MycompanyModule {}
