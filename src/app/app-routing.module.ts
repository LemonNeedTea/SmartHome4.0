import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'device-catalogue',
    loadChildren: () => import('./pages/device-catalogue/device-catalogue.module').then( m => m.DeviceCataloguePageModule)
  },
  {
    path: 'device-config',
    loadChildren: () => import('./pages/device-config/device-config.module').then( m => m.DeviceConfigPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
