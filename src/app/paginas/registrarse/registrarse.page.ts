import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiDuococService } from 'src/app/servicio/api-duococ.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {
  public formLog : FormGroup;
  constructor(private builder: FormBuilder,private alertController: AlertController,
    private ApiServicio: ApiDuococService,private router: Router) {
    this.formLog= this.builder.group({
      nombre:['',[Validators.required,Validators.minLength(4),Validators.maxLength(15)]],
      apellido:['',[Validators.required,Validators.minLength(4),Validators.maxLength(15)]],
      usuario:['',[Validators.required,Validators.minLength(4),Validators.maxLength(10)]],
      contraseña:['',[Validators.required,Validators.minLength(6),Validators.maxLength(15)]],
      correo:['',[Validators.required,Validators.minLength(10),Validators.maxLength(15),Validators.email]],
      rut:['',[Validators.required,Validators.minLength(8),Validators.maxLength(9)]],
      tipoUsuario:['estudiante']
    })
   }


  public campo(control: string){
    return this.formLog.get(control);
  }
  public fueTocado(control: string){
    return this.formLog.get(control).touched;
  }
  public estaSucio(control: string){
    return this.formLog.get(control).dirty;
  }

  ngOnInit() {
    this.formLog
  }

  async presentAlert() {

  }

  public async guardarEstudiante(): Promise<void> {
    if(this.formLog.invalid){
      this.formLog.markAllAsTouched();
      return;
    }
    // Guardar
    this.ApiServicio.agregarEstudiante({
      ...this.formLog.value
    })
    .subscribe(resultado => {
      if(resultado){
        this.formLog.reset();
        this.formLog.updateValueAndValidity();
        this.router.navigate(['']);
      }
    })
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Has sido Registrado!',
      buttons: ['OK'],
    });

    await alert.present();
}


}
