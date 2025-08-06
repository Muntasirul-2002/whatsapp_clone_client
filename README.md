# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# WeCollab Client

This folder contains the frontend client for the WeCollab application. It is built with React and Vite.
## Features
- Modern React UI for chat and collaboration
- Real-time messaging via Socket.IO
- Authentication and profile management
- Channel and contact management
- File upload and sharing

## Folder Structure
- `src/` - Main source code
  - `components/` - Reusable UI components
  - `context/` - React context providers (e.g., SocketContext)
  - `lib/` - API client and utility functions
  - `pages/` - Page-level components (auth, chat, profile, etc.)
  - `store/` - Redux store and slices
  - `utils/` - Constants and request helpers
- `public/` - Static assets
- `index.html` - Main HTML entry point
- `vite.config.js` - Vite configuration

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## Notes
- Ensure the backend server is running (see `../server`).
- Update API endpoints in `src/lib/api-client.js` if needed.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
