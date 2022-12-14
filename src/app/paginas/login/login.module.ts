import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';
import {HttpClientModule} from '@angular/common/http'
import { LoginPage } from './login.page';
import { ApiDuococService } from 'src/app/servicio/api-duococ.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [LoginPage],
  providers:[ApiDuococService]
})
export class LoginPageModule {}
