import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterAttraction } from './filter-attraction';

@NgModule({
  declarations: [
    FilterAttraction,
  ],
  imports: [
    IonicPageModule.forChild(FilterAttraction),
  ],
  exports: [
    FilterAttraction
  ]
})
export class FilterAttractionModule {}
