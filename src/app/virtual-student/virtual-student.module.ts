import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VirtualStudentPageRoutingModule } from './virtual-student-routing.module';

import { VirtualStudentPage } from './virtual-student.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VirtualStudentPageRoutingModule
  ],
  declarations: [VirtualStudentPage]
})
export class VirtualStudentPageModule {}
