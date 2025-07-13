export interface Ubicacion {
  departamento: string;
  provincia: string;
  distrito: string;
}

export interface Estudiante {
  id?: number;
  nombres: string;
  apellidos: string;
  dni: string;
  fechaNacimiento: string;
  programa: string;
  anioIngreso: number;
  email: string;
  celular: string;
  estado?: string;
  fechaRegistro?: string;
  ubicacion: Ubicacion;
}
