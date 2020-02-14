import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThermostatDetailPageRoutingModule } from './thermostat-detail-routing.module';

import { ThermostatDetailPage } from './thermostat-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThermostatDetailPageRoutingModule
  ],
  declarations: [ThermostatDetailPage]
})
export class ThermostatDetailPageModule {}
