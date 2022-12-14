export interface Asistencia {
  nombre: string;
  jornada: string;
  siglas: string;
  fecha: string;
  idProfesor: string;
  idAlumno: string;
  idAsignatura: string;
  rutAlumno: string;
  PnombreAlumno: string;
  PapellidoAlumno: string;
  asistencia: string;
  modo:string;

}

export interface AsistenciaId extends Asistencia {
  id:number;
}
