import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WifiSettingPage } from './wifi-setting.page';

const routes: Routes = [
  {
    path: '',
    component: WifiSettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WifiSettingPageRoutingModule {}
