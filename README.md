# Gestor de Tareas - Frontend

Frontend del proyecto **Gestor de Tareas** construido con **React**, **Vite**, **TailwindCSS**, **React Router**, **SweetAlert2** y **React Toastify**.

La aplicación consume exclusivamente el backend real y no usa JSON Server ni localStorage como base principal de datos.

## Tecnologías

- React
- Vite
- TailwindCSS
- React Router
- SweetAlert2
- React Toastify
- Fetch API
- Context API

## Estructura

```text
frontend/
  package.json
  README.md
  index.html
  vite.config.js
  tailwind.config.js
  postcss.config.js
  src/
    App.jsx
    main.jsx
    app.js
    config.js
    index.css
    components/
      EmptyState.jsx
      Layout.jsx
      LoadingState.jsx
      Navbar.jsx
      PageHeader.jsx
      PriorityBadge.jsx
      SearchBar.jsx
      SortControls.jsx
      StatCard.jsx
      StatusBadge.jsx
      TaskCard.jsx
      TaskForm.jsx
    pages/
      CompletedTasksPage.jsx
      DashboardPage.jsx
      NotFoundPage.jsx
      PendingTasksPage.jsx
      TaskFormPage.jsx
      TaskListPage.jsx
    context/
      TaskContext.jsx
```

## Instalación

1. Entra a la carpeta `frontend`.
2. Instala dependencias:

```bash
npm install
```

## Ejecución

```bash
npm run dev
```

La aplicación se levantará normalmente en:

```text
http://localhost:5173
```

## Proxy de desarrollo

El frontend usa **Vite Proxy** para enviar las solicitudes `/api` al backend en `http://localhost:4000`.

Configuración incluida en `vite.config.js`:

```js
server: {
  proxy: {
    "/api": {
      target: "http://localhost:4000",
      changeOrigin: true
    }
  }
}
```

## Rutas principales

- `/` -> Dashboard
- `/tasks/pending` -> Tareas pendientes
- `/tasks/completed` -> Tareas completadas
- `/tasks/new` -> Crear tarea
- `/tasks/edit/:id` -> Editar tarea

## Funcionalidades

- Resumen visual en dashboard
- Listado de tareas pendientes
- Listado de tareas completadas
- Crear tareas
- Editar tareas
- Eliminar tareas
- Marcar tareas como completadas
- Buscar por título
- Ordenar por fecha y alfabéticamente
- Validación en formulario
- Toasts de éxito y error
- Confirmaciones con SweetAlert2
- Context API simple para tareas, categorías y recarga general

## Notas importantes

- El frontend espera que el backend entregue respuestas JSON con el formato definido en el enunciado.
- No incluye autenticación, roles, Redux ni TypeScript.
- La fuente real de datos es MySQL a través del backend.
