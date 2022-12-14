export interface Asignatura {
  nombre: string;
  jornada: string;
  siglas: string;
  fecha: number;
  idProfesor: string;
  modo: string;

}

export interface AsignaturaId extends Asignatura{
  id: number;
}
