# Sistema de Calificaciones por Materias y Periodos (SENA) - TypeScript

> **Actividad:** Sistema modular en TypeScript para registrar y procesar las calificaciones de aprendices organizadas por **materias**, donde cada materia cuenta con **3 periodos (0 a 100)**, cálculo de promedio final, evaluación de aprobación (**mayor a 70 es aprobado**, de lo contrario es no aprobado), posibilidad de **agregar nuevas materias** dinámicamente y cálculo del **promedio general del grupo**.

---

## 🚀 Nuevas Funcionalidades Implementadas

1. **Gestión Dinámica de Materias:**
   - Materias iniciales predefinidas: *Programación Web, Bases de Datos, Matemáticas, Inglés Técnico*.
   - Botón interactivo **`+ Nueva Materia`** con ventana modal para crear y agregar nuevas materias a la lista en cualquier momento.
   - Selector desplegable para filtrar la tabla por materia específica o ver todas.
2. **3 Periodos de Calificación por Materia:**
   - Cada registro solicita obligatoriamente las notas de los **3 periodos**:
     * **Periodo 1 (P1):** Escala de 0 a 100.
     * **Periodo 2 (P2):** Escala de 0 a 100.
     * **Periodo 3 (P3):** Escala de 0 a 100.
   - Vista previa del promedio calculada en vivo mientras el profesor escribe las 3 notas.
3. **Cálculo de Promedio y Regla de Aprobación:**
   $$\text{Promedio} = \frac{P_1 + P_2 + P_3}{3}$$
   - **Promedio > 70:** `Aprobado` (Insignia verde con check).
   - **Promedio ≤ 70:** `No Aprobado` (Insignia roja).
4. **Almacenamiento en Listas Tipadas:**
   - `listaMaterias: string[] = [...]`
   - `listaRegistros: RegistroCalificacion[] = [...]`
   - Persistencia automática en el `localStorage` del navegador.
5. **Filtros Interactivos:**
   - Filtro por **Materia** (Todas o una materia específica).
   - Filtro por **Estado** (*Todos*, *Aprobados*, *No Aprobados*).
6. **Métricas Globales:**
   - Total de registros.
   - Promedio general de todas las calificaciones del grupo.
   - Conteo de aprobados y no aprobados.

---

## 📁 Estructura del Código Fuente (`src/`)

- **`src/tipos.ts`**: Definición de la interfaz `RegistroCalificacion`, `EstadoEstudiante` y `ResumenGrupo`.
- **`src/validaciones.ts`**: Valida nombre del estudiante, nombre de materia y notas de los 3 periodos (rango 0 a 100).
- **`src/gestor.ts`**: Administra la lista de materias y la lista de registros, realiza los cálculos de promedios y almacena en memoria y `localStorage`.
- **`src/interfaz.ts`**: Manipula el DOM para mostrar la tabla con columnas P1, P2, P3, promedio final, insignias y selectores.
- **`src/app.ts`**: Inicializador, controlador de formularios, modales y filtros.

---

## 🛠️ Comandos de Compilación

```bash
# Compilar TypeScript a JavaScript (genera js/app.js)
npm run build

# Modo observador (recompila en automático al guardar cambios en src/)
npm run watch

# Chequeo estricto de tipos
npm run typecheck
```

---

## 💻 ¿Cómo Usarlo?

Simplemente abre el archivo **`index.html`** en tu navegador o mediante la extensión *Live Server* de Visual Studio Code.
