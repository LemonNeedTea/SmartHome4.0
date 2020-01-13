import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WifiPushPage } from './wifi-push.page';

const routes: Routes = [
  {
    path: '',
    component: WifiPushPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WifiPushPageRoutingModule {}
