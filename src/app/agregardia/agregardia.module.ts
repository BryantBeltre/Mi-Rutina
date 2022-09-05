import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregardiaPageRoutingModule } from './agregardia-routing.module';

import { AgregardiaPage } from './agregardia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregardiaPageRoutingModule
  ],
  declarations: [AgregardiaPage]
})
export class AgregardiaPageModule {}
