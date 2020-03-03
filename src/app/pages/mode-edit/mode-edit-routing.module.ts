import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModeEditPage } from './mode-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ModeEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModeEditPageRoutingModule {}
