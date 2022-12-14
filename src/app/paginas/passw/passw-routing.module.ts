import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasswPage } from './passw.page';

const routes: Routes = [
  {
    path: '',
    component: PasswPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswPageRoutingModule {}
