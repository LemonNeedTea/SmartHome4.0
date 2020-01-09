import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'main',
        children: [{
          path: '',
          loadChildren: () => import('../main/main.module').then(m => m.MainPageModule)
        }]
      },
      {
        path: 'shop',
        children: [{
          path: '',
          loadChildren: () => import('../shop/shop.module').then(m => m.ShopPageModule)

        }]
      },
      {
        path: 'smart',
        children: [{
          path: '',
          loadChildren: () => import('../smart/smart.module').then(m => m.SmartPageModule)

        }]
      },
      {
        path: 'profile',
        children: [{
          path: '',

          loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)


        }]
      }


    ]
  },
  {
    path: '',
    redirectTo: '/tabs/main',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
