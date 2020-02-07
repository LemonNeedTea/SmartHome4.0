import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThermostatPageRoutingModule } from './thermostat-routing.module';

import { ThermostatPage } from './thermostat.page';
import { TranslateModule } from '@ngx-translate/core';
import { BoolPipe } from '../../pipes/bool.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThermostatPageRoutingModule,
    TranslateModule
  ],
  declarations: [ThermostatPage, BoolPipe]
})
export class ThermostatPageModule {}
