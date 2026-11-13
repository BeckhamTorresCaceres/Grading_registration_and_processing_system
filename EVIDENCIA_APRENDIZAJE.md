# SERVICIO NACIONAL DE APRENDIZAJE - SENA
## CENTRO DE ELECTRICIDAD, ELECTRÓNICA Y TELECOMUNICACIONES
### COORDINACIÓN DE TELEINFORMÁTICA Y ENERGÍAS
**PROGRAMA DE FORMACIÓN:** ANÁLISIS Y DESARROLLO DE SOFTWARE (ADSO) / PROGRAMACIÓN DE SOFTWARE  
**FASE DEL PROYECTO FORMATIVO:** ANÁLISIS  
**ACTIVIDAD DEL PROYECTO:** ESTRUCTURAR PROCESOS LÓGICOS PARA LA CONSTRUCCIÓN DE ALGORITMOS Y BASES DE DATOS  
**EVIDENCIA DE APRENDIZAJE:** DOCUMENTO TÉCNICO DE ESPECIFICACIÓN ALGORÍTMICA, ESTRUCTURAS LÓGICAS Y PRUEBAS DE ESCRITORIO (EVIDENCIA DE PRODUCTO)

---

## INFORMACIÓN DE LA ENTREGA

- **Nombre del Proyecto:** Sistema de Registro y Procesamiento de Calificaciones por Materias y Periodos
- **Integrantes (Pareja de Aprendices):**
  - Aprendiz 1: Beckham Torres Cáceres
  - Aprendiz 2: [Nombre del Compañero de Pareja]
- **Instructores Responsables:**
  - Julio César Castaño Bustos (Instructor – Coordinación de TIC y Energías)
  - Norma Inés Caro Amaris (Instructora – Coordinación de TIC y Energías)
- **Fecha de Elaboración:** 13 de Noviembre de 2026

---

## 1. ANÁLISIS DEL PROBLEMA

### 1.1 Planteamiento de la Situación
Una institución educativa requiere un algoritmo computacional que permita a los docentes registrar a sus aprendices, asignarlos a materias específicas y registrar las calificaciones correspondientes a **tres periodos académicos**. Con base en estas tres calificaciones (en escala de 0 a 100), el sistema debe calcular el promedio final de la materia, determinar de manera automática si el aprendiz aprobó o no aprobó la asignatura bajo la regla estricta institucional (**calificación mayor a 70 es Aprobado, de lo contrario es No Aprobado**), permitir la incorporación dinámica de nuevas materias y, al finalizar el procesamiento, consolidar y mostrar el promedio general del grupo y estadísticas de rendimiento académico.

```
                      +---------------------------------------+
                      |               PROCESO                 |
                      |  1. Validar entradas (0-100)          |
  +---------------+   |  2. Calcular promedio: (P1+P2+P3)/3   |   +-------------------+
  |   ENTRADAS    |-->|  3. Evaluar: ¿Promedio > 70?          |-->|      SALIDAS      |
  | Nombre,       |   |     - SI -> 'Aprobado'                |   | Tabla detallada,  |
  | Materia,      |   |     - NO -> 'No Aprobado'             |   | Promedio general, |
  | P1, P2, P3    |   |  4. Almacenar en lista de registros   |   | Resumen y Badges  |
  +---------------+   |  5. Calcular promedio del grupo       |   +-------------------+
                      +---------------------------------------+
```

### 1.2 Entradas (Datos Requeridos)
| Dato de Entrada | Tipo de Dato | Restricción / Validación | Descripción |
| :--- | :--- | :--- | :--- |
| `nombreEstudiante` | Cadena de texto (`String`) | Longitud mínima de 3 caracteres, obligatorio, solo letras del alfabeto y espacios. | Nombre completo del aprendiz evaluado. |
| `materia` | Cadena de texto (`String`) | Debe pertenecer al listado de materias activas o crearse previamente. | Asignatura en la cual se califica al aprendiz. |
| `periodo1` | Numérico Real (`Float`) | Obligatorio, valor numérico entre `0.00` y `100.00`. | Calificación obtenida en el primer periodo. |
| `periodo2` | Numérico Real (`Float`) | Obligatorio, valor numérico entre `0.00` y `100.00`. | Calificación obtenida en el segundo periodo. |
| `periodo3` | Numérico Real (`Float`) | Obligatorio, valor numérico entre `0.00` y `100.00`. | Calificación obtenida en el tercer periodo. |
| `nuevaMateria` | Cadena de texto (`String`) | Opcional (al pulsar agregar materia), mínimo 3 caracteres, no duplicada. | Nombre de una nueva materia a incorporar en el sistema. |

### 1.3 Procesos (Transformaciones Lógicas y Cálculos)
1. **Validación de Datos:** Comprobación de tipos y rangos. Si la calificación es menor a 0 o mayor a 100, se rechaza y se solicita corrección.
2. **Cálculo del Promedio Individual de la Materia:**
   $$\text{Promedio} = \frac{\text{Periodo}_1 + \text{Periodo}_2 + \text{Periodo}_3}{3}$$
3. **Determinación del Estado Académico (Regla de Decisión):**
   - Si $\text{Promedio} > 70.0$, el estado es **"Aprobado"**.
   - Si $\text{Promedio} \le 70.0$, el estado es **"No Aprobado"**.
4. **Almacenamiento Estructurado:** Guardar la información en un arreglo multidimensional o lista de objetos (`listaRegistros`).
5. **Cálculo del Promedio General del Grupo:**
   $$\text{Promedio General} = \frac{\sum_{i=1}^{N} \text{Promedio}_i}{N}$$
   Donde $N$ es el total de registros en la lista.
6. **Cálculo de Totales y Porcentajes:** Contabilización de aprendices aprobados y no aprobados en el grupo.

### 1.4 Salidas (Resultados Generados)
- Tabla visual e interactiva con el detalle de cada estudiante: ID, Nombre, Materia, Periodo 1, Periodo 2, Periodo 3, Promedio y Distintivo de Estado (*Aprobado* / *No Aprobado*).
- Tarjetas de métricas grupales:
  * Total de registros ingresados.
  * Promedio general consolidado del grupo.
  * Cantidad de aprendices aprobados.
  * Cantidad de aprendices no aprobados.
- Notificaciones en pantalla confirmando operaciones exitosas o reportando errores de validación.

---

## 2. DEFINICIÓN DE VARIABLES Y ESTRUCTURAS DE DATOS

| Nombre de Variable / Estructura | Tipo de Dato | Ámbito | Descripción y Propósito en el Algoritmo |
| :--- | :--- | :--- | :--- |
| `listaMaterias` | Arreglo de Cadenas (`Array<String>`) | Global | Almacena el listado de materias habilitadas en el sistema. |
| `listaRegistros` | Arreglo de Objetos (`Array<Registro>`) | Global | Estructura de datos principal donde se guardan todos los estudiantes y sus notas. |
| `idRegistro` | Numérico Entero (`Integer`) | Local/Objeto | Marca de tiempo única para identificar y eliminar registros individualmente. |
| `nombre` | Cadena (`String`) | Local | Nombre del estudiante ingresado en la interacción. |
| `materiaSeleccionada`| Cadena (`String`) | Local | Materia elegida para calificar. |
| `p1`, `p2`, `p3` | Numérico Real (`Real / Float`) | Local | Calificaciones individuales de cada periodo (0 a 100). |
| `promedioEstudiante` | Numérico Real (`Real / Float`) | Local | Resultado del cálculo del promedio de los 3 periodos. |
| `estado` | Cadena (`'Aprobado' \| 'No Aprobado'`) | Local | Indicador cualitativo resultante de evaluar la condición `promedio > 70`. |
| `sumaPromedios` | Numérico Real (`Real / Float`) | Local | Acumulador utilizado en el ciclo para totalizar las notas del grupo. |
| `promedioGeneral` | Numérico Real (`Real / Float`) | Local | Promedio aritmético de todo el grupo de aprendices. |
| `contadorAprobados` | Numérico Entero (`Integer`) | Local | Contador acumulativo de registros cuyo estado sea "Aprobado". |
| `contadorNoAprobados`| Numérico Entero (`Integer`) | Local | Contador acumulativo de registros cuyo estado sea "No Aprobado". |

---

## 3. ALGORITMO O PSEUDOCÓDIGO

A continuación se presenta el pseudocódigo estructurado bajo estándar pedagógico SENA (compatible con PSeInt):

```plaintext
Algoritmo Gestion_Calificaciones_SENA
    // -------------------------------------------------------------
    // Definición de variables y estructuras
    // -------------------------------------------------------------
    Definir listaMaterias Como Caracter
    Dimension listaMaterias[100]
    Definir totalMaterias, opcion Como Entero
    
    Definir nombres, materiasRegistradas, estados Como Caracter
    Dimension nombres[500], materiasRegistradas[500], estados[500]
    
    Definir notasP1, notasP2, notasP3, promedios Como Real
    Dimension notasP1[500], notasP2[500], notasP3[500], promedios[500]
    
    Definir totalRegistros, i, aprobados, noAprobados Como Entero
    Definir sumaGrupal, promedioGeneral Como Real
    Definir nomEstudiante, matSeleccionada, nuevaMat Como Caracter
    Definir nota1, nota2, nota3, prom Como Real
    Definir notaValida Como Logico

    // Inicialización de materias base
    listaMaterias[1] <- "Programacion Web"
    listaMaterias[2] <- "Bases de Datos"
    listaMaterias[3] <- "Matematicas"
    listaMaterias[4] <- "Ingles Tecnico"
    totalMaterias <- 4
    totalRegistros <- 0

    Repetir
        Limpiar Pantalla
        Escribir "========================================================"
        Escribir "    SISTEMA DE GESTION DE CALIFICACIONES - SENA         "
        Escribir "========================================================"
        Escribir "1. Registrar estudiante y calificaciones (3 periodos)"
        Escribir "2. Agregar nueva materia"
        Escribir "3. Mostrar lista de calificaciones y promedio grupal"
        Escribir "4. Salir"
        Escribir Sin Saltar "Seleccione una opcion (1-4): "
        Leer opcion

        Segun opcion Hacer
            1:
                Escribir "--- REGISTRO DE APRENDIZ ---"
                Repetir
                    Escribir Sin Saltar "Ingrese nombre del estudiante: "
                    Leer nomEstudiante
                Hasta Que Longitud(nomEstudiante) >= 3

                // Selección de materia disponible
                Escribir "Seleccione la materia:"
                Para i <- 1 Hasta totalMaterias Con Paso 1 Hacer
                    Escribir i, ". ", listaMaterias[i]
                FinPara
                Definir opcMat Como Entero
                Repetir
                    Escribir Sin Saltar "Numero de materia (1-", totalMaterias, "): "
                    Leer opcMat
                Hasta Que opcMat >= 1 Y opcMat <= totalMaterias
                matSeleccionada <- listaMaterias[opcMat]

                // Validación estricta Periodo 1 (0 a 100)
                Repetir
                    Escribir Sin Saltar "Ingrese calificacion Periodo 1 (0-100): "
                    Leer nota1
                    Si nota1 < 0 O nota1 > 100 Entonces
                        Escribir "ERROR: La nota debe estar entre 0 y 100."
                    FinSi
                Hasta Que nota1 >= 0 Y nota1 <= 100

                // Validación estricta Periodo 2 (0 a 100)
                Repetir
                    Escribir Sin Saltar "Ingrese calificacion Periodo 2 (0-100): "
                    Leer nota2
                    Si nota2 < 0 O nota2 > 100 Entonces
                        Escribir "ERROR: La nota debe estar entre 0 y 100."
                    FinSi
                Hasta Que nota2 >= 0 Y nota2 <= 100

                // Validación estricta Periodo 3 (0 a 100)
                Repetir
                    Escribir Sin Saltar "Ingrese calificacion Periodo 3 (0-100): "
                    Leer nota3
                    Si nota3 < 0 O nota3 > 100 Entonces
                        Escribir "ERROR: La nota debe estar entre 0 y 100."
                    FinSi
                Hasta Que nota3 >= 0 Y nota3 <= 100

                // PROCESO: Calculo de promedio
                prom <- (nota1 + nota2 + nota3) / 3

                // DECISIÓN: Regla institucional (> 70)
                totalRegistros <- totalRegistros + 1
                nombres[totalRegistros] <- nomEstudiante
                materiasRegistradas[totalRegistros] <- matSeleccionada
                notasP1[totalRegistros] <- nota1
                notasP2[totalRegistros] <- nota2
                notasP3[totalRegistros] <- nota3
                promedios[totalRegistros] <- prom

                Si prom > 70 Entonces
                    estados[totalRegistros] <- "Aprobado"
                Sino
                    estados[totalRegistros] <- "No Aprobado"
                FinSi

                Escribir ">> Registro exitoso. Promedio: ", prom, " | Estado: ", estados[totalRegistros]
                Esperar Tecla

            2:
                Escribir "--- AGREGAR NUEVA MATERIA ---"
                Escribir Sin Saltar "Ingrese el nombre de la nueva materia: "
                Leer nuevaMat
                Si Longitud(nuevaMat) >= 3 Entonces
                    totalMaterias <- totalMaterias + 1
                    listaMaterias[totalMaterias] <- nuevaMat
                    Escribir ">> Materia '", nuevaMat, "' agregada a la lista."
                Sino
                    Escribir "ERROR: Nombre de materia demasiado corto."
                FinSi
                Esperar Tecla

            3:
                Escribir "--- REPORTE GENERAL DE CALIFICACIONES ---"
                Si totalRegistros == 0 Entonces
                    Escribir "No hay calificaciones registradas en la lista."
                Sino
                    sumaGrupal <- 0
                    aprobados <- 0
                    noAprobados <- 0

                    Escribir "# | Estudiante | Materia | P1 | P2 | P3 | Promedio | Estado"
                    Escribir "----------------------------------------------------------------"
                    
                    // CICLO: Recorrido del arreglo para cálculos y visualización
                    Para i <- 1 Hasta totalRegistros Con Paso 1 Hacer
                        Escribir i, " | ", nombres[i], " | ", materiasRegistradas[i], " | ", notasP1[i], " | ", notasP2[i], " | ", notasP3[i], " | ", promedios[i], " | ", estados[i]
                        sumaGrupal <- sumaGrupal + promedios[i]
                        
                        Si estados[i] == "Aprobado" Entonces
                            aprobados <- aprobados + 1
                        Sino
                            noAprobados <- noAprobados + 1
                        FinSi
                    FinPara

                    promedioGeneral <- sumaGrupal / totalRegistros
                    Escribir "----------------------------------------------------------------"
                    Escribir "TOTAL REGISTROS : ", totalRegistros
                    Escribir "PROMEDIO GRUPAL : ", promedioGeneral
                    Escribir "APROBADOS (> 70): ", aprobados
                    Escribir "NO APROBADOS    : ", noAprobados
                FinSi
                Esperar Tecla

            4:
                Escribir "Finalizando el programa. ¡Hasta pronto!"
        FinSegun

    Hasta Que opcion == 4
FinAlgoritmo
```

---

## 4. IDENTIFICACIÓN Y USO DE ESTRUCTURAS FUNDAMENTALES

### 4.1 Uso de Arreglos (Listas / Arrays)
- **Definición en la solución:** Se utilizan dos arreglos principales:
  1. `listaMaterias`: Arreglo unidimensional de cadenas que almacena dinámicamente las materias disponibles (`['Programación Web', 'Bases de Datos', ...]`).
  2. `listaRegistros`: Arreglo de objetos donde cada elemento agrupa la tupla de datos `(id, nombre, materia, periodo1, periodo2, periodo3, promedio, estado)`.
- **Justificación:** Los arreglos permiten almacenar múltiples registros en una sola estructura homogénea en memoria, facilitando operaciones dinámicas de inserción (`push`), filtrado (`filter`), búsqueda y cálculo acumulativo (`reduce`), sin necesidad de declarar variables aisladas por cada estudiante.

### 4.2 Uso de Decisiones (Condicionales)
- **Condicional de Aprobación (Regla de Negocio Principal):**
  ```typescript
  if (promedio > 70) {
    estado = 'Aprobado';
  } else {
    estado = 'No Aprobado';
  }
  ```
  *Nota técnica:* Se aplica un operador relacional mayor estricto (`> 70`). Un estudiante con promedio de `70.00` resulta clasificado como `No Aprobado`, mientras que `70.01` o superior es `Aprobado`.
- **Condicionales de Validación de Entrada:**
  ```typescript
  if (nota < 0 || nota > 100 || isNaN(nota)) {
    // Rechazar entrada y emitir mensaje de error
  }
  ```
  Garantiza la integridad del dominio numérico de las notas antes de procesar cálculos.

### 4.3 Uso de Ciclos (Estructuras de Control Repetitivas)
- **Ciclo de validación y captura (`Repetir - Hasta Que` / `while`):** Garantiza que no se prosiga con el algoritmo hasta que el usuario suministre valores numéricos que satisfagan las cotas `[0, 100]`.
- **Ciclo de recorrido y agregación (`Para Cada` / `reduce` / `map`):**
  Itera sobre la lista completa de aprendices registrados para:
  1. Acumular la suma de los promedios y obtener el promedio general del grupo.
  2. Contabilizar los aprendices con estado "Aprobado" y "No Aprobado".
  3. Renderizar cada fila dentro del cuerpo de la tabla HTML.

---

## 5. TABLA DE PRUEBAS DE ESCRITORIO (DRY RUN / TRACE TABLE)

Se realizaron pruebas con casos ordinarios, valores frontera (límites críticos) y entradas inválidas para validar el comportamiento del algoritmo:

| Paso / Caso | Nombre Aprendiz | Materia | Periodo 1 ($P_1$) | Periodo 2 ($P_2$) | Periodo 3 ($P_3$) | Validación $[0, 100]$ | Suma Periodos | Promedio $\frac{\sum P}{3}$ | Evaluación $(> 70)$ | Estado Asignado | Observaciones del Caso |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **1** | Carlos Rodríguez | Programación Web | `85.0` | `90.0` | `78.0` | VÁLIDO | $253.00$ | $84.33$ | $84.33 > 70 \rightarrow \text{VERDADERO}$ | **Aprobado** | Caso estándar aprobatorio con notas altas. |
| **2** | Juan Martínez | Matemáticas | `65.0` | `58.0` | `62.0` | VÁLIDO | $185.00$ | $61.67$ | $61.67 > 70 \rightarrow \text{FALSO}$ | **No Aprobado** | Caso estándar reprobatorio con notas inferiores. |
| **3** | Valentina Restrepo | Bases de Datos | `70.0` | `70.0` | `70.0` | VÁLIDO | $210.00$ | $70.00$ | $70.00 > 70 \rightarrow \text{FALSO}$ | **No Aprobado** | **Caso Frontera Crítico:** Demuestra que exactamente 70 **no** aprueba según la regla institucional. |
| **4** | Andrés Morales | Bases de Datos | `70.0` | `71.0` | `70.0` | VÁLIDO | $211.00$ | $70.33$ | $70.33 > 70 \rightarrow \text{VERDADERO}$ | **Aprobado** | **Caso Frontera Inmediato:** Supera el límite de 70 por decimales y resulta Aprobado. |
| **5** | Prueba Error | Algoritmos | `-10.0` | `80.0` | `105.0` | **INVÁLIDO** | -- | -- | -- | **Rechazado** | **Prueba de Resiliencia:** El sistema intercepta valores $<0$ y $>100$, bloquea el guardado e instruye al usuario. |

### Cálculo del Promedio General del Grupo (Con Casos 1 a 4 válidos):
$$\text{Promedio General} = \frac{84.33 + 61.67 + 70.00 + 70.33}{4} = \frac{286.33}{4} = \mathbf{71.58}$$
- **Total Registros:** 4 aprendices procesados.
- **Aprobados:** 2 aprendices (50%).
- **No Aprobados:** 2 aprendices (50%).

---

## 6. REFLEXIÓN SOBRE ERRORES IDENTIFICADOS Y CORRECCIONES REALIZADAS

Durante el ciclo de diseño, codificación en TypeScript y pruebas funcionales se presentaron los siguientes incidentes técnicos:

1. **Error de Ambigüedad en la Condición de Aprobación:**
   - *Problema detectado:* Inicialmente se planteó por inercia la condición tradicional mayor o igual (`promedio >= 70`). Al contrastar con la instrucción explícita del docente ("*si la calificación es mayor a 70 es aprobado de lo contrario es no aprobado*"), un estudiante con 70.00 aprobaba incorrectamente.
   - *Corrección realizada:* Se refactorizó la expresión condicional al operador relacional estricto `promedio > 70`, asegurando que el umbral de 70.00 sea categorizado fielmente como "No Aprobado".
2. **Conflicto de Ámbito Léxico en Scripts Múltiples:**
   - *Problema detectado:* Al dividir el código en archivos JavaScript independientes enlazados simultáneamente en el HTML, la redeclaración de constantes auxiliares provocó una excepción `SyntaxError: Identifier already declared` que detuvo la ejecución.
   - *Corrección realizada:* Se migró el proyecto a **TypeScript** con exportaciones/importaciones de módulos ES6 y empaquetado optimizado mediante `esbuild` hacia `js/app.js`, eliminando colisiones en el objeto global.
3. **Concatenación Involuntaria de Cadenas en el Promedio:**
   - *Problema detectado:* Los elementos `<input type="number">` del DOM retornan datos de tipo `string`. Al realizar `p1 + p2 + p3` sin forzar la conversión, el sistema concatenaba cadenas en lugar de sumar algebraicamente (ej. `"80" + "70" + "90" = "807090"`).
   - *Corrección realizada:* Se aplicó tipado fuerte en TypeScript mediante `Number(val)` y `parseFloat()` en la capa de validación, garantizando sumas aritméticas y promedios reales.
4. **Volatilidad de la Información en Memoria Volátil:**
   - *Problema detectado:* Al actualizar la página web con `F5`, la lista de estudiantes y materias se reseteaba a cero.
   - *Corrección realizada:* Se implementó persistencia local en `localStorage` con las claves `sena_registros_calificaciones_v2` y `sena_lista_materias_v2`, permitiendo que la lista conserve sus datos entre sesiones de trabajo del docente.

---

## 7. GLOSARIO DE TÉRMINOS

- **Algoritmo:** Conjunto finito y ordenado de instrucciones que permite resolver un problema o efectuar una tarea de cómputo.
- **Arreglo (Array / Lista):** Estructura de datos que almacena varios elementos relacionados bajo un mismo identificador y permite acceder a ellos secuencialmente o mediante índices numéricos.
- **Ciclo (Bucle):** Estructura de control que repite un bloque de instrucciones un número determinado de veces o mientras se cumpla una condición.
- **Condición:** Expresión lógica evaluable como Verdadera o Falsa, cuyo resultado determina el flujo de ejecución de un programa.
- **Depuración (Debugging):** Proceso sistemático de identificar, analizar y corregir errores sintácticos, lógicos o de ejecución en un algoritmo o software.
- **Prueba de Escritorio:** Simulación manual o paso a paso de un algoritmo con datos de prueba controlados para verificar su validez y comportamiento matemático.
- **Pseudocódigo:** Representación textual y estructurada de los pasos de un algoritmo, legible por humanos e independiente de un lenguaje de programación específico.
- **TypeScript:** Superconjunto tipado de JavaScript que añade tipado estático, interfaces y comprobación rigurosa de errores en tiempo de compilación.
- **Variable:** Espacio identificado por un nombre simbólico en la memoria del computador que almacena un valor susceptible de cambiar durante la ejecución.

---

## 8. REFERENTES BIBLIOGRÁFICOS

- Hinojosa Gutiérrez, Á. P. (2016). *Python, paso a paso*. Ediciones de la U, Ra-Ma. Recuperado de: https://www-ebooks7-24-com.bdigital.sena.edu.co/?il=7959
- Joyanes Aguilar, L. (2020). *Fundamentos de programación: Algoritmos, estructuras de datos y objetos* (5.ª ed.). Madrid, España: McGraw-Hill Interamericana. Recuperado de: https://www-ebooks7-24-com.bdigital.sena.edu.co/?il=10409
- Servicio Nacional de Aprendizaje - SENA. (2022). *Fundamentos de programación estructurada*. Material de formación de la Coordinación de TIC y Energías. Recuperado de: https://drive.google.com/file/d/1lizce4YqrQbPtR-egbLgSABcx5wn4Ag-/view?usp=sharing

---

## 9. CONTROL DEL DOCUMENTO

| Nombre | Cargo / Dependencia | Fecha |
| :--- | :--- | :---: |
| **Julio César Castaño Bustos** | Instructor – Coordinación de TIC y Energías | Documento base: 18/04/2022 |
| **Norma Inés Caro Amaris** | Instructora – Coordinación de TIC y Energías | Adaptación semanal: 10/11/2026 |
| **Beckham Torres Cáceres** | Aprendiz – Análisis y Desarrollo de Software | Entrega de evidencia: 13/11/2026 |

---

## 10. CONTROL DE CAMBIOS

| Autor(es) | Cargo | Dependencia | Fecha | Razón del Cambio |
| :--- | :--- | :--- | :---: | :--- |
| **Norma Inés Caro Amaris** | Instructora | Coordinación de TIC y Energías | 10/11/2026 | Adaptación de la guía para la semana 2, con alcance de cuatro horas y actividades centradas en algoritmos, variables, decisiones, ciclos, arreglos y pruebas de escritorio. |
| **Equipo de Aprendices** | Aprendices | Formación ADSO - SENA | 13/11/2026 | Construcción del documento de evidencia formal (.md) con análisis de E/P/S, definición de variables, pseudocódigo estructurado, pruebas de escritorio y sustentación técnica. |

