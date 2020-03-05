import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyLoopComponent } from './my-loop/my-loop.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

const coms = [MyLoopComponent]
const PAGES_COMPONENTS = [
  MyLoopComponent
];

@NgModule({
  declarations:
    PAGES_COMPONENTS
  ,
  exports:
    PAGES_COMPONENTS
  ,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ComponentsModule { }
