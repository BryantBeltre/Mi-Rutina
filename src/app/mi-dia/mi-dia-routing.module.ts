import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiDiaPage } from './mi-dia.page';

const routes: Routes = [
  {
    path: '',
    component: MiDiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiDiaPageRoutingModule {}
