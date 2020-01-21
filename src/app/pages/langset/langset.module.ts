import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LangsetPageRoutingModule } from './langset-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { LangsetPage } from './langset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LangsetPageRoutingModule,
    TranslateModule
  ],
  declarations: [LangsetPage]
})
export class LangsetPageModule {}
