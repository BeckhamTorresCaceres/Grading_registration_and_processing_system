/**
 * Archivo: src/validaciones.ts
 * Lógica correspondiente a la validación de estudiantes, materias y los 3 periodos.
 */

import { ResultadoValidacion } from './tipos';

export const Validaciones = {
  /**
   * Valida el nombre del estudiante (solo letras, espacios, mínimo 3 caracteres).
   */
  validarNombre(nombre: string): ResultadoValidacion<string> {
    if (!nombre || typeof nombre !== 'string') {
      return { esValido: false, valor: '', mensaje: 'El nombre del estudiante es obligatorio.' };
    }

    const limpio = nombre.trim();
    if (limpio.length < 3) {
      return { esValido: false, valor: limpio, mensaje: 'El nombre debe tener al menos 3 letras.' };
    }

    const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!regexLetras.test(limpio)) {
      return { esValido: false, valor: limpio, mensaje: 'El nombre solo debe contener letras.' };
    }

    return { esValido: true, valor: limpio, mensaje: '' };
  },

  /**
   * Valida el nombre de una nueva materia.
   */
  validarMateria(materia: string): ResultadoValidacion<string> {
    if (!materia || typeof materia !== 'string') {
      return { esValido: false, valor: '', mensaje: 'El nombre de la materia es obligatorio.' };
    }

    const limpio = materia.trim();
    if (limpio.length < 3) {
      return { esValido: false, valor: limpio, mensaje: 'La materia debe tener al menos 3 caracteres.' };
    }

    return { esValido: true, valor: limpio, mensaje: '' };
  },

  /**
   * Valida la calificación de un periodo (debe ser numérico entre 0 y 100).
   */
  validarPeriodo(calificacion: string | number, periodoNumero: number): ResultadoValidacion<number> {
    if (calificacion === '' || calificacion === null || calificacion === undefined) {
      return { esValido: false, valor: 0, mensaje: `La nota del Periodo ${periodoNumero} es obligatoria.` };
    }

    const nota = Number(calificacion);

    if (isNaN(nota)) {
      return { esValido: false, valor: 0, mensaje: `El Periodo ${periodoNumero} debe ser un número.` };
    }

    if (nota < 0 || nota > 100) {
      return { esValido: false, valor: nota, mensaje: `El Periodo ${periodoNumero} debe estar entre 0 y 100.` };
    }

    return { esValido: true, valor: nota, mensaje: '' };
  }
};

(window as any).Validaciones = Validaciones;
