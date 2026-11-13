/**
 * Archivo: src/app.ts
 * Coordinador de eventos y lógica del sistema con materias y 3 periodos.
 */

import { Validaciones } from './validaciones';
import { GestorNotas } from './gestor';
import { Interfaz } from './interfaz';
import { RegistroCalificacion } from './tipos';

export const app = {
  filtroEstado: 'todos' as 'todos' | 'aprobados' | 'no-aprobados',
  filtroMateria: 'todas',

  /**
   * Inicializa la aplicación
   */
  init(): void {
    // 1. Cargar datos de almacenamiento
    GestorNotas.cargarDatos();

    // 2. Renderizar selectores de materias
    Interfaz.renderizarSelectMaterias(GestorNotas.obtenerMaterias());

    // 3. Enlazar eventos del usuario
    this.enlazarEventos();

    // 4. Actualizar vista de tabla y estadísticas
    this.actualizarVista();

    console.log('Sistema con materias y 3 periodos inicializado correctamente.');
  },

  /**
   * Enlaza los eventos de formularios, filtros y modales
   */
  enlazarEventos(): void {
    // Formulario de registro de estudiante y sus 3 periodos
    const formEstudiante = document.getElementById('formulario-estudiante') as HTMLFormElement | null;
    if (formEstudiante) {
      formEstudiante.addEventListener('submit', (e: Event) => this.manejarRegistroEstudiante(e));
    }

    // Formulario para agregar una nueva materia
    const formMateria = document.getElementById('form-nueva-materia') as HTMLFormElement | null;
    if (formMateria) {
      formMateria.addEventListener('submit', (e: Event) => this.manejarNuevaMateria(e));
    }

    // Modal de nueva materia: abrir / cerrar
    const btnAbrirModal = document.getElementById('btn-abrir-modal-materia');
    const btnCerrarModal = document.getElementById('btn-cerrar-modal-materia');
    const modalMateria = document.getElementById('modal-materia');

    if (btnAbrirModal && modalMateria) {
      btnAbrirModal.addEventListener('click', () => {
        modalMateria.classList.remove('hidden');
        const inputMateria = document.getElementById('nueva-materia-nombre') as HTMLInputElement | null;
        if (inputMateria) {
          inputMateria.value = '';
          inputMateria.focus();
        }
      });
    }

    if (btnCerrarModal && modalMateria) {
      btnCerrarModal.addEventListener('click', () => {
        modalMateria.classList.add('hidden');
      });
    }

    // Filtro por materia
    const selectFiltroMateria = document.getElementById('filtro-materia') as HTMLSelectElement | null;
    if (selectFiltroMateria) {
      selectFiltroMateria.addEventListener('change', (e: Event) => {
        this.filtroMateria = (e.target as HTMLSelectElement).value;
        this.actualizarVista();
      });
    }

    // Filtros por estado (Todos, Aprobados, No Aprobados)
    const botonesFiltro = document.querySelectorAll<HTMLButtonElement>('[data-filtro]');
    botonesFiltro.forEach(boton => {
      boton.addEventListener('click', (e: MouseEvent) => {
        botonesFiltro.forEach(b => {
          b.classList.remove('bg-emerald-600', 'text-white');
          b.classList.add('bg-white', 'text-slate-700');
        });

        const target = e.currentTarget as HTMLButtonElement;
        target.classList.remove('bg-white', 'text-slate-700');
        target.classList.add('bg-emerald-600', 'text-white');

        this.filtroEstado = (target.dataset.filtro as any) || 'todos';
        this.actualizarVista();
      });
    });

    // Botón para vaciar la lista
    const btnLimpiar = document.getElementById('btn-limpiar') as HTMLButtonElement | null;
    if (btnLimpiar) {
      btnLimpiar.addEventListener('click', () => {
        if (GestorNotas.obtenerLista().length === 0) return;
        if (confirm('¿Deseas vaciar la lista de calificaciones?')) {
          GestorNotas.limpiarLista();
          this.actualizarVista();
          Interfaz.mostrarMensaje('Se ha vaciado la lista.', 'exito');
        }
      });
    }

    // Botón para restablecer datos de ejemplo
    const btnEjemplo = document.getElementById('btn-ejemplo') as HTMLButtonElement | null;
    if (btnEjemplo) {
      btnEjemplo.addEventListener('click', () => {
        GestorNotas.restablecerEjemplos();
        Interfaz.renderizarSelectMaterias(GestorNotas.obtenerMaterias());
        this.actualizarVista();
        Interfaz.mostrarMensaje('Datos de ejemplo restaurados.', 'exito');
      });
    }

    // Cálculo dinámico en tiempo real del promedio de los 3 periodos
    const p1 = document.getElementById('periodo1') as HTMLInputElement | null;
    const p2 = document.getElementById('periodo2') as HTMLInputElement | null;
    const p3 = document.getElementById('periodo3') as HTMLInputElement | null;
    const previewPromedio = document.getElementById('preview-promedio');

    const actualizarPreview = () => {
      if (!p1 || !p2 || !p3 || !previewPromedio) return;
      const v1 = parseFloat(p1.value);
      const v2 = parseFloat(p2.value);
      const v3 = parseFloat(p3.value);

      if (!isNaN(v1) && !isNaN(v2) && !isNaN(v3)) {
        const avg = Math.round(((v1 + v2 + v3) / 3) * 100) / 100;
        const pass = avg > 70;
        previewPromedio.innerHTML = `
          Promedio calculado: <strong class="${pass ? 'text-emerald-700' : 'text-rose-700'}">${avg.toFixed(2)}</strong>
          (${pass ? 'Aprobado > 70' : 'No Aprobado ≤ 70'})
        `;
        previewPromedio.classList.remove('hidden');
      } else {
        previewPromedio.classList.add('hidden');
      }
    };

    [p1, p2, p3].forEach(input => {
      if (input) input.addEventListener('input', actualizarPreview);
    });
  },

  /**
   * Maneja la creación de una nueva materia
   */
  manejarNuevaMateria(e: Event): void {
    e.preventDefault();
    const input = document.getElementById('nueva-materia-nombre') as HTMLInputElement | null;
    const errorEl = document.getElementById('error-nueva-materia');

    if (!input) return;
    if (errorEl) errorEl.textContent = '';

    const val = Validaciones.validarMateria(input.value);
    if (!val.esValido) {
      if (errorEl) errorEl.textContent = val.mensaje;
      input.focus();
      return;
    }

    const agregada = GestorNotas.agregarMateria(val.valor!);
    if (!agregada) {
      if (errorEl) errorEl.textContent = 'Esta materia ya existe en la lista.';
      return;
    }

    // Actualizar selectores de materias y seleccionar la nueva materia
    Interfaz.renderizarSelectMaterias(GestorNotas.obtenerMaterias(), val.valor!);

    // Cerrar modal
    const modalMateria = document.getElementById('modal-materia');
    if (modalMateria) modalMateria.classList.add('hidden');

    input.value = '';
    Interfaz.mostrarMensaje(`Materia "${val.valor}" agregada exitosamente.`, 'exito');
  },

  /**
   * Maneja el registro de un estudiante con sus 3 periodos
   */
  manejarRegistroEstudiante(e: Event): void {
    e.preventDefault();

    const inputNombre = document.getElementById('nombre') as HTMLInputElement | null;
    const selectMateria = document.getElementById('materia') as HTMLSelectElement | null;
    const inputP1 = document.getElementById('periodo1') as HTMLInputElement | null;
    const inputP2 = document.getElementById('periodo2') as HTMLInputElement | null;
    const inputP3 = document.getElementById('periodo3') as HTMLInputElement | null;

    const errorNombre = document.getElementById('error-nombre');
    const errorP1 = document.getElementById('error-periodo1');
    const errorP2 = document.getElementById('error-periodo2');
    const errorP3 = document.getElementById('error-periodo3');

    // Limpiar errores
    [errorNombre, errorP1, errorP2, errorP3].forEach(el => {
      if (el) el.textContent = '';
    });

    const nombre = inputNombre ? inputNombre.value : '';
    const materia = selectMateria ? selectMateria.value : '';
    const p1 = inputP1 ? inputP1.value : '';
    const p2 = inputP2 ? inputP2.value : '';
    const p3 = inputP3 ? inputP3.value : '';

    // Validar nombre
    const valNombre = Validaciones.validarNombre(nombre);
    if (!valNombre.esValido) {
      if (errorNombre) errorNombre.textContent = valNombre.mensaje;
      if (inputNombre) inputNombre.focus();
      return;
    }

    // Validar Periodo 1
    const valP1 = Validaciones.validarPeriodo(p1, 1);
    if (!valP1.esValido) {
      if (errorP1) errorP1.textContent = valP1.mensaje;
      if (inputP1) inputP1.focus();
      return;
    }

    // Validar Periodo 2
    const valP2 = Validaciones.validarPeriodo(p2, 2);
    if (!valP2.esValido) {
      if (errorP2) errorP2.textContent = valP2.mensaje;
      if (inputP2) inputP2.focus();
      return;
    }

    // Validar Periodo 3
    const valP3 = Validaciones.validarPeriodo(p3, 3);
    if (!valP3.esValido) {
      if (errorP3) errorP3.textContent = valP3.mensaje;
      if (inputP3) inputP3.focus();
      return;
    }

    // Guardar registro con los 3 periodos y la materia
    const nuevo = GestorNotas.agregarRegistro(
      valNombre.valor!,
      materia,
      valP1.valor!,
      valP2.valor!,
      valP3.valor!
    );

    // Limpiar formulario
    if (inputNombre) inputNombre.value = '';
    if (inputP1) inputP1.value = '';
    if (inputP2) inputP2.value = '';
    if (inputP3) inputP3.value = '';
    const preview = document.getElementById('preview-promedio');
    if (preview) preview.classList.add('hidden');
    if (inputNombre) inputNombre.focus();

    // Actualizar vista
    this.actualizarVista();

    const estadoTexto = nuevo.estado === 'Aprobado' ? 'Aprobó (> 70)' : 'No aprobó (≤ 70)';
    Interfaz.mostrarMensaje(
      `Calificaciones guardadas para "${nuevo.nombre}" en ${nuevo.materia}. Promedio final: ${nuevo.promedio} (${estadoTexto}).`,
      'exito'
    );
  },

  /**
   * Elimina un registro de la lista
   */
  eliminar(id: number): void {
    GestorNotas.eliminarRegistro(id);
    this.actualizarVista();
    Interfaz.mostrarMensaje('Registro eliminado de la lista.', 'exito');
  },

  /**
   * Actualiza la tabla y tarjetas de métricas según los filtros
   */
  actualizarVista(): void {
    let lista: RegistroCalificacion[] = GestorNotas.obtenerLista();

    // Filtro por materia
    if (this.filtroMateria !== 'todas') {
      lista = lista.filter(r => r.materia === this.filtroMateria);
    }

    // Filtro por estado
    if (this.filtroEstado === 'aprobados') {
      lista = lista.filter(r => r.estado === 'Aprobado');
    } else if (this.filtroEstado === 'no-aprobados') {
      lista = lista.filter(r => r.estado === 'No Aprobado');
    }

    // Renderizar tabla
    Interfaz.renderizarTabla(lista);

    // Calcular estadísticas
    const resumen = GestorNotas.obtenerResumen();
    const promedio = GestorNotas.calcularPromedioGeneral();

    // Actualizar tarjetas de resumen
    Interfaz.actualizarResumen(resumen, promedio);
  }
};

(window as any).app = app;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}
