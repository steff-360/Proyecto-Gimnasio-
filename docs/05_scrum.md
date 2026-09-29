# Planeación Scrum y GitHub Projects

## Estado de este plan

Este es un plan de trabajo **prospectivo**, preparado el 28 de septiembre de 2026. Las fechas de los sprints siguientes son una propuesta calendarizada; no representan trabajo pasado ni reuniones que ya ocurrieron. Al empezar el primer sprint, crear el tablero en GitHub Projects, confirmar las fechas con el equipo/docente y mover cada historia únicamente según evidencia real.

Repositorio: [steff-360/Proyecto-Gimnasio-](https://github.com/steff-360/Proyecto-Gimnasio-)

Tablero GitHub Projects: [https://github.com/users/steff-360/projects/2](https://github.com/users/steff-360/projects/2) — público, accesible para docentes y evaluadores.

Plantilla PDF del curso: usar la plantilla oficial del docente; este archivo Markdown es la fuente de contenido, no sustituye el PDF.

## Objetivo del producto

Desarrollar y entregar una CLI Node.js mantenible para que un gimnasio administre clientes, planes, contratos, progreso físico, nutrición y finanzas, con validación, autorización y persistencia consistente.

### Decisión técnica que bloquea la aceptación

El enunciado solicita MongoDB con el driver `mongodb`; la implementación actual persiste en MySQL con `mysql2`. En el primer sprint el Product Owner debe obtener aprobación escrita del docente para conservar MySQL o abrir la migración a MongoDB con transacciones reales sobre un replica set. No declarar cumplido el requisito de base de datos hasta resolver esta decisión.

## Equipo y responsabilidades

La documentación del proyecto registra un equipo individual:

| Rol Scrum | Responsable registrado | Responsabilidad |
|---|---|---|
| Product Owner | Stefani Sánchez | Ordenar el backlog, aclarar requisitos y aceptar/rechazar historias con sus criterios. |
| Scrum Master | Stefani Sánchez | Facilitar la cadencia, hacer visibles impedimentos y mantener el tablero actualizado. |
| Developer | Stefani Sánchez | Diseñar, implementar, probar y documentar los incrementos. |

Confirmar que el nombre y la modalidad individual son correctos antes de entregar. Si hay más integrantes, sustituir esta tabla por la composición real del equipo y repartir responsabilidades; no atribuir trabajo no realizado.

## Configuración de GitHub Projects

Crear un **Project v2 de usuario** bajo `steff-360`, llamarlo `Gestión de Gimnasio · Desarrollo`, configurarlo como privado mientras el repositorio siga privado y vincular el repositorio indicado arriba.

### Campos del proyecto

| Campo | Tipo | Valores / uso |
|---|---|---|
| Status | Status | Backlog, Ready, In Progress, In Review, Done, Blocked. |
| Sprint | Iteration | Cuatro iteraciones de dos semanas con las fechas de esta planeación. |
| Priority | Single select | P0 bloqueante, P1 alta, P2 normal, P3 baja. |
| Size | Number | Estimación relativa en puntos; usar escala 1, 2, 3, 5, 8. |
| Work type | Single select | Story, Bug, Task, Documentation, Risk. |
| Acceptance | Text | Resumen verificable de los criterios; el detalle permanece en la issue. |

No usar story points como horas. Si el equipo es individual, empezar con una carga pequeña y reducir el alcance del sprint cuando la capacidad no alcance.

### Vistas

1. **Product backlog:** tabla agrupada por Priority y ordenada P0 → P3; muestra Status, Sprint, Size y assignee.
2. **Sprint board:** board agrupado por Status y filtrado al sprint actual.
3. **Roadmap:** vista de iteraciones con objetivo y fechas de inicio/fin.
4. **Blocked:** tabla filtrada por `Status = Blocked`, con el impedimento y responsable visibles.
5. **Delivery:** tabla filtrada por Documentation/Task para PDF, video, pruebas y preparación de entrega.

Crear las vistas solo después de configurar los campos, y mantener la URL pública o accesible al docente en este documento.

### Etiquetas sugeridas para issues

`area:cli`, `area:auth`, `area:clientes`, `area:contratos`, `area:progreso`, `area:nutricion`, `area:finanzas`, `area:database`, `area:docs`, `type:story`, `type:bug`, `type:task`, `risk:blocker`.

## Backlog del producto

El estado inicial describe el código inspeccionado al preparar este plan; no es un estado histórico de sprint. Las historias con trabajo existente se marcan `Parcial` o `Implementado antes de este plan`, y su issue debe enlazar archivos, pruebas o commits verificables.

| ID | Historia de usuario | Prioridad | Estado inicial | Criterios de aceptación |
|---|---|---:|---|---|
| HU01 | Como equipo, quiero iniciar el proyecto Node.js con módulos y scripts reproducibles para ejecutar y probar la CLI. | P1 | Implementado antes del plan | `npm install` termina; `npm start` arranca con configuración válida; `npm test` ejecuta pruebas. |
| HU02 | Como responsable técnico, quiero persistir en la tecnología aprobada por el curso para cumplir la arquitectura requerida. | P0 | Bloqueado por aprobación | Existe aprobación escrita de MySQL o migración aprobada a `mongodb`; README, esquema y pruebas coinciden con la decisión. |
| HU03 | Como entrenador, quiero iniciar sesión con credenciales seguras para acceder a la CLI. | P1 | Parcial | Usuario activo y contraseña correcta permiten acceso; contraseña incorrecta se rechaza sin revelar cuál campo falló. |
| HU04 | Como administrador, quiero que cada rol tenga permisos explícitos para limitar operaciones sensibles. | P1 | Parcial | ADMIN puede realizar funciones administrativas; ENTRENADOR no puede acceder a finanzas ni mutar contratos aunque invoque servicios directamente; existen pruebas para ambos roles. |
| HU05 | Como administrador, quiero crear, modificar y desactivar usuarios para mantener las cuentas del gimnasio. | P2 | Pendiente | Operaciones validan correo, rol y estado; la contraseña se guarda solo como hash; no se puede desactivar el último administrador activo. |
| HU06 | Como entrenador, quiero registrar clientes con datos validados para conservar información consistente. | P1 | Implementado antes del plan | Nombre/apellido requeridos, correo válido si se proporciona y edad dentro del rango aceptado; datos persisten. |
| HU07 | Como entrenador, quiero buscar y listar clientes para consultar su ficha rápidamente. | P1 | Implementado antes del plan | Búsqueda por ID y listado de activos funcionan; los inactivos no aparecen salvo consulta explícita de auditoría. |
| HU08 | Como administrador, quiero actualizar y desactivar clientes para mantener información vigente sin borrar historial. | P1 | Implementado antes del plan | Se actualiza ficha; la desactivación es lógica; contratos y movimientos históricos siguen relacionados. |
| HU09 | Como entrenador, quiero crear y mantener planes de entrenamiento para ofrecer programas actualizados. | P1 | Parcial | Nombre, duración positiva, nivel permitido, meta y precio no negativo se validan; listar/actualizar/desactivar conserva contratos históricos. |
| HU10 | Como entrenador, quiero asignar un plan a un cliente para crear su contrato automáticamente. | P1 | Parcial | Cliente y plan deben estar activos; contrato conserva precio/duración acordados y fechas válidas; se registra de forma atómica. |
| HU11 | Como administrador, quiero renovar, finalizar o cancelar contratos para gestionar su ciclo de vida. | P1 | Parcial | Solo contrato activo cambia de estado; renovación termina el previo y crea el siguiente atómicamente; cancelación elimina seguimientos asociados o revierte todo. |
| HU12 | Como entrenador, quiero registrar avances físicos semanales para observar la evolución del cliente. | P1 | Parcial | Se acepta máximo un progreso por contrato/semana; peso es positivo; porcentaje de grasa entre 0 y 100; contrato activo pertenece al cliente. |
| HU13 | Como entrenador, quiero consultar y eliminar registros de progreso para mantener un historial cronológico correcto. | P1 | Parcial | Historial ordenado por fecha; eliminación transaccional; la política de cancelación de contrato está probada contra MySQL. |
| HU14 | Como entrenador, quiero planificar alimentación y registrar alimentos para asociar nutrición al entrenamiento. | P1 | Parcial | Plan nutricional pertenece a cliente y plan; requiere contrato activo; día, comida y calorías se validan; se puede consultar resumen semanal. |
| HU15 | Como administrador, quiero registrar ingresos y egresos asociados a clientes/contratos para llevar control financiero. | P1 | Parcial | Monto positivo, fecha válida y usuario creador; contrato opcional activo y del cliente; persistencia transaccional. |
| HU16 | Como administrador, quiero consultar balance por fechas y cliente para revisar resultados financieros. | P1 | Implementado antes del plan | SQL calcula ingresos/egresos con filtros parametrizados; inicio no posterior al fin; no requiere cargar todos los movimientos en memoria. |
| HU17 | Como usuario, quiero mensajes claros y entradas validadas para corregir errores sin perder el flujo. | P2 | Parcial | Fechas y rangos inválidos se explican; no se filtran errores SQL ni secretos; el menú vuelve a un estado utilizable. |
| HU18 | Como equipo, quiero aplicar Repository y Factory para separar persistencia y creación validada de movimientos. | P2 | Implementado antes del plan | Repositorios encapsulan SQL; Factory valida movimiento; la documentación identifica responsabilidades y pruebas. |
| HU19 | Como equipo, quiero automatizar pruebas unitarias e integración para reducir regresiones. | P1 | Parcial | Pruebas unitarias pasan; integración ejecuta contra instancia real aprobada; resultado/versión de base se registra en evidencia. |
| HU20 | Como equipo, quiero documentar instalación, arquitectura y entrega para que el evaluador reproduzca el proyecto. | P1 | Parcial | README y docs coherentes; PDF según plantilla adjunto; video ≤7 minutos enlazado; repo/colaborador comprobados. |
| HU21 | Como entrenador, quiero almacenar fotos de progreso para comparar cambios visuales de forma segura. | P2 | Pendiente | Carga valida tipo/tamaño, almacena de forma segura y guarda referencia; README explica ubicación y privacidad. |
| HU22 | Como administrador, quiero vincular pagos a mensualidades o sesiones para conciliar ingresos con el servicio prestado. | P1 | Pendiente | Tipo de ingreso y cliente/contrato obligatorios según regla; transacción evita pago duplicado; balance refleja el asiento. |
| HU23 | Como entrenador, quiero editar o desactivar planes nutricionales y alimentos para mantenerlos actualizados. | P2 | Pendiente | Edición valida rangos/fechas; desactivación conserva historial y alimentos asociados según política documentada. |
| HU24 | Como equipo, quiero verificar el esquema y los flujos en la base real para validar transacciones y migraciones. | P0 | Pendiente | Pruebas corren contra MySQL aprobado o MongoDB replica set aprobado; restauración/migración se prueba sin pérdida no prevista. |
| HU25 | Como equipo, quiero completar evidencia de Scrum y presentación para entregar el trabajo verificablemente. | P1 | Pendiente | Tablero contiene issues y sprints reales; se documentan revisiones/retros; PDF y video enlazados; no hay evidencia fabricada. |

### Política de priorización

- **P0:** bloquea aceptación tecnológica o puede causar pérdida/inconsistencia de datos.
- **P1:** flujo mínimo requerido por el enunciado o condición de entrega.
- **P2:** mejora importante que no bloquea el siguiente incremento.
- **P3:** mejora de baja urgencia.

Las historias se dividen en tareas dentro de sus GitHub Issues. No cerrar una historia por haber creado el issue o la documentación: debe cumplir todos sus criterios.

## Calendario de sprints planificados

Las semanas se proponen en días hábiles, en zona horaria local del equipo. Confirmar con el docente y registrar la fecha real de cada ceremonia en Projects. No backdatear estados o retrospectivas.

| Sprint | Fechas propuestas | Objetivo | Historias principales | Resultado verificable |
|---|---|---|---|---|
| Sprint 1 | 5–16 oct 2026 | Resolver la tecnología de persistencia y cerrar riesgos de acceso/contratos. | HU02, HU04, HU05, HU10, HU11 | Aprobación escrita o decisión/migración iniciada; permisos probados; creación y cambios de contrato consistentes. |
| Sprint 2 | 19–30 oct 2026 | Completar seguimiento, nutrición y asociación de ingresos. | HU12, HU13, HU14, HU15, HU21, HU22, HU23 | Flujo demostrable con datos de prueba; evidencia de una transacción completa. |
| Sprint 3 | 2–13 nov 2026 | Endurecer base de datos, migraciones, validaciones y pruebas de integración. | HU03, HU09, HU17, HU19, HU24 | Suite unitaria e integración verde en la tecnología aceptada; defectos críticos cerrados. |
| Sprint 4 | 16–27 nov 2026 | Preparar versión de entrega y evidencias académicas. | HU01, HU06–HU08, HU16, HU18, HU20, HU25 | Release reproducible, README actualizado, PDF Scrum adjunto y video ≤7 min enlazado. |

Si la aprobación tecnológica no llega en Sprint 1, marcar HU02 como `Blocked`, informar al docente y replanificar alcance/fechas. No afirmar que el requisito MongoDB está cumplido mientras continúe MySQL.

## Cadencia y ceremonias

Para equipo individual, mantener ceremonias breves y dejar registro escrito en issue/discussion o en el tablero:

- **Planificación (inicio de sprint, hasta 60 min):** seleccionar historias Ready, estimar, asignar y escribir Sprint Goal.
- **Seguimiento diario (10–15 min):** registrar ayer/hoy/impedimentos en una nota breve; si no hubo sesión, no crear acta ficticia.
- **Refinamiento (mitad de sprint, 30 min):** aclarar criterios y dividir trabajo sin aumentar alcance sin estimación.
- **Review (último día, 30–45 min):** demostrar incremento ejecutable y marcar aceptación por criterios.
- **Retrospectiva (después de review, 20–30 min):** conservar 1–2 acciones concretas con responsable y fecha.

## Definition of Ready

Una historia puede pasar a `Ready` cuando tiene persona/beneficio, criterios verificables, prioridad, tamaño, dependencias, datos de prueba y Sprint candidato. Los bloqueos de tecnología deben estar visibles y no se esconden como tareas normales.

## Definition of Done

Una historia pasa a `Done` solo cuando:

- cumple cada criterio de aceptación y el flujo puede demostrarse;
- el cambio está en una rama/commit revisable con Conventional Commit;
- las pruebas pertinentes pasan y no se ocultan fallos;
- validaciones/permisos/transacciones se prueban en el nivel adecuado;
- documentación afectada se actualiza;
- Product Owner acepta la historia y el Project refleja estado/enlaces;
- cualquier limitación residual queda escrita.

Para trabajos de base de datos, las pruebas mock no sustituyen la validación de integración real.

## Riesgos e impedimentos

| Riesgo | Probabilidad/impacto | Respuesta | Responsable |
|---|---|---|---|
| MySQL no cumple el requisito MongoDB | Alta/alta | Solicitar decisión escrita al docente al inicio; si no se aprueba, abrir migración con replica set/transacciones y reestimar. | PO + Developer |
| No hay acceso a GitHub Projects | Media/alta | Autenticar la cuenta propietaria `steff-360`, crear el Project y vincular repositorio; no subir tokens ni contraseñas al repo. | Scrum Master |
| Integración MySQL no ejecutada | Media/alta | Preparar instancia de prueba aislada, scripts reproducibles y capturas de resultados. | Developer |
| Capacidad de una persona para varios roles | Alta/media | Limitar WIP a 1–2 issues; planificar una carga realista y pedir revisión docente/peer en decisiones críticas. | Todo el equipo |
| Evidencia académica externa ausente | Media/alta | Reservar Sprint 4 para PDF, video, permisos del repo y validación de enlaces. | PO + Scrum Master |

## Evidencia que se debe guardar

Guardar las capturas reales en `docs/evidencias/scrum/` y referenciarlas desde el tablero/PDF. Usar nombres estables:

- `01-project-overview.png`: tablero, propietario y vínculo del repositorio.
- `02-product-backlog.png`: backlog con Priority, Size y Status.
- `03-sprint-1-plan.png` a `06-sprint-4-plan.png`: objetivo y issues comprometidos de cada sprint.
- `07-sprint-reviews.png`: demostración o enlace a evidencia de los incrementos aceptados.
- `08-retrospectives.png`: acciones reales de retrospectiva con fecha/responsable.
- `09-test-results.png`: salida de pruebas e integración, indicando si usa mocks o DB real.

Cada figura en el PDF debe incluir número, descripción y fecha de captura. Ocultar datos personales, tokens, contraseñas y variables secretas. Si no se ejecutó una ceremonia, dejarla pendiente; no fabricar capturas.

## Revisión de cierre

Al terminar cada sprint completar:

- Sprint Goal alcanzado: Sí/Parcial/No y explicación.
- Historias aceptadas y enlace a cada issue/PR/commit.
- Historias no terminadas, motivo y nuevo destino en backlog.
- Resultados de pruebas y defectos abiertos.
- Retrospectiva: qué ayudó, qué dificultó y acción concreta del siguiente sprint.
- Enlace/captura de tablero y fecha real.

## Entregables finales

1. Este documento actualizado desde las ceremonias reales.
2. Project v2 vinculado al repositorio y accesible para docente/equipo.
3. PDF exportado desde la plantilla del curso, adjunto al repositorio con las capturas reales.
4. Video de máximo 7 minutos con explicación de principios/patrones y demo real, enlazado en README.
5. Repositorio privado y trainer agregado como colaborador según la cuenta indicada por el curso.

No afirmar completados el Project, el PDF, el video o el permiso del trainer hasta verificar cada uno en GitHub.
