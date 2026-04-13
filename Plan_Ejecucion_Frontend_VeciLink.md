# Plan de Ejecución del Frontend - VeciLink

## Resumen ejecutivo

Este documento traduce el plan de desarrollo del frontend de VeciLink en un conjunto de **etapas, actividades, tareas y subtareas** ejecutables de forma progresiva. Está diseñado para ser seguido por un agente de IA o desarrollador de forma ordenada y sin retrabajo.

---

## Etapa 1 — Base del proyecto

**Objetivo:** Tener el proyecto Angular funcional, estructurado y con las configuraciones base listas.

### Actividad 1.1 — Crear y configurar el proyecto Angular

- [x] Ejecutar `ng new vecilink-frontend --routing --style=css`
- [x] Verificar que el proyecto compila y corre correctamente
- [x] Configurar `tsconfig.json` con rutas estrictas

### Actividad 1.2 — Instalar y configurar dependencias UI

- [x] Ejecutar `npm install bootstrap bootstrap-icons`
- [x] Ejecutar `npm install @angular/google-maps`
- [x] Agregar Bootstrap CSS y JS en `angular.json` (styles y scripts)
- [x] Agregar Bootstrap Icons en `angular.json` o por CDN en `index.html`
- [x] Verificar que estilos de Bootstrap aplican en la app

### Actividad 1.3 — Configurar estructura de carpetas

- [x] Crear carpeta `src/app/core/` con subcarpetas: `guards/`, `interceptors/`, `models/`, `services/`, `utils/`
- [x] Crear carpeta `src/app/shared/` con subcarpetas: `components/`, `directives/`, `pipes/`
- [x] Crear archivo `src/app/shared/shared.module.ts`
- [x] Crear carpeta `src/app/features/` con subcarpetas: `auth/`, `home/`, `services-catalog/`, `providers/`, `favorites/`, `notifications/`, `ratings/`, `reports/`, `admin/`, `profile/`

### Actividad 1.4 — Configurar rutas base

- [x] Definir todas las rutas en `app-routing.module.ts` con rutas lazy (estructura de placeholders)
- [x] Rutas públicas: `/`, `/login`, `/register`, `/services`, `/services/:id`, `/ranking`
- [x] Rutas privadas: `/favorites`, `/notifications`, `/profile`, `/provider/dashboard`, `/provider/services/new`, `/provider/services/:id/edit`
- [x] Rutas admin: `/admin`, `/admin/users`, `/admin/services`, `/admin/categories`, `/admin/featured`, `/admin/ads`, `/admin/reports`

### Actividad 1.5 — Crear modelos e interfaces TypeScript

- [x] Crear `src/app/core/models/user.model.ts` → interfaz `User`
- [x] Crear `src/app/core/models/provider-profile.model.ts` → interfaz `ProviderProfile`
- [x] Crear `src/app/core/models/service-item.model.ts` → interfaz `ServiceItem`
- [x] Crear `src/app/core/models/category.model.ts` → interfaz `Category`
- [x] Crear `src/app/core/models/rating.model.ts` → interfaz `Rating`
- [x] Crear `src/app/core/models/favorite.model.ts` → interfaz `Favorite`
- [x] Crear `src/app/core/models/notification.model.ts` → interfaz `AppNotification`
- [x] Crear `src/app/core/models/advertisement.model.ts` → interfaz `Advertisement`
- [x] Crear `src/app/core/models/report-item.model.ts` → interfaz `ReportItem`
- [x] Crear `src/app/core/models/service-request.model.ts` → interfaz `ServiceRequest`
- [x] Crear `src/app/core/models/index.ts` con re-exportación de todos los modelos

### Actividad 1.6 — Crear servicios base con datos mock

- [x] Crear `AuthService` con métodos: `login()`, `register()`, `logout()`, `getCurrentUser()`, `hasRole()`
- [x] Crear `UserService` con métodos: `getProfile()`, `updateProfile()`, `listUsers()`, `deleteUser()`
- [x] Crear `ProviderService` con métodos: `getProviderProfile()`, `updateProviderProfile()`, `getRanking()`
- [x] Crear `ServiceCatalogService` con métodos: `listServices()`, `searchServices()`, `getServiceDetail()`, `createService()`, `editService()`, `deleteService()`, `getFeaturedServices()`
- [x] Crear `CategoryService` con métodos: `listCategories()`, `createCategory()`, `editCategory()`, `deleteCategory()`
- [x] Crear `RatingService` con métodos: `listRatings()`, `addRating()`, `getRatingSummary()`
- [x] Crear `FavoriteService` con métodos: `listFavorites()`, `addFavorite()`, `removeFavorite()`
- [x] Crear `NotificationService` con métodos: `listNotifications()`, `markAsRead()`
- [x] Crear `AdvertisementService` con métodos: `listActiveAds()`, `createAd()`, `editAd()`, `deactivateAd()`
- [x] Crear `ReportService` con métodos: `createReport()`, `listReports()`, `changeReportStatus()`
- [x] Crear `MapService` con métodos: `configureMap()`, `geocode()`, `centerMap()`
- [x] Crear `RequestHistoryService` con métodos: `listRequests()`, `registerRequest()`
- [x] Poblar cada servicio con datos mock usando `Observable` y `of()`

---

## Etapa 2 — Shared y layout

**Objetivo:** Tener el layout base de la aplicación disponible con los componentes compartidos reutilizables.

### Actividad 2.1 — Construir Navbar

- [x] Crear componente `app-navbar` en `shared/components/navbar/`
- [x] Mostrar logo y nombre de la app
- [x] Incluir links de navegación: Inicio, Servicios, Ranking
- [x] Mostrar opciones condicionales si el usuario está autenticado: Mi perfil, Favoritos, Notificaciones, Cerrar sesión
- [x] Mostrar icono de menú hamburguesa en mobile (Bootstrap collapse)
- [x] Aplicar estilos con color primario `#2D6CDF`

### Actividad 2.2 — Construir Footer

- [x] Crear componente `app-footer` en `shared/components/footer/`
- [x] Incluir nombre de la app, descripción breve y año
- [x] Incluir links de navegación secundarios
- [x] Aplicar estilos Bootstrap y color coherente con el diseño

### Actividad 2.3 — Construir componentes compartidos de UI

- [x] Crear componente `app-loader` (spinner de carga)
- [x] Crear componente `app-alert` (alertas reutilizables con tipos: info, success, warning, error)
- [x] Crear componente `app-confirm-modal` (modal Bootstrap con mensaje y botones confirmar/cancelar)
- [x] Crear componente `service-card` (tarjeta de servicio con nombre, categoría, barrio, calificación, badge destacado)
- [x] Crear componente `provider-card` (tarjeta de prestador con nombre, descripción, calificación, badge destacado)
- [x] Crear componente `rating-stars` (visualización de estrellas 1-5, modo lectura y modo input)
- [x] Crear componente `featured-badge` (badge visual "Destacado")
- [x] Crear componente `search-filters` (inputs: palabra clave, categoría, barrio)
- [x] Crear componente `empty-state` (mensaje e ícono cuando no hay resultados)
- [x] Crear componente `pagination` (controles de paginación)
- [x] Crear componente `whatsapp-button` (botón estilo WhatsApp con link de contacto)
- [x] Registrar todos los componentes en `SharedModule` y exportarlos

### Actividad 2.4 — Definir estilos globales

- [x] Definir variables CSS en `styles.css`: `--color-primary`, `--color-secondary`, `--color-text`, `--color-bg-light`, `--color-white`
- [x] Agregar clases utilitarias: `.page-container`, `.section-title`, `.card-shadow`, `.featured-badge`, `.clickable-card`, `.empty-state`, `.map-container`, `.whatsapp-btn`, `.admin-layout`
- [x] Integrar `app-navbar` y `app-footer` en `app.component.html`
- [x] Agregar `<router-outlet>` entre navbar y footer

---

## Etapa 3 — Autenticación

**Objetivo:** Flujo completo de registro e inicio de sesión funcional con datos mock.

### Actividad 3.1 — Construir página de Login

- [x] Crear componente `login-page` en `features/auth/login-page/`
- [x] Construir formulario reactivo con campos: correo, contraseña
- [x] Agregar validaciones: correo válido, contraseña requerida
- [x] Mostrar mensajes de error por campo
- [x] Conectar botón "Ingresar" con `AuthService.login()`
- [x] Redirigir al home o al dashboard según rol tras login exitoso
- [x] Agregar link de navegación hacia registro

### Actividad 3.2 — Construir página de Registro

- [x] Crear componente `register-page` en `features/auth/register-page/`
- [x] Mostrar selector de tipo de registro: Ciudadano / Prestador
- [x] Mostrar formulario correspondiente según selección

### Actividad 3.3 — Construir formulario de registro ciudadano

- [x] Crear componente `register-citizen-form` en `features/auth/`
- [x] Campos: nombre completo, correo, contraseña, confirmar contraseña, barrio, teléfono
- [x] Validaciones: todos requeridos, contraseñas coincidentes, correo válido
- [x] Conectar con `AuthService.register()` con rol `citizen`
- [x] Redirigir al login o al home tras registro exitoso

### Actividad 3.4 — Construir formulario de registro prestador

- [x] Crear componente `register-provider-form` en `features/auth/`
- [x] Campos: nombre completo, correo, contraseña, confirmar contraseña, barrio, teléfono, nombre del prestador, horario, disponibilidad, descripción
- [x] Validaciones: todos los campos obligatorios excepto descripción
- [x] Conectar con `AuthService.register()` con rol `provider`
- [x] Redirigir al dashboard del prestador tras registro exitoso

---

## Etapa 4 — Home y catálogo de servicios

**Objetivo:** Pantalla principal pública y catálogo de servicios funcional con filtros y detalle.

### Actividad 4.1 — Construir página de inicio (Home)

- [x] Crear componente `home-page` en `features/home/`
- [x] Crear subcomponente `hero-section` con buscador principal y texto de bienvenida
- [x] Crear subcomponente `categories-grid` con grilla de categorías disponibles
- [x] Crear subcomponente `featured-services-section` con listado de servicios destacados (usa `service-card`)
- [x] Crear subcomponente `top-providers-section` con mini ranking de prestadores (usa `provider-card`)
- [x] Crear subcomponente `ads-banner` con imagen de publicidad activa
- [x] Conectar secciones con datos mock de los servicios correspondientes

### Actividad 4.2 — Construir listado de servicios

- [x] Crear componente `services-list-page` en `features/services-catalog/`
- [x] Integrar componente `search-filters` en la parte superior
- [x] Listar servicios en grilla de tarjetas usando `service-card`
- [x] Implementar filtrado por categoría, barrio y palabra clave (con datos mock)
- [x] Integrar componente `pagination` al final de la lista
- [x] Mostrar `empty-state` si no hay resultados
- [x] Mostrar `app-loader` mientras carga

### Actividad 4.3 — Construir detalle de servicio

- [x] Crear componente `service-detail-page` en `features/services-catalog/`
- [x] Mostrar: nombre, categoría, descripción, barrio/zona, horario, disponibilidad, precio, calificación promedio
- [x] Integrar `whatsapp-button` con el número del prestador
- [x] Integrar `rating-stars` para mostrar calificaciones
- [x] Crear subcomponente `service-comments-section` con listado de comentarios
- [x] Mostrar formulario de calificación si el usuario está autenticado

### Actividad 4.4 — Construir vista de mapa

- [x] Crear componente `service-map-view` en `features/services-catalog/`
- [x] Integrar `@angular/google-maps` o Google Maps JS API
- [x] Mostrar marcadores de servicios en el mapa según latitud/longitud
- [x] Al hacer clic en marcador, mostrar nombre y link al detalle del servicio
- [x] Alternar entre vista lista y vista mapa en la página de servicios

---

## Etapa 5 — Área del prestador

**Objetivo:** Panel privado donde el prestador gestiona su perfil y sus servicios.

### Actividad 5.1 — Construir dashboard del prestador

- [x] Crear componente `provider-dashboard-page` en `features/providers/`
- [x] Mostrar resumen: cantidad de servicios activos, calificación promedio, estado de perfil destacado
- [x] Crear subcomponente `provider-stats-summary` con tarjetas de indicadores
- [x] Agregar links rápidos a: editar perfil, crear servicio, ver historial

### Actividad 5.2 — Construir formulario de perfil del prestador

- [x] Crear componente `provider-profile-form` en `features/providers/`
- [x] Campos: nombre del prestador, WhatsApp, barrio, zona, horario, disponibilidad, descripción, foto
- [x] Conectar con `ProviderService.updateProviderProfile()`
- [x] Mostrar estado actual del perfil y si es destacado

### Actividad 5.3 — Construir listado de servicios del prestador

- [x] Crear componente `provider-services-list` en `features/providers/`
- [x] Listar servicios del prestador autenticado
- [x] Cada ítem con botones: editar, eliminar
- [x] Confirmar eliminación con `app-confirm-modal`
- [x] Botón para crear nuevo servicio

### Actividad 5.4 — Construir formulario crear / editar servicio

- [x] Crear componente `provider-service-form` en `features/providers/`
- [x] Campos: nombre, categoría (select), descripción, barrio/zona, WhatsApp, horario, disponibilidad, precio, fotos, ubicación en mapa
- [x] Reutilizar mismo formulario para crear y editar (`provider-service-edit`)
- [x] Validaciones: nombre, categoría, descripción, barrio, WhatsApp y horario son requeridos
- [x] Conectar con `ServiceCatalogService.createService()` y `editService()`

### Actividad 5.5 — Construir historial de solicitudes

- [x] Crear componente `provider-requests-history` en `features/providers/`
- [x] Listar solicitudes recibidas con estado: pendiente, contactado, cerrado
- [x] Conectar con `RequestHistoryService.listRequests()`

---

## Etapa 6 — Funcionalidades adicionales

**Objetivo:** Completar las funcionalidades secundarias del sistema.

### Actividad 6.1 — Favoritos

- [x] Crear componente `favorites-page` en `features/favorites/`
- [x] Crear subcomponente `favorite-service-list` usando `service-card`
- [x] Agregar botón de toggle favorito en `service-card` y `service-detail-page`
- [x] Conectar con `FavoriteService`

### Actividad 6.2 — Notificaciones

- [x] Crear componente `notifications-page` en `features/notifications/`
- [x] Crear subcomponente `notification-list` con ítems individuales `notification-item`
- [x] Mostrar ícono de notificaciones no leídas en navbar
- [x] Botón para marcar todas como leídas
- [x] Conectar con `NotificationService`

### Actividad 6.3 — Calificaciones

- [x] Crear componente `rating-form` en `features/ratings/`
- [x] Crear componente `rating-summary` con promedio y distribución de estrellas
- [x] Integrar `rating-form` en `service-detail-page` para usuarios autenticados
- [x] Conectar con `RatingService`

### Actividad 6.4 — Reportes

- [x] Crear componente `report-user-form` en `features/reports/`
- [x] Crear componente `report-service-form` en `features/reports/`
- [x] Campos en ambos: motivo (select), detalle (textarea opcional)
- [x] Conectar con `ReportService.createReport()`

### Actividad 6.5 — Ranking de prestadores

- [x] Crear componente `provider-ranking-page` en `features/ratings/`
- [x] Listar prestadores ordenados por calificación promedio descendente
- [x] Mostrar posición, nombre, calificación y badge de destacado
- [x] Conectar con `ProviderService.getRanking()`

### Actividad 6.6 — Perfil del usuario

- [x] Crear componente `profile-page` en `features/profile/`
- [x] Crear subcomponente `profile-form` con campos: nombre completo, teléfono, barrio
- [x] Conectar con `UserService.updateProfile()`

---

## Etapa 7 — Panel de administración

**Objetivo:** Módulo privado para que el administrador gestione todo el sistema.

### Actividad 7.1 — Layout del panel admin

- [x] Crear componente `admin-sidebar` con links a todas las secciones admin
- [x] Crear componente `admin-topbar` con nombre del admin y botón de logout
- [x] Crear layout contenedor con `admin-sidebar` + `<router-outlet>`
- [x] Aplicar clase `.admin-layout` y estilos diferenciados

### Actividad 7.2 — Dashboard admin

- [x] Crear componente `admin-dashboard-page` con tarjetas resumen:
  - Total usuarios
  - Total servicios activos
  - Reportes pendientes
  - Prestadores destacados activos

### Actividad 7.3 — Gestión de usuarios

- [x] Crear componente `admin-users-page`
- [x] Listar todos los usuarios en tabla (nombre, correo, rol, estado, fecha)
- [x] Botones: ver perfil, desactivar/activar, eliminar (con confirmación)
- [x] Filtrar por rol y estado
- [x] Conectar con `UserService`

### Actividad 7.4 — Gestión de servicios

- [x] Crear componente `admin-services-page`
- [x] Listar todos los servicios en tabla (nombre, prestador, categoría, estado, destacado)
- [x] Botones: ver detalle, eliminar (con confirmación)
- [x] Filtrar por categoría y estado
- [x] Conectar con `ServiceCatalogService`

### Actividad 7.5 — Gestión de categorías

- [x] Crear componente `admin-categories-page`
- [x] Listar categorías con nombre, ícono y estado
- [x] Formulario inline o modal para crear/editar categoría
- [x] Botón eliminar con confirmación
- [x] Conectar con `CategoryService`

### Actividad 7.6 — Gestión de perfiles destacados

- [x] Crear componente `admin-featured-page`
- [x] Listar prestadores con toggle de estado destacado
- [x] Activar / desactivar perfil destacado desde tabla
- [x] Conectar con `ProviderService`

### Actividad 7.7 — Gestión de publicidad

- [x] Crear componente `admin-ads-page`
- [x] Listar anuncios con imagen, título, fechas y estado
- [x] Formulario modal para crear/editar anuncio
- [x] Campos: título, imagen (URL), enlace, fecha inicio, fecha fin, estado
- [x] Conectar con `AdvertisementService`

### Actividad 7.8 — Gestión de reportes

- [x] Crear componente `admin-reports-page`
- [x] Listar reportes con: tipo (usuario/servicio), motivo, estado, fecha
- [x] Cambiar estado del reporte: pendiente → revisado → cerrado
- [x] Conectar con `ReportService`

---

## Etapa 8 — Guards, interceptors y seguridad

**Objetivo:** Proteger rutas y adjuntar token a las peticiones.

### Actividad 8.1 — Implementar AuthGuard

- [x] Crear `AuthGuard` en `core/guards/auth.guard.ts`
- [x] Verificar si el usuario tiene sesión activa
- [x] Si no hay sesión, redirigir a `/login`
- [x] Aplicar guard a rutas: `/favorites`, `/notifications`, `/profile`, `/provider/*`

### Actividad 8.2 — Implementar RoleGuard

- [x] Crear `RoleGuard` en `core/guards/role.guard.ts`
- [x] Recibir rol esperado como dato de ruta (`data: { role: 'admin' }`)
- [x] Verificar que el usuario autenticado tenga el rol requerido
- [x] Aplicar a rutas `/admin/*` (rol `admin`) y `/provider/*` (rol `provider`)

### Actividad 8.3 — Implementar AuthInterceptor

- [x] Crear `AuthInterceptor` en `core/interceptors/auth.interceptor.ts`
- [x] Leer el token del `StorageService` o `localStorage`
- [x] Adjuntar header `Authorization: Bearer <token>` a cada petición HTTP saliente
- [x] Registrar el interceptor en `AppModule`

---

## Etapa 9 — Integración con backend real

**Objetivo:** Reemplazar datos mock por llamadas reales a la API .NET.

### Actividad 9.1 — Configurar entornos

- [x] Definir `environment.ts` con `apiUrl` para desarrollo
- [x] Definir `environment.prod.ts` con `apiUrl` para producción
- [x] Crear `ApiBaseService` con `baseUrl` centralizado

### Actividad 9.2 — Reemplazar mocks por llamadas HTTP

- [x] Actualizar `AuthService` para llamar a endpoints reales de autenticación
- [x] Actualizar `UserService` para llamar a endpoints reales de usuarios
- [x] Actualizar `ProviderService` para llamar a endpoints reales de prestadores
- [x] Actualizar `ServiceCatalogService` para llamar a endpoints reales de servicios
- [x] Actualizar `CategoryService` para llamar a endpoints reales de categorías
- [x] Actualizar `RatingService` para llamar a endpoints reales de calificaciones
- [x] Actualizar `FavoriteService` para llamar a endpoints reales de favoritos
- [x] Actualizar `NotificationService` para llamar a endpoints reales de notificaciones
- [x] Actualizar `AdvertisementService` para llamar a endpoints reales de publicidad
- [x] Actualizar `ReportService` para llamar a endpoints reales de reportes

### Actividad 9.3 — Manejo de errores HTTP

- [x] Manejar errores 401 (no autorizado) redirigiendo al login
- [x] Mostrar `app-alert` con mensajes de error del backend
- [x] Manejar errores de red con mensaje genérico

---

## Etapa 10 — Ajustes finales y revisión

**Objetivo:** Garantizar calidad visual, responsive y de experiencia de usuario.

### Actividad 10.1 — Ajuste responsive

- [x] Revisar navbar en mobile (menú hamburguesa funcional)
- [x] Revisar grillas de tarjetas en pantallas pequeñas (col-sm, col-md)
- [x] Revisar formularios en mobile (inputs a full width)
- [x] Revisar tablas admin en mobile (scroll horizontal)
- [x] Revisar mapa en mobile (altura adecuada)

### Actividad 10.2 — Revisión UX general

- [x] Verificar que todos los formularios muestran mensajes de error claros
- [x] Verificar que los loaders aparecen en todas las cargas de datos
- [x] Verificar que los modales de confirmación se usan antes de eliminar
- [x] Verificar que las rutas protegidas redirigen correctamente
- [x] Verificar que el botón de WhatsApp abre el chat en una nueva pestaña

### Actividad 10.3 — Revisión de navegación y rutas

- [x] Verificar que todas las rutas definidas funcionan
- [x] Verificar que el breadcrumb o navegación secundaria es coherente
- [x] Agregar página 404 para rutas no encontradas
- [x] Verificar redirecciones de rol (ciudadano vs prestador vs admin)

---

## Resumen de entregables por etapa

| Etapa | Descripción                           | Entregable principal                              |
|-------|---------------------------------------|---------------------------------------------------|
| 1     | Base del proyecto                     | Proyecto Angular + modelos + servicios mock       |
| 2     | Shared y layout                       | Navbar, footer y componentes compartidos          |
| 3     | Autenticación                         | Login y registro funcional con validaciones       |
| 4     | Home y catálogo                       | Pantalla inicial + listado + detalle + mapa       |
| 5     | Área del prestador                    | Dashboard + perfil + CRUD de servicios            |
| 6     | Funcionalidades adicionales           | Favoritos, notificaciones, calificaciones, reportes |
| 7     | Panel de administración               | CRUD completo de administración                   |
| 8     | Guards e interceptors                 | Seguridad de rutas y autenticación HTTP           |
| 9     | Integración con backend               | Llamadas HTTP reales a la API REST                |
| 10    | Ajustes finales                       | Responsive, UX y navegación revisados             |

---

## Notas para el agente ejecutor

- Construir una etapa completamente antes de avanzar a la siguiente.
- Usar datos mock en etapas 1 a 8, sin depender del backend.
- Priorizar el flujo del ciudadano y del prestador antes que el módulo de administración.
- Mantener los componentes simples: la lógica de negocio debe residir en los servicios.
- Cada componente debe tener su propio archivo CSS (`.component.css`).
- Seguir la convención de nombres Angular: `nombre-en-kebab-case.component.ts`.
