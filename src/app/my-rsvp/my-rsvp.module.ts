import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyRsvpPageRoutingModule } from './my-rsvp-routing.module';

import { MyRsvpPage } from './my-rsvp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyRsvpPageRoutingModule
  ],
  declarations: [MyRsvpPage]
})
export class MyRsvpPageModule {}
