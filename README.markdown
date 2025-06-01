# API de Base de Datos de One Piece

Este proyecto es una aplicación full-stack para gestionar personajes de "One Piece" y sus apariciones en varios arcos de la historia. El backend es una API RESTful construida con Node.js, Express, Prisma ORM y PostgreSQL, que proporciona operaciones CRUD para personajes y sus relaciones con los arcos. El frontend es una interfaz sencilla basada en HTML ubicada en la carpeta `frontend/`, que interactúa con la API del backend.

## Estructura del Proyecto

- `backend/`: Contiene la API de Node.js/Express.
  - `index.js`: Archivo principal del servidor.
  - `seed.js`: Script para poblar la base de datos con datos iniciales.
  - `prisma/`: Esquema de Prisma y migraciones.
  - `.env`: Variables de entorno (por ejemplo, conexión a la base de datos).
- `frontend/`: Contiene los archivos del frontend.
  - `index.html`: Archivo HTML principal del frontend.
  - `script.js`: Archivo JavaScript para la lógica del frontend.
  - `styles.css`: Archivo CSS para el estilo del frontend.

## Requisitos Previos

Antes de comenzar, asegúrate de tener lo siguiente instalado en tu máquina:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [PostgreSQL](https://www.postgresql.org/) (versión 12 o superior)
- Una interfaz de línea de comandos (CLI) para ejecutar comandos
- Un navegador web moderno (por ejemplo, Chrome, Firefox)
- Conocimientos básicos de uso de la línea de comandos

## Instalación

1. **Clona el repositorio**:
   ```bash
   git clone <repository-url>
   ```

2. **Instala las dependencias del backend**:
   - Navega a la carpeta del backend e instala las dependencias:
     ```bash
     cd backend
     npm install
     ```

3. **Configura Prisma**:
   - Asegúrate de tener Prisma CLI instalado:
     ```bash
     npm install prisma --save-dev
     ```
   - Inicializa Prisma si aún no lo has hecho:
     ```bash
     npx prisma init
     ```

## Configuración de la Base de Datos

1. **Crea una base de datos PostgreSQL**:
   - Usa una herramienta como `psql` o pgAdmin para crear una nueva base de datos llamada `onepiece`.
   - Ejemplo usando `psql`:
     ```sql
     CREATE DATABASE onepiece;
     ```

2. **Configura la conexión a la base de datos**:
   - Actualiza el archivo `backend/.env` con tus credenciales de PostgreSQL:
     ```
     DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/onepiece?schema=public"
     ```
   - Reemplaza `usuario` y `contraseña` por tu nombre de usuario y contraseña reales de PostgreSQL.

3. **Ejecuta las migraciones de Prisma**:
   - Aplica el esquema para crear las tablas necesarias:
     ```bash
     cd backend
     npx prisma migrate dev --name init
     ```

## Poblar la Base de Datos

1. **Ejecuta el script de seed**:
   - Llena la base de datos con datos iniciales de "One Piece":
     ```bash
     cd backend
     node seed.js
     ```
   - Si el script no se ejecuta, asegúrate de haber agregado lo siguiente a tu `backend/package.json`:
     ```json
     "scripts": {
       "seed": "node seed.js"
     }
     ```
   - Luego ejecuta:
     ```bash
     npm run seed
     ```

## Iniciar el Servidor Backend

1. **Ejecuta el servidor Express**:
   - Desde la carpeta `backend/`:
     ```bash
     cd backend
     node index.js
     ```
   - El servidor se iniciará en `http://localhost:3000`.

## Ejecutar el Frontend

1. **Abre el frontend**:
   - Navega a la carpeta `frontend/` en tu explorador de archivos.
   - Localiza el archivo `index.html` y ábrelo en un navegador web (por ejemplo, haciendo doble clic o usando una herramienta como Live Server de VS Code).
   - Alternativamente, si usas VS Code con Live Server:
     - Haz clic derecho en `index.html` en VS Code y selecciona "Open with Live Server" (esto normalmente corre en `http://127.0.0.1:5500`).

2. **Interactúa con la aplicación**:
   - El frontend se comunicará con la API del backend en `http://localhost:3000`.
   - Asegúrate de que el servidor backend esté en ejecución antes de usar el frontend.

## Endpoints de la API

El backend proporciona los siguientes endpoints, que el frontend utiliza para interactuar con la base de datos. También puedes probarlos usando herramientas como [Postman](https://www.postman.com/) o [Insomnia](https://insomnia.rest/):

- **GET /characters**:
  - Obtiene todos los personajes junto con sus arcos asociados.
  
- **POST /characters**:
  - Crea un nuevo personaje.
  - Ejemplo de cuerpo de la solicitud:
    ```json
    {
      "name": "Portgas D. Ace",
      "affiliation": "PIRATE",
      "arcIds": [1, 2]
    }
    ```

- **GET /characters/:id**:
  - Obtiene un personaje por su ID, incluyendo sus arcos.
  
- **PUT /characters/:id**:
  - Actualiza los detalles de un personaje y sus arcos asociados.
  - Ejemplo de cuerpo de la solicitud:
    ```json
    {
      "name": "Portgas D. Ace",
      "affiliation": "PIRATE",
      "arcIds": [1, 3]
    }
    ```

- **DELETE /characters/:id**:
  - Elimina un personaje por su ID.

## Notas Adicionales

- **CORS**:
  - El backend incluye middleware CORS para permitir solicitudes desde el frontend. Si tienes problemas con CORS, asegúrate de que `cors` esté instalado (`npm install cors`) y usado en `backend/index.js`:
    ```javascript
    const cors = require('cors');
    app.use(cors());
    ```

- **Validación**:
  - La API actualmente no valida si los `arcIds` proporcionados existen. Puedes agregar validación comprobando si los arcos existen antes de crear apariciones.
  
- **Manejo de Errores**:
  - La API retorna un código 400 para solicitudes incorrectas y 404 para recursos no encontrados. Revisa el cuerpo de la respuesta para mensajes de error.

- **Rendimiento**:
  - La ruta `PUT` elimina y recrea todas las apariciones de un personaje. Para mejor rendimiento con grandes volúmenes de datos, considera optimizar esto para actualizar solo los cambios necesarios.

- **Lecturas Adicionales**:
  - [Documentación de Prisma](https://www.prisma.io/docs/)
  - [Documentación de Express](https://expressjs.com/)