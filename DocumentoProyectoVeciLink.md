# Documento del Proyecto VeciLink

## Plataforma Web de Servicios Comunitarios

---

## 1. Resumen Ejecutivo

VeciLink es una plataforma web diseñada para conectar a ciudadanos con prestadores de servicios dentro de su comunidad. Su propósito es centralizar la oferta de servicios locales (plomería, electricidad, cuidado de mascotas, clases particulares, entre otros), permitiendo que cualquier persona pueda buscar, contactar y evaluar prestadores de su barrio de forma rápida y confiable.

El sistema está dirigido a tres tipos de usuarios: ciudadanos que buscan servicios, prestadores que desean dar visibilidad a su trabajo y administradores que gestionan el contenido de la plataforma. Su valor principal radica en reducir la dependencia de recomendaciones informales y ofrecer un canal organizado, accesible y verificable para la contratación de servicios a nivel de barrio.

---

## 2. Contexto y Justificación del Proyecto

En la mayoría de ciudades, la búsqueda de servicios locales se realiza de forma desorganizada: grupos de redes sociales, referencias de boca en boca o carteles físicos. Esto genera varios problemas concretos:

- **Falta de centralización:** no existe un punto único donde un ciudadano pueda consultar la oferta de servicios disponibles en su zona.
- **Baja confianza:** sin calificaciones ni historial visible, contratar a un desconocido implica un riesgo percibido alto.
- **Invisibilidad del prestador:** muchos trabajadores independientes carecen de herramientas para promocionar sus servicios más allá de su círculo cercano.

VeciLink responde a esta problemática ofreciendo una plataforma que organiza la oferta por categoría y ubicación, incorpora un sistema de calificaciones y permite el contacto directo entre las partes. De esta forma, se facilita la conexión entre oferta y demanda a escala barrial, promoviendo la economía local.

---

## 3. Objetivos del Proyecto

### 3.1 Objetivo General

Desarrollar una plataforma web que permita a ciudadanos buscar, contactar y evaluar prestadores de servicios en su comunidad, y a los prestadores publicar y gestionar su oferta de servicios.

### 3.2 Objetivos Específicos

1. Implementar un sistema de registro y autenticación diferenciado por rol (ciudadano, prestador, administrador).
2. Permitir a los prestadores crear un perfil y publicar múltiples servicios con información detallada (categoría, barrio, horario, precio, fotos).
3. Desarrollar un motor de búsqueda con filtros por categoría, barrio y palabra clave.
4. Incorporar un sistema de calificación por estrellas y comentarios que genere un ranking de prestadores.
5. Integrar contacto directo vía WhatsApp desde la ficha de cada servicio.
6. Construir un panel administrativo para la gestión de usuarios, servicios, categorías y publicidad.
7. Implementar funcionalidades de perfiles destacados y publicidad local como mecanismo inicial de monetización.

---

## 4. Descripción General del Sistema

VeciLink opera como un directorio interactivo de servicios comunitarios. A continuación se describe el flujo principal de cada actor:

### Ciudadano

- Se registra con correo y contraseña.
- Navega el catálogo de servicios utilizando filtros de categoría, barrio o palabra clave.
- Consulta la ficha de un servicio, donde encuentra descripción, fotos, horario, precio y la calificación del prestador.
- Contacta al prestador directamente vía WhatsApp.
- Puede calificar el servicio recibido, agregar prestadores a favoritos y reportar contenido inapropiado.

### Prestador de Servicio

- Se registra indicando su rol de prestador.
- Crea un perfil profesional con nombre, descripción, zona de cobertura y foto.
- Publica uno o más servicios asociados a categorías predefinidas.
- Recibe solicitudes de contacto y calificaciones de los ciudadanos.
- Puede optar por un perfil destacado para obtener mayor visibilidad.

### Administrador

- Gestiona el catálogo de categorías (crear, editar, eliminar).
- Modera usuarios y servicios publicados.
- Administra la publicidad local y los perfiles destacados.
- Revisa reportes generados por los usuarios.

### Funcionalidades Complementarias

El sistema incluye además: historial de solicitudes de servicio, lista de favoritos, notificaciones internas y un módulo de reportes para la moderación de contenido.

---

## 5. Arquitectura y Tecnologías Utilizadas

### 5.1 Arquitectura

El sistema sigue una arquitectura de tres capas:

| Capa | Responsabilidad | Tecnología |
|------|----------------|------------|
| Presentación | Interfaz de usuario (SPA) | Angular |
| Lógica de negocio | API REST, validaciones, reglas de negocio | .NET Web API (C#) |
| Datos | Persistencia y consultas | SQL Server + Entity Framework Core |

La comunicación entre el frontend y el backend se realiza exclusivamente a través de endpoints REST con formato JSON. El backend expone controladores organizados por dominio (autenticación, servicios, calificaciones, notificaciones, etc.) y utiliza inyección de dependencias para desacoplar la lógica de negocio de los controladores.

### 5.2 Justificación Tecnológica

- **Angular:** framework robusto para aplicaciones SPA con un sistema de componentes, enrutamiento y manejo de estado que facilita la construcción de interfaces complejas y responsivas.
- **.NET Web API:** plataforma madura para la construcción de APIs REST, con soporte nativo para autenticación JWT, validación de datos y Entity Framework Core como ORM.
- **SQL Server:** motor relacional con buen rendimiento para consultas complejas y soporte para restricciones de integridad referencial necesarias en el modelo de datos del proyecto.
- **Entity Framework Core:** permite definir el modelo de datos con code-first, facilitando las migraciones y el mantenimiento del esquema de base de datos.

### 5.3 Estructura del Proyecto

```
ProyectoVeciLink/
├── vecilink-frontend/          # Aplicación Angular (SPA)
│   └── src/app/                # Componentes, servicios, módulos
└── VeciLink.Api/               # API REST (.NET)
    ├── Controllers/            # Endpoints por dominio
    ├── Entities/               # Modelos de datos
    ├── DTOs/                   # Objetos de transferencia
    ├── Services/               # Lógica de negocio
    ├── Interfaces/             # Contratos de servicios
    ├── Data/                   # DbContext y seeders
    ├── Validators/             # Reglas de validación
    ├── Middleware/              # Manejo global de excepciones
    └── Migrations/             # Migraciones de base de datos
```

---

## 6. Desarrollo del Proyecto

### 6.1 Análisis

Se realizó un levantamiento de requerimientos que identificó tres actores principales (ciudadano, prestador, administrador) y las funcionalidades necesarias para cada uno. Se definieron los requerimientos funcionales y no funcionales, el alcance del MVP y las restricciones del sistema (sin pagos en línea, cobertura a nivel de ciudad, contratación fuera de la plataforma).

El resultado de esta etapa quedó documentado en el Documento de Requerimientos Funcionales y No Funcionales del proyecto.

### 6.2 Diseño Funcional

#### Modelo Entidad-Relación

El modelo de datos se compone de las siguientes entidades principales y sus relaciones:

- **User:** entidad central que representa a cualquier usuario del sistema. Contiene nombre, correo (único), contraseña hasheada, teléfono, barrio y rol (Ciudadano, Prestador o Administrador).
- **ProviderProfile:** perfil extendido para usuarios con rol de prestador. Relación uno a uno con User. Incluye nombre comercial, descripción, WhatsApp, zona, horario, promedio de calificación y estado destacado.
- **Service:** servicio publicado por un prestador. Relación muchos a uno con ProviderProfile y con Category. Contiene nombre, descripción, barrio, precio, coordenadas geográficas y estado activo/destacado.
- **ServicePhoto:** fotos asociadas a un servicio. Relación muchos a uno con Service.
- **Category:** categorías predefinidas para clasificar servicios.
- **Rating:** calificación de un ciudadano hacia un prestador. Relaciona User con ProviderProfile mediante una puntuación (1-5) y un comentario.
- **Favorite:** relación muchos a muchos entre User y Service, representando los servicios marcados como favoritos.
- **ServiceRequest:** solicitud de contacto de un ciudadano hacia un servicio, con estados (Pendiente, Contactado, Cerrado).
- **Notification:** notificaciones internas del sistema dirigidas a un usuario.
- **Report:** reportes de contenido inapropiado, con estados de revisión (Pendiente, Revisado, Cerrado).
- **Advertisement:** espacios de publicidad local gestionados por el administrador.

#### Diagrama de Clases

Las entidades del backend reflejan directamente el modelo relacional. Se utilizan DTOs (Data Transfer Objects) para controlar la información expuesta en cada endpoint, separando la representación interna de la externa. La lógica de negocio se encapsula en servicios que implementan interfaces definidas en la capa de contratos (`Interfaces/`), garantizando el desacoplamiento.

#### Casos de Uso Principales

| Caso de Uso | Actor | Descripción |
|-------------|-------|-------------|
| Registrarse | Ciudadano / Prestador | Crear cuenta con correo, contraseña y datos de perfil |
| Iniciar sesión | Todos | Autenticarse con credenciales y obtener token JWT |
| Publicar servicio | Prestador | Crear un servicio con categoría, descripción, barrio y fotos |
| Buscar servicios | Ciudadano | Filtrar servicios por categoría, barrio o palabra clave |
| Contactar prestador | Ciudadano | Abrir conversación vía WhatsApp desde la ficha del servicio |
| Calificar servicio | Ciudadano | Asignar estrellas y comentario a un prestador |
| Gestionar categorías | Administrador | Crear, editar o eliminar categorías de servicios |
| Moderar contenido | Administrador | Revisar reportes y gestionar usuarios/servicios |
| Activar perfil destacado | Administrador | Marcar un prestador como destacado para mayor visibilidad |

### 6.3 Desarrollo

El desarrollo se organizó en dos frentes paralelos:

**Backend (.NET Web API):**
Se implementaron 11 controladores que cubren los dominios principales del sistema: autenticación, usuarios, servicios, categorías, calificaciones, favoritos, notificaciones, reportes, solicitudes de servicio, perfiles de prestador y publicidad. Se utilizó el patrón repositorio/servicio con inyección de dependencias. El esquema de base de datos se gestiona mediante migraciones de Entity Framework Core.

**Frontend (Angular):**
Se construyó una aplicación SPA con rutas diferenciadas por rol: área pública (búsqueda y visualización de servicios), área de prestador (dashboard y gestión de servicios) y área administrativa (gestión de usuarios, categorías y publicidad). La interfaz es responsive, adaptándose a computador, tablet y dispositivo móvil.

### 6.4 Pruebas

Se realizaron pruebas manuales sobre los flujos principales del sistema:

- Registro e inicio de sesión de los tres tipos de usuario.
- Publicación, edición y visualización de servicios.
- Búsqueda con filtros combinados.
- Flujo de calificación y actualización del ranking.
- Operaciones administrativas (CRUD de categorías, moderación).
- Validación de la interfaz responsive en distintos tamaños de pantalla.

---

## 7. Resultados del Proyecto

El proyecto VeciLink alcanzó un estado funcional para su alcance definido de MVP, con los siguientes resultados concretos:

- Implementación de autenticación con registro e inicio de sesión por roles (ciudadano, prestador y administrador).
- Publicación y gestión de servicios por parte de prestadores, incluyendo categoría, descripción, barrio, horario, precio y contacto por WhatsApp.
- Búsqueda de servicios mediante filtros por categoría, barrio y palabra clave.
- Visualización de servicios con información unificada del prestador y sus calificaciones.
- Módulo de calificaciones y ranking para apoyar la toma de decisiones de los ciudadanos.
- Panel administrativo para gestión de categorías, moderación de contenido y control básico de usuarios y servicios.
- Soporte de perfiles destacados y publicidad local como base de monetización inicial.

Frente al problema inicial, se logró pasar de un proceso informal y disperso de recomendación de servicios a un canal digital centralizado y consultable por la comunidad. Además, se automatizaron procesos clave que antes eran manuales o no estructurados:

- Clasificación de servicios por categorías y zonas.
- Registro y trazabilidad de solicitudes de contacto.
- Consolidación de calificaciones para construir reputación visible.
- Gestión administrativa de categorías y reportes desde una sola interfaz.

---

## 8. Evidencias

Para la sustentación del proyecto se incluyen las siguientes evidencias:

- Capturas de pantalla de los módulos principales (autenticación, búsqueda, publicación de servicios, panel administrativo).
- Flujo de uso del sistema por actor (ciudadano, prestador, administrador).
- Repositorio del proyecto: [URL]

---

## 9. Manual Básico de Uso

### 9.1 Ciudadano

1. Registrarse en la plataforma con correo y contraseña, o iniciar sesión si ya posee cuenta.
2. Acceder al catálogo de servicios y aplicar filtros por categoría, barrio o palabra clave.
3. Seleccionar un servicio para revisar su información detallada.
4. Contactar al prestador mediante el botón de WhatsApp.
5. Registrar calificación y comentario después de recibir el servicio.
6. Guardar servicios de interés en favoritos para consultas posteriores.

### 9.2 Prestador

1. Registrarse como prestador e iniciar sesión.
2. Completar el perfil profesional con datos de contacto, zona y descripción.
3. Crear uno o más servicios con categoría, descripción, horario, disponibilidad y precio.
4. Actualizar la información de servicios cuando cambien condiciones u horarios.
5. Revisar interacciones recibidas y mantener vigentes los servicios activos.

### 9.3 Administrador

1. Iniciar sesión con credenciales de administrador.
2. Gestionar categorías del sistema (crear, editar, eliminar).
3. Supervisar usuarios y servicios publicados para control de calidad y cumplimiento.
4. Atender reportes y aplicar acciones de moderación cuando corresponda.
5. Administrar perfiles destacados y espacios de publicidad local.

---

## 10. Impacto del Proyecto en la Comunidad

VeciLink aporta valor directo a la comunidad al mejorar la forma en que ciudadanos y prestadores se conectan para resolver necesidades cotidianas. Su impacto principal se refleja en:

- Mayor acceso a servicios locales, gracias a una búsqueda estructurada por categoría y barrio.
- Mayor visibilidad para prestadores independientes, que ahora cuentan con un canal digital para exhibir su oferta.
- Incremento de confianza entre usuarios, sustentado en calificaciones y comentarios públicos.
- Reducción del tiempo de búsqueda y contacto, al concentrar información y canales de comunicación en una sola plataforma.
- Dinamización de la economía local, al facilitar la contratación de servicios dentro del entorno comunitario.

---

## 11. Recomendaciones

Como línea de evolución del sistema, se recomienda priorizar:

1. Integración de pagos en línea para cerrar el ciclo de contratación dentro de la plataforma.
2. Desarrollo de aplicación móvil nativa o híbrida para aumentar cobertura y frecuencia de uso.
3. Implementación de geolocalización avanzada con búsqueda por proximidad y mapa interactivo mejorado.
4. Incorporación de un sistema de verificación de usuarios y prestadores para fortalecer confianza y seguridad.
5. Definición de métricas operativas y panel de analítica para seguimiento de uso, conversión y calidad del servicio.

---

## 13. Anexos

Se adjuntan como material complementario del proyecto:

- Diagramas de análisis y diseño (MER, diagrama de clases y casos de uso).
- Modelo de base de datos con entidades, relaciones y restricciones principales.
- Historias de usuario utilizadas para definir funcionalidades del MVP.

---
