import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {FormGroup,Validators,FormBuilder} from '@angular/forms';
import { ApiDuococService } from 'src/app/servicio/api-duococ.service';
import { AlertController } from '@ionic/angular';
import { Alumno } from 'src/app/usuarios/alumno';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public formInic: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
    public builder: FormBuilder,
    private ApiServicio: ApiDuococService,
    private alertController: AlertController){

      this.formInic = this.builder.group({
        usuario: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
        contraseña: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
      })
    }

  public campo(control: string){
    return this.formInic.get(control);
  }
  public fueTocado(control: string){
    return this.formInic.get(control).touched;
  }
  public estaSucio(control: string){
    return this.formInic.get(control).dirty;
  }
  ngOnInit() {

  }
   public ingresar() {
    var f = this.formInic.value;
    var tipo = "profesor"

    this.http.get<any>(this.ApiServicio.URLUSER).subscribe(  async res => {
      const user = res.find((a:any)=>{
        return a.usuario === f.usuario && a.contraseña === f.contraseña

      });
      this.formInic.reset();
      if (user){

        if (user.tipoUsuario === tipo) {
        this.ApiServicio.idUsuario(user.id);
        const alert = await this.alertController.create({
          header: 'Alerta',
          message: 'Profesor ha sido Logeado',
          buttons: ['OK'],
        });
        await alert.present();
        this.router.navigate(['profesor']);
        } else {
          localStorage.removeItem("ID");
          this.ApiServicio.idUsuario(user.id);

          user.modo = "activo";
          const usuario: Alumno ={
            "nombre": user.nombre,
            "apellido": user.apellido,
            "usuario": user.nombre,
            "contraseña": user.nombre,
            "correo": user.nombre,
            "rut": user.nombre,
            "tipoUsuario": user.nombre,
            "modo":  user.modo
          }
          this.ApiServicio.cambiarModoAlumno(user.id, user).subscribe((res) => {
          });

          const alert = await this.alertController.create({
            header: 'Alerta',
            message: 'Estudiante ha sido Logeado',
            buttons: ['OK'],
          });
          await alert.present();

          this.router.navigate(['qr']);
        }
      } else{

        const alert = await this.alertController.create({
          header: 'Alerta',
          message: 'Datos Incorrectos!',
          buttons: ['OK'],
        });
        await alert.present();

      };
    }
    )

  }

}
