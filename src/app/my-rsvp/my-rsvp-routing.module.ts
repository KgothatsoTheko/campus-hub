import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyRsvpPage } from './my-rsvp.page';

const routes: Routes = [
  {
    path: '',
    component: MyRsvpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyRsvpPageRoutingModule {}
