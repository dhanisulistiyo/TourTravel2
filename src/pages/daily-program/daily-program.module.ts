import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyProgram } from './daily-program';

@NgModule({
  declarations: [
    DailyProgram,
  ],
  imports: [
    IonicPageModule.forChild(DailyProgram),
  ],
  exports: [
    DailyProgram
  ]
})
export class DailyProgramModule {}
