import { Injectable } from '@angular/core';
import { Alumno, AlumnoConId, AlumnoPartial } from '../usuarios/alumno';
import { HttpClient } from '@angular/common/http';
import { Asignatura, AsignaturaId } from '../usuarios/asignatura';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Asistencia, AsistenciaId } from '../usuarios/asistencia';


@Injectable({
  providedIn: 'root'
})
export class ApiDuococService {
  public URLUSER="https://639260c5b750c8d178dd4a5f.mockapi.io/QR/usuarios";
  public URLASIG="https://639260c5b750c8d178dd4a5f.mockapi.io/QR/asignatura";
  public URLASIS="https://639260c5b750c8d178dd4a5f.mockapi.io/QR/asistencia";
  private paginaActual = 1;
  private comLista = new BehaviorSubject<Array<AsignaturaId>>([]);
  public listaAsignaturas$ = this.comLista.asObservable();

  constructor(
    private http: HttpClient,
    ) { }

  public agregarEstudiante(estudiante:Alumno){
    return this.http.post(`${this.URLUSER}`,estudiante,{
      headers:{
        'Content-Type':'application/json;charset=utf-8'
      }
    })
  }

  public cambiarPorID(id:any, playload:AlumnoPartial):Observable<any>{
    return this.http.put(`${this.URLUSER}/${id}`,playload,{
      headers:{
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }

  public obtenerAlumnoPorId(id:number):Observable<AlumnoConId | null>{
    return this.http.get<AlumnoConId | null>(`${this.URLUSER}/${id}`);
  }
  public idUsuario(id){
    localStorage.setItem('ID', id);
  }

  public retornarId(){
    return localStorage.getItem('ID');
  }

  public listarPrimerosElementos() {
    this.http.get<Array<AsignaturaId>>(`${this.URLASIG}?_page=1`)
      .subscribe(datos => {
        this.paginaActual = this.paginaActual + 1;
        this.comLista.next(datos);
      });
  }

  public obtenerMasElementos() {
    this.http.get<Array<AsignaturaId>>(`${this.URLASIG}?_page=${this.paginaActual}`)
      .pipe(
        delay(3000)
      )
      .subscribe(datos => {
        if (datos) {
          this.paginaActual = this.paginaActual + 1;
          this.comLista.next(this.comLista.getValue().concat(datos));
        }
      })
  }




  public getAsignatura(id: string) {
    return this.http.get<any>(`${this.URLASIG}?idProfesor=${id}`)
  }


  public obtenerAsignaturaPorId(id: number): Observable<AsignaturaId | null> {
    return this.http.get<AsignaturaId | null>(`${this.URLASIG}/${id}`);
  }


  agregarAsistencia(asistencia: Asistencia) {
    this.http.post(`${this.URLASIS}`, asistencia).subscribe(res => {
      console.log(asistencia);
    });
  }


  public obtenerAsistenciaPorId(id: number): Observable<AsistenciaId | null> {
    return this.http.get<AsistenciaId | null>(`${this.URLASIS}/${id}`);
  }



  public getAsistencia(id: string, fecha: string) {
    return this.http.get<any>(`${this.URLASIS}?idAsignatura=${id}&fecha=${fecha}`)
  }


  public idAsignatura(id){
    localStorage.setItem('IDASIG', id);
  }

  public retornarAsignId(){
    return localStorage.getItem('IDASIG');
  }

  public idAsistencia(id){
    localStorage.setItem('IDASIS', id);
  }

  public retornarAsistencia(){
    return localStorage.getItem('IDASIS');
  }





  public cambiarModoAlumno(id: string, prod: Alumno) {
    return this.http.put(`${this.URLUSER}/${id}`, prod);
  }

  public cambiarAsistenciav2(id: string, prod: Asistencia) {
    return this.http.put(`${this.URLASIS}/${id}`, prod);
  }
  public cambiarAsignatura(id: string, prod: Asignatura) {
    return this.http.put(`${this.URLASIG}/${id}`, prod);
  }
}

