import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WifiSettingPageRoutingModule } from './wifi-setting-routing.module';

import { WifiSettingPage } from './wifi-setting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WifiSettingPageRoutingModule
  ],
  declarations: [WifiSettingPage]
})
export class WifiSettingPageModule {}
