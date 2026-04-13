# VeciLink
## Plataforma de Servicios Comunitarios

---

## 1. Introducción

VeciLink es una plataforma web orientada a conectar ciudadanos con prestadores de servicios dentro de su comunidad, facilitando el acceso a soluciones locales de manera rápida, confiable y cercana. La aplicación busca fortalecer la economía local y mejorar la interacción entre vecinos mediante el uso de tecnología.

---

## 2. Problema

En muchas comunidades, las personas no cuentan con una herramienta centralizada para encontrar servicios confiables en su entorno cercano. Esto genera dificultades para ubicar prestadores, falta de confianza y dependencia de recomendaciones informales.

---

## 3. Justificación

La creación de VeciLink responde a la necesidad de digitalizar y organizar la oferta de servicios comunitarios, permitiendo a los ciudadanos encontrar soluciones de manera eficiente y a los prestadores dar visibilidad a su trabajo. La plataforma promueve la economía local y mejora la confianza entre usuarios.

---

## 4. Objetivos

### 4.1 Objetivo general

Desarrollar una plataforma web que permita conectar ciudadanos con prestadores de servicios dentro de una comunidad, facilitando la búsqueda, contacto y evaluación de servicios locales.

### 4.2 Objetivos específicos

- Permitir el registro de usuarios y prestadores de servicios.
- Facilitar la publicación y consulta de servicios.
- Implementar mecanismos de búsqueda por categoría, ubicación y palabra clave.
- Permitir la calificación y comentarios de servicios.
- Ofrecer funcionalidades de administración para el control del sistema.
- Implementar mecanismos iniciales de monetización.

---

## 5. Alcance

- Aplicación web responsive (computador, tablet y móvil).
- Cobertura inicial a nivel de ciudad.
- Plataforma enfocada en servicios comunitarios locales.
- No incluye pagos en línea en la primera versión.

---

## 6. Actores del sistema

### Ciudadano
Usuario que busca servicios.

### Prestador de servicio
Usuario que ofrece servicios dentro de la plataforma.

### Administrador
Encargado de gestionar el sistema.

---

## 7. Arquitectura del sistema

- Frontend: Angular
- Backend: .NET Web API
- Base de datos: SQL Server
- Despliegue: Servidor web

Arquitectura de tres capas:
- Presentación
- Lógica de negocio
- Datos

---

## 8. Modelo de negocio

- Modelo Freemium (perfiles destacados)
- Publicidad local
- Comisión por servicio (futuro)

---

## 9. Requerimientos funcionales

### 9.1 Usuarios

- Registro con correo y contraseña
- Inicio de sesión
- Gestión de perfil

---

### 9.2 Prestadores de servicios

- Crear perfil
- Publicar múltiples servicios
- Editar servicios

---

### 9.3 Servicios

Cada servicio deberá contener:

- Nombre del servicio
- Categoría
- Descripción
- Barrio o zona
- Nombre del prestador
- Teléfono (WhatsApp)
- Horario
- Disponibilidad
- Precio (opcional)
- Fotos (opcional)

---

### 9.4 Búsqueda

- Búsqueda por categoría
- Búsqueda por barrio
- Búsqueda por palabra clave
- Combinación de filtros
- Visualización en mapa (Google Maps)

---

### 9.5 Calificaciones

- Calificación por estrellas (1 a 5)
- Comentarios
- Ranking de prestadores

---

### 9.6 Contacto

- Botón de contacto vía WhatsApp

---

### 9.7 Funcionalidades adicionales

- Historial de solicitudes
- Favoritos
- Notificaciones
- Reporte de usuarios

---

### 9.8 Administración

El administrador podrá:

- Ver usuarios
- Eliminar usuarios
- Ver servicios
- Eliminar servicios
- Crear y editar categorías
- Gestionar perfiles destacados
- Gestionar publicidad

---

### 9.9 Monetización

- Perfiles destacados (prioridad + insignia)
- Publicidad local

---

## 10. Requerimientos no funcionales

- Aplicación web responsive
- Accesible desde navegador
- Rendimiento adecuado para múltiples usuarios
- Interfaz intuitiva
- Seguridad básica en autenticación
- Escalabilidad futura

---

## 11. Restricciones

- Uso limitado a una zona geográfica definida
- Solo servicios legales
- Prestadores mayores de edad
- Sin pagos en línea
- Contratación fuera de la plataforma
- No se garantiza veracidad total de la información
- Acceso vía internet
- Contenido sujeto a moderación

---

## 12. MVP (Producto mínimo viable)

Incluye:

- Registro e inicio de sesión
- Perfil de prestador
- Publicación de servicios
- Búsqueda por categoría y barrio
- Visualización de servicios
- Contacto vía WhatsApp
- Administración básica
- Categorías
- Perfiles destacados
- Publicidad básica

---

## 13. Conclusión

VeciLink representa una solución tecnológica enfocada en fortalecer la conexión entre vecinos y servicios locales, permitiendo una implementación gradual mediante un MVP funcional y escalable, con posibilidades de crecimiento hacia modelos más avanzados en el futuro.
