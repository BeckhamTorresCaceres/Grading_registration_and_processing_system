/**
 * Archivo: src/gestor.ts
 * Manejo de la lista de materias, la lista de calificaciones de los 3 periodos y cálculos.
 */

import { RegistroCalificacion, ResumenGrupo, EstadoEstudiante } from './tipos';

// 1. LISTA DE MATERIAS DISPONIBLES
let listaMaterias: string[] = ['Programación Web', 'Bases de Datos', 'Matemáticas', 'Inglés Técnico'];

// 2. LISTA PRINCIPAL DE REGISTROS DE ESTUDIANTES
let listaRegistros: RegistroCalificacion[] = [];

// Claves de almacenamiento
const STORAGE_REGISTROS_KEY = 'sena_registros_calificaciones_v2';
const STORAGE_MATERIAS_KEY = 'sena_lista_materias_v2';

export const GestorNotas = {
  /**
   * Inicializa y carga datos desde localStorage o genera ejemplos iniciales
   */
  cargarDatos(): void {
    try {
      // Cargar materias
      const materiasGuardadas = localStorage.getItem(STORAGE_MATERIAS_KEY);
      if (materiasGuardadas) {
        listaMaterias = JSON.parse(materiasGuardadas);
      }

      // Cargar registros de calificaciones
      const registrosGuardados = localStorage.getItem(STORAGE_REGISTROS_KEY);
      if (registrosGuardados) {
        listaRegistros = JSON.parse(registrosGuardados);
      } else {
        // Datos de ejemplo iniciales con los 3 periodos por materia
        listaRegistros = [
          {
            id: 1,
            nombre: 'Carlos Rodríguez',
            materia: 'Programación Web',
            periodo1: 85,
            periodo2: 90,
            periodo3: 78,
            promedio: 84.33,
            estado: 'Aprobado'
          },
          {
            id: 2,
            nombre: 'María Camila Gómez',
            materia: 'Bases de Datos',
            periodo1: 92,
            periodo2: 95,
            periodo3: 88,
            promedio: 91.67,
            estado: 'Aprobado'
          },
          {
            id: 3,
            nombre: 'Juan David Martínez',
            materia: 'Matemáticas',
            periodo1: 65,
            periodo2: 58,
            periodo3: 62,
            promedio: 61.67,
            estado: 'No Aprobado'
          },
          {
            id: 4,
            nombre: 'Valentina Restrepo',
            materia: 'Inglés Técnico',
            periodo1: 70,
            periodo2: 68,
            periodo3: 71,
            promedio: 69.67,
            estado: 'No Aprobado' // Promedio <= 70 es No Aprobado
          },
          {
            id: 5,
            nombre: 'Andrés Felipe Pérez',
            materia: 'Programación Web',
            periodo1: 75,
            periodo2: 80,
            periodo3: 82,
            promedio: 79.0,
            estado: 'Aprobado'
          }
        ];
        this.guardarEnStorage();
      }
    } catch (e) {
      console.warn('Error al leer de localStorage:', e);
    }
  },

  /**
   * Guarda las listas en localStorage
   */
  guardarEnStorage(): void {
    try {
      localStorage.setItem(STORAGE_MATERIAS_KEY, JSON.stringify(listaMaterias));
      localStorage.setItem(STORAGE_REGISTROS_KEY, JSON.stringify(listaRegistros));
    } catch (e) {
      console.warn('Error al persistir en localStorage:', e);
    }
  },

  /**
   * Obtiene la lista de materias disponibles
   */
  obtenerMaterias(): string[] {
    return listaMaterias;
  },

  /**
   * Agrega una nueva materia a la lista de materias disponibles
   * @param nombreMateria
   * @returns boolean true si se agregó, false si ya existía
   */
  agregarMateria(nombreMateria: string): boolean {
    const limpia = nombreMateria.trim();
    const yaExiste = listaMaterias.some(m => m.toLowerCase() === limpia.toLowerCase());
    if (yaExiste) {
      return false;
    }
    listaMaterias.push(limpia);
    this.guardarEnStorage();
    return true;
  },

  /**
   * Obtiene la lista completa de registros
   */
  obtenerLista(): RegistroCalificacion[] {
    return listaRegistros;
  },

  /**
   * Agrega un nuevo registro con los 3 periodos de la materia seleccionada
   */
  agregarRegistro(
    nombre: string,
    materia: string,
    p1: number,
    p2: number,
    p3: number
  ): RegistroCalificacion {
    const nota1 = Number(p1);
    const nota2 = Number(p2);
    const nota3 = Number(p3);

    // Calcular el promedio de los 3 periodos
    const suma = nota1 + nota2 + nota3;
    const promedio = Math.round((suma / 3) * 100) / 100;

    // Regla de aprobación: Mayor a 70 es Aprobado, de lo contrario No Aprobado
    const estado: EstadoEstudiante = promedio > 70 ? 'Aprobado' : 'No Aprobado';

    const nuevoRegistro: RegistroCalificacion = {
      id: Date.now(),
      nombre: nombre.trim(),
      materia: materia.trim(),
      periodo1: nota1,
      periodo2: nota2,
      periodo3: nota3,
      promedio,
      estado
    };

    listaRegistros.push(nuevoRegistro);
    this.guardarEnStorage();

    return nuevoRegistro;
  },

  /**
   * Elimina un registro de la lista por su id
   */
  eliminarRegistro(id: number): void {
    listaRegistros = listaRegistros.filter(reg => reg.id !== Number(id));
    this.guardarEnStorage();
  },

  /**
   * Calcula el promedio general del grupo (promedio de los promedios finales)
   */
  calcularPromedioGeneral(): number {
    if (listaRegistros.length === 0) return 0;
    const suma = listaRegistros.reduce((acc, reg) => acc + reg.promedio, 0);
    const promedio = suma / listaRegistros.length;
    return Math.round(promedio * 100) / 100;
  },

  /**
   * Obtiene el resumen de totales, aprobados y no aprobados
   */
  obtenerResumen(): ResumenGrupo {
    const total = listaRegistros.length;
    const aprobados = listaRegistros.filter(reg => reg.estado === 'Aprobado').length;
    const noAprobados = total - aprobados;

    return { total, aprobados, noAprobados };
  },

  /**
   * Vacía toda la lista de registros
   */
  limpiarLista(): void {
    listaRegistros = [];
    this.guardarEnStorage();
  },

  /**
   * Restablece los datos de prueba
   */
  restablecerEjemplos(): void {
    listaMaterias = ['Programación Web', 'Bases de Datos', 'Matemáticas', 'Inglés Técnico'];
    listaRegistros = [
      {
        id: 1,
        nombre: 'Carlos Rodríguez',
        materia: 'Programación Web',
        periodo1: 85,
        periodo2: 90,
        periodo3: 78,
        promedio: 84.33,
        estado: 'Aprobado'
      },
      {
        id: 2,
        nombre: 'María Camila Gómez',
        materia: 'Bases de Datos',
        periodo1: 92,
        periodo2: 95,
        periodo3: 88,
        promedio: 91.67,
        estado: 'Aprobado'
      },
      {
        id: 3,
        nombre: 'Juan David Martínez',
        materia: 'Matemáticas',
        periodo1: 65,
        periodo2: 58,
        periodo3: 62,
        promedio: 61.67,
        estado: 'No Aprobado'
      },
      {
        id: 4,
        nombre: 'Valentina Restrepo',
        materia: 'Inglés Técnico',
        periodo1: 70,
        periodo2: 68,
        periodo3: 71,
        promedio: 69.67,
        estado: 'No Aprobado'
      },
      {
        id: 5,
        nombre: 'Andrés Felipe Pérez',
        materia: 'Programación Web',
        periodo1: 75,
        periodo2: 80,
        periodo3: 82,
        promedio: 79.0,
        estado: 'Aprobado'
      }
    ];
    this.guardarEnStorage();
  }
};

(window as any).GestorNotas = GestorNotas;
