import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModeEditPageRoutingModule } from './mode-edit-routing.module';

import { ModeEditPage } from './mode-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModeEditPageRoutingModule
  ],
  declarations: [ModeEditPage]
})
export class ModeEditPageModule {}
