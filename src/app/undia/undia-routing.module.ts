import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UndiaPage } from './undia.page';

const routes: Routes = [
  {
    path: '',
    component: UndiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UndiaPageRoutingModule {}
