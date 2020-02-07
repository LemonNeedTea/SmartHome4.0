import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AirSettingModalPageRoutingModule } from './air-setting-modal-routing.module';

import { AirSettingModalPage } from './air-setting-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AirSettingModalPageRoutingModule
  ],
  declarations: [AirSettingModalPage]
})
export class AirSettingModalPageModule {}
