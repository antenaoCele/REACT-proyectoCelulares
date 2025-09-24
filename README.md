# Proyecto Celulares

Esta aplicación web fue desarrollada como práctica de **desarrollo front-end con React**, mostrando un catálogo de celulares con información detallada, carrito de compras y navegación dinámica.  
Su objetivo es simular una **tienda online** sencilla, incorporando conceptos modernos de desarrollo web y buenas prácticas.

---

## Tecnologías utilizadas

- **React 18 + Vite**: React permite construir interfaces interactivas y reutilizables mediante componentes. Vite se eligió por su rapidez en el entorno de desarrollo. 
- **Material UI (MUI)**: Biblioteca de componentes listos y personalizables que facilita el diseño responsive y profesional, evitando crear estilos desde cero y asegurando consistencia visual.  
- **React Router DOM**: Maneja la navegación entre páginas sin recargar el navegador. Se utilizó para mostrar el listado principal de celulares y el detalle individual mediante rutas dinámicas (`/celular/:id`).  
- **Context API**: Permite compartir el estado global del carrito de compras entre componentes sin necesidad de “props drilling”. Se eligió en lugar de Redux por ser más simple y suficiente para este proyecto.  

---

##  Características principales

- **Listado de productos**: muestra los celulares disponibles con su información básica (marca, modelo, RAM, almacenamiento, precio).  
- **Detalle individual**: cada celular tiene una página propia con especificaciones completas.  
- **Carrito de compras**: permite agregar, eliminar y visualizar el total en cualquier momento.  
- **Feedback al usuario**: mensajes de confirmación al agregar productos.



