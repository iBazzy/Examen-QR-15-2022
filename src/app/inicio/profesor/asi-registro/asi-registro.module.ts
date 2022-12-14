import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsiRegistroPageRoutingModule } from './asi-registro-routing.module';

import { AsiRegistroPage } from './asi-registro.page';
import { HttpClientModule } from '@angular/common/http';
import { ApiDuococService } from 'src/app/servicio/api-duococ.service';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsiRegistroPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    QRCodeModule
  ],
  declarations: [AsiRegistroPage],
  providers: [ApiDuococService]
})
export class AsiRegistroPageModule {}
