import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThermostatPageRoutingModule } from './thermostat-routing.module';

import { ThermostatPage } from './thermostat.page';
import { TranslateModule } from '@ngx-translate/core';
import { BoolPipe } from '../../pipes/bool.pipe';
import{ AirSettingModalPage} from '../modals/air-setting-modal/air-setting-modal.page'
import { ThermostatTimerPage } from '../timer/thermostat-timer/thermostat-timer.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ThermostatPageRoutingModule,
    TranslateModule
  ],
  declarations: [ThermostatPage, BoolPipe, AirSettingModalPage,ThermostatTimerPage],
  entryComponents: [AirSettingModalPage,ThermostatTimerPage],
  
})
export class ThermostatPageModule {}
