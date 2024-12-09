import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VirtualStudentPage } from './virtual-student.page';

const routes: Routes = [
  {
    path: '',
    component: VirtualStudentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VirtualStudentPageRoutingModule {}
