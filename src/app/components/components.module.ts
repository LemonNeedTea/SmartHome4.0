import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyLoopComponent } from './my-loop/my-loop.component'

const coms = [MyLoopComponent]
const PAGES_COMPONENTS = [
  MyLoopComponent
];

@NgModule({
  declarations: [
    PAGES_COMPONENTS
  ],
  exports: [
    PAGES_COMPONENTS
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
