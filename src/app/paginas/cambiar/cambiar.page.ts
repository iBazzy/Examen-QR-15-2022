import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiDuococService } from 'src/app/servicio/api-duococ.service';

@Component({
  selector: 'app-cambiar',
  templateUrl: './cambiar.page.html',
  styleUrls: ['./cambiar.page.scss'],
})
export class CambiarPage implements OnInit {
  public formControl:FormGroup;
  public idActiva :number=0;
  constructor(private builder: FormBuilder, private router: Router,
    private ApiServicio: ApiDuococService,private rutaActiva: ActivatedRoute,
    private alertController: AlertController) {

      this.formControl= this.builder.group({
        contraseña: ['',[Validators.required,Validators.maxLength(15),Validators.minLength(6)]]
      })
    }


  async ngOnInit() {
this.idActiva=parseInt( await this.ApiServicio.retornarId());
  }

   public async cambiar(){
  if(this.formControl.invalid){
    this.formControl.markAllAsTouched();
    return;
  }
  this.ApiServicio.cambiarPorID(this.idActiva,{
    ...this.formControl.value
  }).subscribe(datos=>{
    if(datos){

    }
  })
  const alert = await this.alertController.create({
    header: 'Alerta',
    message: 'Contraseña Modificada',
    buttons: ['OK'],
  });
  await alert.present();
  this.router.navigate(['']);

};

}
