export interface Alumno {
  nombre: string,
  apellido: string,
  usuario: string,
  contraseña: string;
  correo: string;
  rut: string;
  tipoUsuario: string;
  modo: string;
}

export interface AlumnoConId extends Alumno {
  id: number
}

export interface AlumnoPartial extends Partial<Alumno> { }
