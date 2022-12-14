import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QRPage implements OnInit {

  constructor(private router: Router,private alertController: AlertController) { }

  ngOnInit() {
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
