/**
 * Archivo: src/tipos.ts
 * Definición de tipos e interfaces para el sistema con materias y 3 periodos.
 */

export type EstadoEstudiante = 'Aprobado' | 'No Aprobado';

// Registro de calificaciones de un estudiante en una materia con sus 3 periodos
export interface RegistroCalificacion {
  id: number;
  nombre: string;
  materia: string;
  periodo1: number;
  periodo2: number;
  periodo3: number;
  promedio: number;
  estado: EstadoEstudiante;
}

// Estructura de validación
export interface ResultadoValidacion<T = any> {
  esValido: boolean;
  valor?: T;
  mensaje: string;
}

// Resumen del grupo
export interface ResumenGrupo {
  total: number;
  aprobados: number;
  noAprobados: number;
}
