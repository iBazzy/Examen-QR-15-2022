import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { ApiDuococService } from 'src/app/servicio/api-duococ.service';
import { Alumno } from 'src/app/usuarios/alumno';
import { Asignatura } from 'src/app/usuarios/asignatura';
import { Asistencia, AsistenciaId } from 'src/app/usuarios/asistencia';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.page.html',
  styleUrls: ['./estudiante.page.scss'],
})
export class EstudiantePage implements OnInit {

  scanActive: boolean = false;
  public idActiva: number = 0;
  public asignId = '';
  public fechaId = '';
  // asistencia: any = [];
  public fechaHoy = "15/12/22";
  asistenciaTipo = "Presente";
  public idAll = '';
  public asisId = '';
  public idAsistenciaActiva: number = 0;
  public asistenciaId!: AsistenciaId;
  public asistenciasi = '';
  modo: "activo";
  public fecha = Date.now();
  public siglasAsign: '';


  constructor(
    private alertController: AlertController,
    private router: Router,
    private apiAsistencia: ApiDuococService,
    private http: HttpClient,


  ) { }

  ngOnInit() {
    this.http.get<any>(this.apiAsistencia.URLUSER).subscribe(data => {
      const alumno = data.find((a: any) => {

        return a.modo == "activo" && a.tipoUsuario == "estudiante"
      });

      if (alumno) {
        this.idAll = alumno.id;

      }
    });

    this.http.get<any>(this.apiAsistencia.URLASIG).subscribe(data => {
      const producto = data.find((a: any) => {
        return a.modo == "activo"
      });
      this.siglasAsign = producto.siglas;
    });



    this.http.get<any>(this.apiAsistencia.URLASIS).subscribe(data => {
      const producto = data.find((a: any) => {

        return a.modo == "no activo" && a.siglas == this.siglasAsign && a.idAlumno == this.idAll
      });

      if (producto) {
        producto.modo = "activo";
        producto.fecha = this.fecha;
        const carrito: Asistencia = {
          "nombre": producto.nombre,
          "jornada": producto.jornada,
          "siglas": producto.siglas,
          "fecha": producto.fecha,
          "idProfesor": producto.idProfesor,
          "idAlumno": producto.idAlumno,
          "idAsignatura": producto.idAsignatura,
          "rutAlumno": producto.rutAlumno,
          "PnombreAlumno": producto.PnombreAlumno,
          "PapellidoAlumno": producto.PapellidoAlumno,
          "asistencia": producto.asistencia,
          "modo": producto.modo

        }
        console.log(carrito);
        this.apiAsistencia.cambiarAsistenciav2(producto.id, producto).subscribe((res) => {
        });
      }
    });

    this.http.get<any>(this.apiAsistencia.URLASIS).subscribe(data => {
      const producto = data.find((a: any) => {

        return a.modo == "activo" && a.siglas == this.siglasAsign && a.idAlumno == this.idAll
      });

      if (producto) {
        this.asistenciasi = producto.id;
        this.asignId = producto.idAsignatura;
      }
    });




  }


  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();
        resolve(false);
      }
    });
  }



  async startScanner() {
    const allowed = await this.checkPermission();

    if (allowed) {
      this.scanActive = true;
      BarcodeScanner.hideBackground();

      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {

        this.http.get<any>(this.apiAsistencia.URLASIS).subscribe(data => {
          const producto = data.find((a: any) => {
            return a.modo == "activo" && a.siglas == this.siglasAsign && a.idAlumno == this.idAll
          });

          producto.asistencia = this.asistenciaTipo;
          producto.modo = "no activo";
          const carrito: Asistencia = {
            "nombre": producto.nombre,
            "jornada": producto.jornada,
            "siglas": producto.siglas,
            "fecha": producto.fecha,
            "idProfesor": producto.idProfesor,
            "idAlumno": producto.idAlumno,
            "idAsignatura": producto.idAsignatura,
            "rutAlumno": producto.rutAlumno,
            "PnombreAlumno": producto.PnombreAlumno,
            "PapellidoAlumno": producto.PapellidoAlumno,
            "asistencia": producto.asistencia,
            "modo": producto.modo

          }
          console.log(carrito);
          this.apiAsistencia.cambiarAsistenciav2(producto.id, producto).subscribe((res) => {
          });
        });

        this.http.get<any>(this.apiAsistencia.URLUSER).subscribe(data => {
          const alumno = data.find((a: any) => {

            return a.modo == "activo" && a.tipoUsuario == "estudiante" && a.id == this.idAll
          });

          if (alumno) {
            alumno.modo = "no activo";
            const usuario: Alumno = {
              "nombre": alumno.nombre,
              "apellido": alumno.apellido,
              "usuario": alumno.usuario,
              "contraseña": alumno.nombre,
              "correo": alumno.nombre,
              "rut": alumno.nombre,
              "tipoUsuario": alumno.nombre,
              "modo": alumno.modo
            }
            this.apiAsistencia.cambiarModoAlumno(alumno.id, alumno).subscribe((res) => {
            });

          }
        });



        this.scanActive = false;
        this.router.navigate([''])
        alert(result.content);
      } else {
        const alert = await this.alertController.create({
          header: 'Alerta',
          message: 'No se encuentra información!',
          buttons: ['OK'],
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'No Permitido!',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  stopScanner() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  ionViewWillLeave() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }


  changeAsistencia() {
    this.http.get<any>(this.apiAsistencia.URLASIS).subscribe(data => {
      const producto = data.find((a: any) => {
        return a.modo == "activo" && a.siglas == this.siglasAsign && a.idAlumno == this.idAll
      });

      producto.asistencia = this.asistenciaTipo;
      producto.modo = "no activo";
      const carrito: Asistencia = {
        "nombre": producto.nombre,
        "jornada": producto.jornada,
        "siglas": producto.siglas,
        "fecha": producto.fecha,
        "idProfesor": producto.idProfesor,
        "idAlumno": producto.idAlumno,
        "idAsignatura": producto.idAsignatura,
        "rutAlumno": producto.rutAlumno,
        "PnombreAlumno": producto.PnombreAlumno,
        "PapellidoAlumno": producto.PapellidoAlumno,
        "asistencia": producto.asistencia,
        "modo": producto.modo

      }
      console.log(carrito);
      this.apiAsistencia.cambiarAsistenciav2(producto.id, producto).subscribe((res) => {
      });
    });

    this.http.get<any>(this.apiAsistencia.URLUSER).subscribe(data => {
      const alumno = data.find((a: any) => {

        return a.modo == "activo" && a.tipoUsuario == "estudiante" && a.id == this.idAll
      });

      if (alumno) {
        alumno.modo = "no activo";
        const usuario: Alumno = {
          "nombre": alumno.nombre,
          "apellido": alumno.apellido,
          "usuario": alumno.nombre,
          "contraseña": alumno.nombre,
          "correo": alumno.nombre,
          "rut": alumno.nombre,
          "tipoUsuario": alumno.nombre,
          "modo": alumno.modo
        }
        this.apiAsistencia.cambiarModoAlumno(alumno.id, alumno).subscribe((res) => {
        });

      }
    });




  }

  cambiarModo() {
    this.http.get<any>(this.apiAsistencia.URLASIS).subscribe(data => {
      const producto = data.find((a: any) => {

        return a.modo == "activo" && a.siglas == this.siglasAsign && a.idAlumno == this.idAll
      });

      if (producto) {
        producto.modo = "no activo";
        const carrito: Asistencia = {
          "nombre": producto.nombre,
          "jornada": producto.jornada,
          "siglas": producto.siglas,
          "fecha": producto.fecha,
          "idProfesor": producto.idProfesor,
          "idAlumno": producto.idAlumno,
          "idAsignatura": producto.idAsignatura,
          "rutAlumno": producto.rutAlumno,
          "PnombreAlumno": producto.PnombreAlumno,
          "PapellidoAlumno": producto.PapellidoAlumno,
          "asistencia": producto.asistencia,
          "modo": producto.modo

        }
        console.log(carrito);
        this.apiAsistencia.cambiarAsistenciav2(producto.id, producto).subscribe((res) => {
        });
      }
    });

    this.http.get<any>(this.apiAsistencia.URLUSER).subscribe(data => {
      const alumno = data.find((a: any) => {

        return a.modo == "activo" && a.tipoUsuario == "estudiante" && a.id == this.idAll
      });

      if (alumno) {
        alumno.modo = "no activo";
        const usuario: Alumno = {
          "nombre": alumno.nombre,
          "apellido": alumno.apellido,
          "usuario": alumno.nombre,
          "contraseña": alumno.nombre,
          "correo": alumno.nombre,
          "rut": alumno.nombre,
          "tipoUsuario": alumno.nombre,
          "modo": alumno.modo
        }
        this.apiAsistencia.cambiarModoAlumno(alumno.id, alumno).subscribe((res) => {
        });

      }
    });

  }
}
