"use strict";
(() => {
  // src/validaciones.ts
  var Validaciones = {
    /**
     * Valida el nombre del estudiante (solo letras, espacios, mínimo 3 caracteres).
     */
    validarNombre(nombre) {
      if (!nombre || typeof nombre !== "string") {
        return { esValido: false, valor: "", mensaje: "El nombre del estudiante es obligatorio." };
      }
      const limpio = nombre.trim();
      if (limpio.length < 3) {
        return { esValido: false, valor: limpio, mensaje: "El nombre debe tener al menos 3 letras." };
      }
      const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
      if (!regexLetras.test(limpio)) {
        return { esValido: false, valor: limpio, mensaje: "El nombre solo debe contener letras." };
      }
      return { esValido: true, valor: limpio, mensaje: "" };
    },
    /**
     * Valida el nombre de una nueva materia.
     */
    validarMateria(materia) {
      if (!materia || typeof materia !== "string") {
        return { esValido: false, valor: "", mensaje: "El nombre de la materia es obligatorio." };
      }
      const limpio = materia.trim();
      if (limpio.length < 3) {
        return { esValido: false, valor: limpio, mensaje: "La materia debe tener al menos 3 caracteres." };
      }
      return { esValido: true, valor: limpio, mensaje: "" };
    },
    /**
     * Valida la calificación de un periodo (debe ser numérico entre 0 y 100).
     */
    validarPeriodo(calificacion, periodoNumero) {
      if (calificacion === "" || calificacion === null || calificacion === void 0) {
        return { esValido: false, valor: 0, mensaje: `La nota del Periodo ${periodoNumero} es obligatoria.` };
      }
      const nota = Number(calificacion);
      if (isNaN(nota)) {
        return { esValido: false, valor: 0, mensaje: `El Periodo ${periodoNumero} debe ser un n\xFAmero.` };
      }
      if (nota < 0 || nota > 100) {
        return { esValido: false, valor: nota, mensaje: `El Periodo ${periodoNumero} debe estar entre 0 y 100.` };
      }
      return { esValido: true, valor: nota, mensaje: "" };
    }
  };
  window.Validaciones = Validaciones;

  // src/gestor.ts
  var listaMaterias = ["Programaci\xF3n Web", "Bases de Datos", "Matem\xE1ticas", "Ingl\xE9s T\xE9cnico"];
  var listaRegistros = [];
  var STORAGE_REGISTROS_KEY = "sena_registros_calificaciones_v2";
  var STORAGE_MATERIAS_KEY = "sena_lista_materias_v2";
  var GestorNotas = {
    /**
     * Inicializa y carga datos desde localStorage o genera ejemplos iniciales
     */
    cargarDatos() {
      try {
        const materiasGuardadas = localStorage.getItem(STORAGE_MATERIAS_KEY);
        if (materiasGuardadas) {
          listaMaterias = JSON.parse(materiasGuardadas);
        }
        const registrosGuardados = localStorage.getItem(STORAGE_REGISTROS_KEY);
        if (registrosGuardados) {
          listaRegistros = JSON.parse(registrosGuardados);
        } else {
          listaRegistros = [
            {
              id: 1,
              nombre: "Carlos Rodr\xEDguez",
              materia: "Programaci\xF3n Web",
              periodo1: 85,
              periodo2: 90,
              periodo3: 78,
              promedio: 84.33,
              estado: "Aprobado"
            },
            {
              id: 2,
              nombre: "Mar\xEDa Camila G\xF3mez",
              materia: "Bases de Datos",
              periodo1: 92,
              periodo2: 95,
              periodo3: 88,
              promedio: 91.67,
              estado: "Aprobado"
            },
            {
              id: 3,
              nombre: "Juan David Mart\xEDnez",
              materia: "Matem\xE1ticas",
              periodo1: 65,
              periodo2: 58,
              periodo3: 62,
              promedio: 61.67,
              estado: "No Aprobado"
            },
            {
              id: 4,
              nombre: "Valentina Restrepo",
              materia: "Ingl\xE9s T\xE9cnico",
              periodo1: 70,
              periodo2: 68,
              periodo3: 71,
              promedio: 69.67,
              estado: "No Aprobado"
              // Promedio <= 70 es No Aprobado
            },
            {
              id: 5,
              nombre: "Andr\xE9s Felipe P\xE9rez",
              materia: "Programaci\xF3n Web",
              periodo1: 75,
              periodo2: 80,
              periodo3: 82,
              promedio: 79,
              estado: "Aprobado"
            }
          ];
          this.guardarEnStorage();
        }
      } catch (e) {
        console.warn("Error al leer de localStorage:", e);
      }
    },
    /**
     * Guarda las listas en localStorage
     */
    guardarEnStorage() {
      try {
        localStorage.setItem(STORAGE_MATERIAS_KEY, JSON.stringify(listaMaterias));
        localStorage.setItem(STORAGE_REGISTROS_KEY, JSON.stringify(listaRegistros));
      } catch (e) {
        console.warn("Error al persistir en localStorage:", e);
      }
    },
    /**
     * Obtiene la lista de materias disponibles
     */
    obtenerMaterias() {
      return listaMaterias;
    },
    /**
     * Agrega una nueva materia a la lista de materias disponibles
     * @param nombreMateria
     * @returns boolean true si se agregó, false si ya existía
     */
    agregarMateria(nombreMateria) {
      const limpia = nombreMateria.trim();
      const yaExiste = listaMaterias.some((m) => m.toLowerCase() === limpia.toLowerCase());
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
    obtenerLista() {
      return listaRegistros;
    },
    /**
     * Agrega un nuevo registro con los 3 periodos de la materia seleccionada
     */
    agregarRegistro(nombre, materia, p1, p2, p3) {
      const nota1 = Number(p1);
      const nota2 = Number(p2);
      const nota3 = Number(p3);
      const suma = nota1 + nota2 + nota3;
      const promedio = Math.round(suma / 3 * 100) / 100;
      const estado = promedio > 70 ? "Aprobado" : "No Aprobado";
      const nuevoRegistro = {
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
    eliminarRegistro(id) {
      listaRegistros = listaRegistros.filter((reg) => reg.id !== Number(id));
      this.guardarEnStorage();
    },
    /**
     * Calcula el promedio general del grupo (promedio de los promedios finales)
     */
    calcularPromedioGeneral() {
      if (listaRegistros.length === 0) return 0;
      const suma = listaRegistros.reduce((acc, reg) => acc + reg.promedio, 0);
      const promedio = suma / listaRegistros.length;
      return Math.round(promedio * 100) / 100;
    },
    /**
     * Obtiene el resumen de totales, aprobados y no aprobados
     */
    obtenerResumen() {
      const total = listaRegistros.length;
      const aprobados = listaRegistros.filter((reg) => reg.estado === "Aprobado").length;
      const noAprobados = total - aprobados;
      return { total, aprobados, noAprobados };
    },
    /**
     * Vacía toda la lista de registros
     */
    limpiarLista() {
      listaRegistros = [];
      this.guardarEnStorage();
    },
    /**
     * Restablece los datos de prueba
     */
    restablecerEjemplos() {
      listaMaterias = ["Programaci\xF3n Web", "Bases de Datos", "Matem\xE1ticas", "Ingl\xE9s T\xE9cnico"];
      listaRegistros = [
        {
          id: 1,
          nombre: "Carlos Rodr\xEDguez",
          materia: "Programaci\xF3n Web",
          periodo1: 85,
          periodo2: 90,
          periodo3: 78,
          promedio: 84.33,
          estado: "Aprobado"
        },
        {
          id: 2,
          nombre: "Mar\xEDa Camila G\xF3mez",
          materia: "Bases de Datos",
          periodo1: 92,
          periodo2: 95,
          periodo3: 88,
          promedio: 91.67,
          estado: "Aprobado"
        },
        {
          id: 3,
          nombre: "Juan David Mart\xEDnez",
          materia: "Matem\xE1ticas",
          periodo1: 65,
          periodo2: 58,
          periodo3: 62,
          promedio: 61.67,
          estado: "No Aprobado"
        },
        {
          id: 4,
          nombre: "Valentina Restrepo",
          materia: "Ingl\xE9s T\xE9cnico",
          periodo1: 70,
          periodo2: 68,
          periodo3: 71,
          promedio: 69.67,
          estado: "No Aprobado"
        },
        {
          id: 5,
          nombre: "Andr\xE9s Felipe P\xE9rez",
          materia: "Programaci\xF3n Web",
          periodo1: 75,
          periodo2: 80,
          periodo3: 82,
          promedio: 79,
          estado: "Aprobado"
        }
      ];
      this.guardarEnStorage();
    }
  };
  window.GestorNotas = GestorNotas;

  // src/interfaz.ts
  var Interfaz = {
    /**
     * Actualiza los selectores de materias tanto en el formulario como en el filtro
     */
    renderizarSelectMaterias(materias, selectedMateria = "") {
      const selectForm = document.getElementById("materia");
      const selectFiltro = document.getElementById("filtro-materia");
      if (selectForm) {
        selectForm.innerHTML = materias.map((m) => {
          const isSelected = m === selectedMateria ? "selected" : "";
          return `<option value="${m}" ${isSelected}>${m}</option>`;
        }).join("");
      }
      if (selectFiltro) {
        const valorPrevio = selectFiltro.value || "todas";
        selectFiltro.innerHTML = `
        <option value="todas">Todas las materias</option>
        ${materias.map((m) => `<option value="${m}" ${m === valorPrevio ? "selected" : ""}>${m}</option>`).join("")}
      `;
      }
    },
    /**
     * Renderiza la tabla con los 3 periodos y el promedio de cada materia
     */
    renderizarTabla(lista) {
      const tbody = document.getElementById("tabla-estudiantes");
      const mensajeVacio = document.getElementById("mensaje-vacio");
      const contenedorTabla = document.getElementById("contenedor-tabla");
      if (!tbody) return;
      if (!lista || lista.length === 0) {
        tbody.innerHTML = "";
        if (mensajeVacio) mensajeVacio.classList.remove("hidden");
        if (contenedorTabla) contenedorTabla.classList.add("hidden");
        return;
      }
      if (mensajeVacio) mensajeVacio.classList.add("hidden");
      if (contenedorTabla) contenedorTabla.classList.remove("hidden");
      tbody.innerHTML = lista.map((registro, index) => {
        const esAprobado = registro.estado === "Aprobado";
        const badgeEstado = esAprobado ? `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
             <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
             Aprobado (&gt; 70)
           </span>` : `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300">
             <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
             No Aprobado (\u2264 70)
           </span>`;
        const colorPromedio = esAprobado ? "text-emerald-600" : "text-rose-600";
        const formatPeriodo = (nota) => {
          const pass = nota > 70;
          return `<span class="px-2 py-0.5 rounded text-xs font-mono font-medium ${pass ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"}">${nota}</span>`;
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
      }).join("");
    },
    /**
     * Actualiza las tarjetas resumen
     */
    actualizarResumen(resumen, promedioGeneral) {
      const totalEl = document.getElementById("total-estudiantes");
      const promedioEl = document.getElementById("promedio-general");
      const aprobadosEl = document.getElementById("total-aprobados");
      const noAprobadosEl = document.getElementById("total-no-aprobados");
      if (totalEl) totalEl.textContent = String(resumen.total);
      if (aprobadosEl) aprobadosEl.textContent = String(resumen.aprobados);
      if (noAprobadosEl) noAprobadosEl.textContent = String(resumen.noAprobados);
      if (promedioEl) {
        promedioEl.textContent = resumen.total > 0 ? promedioGeneral.toFixed(2) : "0.00";
      }
    },
    /**
     * Muestra alertas flotantes
     */
    mostrarMensaje(mensaje, tipo = "exito") {
      const contenedor = document.getElementById("contenedor-alerta");
      if (!contenedor) return;
      const esExito = tipo === "exito";
      contenedor.className = `p-4 mb-4 rounded-xl border text-sm flex items-center gap-3 transition-all ${esExito ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-rose-50 border-rose-200 text-rose-800"}`;
      contenedor.innerHTML = `
      <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        ${esExito ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />' : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />'}
      </svg>
      <span class="font-medium">${mensaje}</span>
    `;
      contenedor.classList.remove("hidden");
      setTimeout(() => {
        contenedor.classList.add("hidden");
      }, 3500);
    }
  };
  window.Interfaz = Interfaz;

  // src/app.ts
  var app = {
    filtroEstado: "todos",
    filtroMateria: "todas",
    /**
     * Inicializa la aplicación
     */
    init() {
      GestorNotas.cargarDatos();
      Interfaz.renderizarSelectMaterias(GestorNotas.obtenerMaterias());
      this.enlazarEventos();
      this.actualizarVista();
      console.log("Sistema con materias y 3 periodos inicializado correctamente.");
    },
    /**
     * Enlaza los eventos de formularios, filtros y modales
     */
    enlazarEventos() {
      const formEstudiante = document.getElementById("formulario-estudiante");
      if (formEstudiante) {
        formEstudiante.addEventListener("submit", (e) => this.manejarRegistroEstudiante(e));
      }
      const formMateria = document.getElementById("form-nueva-materia");
      if (formMateria) {
        formMateria.addEventListener("submit", (e) => this.manejarNuevaMateria(e));
      }
      const btnAbrirModal = document.getElementById("btn-abrir-modal-materia");
      const btnCerrarModal = document.getElementById("btn-cerrar-modal-materia");
      const modalMateria = document.getElementById("modal-materia");
      if (btnAbrirModal && modalMateria) {
        btnAbrirModal.addEventListener("click", () => {
          modalMateria.classList.remove("hidden");
          const inputMateria = document.getElementById("nueva-materia-nombre");
          if (inputMateria) {
            inputMateria.value = "";
            inputMateria.focus();
          }
        });
      }
      if (btnCerrarModal && modalMateria) {
        btnCerrarModal.addEventListener("click", () => {
          modalMateria.classList.add("hidden");
        });
      }
      const selectFiltroMateria = document.getElementById("filtro-materia");
      if (selectFiltroMateria) {
        selectFiltroMateria.addEventListener("change", (e) => {
          this.filtroMateria = e.target.value;
          this.actualizarVista();
        });
      }
      const botonesFiltro = document.querySelectorAll("[data-filtro]");
      botonesFiltro.forEach((boton) => {
        boton.addEventListener("click", (e) => {
          botonesFiltro.forEach((b) => {
            b.classList.remove("bg-emerald-600", "text-white");
            b.classList.add("bg-white", "text-slate-700");
          });
          const target = e.currentTarget;
          target.classList.remove("bg-white", "text-slate-700");
          target.classList.add("bg-emerald-600", "text-white");
          this.filtroEstado = target.dataset.filtro || "todos";
          this.actualizarVista();
        });
      });
      const btnLimpiar = document.getElementById("btn-limpiar");
      if (btnLimpiar) {
        btnLimpiar.addEventListener("click", () => {
          if (GestorNotas.obtenerLista().length === 0) return;
          if (confirm("\xBFDeseas vaciar la lista de calificaciones?")) {
            GestorNotas.limpiarLista();
            this.actualizarVista();
            Interfaz.mostrarMensaje("Se ha vaciado la lista.", "exito");
          }
        });
      }
      const btnEjemplo = document.getElementById("btn-ejemplo");
      if (btnEjemplo) {
        btnEjemplo.addEventListener("click", () => {
          GestorNotas.restablecerEjemplos();
          Interfaz.renderizarSelectMaterias(GestorNotas.obtenerMaterias());
          this.actualizarVista();
          Interfaz.mostrarMensaje("Datos de ejemplo restaurados.", "exito");
        });
      }
      const p1 = document.getElementById("periodo1");
      const p2 = document.getElementById("periodo2");
      const p3 = document.getElementById("periodo3");
      const previewPromedio = document.getElementById("preview-promedio");
      const actualizarPreview = () => {
        if (!p1 || !p2 || !p3 || !previewPromedio) return;
        const v1 = parseFloat(p1.value);
        const v2 = parseFloat(p2.value);
        const v3 = parseFloat(p3.value);
        if (!isNaN(v1) && !isNaN(v2) && !isNaN(v3)) {
          const avg = Math.round((v1 + v2 + v3) / 3 * 100) / 100;
          const pass = avg > 70;
          previewPromedio.innerHTML = `
          Promedio calculado: <strong class="${pass ? "text-emerald-700" : "text-rose-700"}">${avg.toFixed(2)}</strong>
          (${pass ? "Aprobado > 70" : "No Aprobado \u2264 70"})
        `;
          previewPromedio.classList.remove("hidden");
        } else {
          previewPromedio.classList.add("hidden");
        }
      };
      [p1, p2, p3].forEach((input) => {
        if (input) input.addEventListener("input", actualizarPreview);
      });
    },
    /**
     * Maneja la creación de una nueva materia
     */
    manejarNuevaMateria(e) {
      e.preventDefault();
      const input = document.getElementById("nueva-materia-nombre");
      const errorEl = document.getElementById("error-nueva-materia");
      if (!input) return;
      if (errorEl) errorEl.textContent = "";
      const val = Validaciones.validarMateria(input.value);
      if (!val.esValido) {
        if (errorEl) errorEl.textContent = val.mensaje;
        input.focus();
        return;
      }
      const agregada = GestorNotas.agregarMateria(val.valor);
      if (!agregada) {
        if (errorEl) errorEl.textContent = "Esta materia ya existe en la lista.";
        return;
      }
      Interfaz.renderizarSelectMaterias(GestorNotas.obtenerMaterias(), val.valor);
      const modalMateria = document.getElementById("modal-materia");
      if (modalMateria) modalMateria.classList.add("hidden");
      input.value = "";
      Interfaz.mostrarMensaje(`Materia "${val.valor}" agregada exitosamente.`, "exito");
    },
    /**
     * Maneja el registro de un estudiante con sus 3 periodos
     */
    manejarRegistroEstudiante(e) {
      e.preventDefault();
      const inputNombre = document.getElementById("nombre");
      const selectMateria = document.getElementById("materia");
      const inputP1 = document.getElementById("periodo1");
      const inputP2 = document.getElementById("periodo2");
      const inputP3 = document.getElementById("periodo3");
      const errorNombre = document.getElementById("error-nombre");
      const errorP1 = document.getElementById("error-periodo1");
      const errorP2 = document.getElementById("error-periodo2");
      const errorP3 = document.getElementById("error-periodo3");
      [errorNombre, errorP1, errorP2, errorP3].forEach((el) => {
        if (el) el.textContent = "";
      });
      const nombre = inputNombre ? inputNombre.value : "";
      const materia = selectMateria ? selectMateria.value : "";
      const p1 = inputP1 ? inputP1.value : "";
      const p2 = inputP2 ? inputP2.value : "";
      const p3 = inputP3 ? inputP3.value : "";
      const valNombre = Validaciones.validarNombre(nombre);
      if (!valNombre.esValido) {
        if (errorNombre) errorNombre.textContent = valNombre.mensaje;
        if (inputNombre) inputNombre.focus();
        return;
      }
      const valP1 = Validaciones.validarPeriodo(p1, 1);
      if (!valP1.esValido) {
        if (errorP1) errorP1.textContent = valP1.mensaje;
        if (inputP1) inputP1.focus();
        return;
      }
      const valP2 = Validaciones.validarPeriodo(p2, 2);
      if (!valP2.esValido) {
        if (errorP2) errorP2.textContent = valP2.mensaje;
        if (inputP2) inputP2.focus();
        return;
      }
      const valP3 = Validaciones.validarPeriodo(p3, 3);
      if (!valP3.esValido) {
        if (errorP3) errorP3.textContent = valP3.mensaje;
        if (inputP3) inputP3.focus();
        return;
      }
      const nuevo = GestorNotas.agregarRegistro(
        valNombre.valor,
        materia,
        valP1.valor,
        valP2.valor,
        valP3.valor
      );
      if (inputNombre) inputNombre.value = "";
      if (inputP1) inputP1.value = "";
      if (inputP2) inputP2.value = "";
      if (inputP3) inputP3.value = "";
      const preview = document.getElementById("preview-promedio");
      if (preview) preview.classList.add("hidden");
      if (inputNombre) inputNombre.focus();
      this.actualizarVista();
      const estadoTexto = nuevo.estado === "Aprobado" ? "Aprob\xF3 (> 70)" : "No aprob\xF3 (\u2264 70)";
      Interfaz.mostrarMensaje(
        `Calificaciones guardadas para "${nuevo.nombre}" en ${nuevo.materia}. Promedio final: ${nuevo.promedio} (${estadoTexto}).`,
        "exito"
      );
    },
    /**
     * Elimina un registro de la lista
     */
    eliminar(id) {
      GestorNotas.eliminarRegistro(id);
      this.actualizarVista();
      Interfaz.mostrarMensaje("Registro eliminado de la lista.", "exito");
    },
    /**
     * Actualiza la tabla y tarjetas de métricas según los filtros
     */
    actualizarVista() {
      let lista = GestorNotas.obtenerLista();
      if (this.filtroMateria !== "todas") {
        lista = lista.filter((r) => r.materia === this.filtroMateria);
      }
      if (this.filtroEstado === "aprobados") {
        lista = lista.filter((r) => r.estado === "Aprobado");
      } else if (this.filtroEstado === "no-aprobados") {
        lista = lista.filter((r) => r.estado === "No Aprobado");
      }
      Interfaz.renderizarTabla(lista);
      const resumen = GestorNotas.obtenerResumen();
      const promedio = GestorNotas.calcularPromedioGeneral();
      Interfaz.actualizarResumen(resumen, promedio);
    }
  };
  window.app = app;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => app.init());
  } else {
    app.init();
  }
})();
//# sourceMappingURL=app.js.map
