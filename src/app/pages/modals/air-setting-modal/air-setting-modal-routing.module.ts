import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AirSettingModalPage } from './air-setting-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AirSettingModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AirSettingModalPageRoutingModule {}
