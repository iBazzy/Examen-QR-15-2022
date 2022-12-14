import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInfiniteScroll } from '@ionic/angular';

import { ApiDuococService } from 'src/app/servicio/api-duococ.service';
import { AsignaturaId } from 'src/app/usuarios/asignatura';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  public scroll: IonInfiniteScroll;
  public asignaturas: Array<AsignaturaId> = [];
  public usuarioId = '';
  cart: any = [];


  constructor(


    private alertController: AlertController,
    private router: Router,
    private apiProfesor: ApiDuococService,
    private http: HttpClient


    ) { }

  async ngOnInit() {

    this.usuarioId =  await this.apiProfesor.retornarId()
    this.apiProfesor.getAsignatura(this.usuarioId).subscribe(res => {
      this.cart = res;
      localStorage.removeItem("ID");
    })
  }


  async salir(){
    const alert= await this.alertController.create({
      header:'Cerar Sesión',
      message:'¿Realmente quieres cerrar sesión?',
      buttons: [
        {
          text:'No',
          handler:() =>{

          }
        },
        {
          text: 'Si',
          handler:()=>{
            this.router.navigate([''])

          }
        }
      ]

    });
    await alert.present();
  }










}
