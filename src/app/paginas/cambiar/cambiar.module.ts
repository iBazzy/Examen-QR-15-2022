import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarPageRoutingModule } from './cambiar-routing.module';

import { CambiarPage } from './cambiar.page';
import { HttpClientModule } from '@angular/common/http';
import { ApiDuococService } from 'src/app/servicio/api-duococ.service';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule,
    CambiarPageRoutingModule
  ],
  declarations: [CambiarPage],
  providers:[ApiDuococService]
})
export class CambiarPageModule {}
