import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswPageRoutingModule } from './passw-routing.module';

import { PasswPage } from './passw.page';
import { HttpClientModule } from '@angular/common/http';
import { ApiDuococService } from 'src/app/servicio/api-duococ.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule,
    PasswPageRoutingModule
  ],
  declarations: [PasswPage],
  providers:[ApiDuococService]
})
export class PasswPageModule {}
