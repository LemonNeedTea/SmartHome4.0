import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThermostatTimerPageRoutingModule } from './thermostat-timer-routing.module';

import { ThermostatTimerPage } from './thermostat-timer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThermostatTimerPageRoutingModule
  ],
  declarations: [ThermostatTimerPage]
})
export class ThermostatTimerPageModule {}
