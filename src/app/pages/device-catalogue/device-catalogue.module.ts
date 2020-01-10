import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeviceCataloguePageRoutingModule } from './device-catalogue-routing.module';

import { DeviceCataloguePage } from './device-catalogue.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeviceCataloguePageRoutingModule
  ],
  declarations: [DeviceCataloguePage]
})
export class DeviceCataloguePageModule {}
