# Plan de desarrollo del frontend - VeciLink

## 1. Propósito del documento

Este documento define el plan de desarrollo del frontend de **VeciLink**, una plataforma web para conectar ciudadanos con prestadores de servicios locales. El objetivo es que este plan pueda ser ejecutado por un **agente de IA** de forma ordenada, con una estructura clara de componentes, servicios, modelos, módulos, rutas y estilos.

Este plan está pensado para una implementación **web responsive**, orientada a una ciudad desde la primera versión, con usuarios tipo ciudadano, prestador y administrador, registro por correo y contraseña, publicación de servicios, búsqueda con filtros, contacto por WhatsApp y monetización básica mediante perfiles destacados y publicidad.

---

## 2. Objetivo del frontend

El frontend debe permitir que los usuarios:

- Se registren e inicien sesión.
- Consulten servicios por categoría, barrio, palabra clave y mapa.
- Visualicen perfiles y detalle de servicios.
- Contacten prestadores por WhatsApp.
- Califiquen y comenten servicios.
- Gestionen favoritos, notificaciones y reportes.
- Permitan al administrador gestionar usuarios, servicios, categorías, publicidad y perfiles destacados.

---

## 3. Stack recomendado para el frontend

### Tecnologías base

- **Framework:** Angular
- **Estilos:** CSS por componente + estilos globales
- **Librería UI:** Bootstrap 5
- **Iconos:** Bootstrap Icons
- **Mapas:** Google Maps JavaScript API o `@angular/google-maps`
- **HTTP client:** Angular HttpClient
- **Manejo de formularios:** Reactive Forms
- **Ruteo:** Angular Router

### Librerías recomendadas

```bash
npm install bootstrap bootstrap-icons
npm install @angular/google-maps
```

Configuraciones sugeridas:

- Incluir Bootstrap en `angular.json`.
- Usar Bootstrap Icons por CDN o instalación local.
- Mantener CSS simple y claro, evitando dependencias pesadas.

---

## 4. Principios de diseño del frontend

El agente de IA que construya el frontend debe seguir estos principios:

1. **Separación por módulos funcionales.**
2. **Componentes pequeños y reutilizables.**
3. **Reactive Forms** para formularios.
4. **Servicios Angular** para llamadas al backend.
5. **Modelos e interfaces** para tipado fuerte.
6. **Diseño responsive** con Bootstrap.
7. **CSS simple**, sin sobrecargar animaciones ni estilos complejos.
8. **Preparado para integrar backend .NET Web API** más adelante.

---

## 5. Estructura general recomendada del proyecto

```text
src/
 ├── app/
 │    ├── core/
 │    │    ├── guards/
 │    │    ├── interceptors/
 │    │    ├── models/
 │    │    ├── services/
 │    │    └── utils/
 │    ├── shared/
 │    │    ├── components/
 │    │    ├── directives/
 │    │    ├── pipes/
 │    │    └── shared.module.ts
 │    ├── features/
 │    │    ├── auth/
 │    │    ├── home/
 │    │    ├── services-catalog/
 │    │    ├── providers/
 │    │    ├── favorites/
 │    │    ├── notifications/
 │    │    ├── ratings/
 │    │    ├── reports/
 │    │    ├── admin/
 │    │    └── profile/
 │    ├── app-routing.module.ts
 │    ├── app.component.ts
 │    └── app.module.ts
 ├── assets/
 ├── environments/
 └── styles.css
```

---

## 6. Módulos funcionales del frontend

## 6.1 CoreModule

Contendrá elementos globales y reutilizables del sistema.

### Contenido recomendado

- `AuthService`
- `StorageService`
- `ApiBaseService`
- `NotificationService`
- `AuthGuard`
- `RoleGuard`
- `AuthInterceptor`

### Objetivo

Centralizar autenticación, configuración global y utilidades de infraestructura.

---

## 6.2 SharedModule

Contendrá componentes reutilizables de interfaz.

### Componentes sugeridos

- Navbar principal
- Footer
- Loader / spinner
- Tarjeta de servicio
- Tarjeta de prestador
- Buscador con filtros
- Modal de confirmación
- Paginador
- Badge de destacado
- Componente de ranking / estrellas
- Empty state
- Alertas reutilizables

---

## 6.3 AuthModule

Gestiona autenticación y acceso.

### Componentes

- `login-page`
- `register-page`
- `register-citizen-form`
- `register-provider-form`
- `forgot-password-page` (opcional para segunda fase)

### Funcionalidades

- Registro por correo y contraseña.
- Inicio de sesión.
- Validaciones de formularios.
- Diferenciación entre ciudadano y prestador.

---

## 6.4 HomeModule

Pantalla inicial pública.

### Componentes

- `home-page`
- `hero-section`
- `search-home`
- `featured-services-section`
- `top-providers-section`
- `ads-banner`
- `categories-grid`

### Funcionalidades

- Mostrar buscador principal.
- Mostrar servicios destacados.
- Mostrar ranking de prestadores.
- Mostrar publicidad local.

---

## 6.5 ServicesCatalogModule

Gestiona la consulta del catálogo de servicios.

### Componentes

- `services-list-page`
- `service-filters`
- `service-card`
- `service-detail-page`
- `service-map-view`
- `service-comments-section`
- `contact-whatsapp-button`

### Funcionalidades

- Listar servicios.
- Filtrar por categoría, barrio y palabra clave.
- Visualización por mapa.
- Detalle del servicio.
- Contacto vía WhatsApp.
- Mostrar calificaciones.

---

## 6.6 ProvidersModule

Gestiona el área privada del prestador de servicios.

### Componentes

- `provider-dashboard-page`
- `provider-profile-form`
- `provider-services-list`
- `provider-service-form`
- `provider-service-edit`
- `provider-stats-summary`
- `provider-requests-history`

### Funcionalidades

- Editar perfil.
- Crear múltiples servicios.
- Editar y eliminar servicios.
- Ver historial de solicitudes.
- Ver estado de perfil destacado.

---

## 6.7 ProfileModule

Perfil del usuario autenticado.

### Componentes

- `profile-page`
- `profile-form`
- `change-password-form` (opcional)

### Funcionalidades

- Ver y editar datos del usuario.
- Actualizar teléfono, barrio, datos básicos.

---

## 6.8 FavoritesModule

### Componentes

- `favorites-page`
- `favorite-service-list`

### Funcionalidades

- Guardar prestadores o servicios favoritos.
- Quitar favoritos.
- Acceder rápido a perfiles guardados.

---

## 6.9 NotificationsModule

### Componentes

- `notifications-page`
- `notification-list`
- `notification-item`

### Funcionalidades

- Ver notificaciones del usuario.
- Marcar como leídas.
- Navegar a la entidad relacionada.

---

## 6.10 RatingsModule

### Componentes

- `rating-form`
- `rating-stars`
- `rating-summary`
- `provider-ranking-page`

### Funcionalidades

- Calificar con estrellas.
- Agregar comentarios.
- Ver ranking de mejores prestadores.

---

## 6.11 ReportsModule

### Componentes

- `report-user-form`
- `report-service-form`

### Funcionalidades

- Reportar usuario.
- Reportar servicio.
- Enviar motivo de reporte.

---

## 6.12 AdminModule

Módulo privado para administración.

### Componentes

- `admin-dashboard-page`
- `admin-users-page`
- `admin-services-page`
- `admin-categories-page`
- `admin-featured-page`
- `admin-ads-page`
- `admin-reports-page`
- `admin-sidebar`
- `admin-topbar`

### Funcionalidades

- Ver usuarios.
- Eliminar usuarios.
- Ver servicios.
- Eliminar servicios.
- Crear y editar categorías.
- Gestionar perfiles destacados.
- Gestionar publicidad.
- Revisar reportes.

---

## 7. Clases, interfaces y modelos recomendados

El frontend debe trabajar con **interfaces TypeScript** para representar las entidades del negocio.

## 7.1 Usuario

```ts
export interface User {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  role: 'citizen' | 'provider' | 'admin';
  neighborhood?: string;
  isActive: boolean;
  createdAt: string;
}
```

## 7.2 Prestador

```ts
export interface ProviderProfile {
  id: number;
  userId: number;
  providerName: string;
  whatsapp: string;
  neighborhood: string;
  zone?: string;
  schedule: string;
  availability: string;
  description?: string;
  ratingAverage?: number;
  isFeatured: boolean;
  photoUrl?: string;
}
```

## 7.3 Servicio

```ts
export interface ServiceItem {
  id: number;
  providerId: number;
  serviceName: string;
  categoryId: number;
  categoryName?: string;
  description: string;
  neighborhood: string;
  zone?: string;
  whatsapp: string;
  schedule: string;
  availability: string;
  price?: number;
  photos?: string[];
  latitude?: number;
  longitude?: number;
  isFeatured: boolean;
  averageRating?: number;
  totalRatings?: number;
  createdAt?: string;
}
```

## 7.4 Categoría

```ts
export interface Category {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  isActive: boolean;
}
```

## 7.5 Calificación

```ts
export interface Rating {
  id: number;
  serviceId: number;
  userId: number;
  stars: number;
  comment: string;
  createdAt: string;
  userName?: string;
}
```

## 7.6 Favorito

```ts
export interface Favorite {
  id: number;
  userId: number;
  serviceId: number;
  createdAt: string;
}
```

## 7.7 Notificación

```ts
export interface AppNotification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  createdAt: string;
}
```

## 7.8 Publicidad

```ts
export interface Advertisement {
  id: number;
  title: string;
  imageUrl: string;
  redirectUrl?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}
```

## 7.9 Reporte

```ts
export interface ReportItem {
  id: number;
  reporterUserId: number;
  reportedUserId?: number;
  reportedServiceId?: number;
  reason: string;
  createdAt: string;
  status: 'pending' | 'reviewed' | 'closed';
}
```

## 7.10 Solicitud de servicio

```ts
export interface ServiceRequest {
  id: number;
  userId: number;
  serviceId: number;
  status: 'pending' | 'contacted' | 'closed';
  createdAt: string;
}
```

---

## 8. Servicios Angular recomendados

Cada servicio debe tener responsabilidad clara.

## 8.1 AuthService

Responsable de:

- login
- registro
- logout
- consultar usuario autenticado
- validar rol

## 8.2 UserService

Responsable de:

- obtener perfil
- actualizar perfil
- listar usuarios (admin)
- eliminar usuarios (admin)

## 8.3 ProviderService

Responsable de:

- obtener perfil de prestador
- actualizar perfil de prestador
- obtener ranking de prestadores

## 8.4 ServiceCatalogService

Responsable de:

- listar servicios
- buscar servicios
- obtener detalle de servicio
- crear servicio
- editar servicio
- eliminar servicio
- obtener servicios destacados

## 8.5 CategoryService

Responsable de:

- listar categorías
- crear categoría
- editar categoría
- eliminar categoría

## 8.6 RatingService

Responsable de:

- listar comentarios
- agregar calificación
- obtener resumen de calificaciones

## 8.7 FavoriteService

Responsable de:

- listar favoritos
- agregar favorito
- eliminar favorito

## 8.8 NotificationService

Responsable de:

- listar notificaciones
- marcar como leídas

## 8.9 AdvertisementService

Responsable de:

- listar anuncios activos
- crear anuncio
- editar anuncio
- desactivar anuncio

## 8.10 ReportService

Responsable de:

- crear reporte
- listar reportes
- cambiar estado del reporte

## 8.11 MapService

Responsable de:

- configurar mapa
- geocodificación básica
- centrar mapa según resultados

## 8.12 RequestHistoryService

Responsable de:

- listar solicitudes de servicio
- registrar solicitud enviada

---

## 9. Guards e interceptors recomendados

## 9.1 AuthGuard

Evita el acceso a rutas privadas si no hay sesión activa.

## 9.2 RoleGuard

Restringe rutas según rol:

- ciudadano
- prestador
- administrador

## 9.3 AuthInterceptor

Adjunta token a las peticiones HTTP cuando exista autenticación.

---

## 10. Rutas recomendadas

```text
/                       -> Home
/login                  -> Inicio de sesión
/register               -> Registro
/services               -> Listado de servicios
/services/:id           -> Detalle del servicio
/ranking                -> Ranking de prestadores
/favorites              -> Favoritos
/notifications          -> Notificaciones
/profile                -> Perfil del usuario
/provider/dashboard     -> Panel del prestador
/provider/services/new  -> Crear servicio
/provider/services/:id/edit -> Editar servicio
/admin                  -> Dashboard admin
/admin/users            -> Gestión de usuarios
/admin/services         -> Gestión de servicios
/admin/categories       -> Gestión de categorías
/admin/featured         -> Gestión de destacados
/admin/ads              -> Gestión de publicidad
/admin/reports          -> Gestión de reportes
```

---

## 11. Componentes compartidos obligatorios

Estos componentes deben construirse primero porque se reutilizan en gran parte del sistema.

### Lista prioritaria

- `app-navbar`
- `app-footer`
- `app-loader`
- `app-alert`
- `app-confirm-modal`
- `service-card`
- `provider-card`
- `rating-stars`
- `featured-badge`
- `search-filters`
- `empty-state`
- `pagination`
- `whatsapp-button`

---

## 12. Formularios principales que debe construir el agente de IA

## 12.1 Login

Campos:

- correo
- contraseña

## 12.2 Registro de ciudadano

Campos:

- nombre completo
- correo
- contraseña
- confirmar contraseña
- barrio
- teléfono

## 12.3 Registro de prestador

Campos:

- nombre completo
- correo
- contraseña
- confirmar contraseña
- barrio
- teléfono
- nombre del prestador
- horario
- disponibilidad
- descripción

## 12.4 Crear / editar servicio

Campos:

- nombre del servicio
- categoría
- descripción
- barrio / zona
- WhatsApp
- horario
- disponibilidad
- precio opcional
- fotos opcionales
- ubicación en mapa

## 12.5 Calificación

Campos:

- estrellas
- comentario

## 12.6 Reporte

Campos:

- motivo del reporte
- detalle opcional

## 12.7 Publicidad

Campos:

- título
- imagen
- enlace
- fecha inicio
- fecha fin
- estado

---

## 13. Diseño visual recomendado

## 13.1 Estilo general

El diseño debe ser:

- limpio
- amigable
- comunitario
- moderno
- fácil de usar

## 13.2 Paleta de colores sugerida

- Azul principal: `#2D6CDF`
- Verde secundario: `#2ECC71`
- Blanco: `#FFFFFF`
- Gris oscuro texto: `#333333`
- Gris claro fondos: `#F5F5F5`

## 13.3 Uso de Bootstrap

Bootstrap debe usarse para:

- grid responsive
- formularios
- navbar
- cards
- botones
- modales
- tablas administrativas

Evitar exceso de personalización al inicio. Primero debe priorizarse funcionalidad.

---

## 14. Clases CSS sugeridas a nivel global

En `styles.css` se recomienda definir clases utilitarias simples adicionales a Bootstrap:

```css
.page-container {}
.section-title {}
.card-shadow {}
.featured-badge {}
.clickable-card {}
.empty-state {}
.map-container {}
.whatsapp-btn {}
.admin-layout {}
```

También se recomienda definir variables CSS:

```css
:root {
  --color-primary: #2D6CDF;
  --color-secondary: #2ECC71;
  --color-text: #333333;
  --color-bg-light: #F5F5F5;
  --color-white: #FFFFFF;
}
```

---

## 15. Orden recomendado de construcción para el agente de IA

Para evitar retrabajo, el agente debe construir el frontend en este orden.

## Fase 1. Base del proyecto

1. Crear proyecto Angular.
2. Configurar Bootstrap y Bootstrap Icons.
3. Configurar estructura de carpetas.
4. Crear rutas base.
5. Crear modelos e interfaces.
6. Crear servicios base vacíos o con mocks.

## Fase 2. Shared y layout

7. Construir navbar.
8. Construir footer.
9. Construir loader, alertas, modales y componentes compartidos.
10. Definir estilos globales.

## Fase 3. Autenticación

11. Construir login.
12. Construir registro ciudadano.
13. Construir registro prestador.
14. Conectar formularios con servicios mock.

## Fase 4. Home y catálogo

15. Construir página de inicio.
16. Construir buscador principal.
17. Construir listado de servicios.
18. Construir detalle de servicio.
19. Integrar mapa.
20. Integrar botón de WhatsApp.

## Fase 5. Prestador

21. Construir dashboard de prestador.
22. Construir perfil del prestador.
23. Construir formulario crear servicio.
24. Construir listado y edición de servicios.

## Fase 6. Extras funcionales

25. Construir favoritos.
26. Construir notificaciones.
27. Construir calificaciones.
28. Construir reportes.
29. Construir ranking de prestadores.

## Fase 7. Administración

30. ✅ Construir dashboard admin.
31. ✅ Construir gestión de usuarios.
32. ✅ Construir gestión de servicios.
33. ✅ Construir gestión de categorías.
34. ✅ Construir gestión de destacados.
35. ✅ Construir gestión de publicidad.
36. ✅ Construir gestión de reportes.

## Fase 8. Integración y ajuste final

37. Reemplazar mocks por llamadas reales a API.
38. Agregar guards.
39. Agregar interceptor.
40. Ajustar responsive final.
41. Revisar UX general.

---

## 16. Estrategia recomendada para trabajar sin backend al inicio

Mientras se define el backend, el agente de IA puede avanzar usando:

- archivos JSON mock
- servicios Angular con `Observable` y `of()`
- datos simulados para usuarios, servicios, categorías y anuncios

Esto permitirá validar:

- pantallas
- navegación
- formularios
- experiencia de usuario
- responsive

---

## 17. Entregables esperados del agente de IA

El agente debe producir:

1. Proyecto Angular inicial estructurado.
2. Componentes creados por módulo.
3. Modelos TypeScript.
4. Servicios Angular listos para conectar con backend.
5. Rutas configuradas.
6. Formularios reactivos.
7. Diseño responsive con Bootstrap.
8. CSS por componente y estilos globales.
9. Datos mock para pruebas.
10. Documentación básica de la estructura creada.

---

## 18. Recomendaciones finales

- No intentar construir todo en una sola iteración.
- Priorizar primero flujo principal del ciudadano y del prestador.
- Construir con datos mock antes de integrar backend.
- Mantener los componentes simples.
- Evitar lógica de negocio compleja en los componentes; debe estar en los servicios.
- Aprovechar Bootstrap para acelerar y reducir complejidad de CSS.
- Dejar el frontend preparado para consumir .NET Web API mediante endpoints REST.

---

## 19. Alcance del MVP del frontend

Para la primera versión del frontend, se considera indispensable construir:

- Home pública
- Registro e inicio de sesión
- Catálogo de servicios
- Filtros de búsqueda
- Detalle de servicio
- Botón de WhatsApp
- Perfil de prestador
- CRUD básico de servicios del prestador
- Panel administrativo básico
- Gestión de categorías
- Visualización de destacados y publicidad

Las funcionalidades de favoritos, notificaciones, reportes y ranking pueden entrar en esta misma etapa si el tiempo lo permite, pero el flujo principal debe quedar resuelto primero.
