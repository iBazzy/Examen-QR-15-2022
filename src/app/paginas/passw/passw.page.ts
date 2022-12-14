import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiDuococService } from 'src/app/servicio/api-duococ.service';

@Component({
  selector: 'app-passw',
  templateUrl: './passw.page.html',
  styleUrls: ['./passw.page.scss'],
})
export class PasswPage implements OnInit {
  public formCamb: FormGroup;
  public idUsuario: number = 0;
  constructor(private http: HttpClient, private builder: FormBuilder,
    private alertController: AlertController, private ApiServicio: ApiDuococService
    , private router: Router) {

    this.formCamb = this.builder.group({
      usuario: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      correo: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.email]],
      rut: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]]
    })
  }

  ngOnInit() {
    this.idUsuario = parseInt(this.ApiServicio.retornarId());
  }
  public cambiar() {
    var f = this.formCamb.value;
    var tipo = "estudiante"

    this.http.get<any>(this.ApiServicio.URLUSER).subscribe(async res => {
      const user = res.find((a: any) => {
        return a.usuario === f.usuario && a.correo === f.correo && a.rut === f.rut

      });
      this.formCamb.reset();
      if (user) {

        if (user.tipoUsuario === tipo) {
          this.ApiServicio.idUsuario(user.id);
          const alert = await this.alertController.create({
            header: 'Alerta',
            message: 'Puedes cambiar tu Contraseña',
            buttons: ['OK'],
          });
          await alert.present();
          this.router.navigate(['cambiar', this.idUsuario]);
        } else {
          const alert = await this.alertController.create({
            header: 'Alerta',
            message: 'Solo se permite cambiar contraseña a los estudiantes',
            buttons: ['OK'],
          });
          await alert.present();
          this.router.navigate(['']);
        }
      } else {

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
