import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsiRegistroPage } from './asi-registro.page';

const routes: Routes = [
  {
    path: '',
    component: AsiRegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsiRegistroPageRoutingModule {}
