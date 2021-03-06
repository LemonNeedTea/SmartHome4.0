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
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'device-catalogue',
    loadChildren: () => import('./pages/device-catalogue/device-catalogue.module').then( m => m.DeviceCataloguePageModule)
  },
  {
    path: 'device-config',
    loadChildren: () => import('./pages/device-config/device-config.module').then( m => m.DeviceConfigPageModule)
  },
  {
    path: 'wifi-setting',
    loadChildren: () => import('./pages/wifi-setting/wifi-setting.module').then( m => m.WifiSettingPageModule)
  },
  {
    path: 'wifi-push',
    loadChildren: () => import('./pages/wifi-push/wifi-push.module').then( m => m.WifiPushPageModule)
  },
  {
    path: 'langset',
    loadChildren: () => import('./pages/langset/langset.module').then( m => m.LangsetPageModule)
  },
  {
    path: 'thermostat',
    loadChildren: () => import('./pages/thermostat/thermostat.module').then( m => m.ThermostatPageModule)
  },
  {
    path: 'thermostat-detail',
    loadChildren: () => import('./pages/thermostat-detail/thermostat-detail.module').then( m => m.ThermostatDetailPageModule)
  },
  {
    path: 'mode-edit',
    loadChildren: () => import('./pages/mode-edit/mode-edit.module').then( m => m.ModeEditPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
