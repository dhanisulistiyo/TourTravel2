import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccordionPage } from './accordion-page';

@NgModule({
  declarations: [
    AccordionPage,
  ],
  imports: [
    IonicPageModule.forChild(AccordionPage),
  ],
  exports: [
    AccordionPage
  ]
})
export class AccordionPageModule {}
