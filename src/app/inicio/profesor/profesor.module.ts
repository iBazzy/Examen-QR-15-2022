import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesorPageRoutingModule } from './profesor-routing.module';

import { ProfesorPage } from './profesor.page';
import { ApiDuococService } from 'src/app/servicio/api-duococ.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule,
    ProfesorPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProfesorPage],
  providers: [ApiDuococService]
})
export class ProfesorPageModule {}
