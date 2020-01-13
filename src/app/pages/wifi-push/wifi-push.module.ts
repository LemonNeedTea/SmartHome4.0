import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WifiPushPageRoutingModule } from './wifi-push-routing.module';

import { WifiPushPage } from './wifi-push.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WifiPushPageRoutingModule
  ],
  declarations: [WifiPushPage]
})
export class WifiPushPageModule {}
