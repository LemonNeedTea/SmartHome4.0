import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeviceCataloguePage } from './device-catalogue.page';

const routes: Routes = [
  {
    path: '',
    component: DeviceCataloguePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceCataloguePageRoutingModule {}
