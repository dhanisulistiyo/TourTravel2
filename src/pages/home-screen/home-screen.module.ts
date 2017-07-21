import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeScreenPage } from './home-screen';

@NgModule({
  declarations: [
    HomeScreenPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeScreenPage),
  ],
  exports: [
    HomeScreenPage
  ]
})
export class HomeScreenPageModule {}
