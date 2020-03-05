import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyLoopComponent } from './my-loop/my-loop.component';
import { MyTimeComponent } from './my-time/my-time.component';
import { MyPickerComponent } from './my-picker/my-picker.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

const PAGES_COMPONENTS = [
  MyLoopComponent,
  MyTimeComponent,
  MyPickerComponent
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
