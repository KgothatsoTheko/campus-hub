import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    component: TabsPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
      },
      {
        path: 'tab1',
        loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'event-details/:id',
        loadChildren: () => import('./event-details/event-details.module').then(m => m.EventDetailsPageModule),
      },
      {
        path: 'tab2',
        loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
      },
      {
        path: 'support',
        loadChildren: () => import('./support/support.module').then( m => m.SupportPageModule)
      },
      {
        path: 'my-rsvp',
        loadChildren: () => import('./my-rsvp/my-rsvp.module').then( m => m.MyRsvpPageModule)
      },
      {
        path: 'virtual-student',
        loadChildren: () => import('./virtual-student/virtual-student.module').then( m => m.VirtualStudentPageModule)
      },
    ]
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
