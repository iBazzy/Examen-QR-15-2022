import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { EstudiantePageRoutingModule } from './estudiante-routing.module';
import { EstudiantePage } from './estudiante.page';
import { HttpClientModule } from '@angular/common/http';
import { ApiDuococService } from 'src/app/servicio/api-duococ.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstudiantePageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [EstudiantePage],
  providers: [ApiDuococService]
})
export class EstudiantePageModule {}
