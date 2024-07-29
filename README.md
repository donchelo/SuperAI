# SuperAI

Bienvenido a SuperAI, una plataforma diseñada para ofrecer soluciones avanzadas de inteligencia artificial. Este repositorio contiene el código fuente tanto del backend como del frontend de la aplicación. A continuación, se proporciona una guía detallada sobre cómo configurar y ejecutar el proyecto.

## Estructura del Proyecto

El repositorio está dividido en dos directorios principales:
- **be**: Contiene el código del backend.
- **fe**: Contiene el código del frontend.

### Backend (`be`)
El directorio del backend contiene los siguientes archivos y directorios:
- `package-lock.json`: Archivo de bloqueo para npm que asegura la instalación consistente de dependencias.
- `package.json`: Archivo que lista las dependencias del proyecto y scripts de npm.
- `respuestas.json`: Archivo JSON con respuestas predefinidas (probablemente para el servidor).
- `server.js`: Archivo principal del servidor backend.

### Frontend (`fe`)
El directorio del frontend contiene los siguientes archivos y directorios:
- `.eslintrc.cjs`: Configuración de ESLint para mantener la calidad del código.
- `.gitignore`: Archivos y directorios a ser ignorados por git.
- `README.md`: Archivo README del frontend (puede contener información adicional específica para el frontend).
- `index.html`: Archivo HTML principal de la aplicación frontend.
- `package-lock.json`: Archivo de bloqueo para npm que asegura la instalación consistente de dependencias.
- `package.json`: Archivo que lista las dependencias del proyecto y scripts de npm.
- `public`: Directorio para archivos públicos.
- `src`: Directorio que contiene el código fuente del frontend.
- `tsconfig.app.json`, `tsconfig.json`, `tsconfig.node.json`: Archivos de configuración de TypeScript.
- `vite.config.ts`: Archivo de configuración para Vite.

## Requisitos Previos

Asegúrese de tener instalado Node.js y npm en su máquina. Puede verificar la instalación ejecutando los siguientes comandos:

```bash
node -v
npm -v
```

## Instalación

### Backend

1. Navegue al directorio `be`:
   ```bash
   cd SuperAI-main/be
   ```

2. Instale las dependencias del backend:
   ```bash
   npm install
   ```

### Frontend

1. Navegue al directorio `fe`:
   ```bash
   cd SuperAI-main/fe
   ```

2. Instale las dependencias del frontend:
   ```bash
   npm install
   ```

## Ejecución

### Backend

1. Inicie el servidor backend:
   ```bash
   npm start
   ```

### Frontend

1. Inicie el servidor de desarrollo del frontend:
   ```bash
   npm run dev
   ```

## Contribución

Si desea contribuir a este proyecto, siga estos pasos:

1. Realice un fork del repositorio.
2. Cree una nueva rama (`git checkout -b feature-nueva-caracteristica`).
3. Realice sus cambios y haga commit (`git commit -am 'Agrega nueva característica'`).
4. Empuje a la rama (`git push origin feature-nueva-caracteristica`).
5. Abra un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulte el archivo `LICENSE` para obtener más detalles.

---

Para obtener más información, consulte el archivo README en el directorio `fe` para detalles específicos del frontend.

Si tiene alguna pregunta o necesita ayuda, no dude en abrir un issue.

¡Gracias por utilizar SuperAI!
```

## Estructura del Directorio `fe/src`

El directorio `src` contiene el código fuente del frontend, con la siguiente estructura:

- `assets`: Archivos estáticos como imágenes y estilos CSS.
- `components`: Componentes reutilizables de la interfaz de usuario.
- `pages`: Páginas principales de la aplicación.
- `App.tsx`: Componente principal de la aplicación React.
- `main.tsx`: Archivo de entrada que monta la aplicación React.
- `index.css`: Archivo CSS global.
- `vite-env.d.ts`: Archivo de declaración de tipos para Vite.

## Configuración de ESLint

El archivo `.eslintrc.cjs` en el directorio `fe` contiene la configuración de ESLint, que se utiliza para mantener la calidad del código. Asegúrese de revisar y ajustar esta configuración según sus necesidades.

## Configuración de TypeScript

Los archivos `tsconfig.app.json`, `tsconfig.json` y `tsconfig.node.json` contienen la configuración de TypeScript para el proyecto. Estos archivos definen cómo el compilador de TypeScript debería manejar el código.

## Configuración de Vite

El archivo `vite.config.ts` en el directorio `fe` contiene la configuración para Vite, que es el bundler utilizado para el frontend. Este archivo define cómo se debe construir y servir la aplicación frontend.

---

Esta documentación proporciona una visión completa del proyecto SuperAI, incluyendo la estructura del directorio, los requisitos previos, la instalación y ejecución, y cómo contribuir. Si tiene alguna pregunta adicional, no dude en abrir un issue en el repositorio.

¡Gracias por utilizar SuperAI!
