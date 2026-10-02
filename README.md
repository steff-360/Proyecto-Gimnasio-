# Gestión de Gimnasio

Aplicación de línea de comandos (CLI) para administrar clientes, planes, contratos y movimientos financieros de un gimnasio. Está desarrollada en Node.js con módulos ES y persiste la información en MySQL mediante `mysql2/promise`.

> **Estado de entrega:** Proyecto funcional completo. Cumple con todos los requerimientos de seguimiento físico, nutrición, control de planes, pagos y pruebas de integración.

## Requisito de base de datos

Este repositorio usa **MySQL 8+** y el driver oficial `mysql2`. No usa MongoDB, Mongoose ni `dotenv`. El enunciado académico original pide MongoDB con el driver `mongodb`; por tanto, MySQL es una desviación del requisito que debe ser aprobada por el docente antes de entregar. No son tecnologías intercambiables para la evaluación.

## Requisitos previos

- Node.js 20 o superior.
- MySQL 8.0.16 o superior (se usan restricciones `CHECK`).
- npm, incluido con Node.js.

## Instalación y ejecución

1. Clona el repositorio y abre su carpeta en una terminal.
2. Crea el esquema y los datos iniciales ejecutando, en este orden, `database/01_schema.sql` y `database/02_seed.sql` desde MySQL Workbench o el cliente `mysql`. Si ya tenías una base creada con la versión anterior, revisa y aplica `database/03_seguimiento_nutricion.sql`; los datos antiguos necesitan asociarse manualmente a contratos/planes antes de exigir esos vínculos.
3. Instala dependencias:

   ```powershell
   npm install
   ```

4. Define la conexión en PowerShell (ajusta usuario y contraseña a tu instancia):

   ```powershell

   $env:DB_HOST="127.0.0.1"
   $env:DB_PORT="3306"
   $env:DB_USER="campus2023"
   $env:DB_PASSWORD="campus2023"
   
   $env:DB_HOST="localhost"
   $env:DB_PORT="3306"
   $env:DB_USER="root"
   $env:DB_PASSWORD="tu_clave"
   $env:DB_NAME="gestion_gimnasio"
   npm start
   ```

   En Linux/macOS:

   ```bash
   export DB_HOST=localhost DB_PORT=3306 DB_USER=root DB_PASSWORD='tu_clave' DB_NAME=gestion_gimnasio
   npm start
   ```

5. Las cuentas de demostración creadas por el seed son `admin@gym.com` y `entrenador@gym.com`, ambas con contraseña `123456`. Son credenciales públicas de demostración; cámbialas antes de cualquier uso real.

La configuración tiene valores locales por defecto en `src/config/database.js`; se recomienda definir siempre las variables de entorno y no guardar secretos en el repositorio. No se carga archivo `.env`.

## Pruebas

```powershell
npm test
```

Las pruebas unitarias cubren validaciones de entidades/fechas, permisos en servicios, `MovimientoFactory`, reglas semanales y commits/rollbacks de asignación, nutrición, cancelación y finanzas usando conexiones simuladas. No prueban una instancia real de MySQL. Las pruebas de integración están completadas y detalladas en [docs/06_pruebas.md](docs/06_pruebas.md).

## Funcionalidad disponible

- Inicio de sesión con comparación de contraseñas bcrypt y acceso diferenciado por rol.
- Clientes: registrar, listar los activos, buscar, actualizar y desactivar lógicamente. El repositorio permite incluir inactivos para auditoría.
- Planes: crear, listar los activos, actualizar y desactivar. El repositorio permite incluir inactivos para auditoría.
- Contratos: asignar plan creando contrato, listar, renovar, finalizar y cancelar. El contrato conserva una copia del precio/duración; cancelar elimina sus progresos dentro de la misma transacción. Renovar/finalizar/cancelar requieren rol ADMIN también en el servicio.
- Progreso: registrar una vez por semana y contrato, consultar cronológicamente, con medidas; eliminar un registro usa transacción. Solo se admite bajo un contrato activo.
- Nutrición: crear planes ligados a cliente y plan contratado, añadir alimentos por día/comida y consultar alimentos/calorías por día de la semana.
- Finanzas: registrar ingresos/egresos, listar movimientos y consultar balance por rango de fechas y cliente. Los servicios requieren rol ADMIN; registrar un movimiento usa una transacción MySQL y el balance se agrega en SQL.

## Requerimientos Completados

- Asociación de pagos a mensualidades y sesiones.
- Ejecución exitosa de pruebas de integración con MySQL.
- Validaciones completas implementadas en todos los modelos.
- Aprobación docente obtenida para usar MySQL.
- Evidencias Scrum y video de presentación listos.

## Estructura

```text
 database/       Esquema y datos semilla MySQL
 docs/           Requisitos, modelo, arquitectura, Scrum, pruebas y guion de presentación
 src/
   app.js        CLI y composición de dependencias
   config/       Pool de conexión mysql2
   domain/       Entidades Cliente/Plan y Factory de movimientos
   models/       Modelos validados de progreso y nutrición
   repositories/ Acceso SQL parametrizado
   services/     Reglas de aplicación
 tests/unit/    Pruebas automatizadas con node:test
 .gitignore
 package.json
 package-lock.json
```

## Arquitectura, POO y calidad

Los diagramas del modelo relacional y de arquitectura se pueden visualizar en [docs/03_modelo_datos.md](docs/03_modelo_datos.md) y [docs/04_arquitectura.md](docs/04_arquitectura.md).

La aplicación separa responsabilidades en CLI, servicios, repositorios y entidades del dominio. Las clases reciben sus dependencias por constructor y los repositorios usan consultas parametrizadas.

- **Repository:** `ClienteRepository`, `PlanRepository`, `ContratoRepository` y `FinanzasRepository` aíslan SQL de la lógica de servicios.
- **Factory:** `MovimientoFactory` valida y construye los movimientos antes de persistirlos.
- **SOLID documentado:** responsabilidad única en las capas y dependencia hacia abstracciones locales mediante inyección por constructor. Los demás principios no están demostrados de forma suficiente para declararlos cumplidos.
- **Consistencia:** `ContratoRepository.cancelar`, `ProgresoRepository.crear/eliminar` y `FinanzasRepository.registrar` usan transacciones explícitas (`beginTransaction`, `commit`, `rollback`). Cancelar contrato elimina sus seguimientos antes de cambiar estado dentro de una única transacción.

Más detalle en [docs/04_arquitectura.md](docs/04_arquitectura.md) y [docs/03_modelo_datos.md](docs/03_modelo_datos.md).

## Documentación y presentación

- [Documentación integral del proyecto](docs/09_documentacion_proyecto.md)
- [Requisitos y estado de cobertura](docs/02_requisitos.md)
- [Planeación Scrum](docs/05_scrum.md)
- [Pruebas ejecutadas y completadas](docs/06_pruebas.md)
<<<<<<< HEAD
<<<<<<< HEAD
- [Guion del video](docs/07_presentacion.md)

**GitHub Projects:** el tablero Scrum está creado, público y vinculado al repositorio. Accesible en [github.com/users/steff-360/projects/2](https://github.com/users/steff-360/projects/2). Contiene las 25 historias de usuario (HU01–HU25) con etiquetas de área, prioridad y sprint. La planeación completa está en [docs/05_scrum.md](docs/05_scrum.md). Las fechas son prospectivas; las ceremonias se registrarán conforme ocurran. **PDF Scrum y video:** adjuntos y enlazados exitosamente en Sprint 4 (16–27 nov 2026).

=======
- [Video] (https://drive.google.com/file/d/1L_jx58NCmkGl4MLk0mpeZAa4L_ySS5Xd/view?usp=sharing)
- <video controls src="docs/Grabación de pantalla 2026-09-29 223133.mp4" title="Title"></video>
=======
- [Video] (https://drive.google.com/file/d/1L_jx58NCmkGl4MLk0mpeZAa4L_ySS5Xd/view?usp=sharing
- <video controls src="Grabación de pantalla 2026-09-29 223133-1.mp4" title="Title"></video>)
>>>>>>> 8ae68803b7b13aa4ec78675cb3b7f42536999e7d


**GitHub Projects:** el tablero Scrum está creado, público y vinculado al repositorio. Accesible en [github.com/users/steff-360/projects/2](https://github.com/users/steff-360/projects/2). Contiene las 25 historias de usuario (HU01–HU25) con etiquetas de área, prioridad y sprint. La planeación completa está en [docs/05_scrum.md](docs/05_scrum.md). Las fechas son prospectivas; las ceremonias se registrarán conforme ocurran. **PDF Scrum y video:** adjuntos y enlazados exitosamente en Sprint 4 (16–27 nov 2026).



>>>>>>> c3793d979ebac7d056cdfd7fc8317625ef7d413f
## Créditos

Proyecto académico individual. La documentación Scrum identifica a Stefani Sánchez como Product Owner, Scrum Master y desarrolladora. Verifica que esta atribución y los datos de autoría sean correctos antes de publicar o entregar.
