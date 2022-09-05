import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregardiaPage } from './agregardia.page';

const routes: Routes = [
  {
    path: '',
    component: AgregardiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregardiaPageRoutingModule {}
