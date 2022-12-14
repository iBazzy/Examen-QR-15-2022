import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarsePageRoutingModule } from './registrarse-routing.module';

import { RegistrarsePage } from './registrarse.page';
import { HttpClientModule } from '@angular/common/http';
import { ApiDuococService } from 'src/app/servicio/api-duococ.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RegistrarsePageRoutingModule,
    HttpClientModule
  ],
  declarations: [RegistrarsePage],
  providers:[ApiDuococService]
})
export class RegistrarsePageModule {}
