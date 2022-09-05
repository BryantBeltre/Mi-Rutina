import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiDiaPageRoutingModule } from './mi-dia-routing.module';

import { MiDiaPage } from './mi-dia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiDiaPageRoutingModule
  ],
  declarations: [MiDiaPage]
})
export class MiDiaPageModule {}
