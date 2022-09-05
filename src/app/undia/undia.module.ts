import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UndiaPageRoutingModule } from './undia-routing.module';

import { UndiaPage } from './undia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UndiaPageRoutingModule
  ],
  declarations: [UndiaPage]
})
export class UndiaPageModule {}
