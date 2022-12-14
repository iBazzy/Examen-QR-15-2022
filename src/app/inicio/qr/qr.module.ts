import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QRPageRoutingModule } from './qr-routing.module';

import { QRPage } from './qr.page';
import { ApiDuococService } from 'src/app/servicio/api-duococ.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRPageRoutingModule,

  ],
  declarations: [QRPage],
  providers:[ApiDuococService]
})
export class QRPageModule {}
