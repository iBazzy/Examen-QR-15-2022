import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiDuococService } from 'src/app/servicio/api-duococ.service';
import { Asignatura, AsignaturaId } from 'src/app/usuarios/asignatura';
import { Asistencia, AsistenciaId } from 'src/app/usuarios/asistencia';

@Component({
  selector: 'app-asi-registro',
  templateUrl: './asi-registro.page.html',
  styleUrls: ['./asi-registro.page.scss'],
})
export class AsiRegistroPage implements OnInit {
  handleRefresh(event) {
    setTimeout(() => {
      this.asignId = this.apiAsistencia.retornarAsignId();
      this.apiAsistencia.getAsistencia(this.asignId,this.fechaHoy).subscribe(res => {
        this.asistencia = res;
      })
      event.target.complete();
    }, 2000);
  };
  public idActiva: number = 0;
  public idAsistenciaActiva: number=0;
  public asignaturaId!: AsignaturaId;
  public asignId = '';
  public fechaId = '';
  asistencia: any=[];
  public fechaHoy = "15/12/22";
  idAlumno = "1";
  asistenciaTipo= "true";
  public asistenciasi = '';
  public mensajeQr = 'Has quedado presente';
  public modo: "activo";
  public fecha = Date.now();
  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private apiAsistencia: ApiDuococService,
    private http: HttpClient,
    private alertController: AlertController
  ) {

  }

  ngOnInit() {

    this.rutaActiva.paramMap.subscribe(parametros => {
      this.idActiva = +parametros.get('idAsignatura')
      this.apiAsistencia.idAsignatura(this.idActiva);
      this.apiAsistencia.obtenerAsignaturaPorId(this.idActiva)
      .subscribe(datos => {
        if(datos){
          this.asignaturaId = datos;

        }else {
          this.router.navigate(['']);
        }
      })
    });


    this.http.get<any>(this.apiAsistencia.URLASIG).subscribe(data => {
      const producto = data.find((a: any) => {
        return a.id == this.idActiva
      });

      if (producto) {
        producto.modo = "activo";
        producto.fecha = this.fecha;
        const carrito: Asignatura = {
          "nombre": producto.nombre,
          "jornada": producto.jornada,
          "siglas": producto.siglas,
          "fecha": producto.fecha,
          "idProfesor": producto.idProfesor,
          "modo": producto.modo

        }
        console.log(carrito);
        this.apiAsistencia.cambiarAsignatura(producto.id, producto).subscribe((res) => {
        });
      }
    });

    this.asignId = this.apiAsistencia.retornarAsignId();
    this.apiAsistencia.getAsistencia(this.asignId,this.fechaHoy).subscribe(res => {
      this.asistencia = res;
    })

    this.http.get<any>(this.apiAsistencia.URLASIS).subscribe(data => {
      const producto = data.find((a: any) => {

        return  a.idAlumno == this.idAlumno
        });

        if (producto){
         this.asistenciasi = producto.id;

        }

      });

  }



  public  generarAsistencia(){
    this.http.get<any>(this.apiAsistencia.URLASIG).subscribe(async data => {
      const producto = data.find((a: any) => {
        return a.modo == "activo"
      });

      if (producto) {
        producto.modo = "no activo";
        const carrito: Asignatura = {
          "nombre": producto.nombre,
          "jornada": producto.jornada,
          "siglas": producto.siglas,
          "fecha": producto.fecha,
          "idProfesor": producto.idProfesor,
          "modo": producto.modo

        }
        console.log(carrito);
        this.apiAsistencia.cambiarAsignatura(producto.id, producto).subscribe((res) => {
        });
      }
      const alert = await this.alertController.create({
        header: 'Alerta',

        message: 'Asistencia Guardada Correctamente!',
        buttons: ['OK'],
      });

      await alert.present();
      this.router.navigate(['profesor']);
    }

    );



  }

  public  generarAsistencia2(){
    this.http.get<any>(this.apiAsistencia.URLASIG).subscribe(async data => {
      const producto = data.find((a: any) => {
        return a.modo == "activo"
      });

      if (producto) {
        producto.modo = "no activo";
        const carrito: Asignatura = {
          "nombre": producto.nombre,
          "jornada": producto.jornada,
          "siglas": producto.siglas,
          "fecha": producto.fecha,
          "idProfesor": producto.idProfesor,
          "modo": producto.modo

        }
        console.log(carrito);
        this.apiAsistencia.cambiarAsignatura(producto.id, producto).subscribe((res) => {
        });
      }
    }
    );















}}
