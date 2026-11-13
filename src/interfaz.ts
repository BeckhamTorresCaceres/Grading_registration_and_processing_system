/**
 * Archivo: src/interfaz.ts
 * Renderizado de materias, periodos, tabla dinámica y métricas.
 */

import { RegistroCalificacion, ResumenGrupo } from './tipos';

export const Interfaz = {
  /**
   * Actualiza los selectores de materias tanto en el formulario como en el filtro
   */
  renderizarSelectMaterias(materias: string[], selectedMateria: string = ''): void {
    const selectForm = document.getElementById('materia') as HTMLSelectElement | null;
    const selectFiltro = document.getElementById('filtro-materia') as HTMLSelectElement | null;

    if (selectForm) {
      selectForm.innerHTML = materias.map(m => {
        const isSelected = m === selectedMateria ? 'selected' : '';
        return `<option value="${m}" ${isSelected}>${m}</option>`;
      }).join('');
    }

    if (selectFiltro) {
      const valorPrevio = selectFiltro.value || 'todas';
      selectFiltro.innerHTML = `
        <option value="todas">Todas las materias</option>
        ${materias.map(m => `<option value="${m}" ${m === valorPrevio ? 'selected' : ''}>${m}</option>`).join('')}
      `;
    }
  },

  /**
   * Renderiza la tabla con los 3 periodos y el promedio de cada materia
   */
  renderizarTabla(lista: RegistroCalificacion[]): void {
    const tbody = document.getElementById('tabla-estudiantes') as HTMLTableSectionElement | null;
    const mensajeVacio = document.getElementById('mensaje-vacio') as HTMLDivElement | null;
    const contenedorTabla = document.getElementById('contenedor-tabla') as HTMLDivElement | null;

    if (!tbody) return;

    if (!lista || lista.length === 0) {
      tbody.innerHTML = '';
      if (mensajeVacio) mensajeVacio.classList.remove('hidden');
      if (contenedorTabla) contenedorTabla.classList.add('hidden');
      return;
    }

    if (mensajeVacio) mensajeVacio.classList.add('hidden');
    if (contenedorTabla) contenedorTabla.classList.remove('hidden');

    tbody.innerHTML = lista.map((registro, index) => {
      const esAprobado = registro.estado === 'Aprobado';

      // Badge de estado (> 70)
      const badgeEstado = esAprobado
        ? `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
             <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
             Aprobado (&gt; 70)
           </span>`
        : `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300">
             <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
             No Aprobado (≤ 70)
           </span>`;

      const colorPromedio = esAprobado ? 'text-emerald-600' : 'text-rose-600';

      // Estilo de cada periodo individual
      const formatPeriodo = (nota: number) => {
        const pass = nota > 70;
        return `<span class="px-2 py-0.5 rounded text-xs font-mono font-medium ${pass ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}">${nota}</span>`;
      };

      return `
        <tr class="hover:bg-slate-50 transition-colors border-b border-slate-200">
          <td class="px-3 py-3 text-center text-xs text-slate-500 font-medium">${index + 1}</td>
          <td class="px-3 py-3 text-sm font-semibold text-slate-800">${registro.nombre}</td>
          <td class="px-3 py-3 text-sm">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
              ${registro.materia}
            </span>
          </td>
          <td class="px-2 py-3 text-center">${formatPeriodo(registro.periodo1)}</td>
          <td class="px-2 py-3 text-center">${formatPeriodo(registro.periodo2)}</td>
          <td class="px-2 py-3 text-center">${formatPeriodo(registro.periodo3)}</td>
          <td class="px-3 py-3 text-center font-bold font-mono text-sm ${colorPromedio}">
            ${registro.promedio.toFixed(2)}
          </td>
          <td class="px-3 py-3 text-center">
            ${badgeEstado}
          </td>
          <td class="px-3 py-3 text-center">
            <button
              type="button"
              onclick="window.app.eliminar(${registro.id})"
              class="text-rose-600 hover:text-rose-800 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
              title="Eliminar registro"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  /**
   * Actualiza las tarjetas resumen
   */
  actualizarResumen(resumen: ResumenGrupo, promedioGeneral: number): void {
    const totalEl = document.getElementById('total-estudiantes');
    const promedioEl = document.getElementById('promedio-general');
    const aprobadosEl = document.getElementById('total-aprobados');
    const noAprobadosEl = document.getElementById('total-no-aprobados');

    if (totalEl) totalEl.textContent = String(resumen.total);
    if (aprobadosEl) aprobadosEl.textContent = String(resumen.aprobados);
    if (noAprobadosEl) noAprobadosEl.textContent = String(resumen.noAprobados);

    if (promedioEl) {
      promedioEl.textContent = resumen.total > 0 ? promedioGeneral.toFixed(2) : '0.00';
    }
  },

  /**
   * Muestra alertas flotantes
   */
  mostrarMensaje(mensaje: string, tipo: 'exito' | 'error' = 'exito'): void {
    const contenedor = document.getElementById('contenedor-alerta');
    if (!contenedor) return;

    const esExito = tipo === 'exito';
    contenedor.className = `p-4 mb-4 rounded-xl border text-sm flex items-center gap-3 transition-all ${
      esExito
        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
        : 'bg-rose-50 border-rose-200 text-rose-800'
    }`;

    contenedor.innerHTML = `
      <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        ${esExito
          ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />'
          : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />'}
      </svg>
      <span class="font-medium">${mensaje}</span>
    `;

    contenedor.classList.remove('hidden');

    setTimeout(() => {
      contenedor.classList.add('hidden');
    }, 3500);
  }
};

(window as any).Interfaz = Interfaz;
