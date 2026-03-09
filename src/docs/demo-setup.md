# Demo Setup and Vue Startup Guide

This guide explains how to set up and run the Pacman demo for the workshop.

## Prerequisites

- Node.js (version 20 or higher, as specified in package.json)
- npm or yarn

## Installation

1. Clone or download the project repository.
2. Navigate to the tutorials directory:
   ```
   cd tutorials
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Running the Main App

To run the main Vue application:

```
npm run dev
```

This starts the Vite development server. Open your browser and go to `http://localhost:5173`.

Navigate to `/demo` to view the Pacman demo.

## Running the Demo Separately

The demo can also be run as a standalone application:

```
npx vite --config src/demo/vite.config.js
```

This starts the demo on `http://localhost:5174`.

## Vue Project Structure

- `src/App.vue`: Main application component
- `src/main.js`: Application entry point
- `src/router/index.js`: Vue Router configuration
- `src/views/`: Vue components for different pages
- `src/demo/`: Standalone demo application
  - `PrettyExample.vue`: The demo component with Pacman, Ghosts, and Grid canvases
  - `main.js`: Demo entry point
  - `router.js`: Demo router
  - `vite.config.js`: Demo-specific Vite configuration

## Demo Features

The demo includes three separate canvases:

1. **Pacman**: Shows Pacman on a black background with keyboard controls (z, q, s, d)
2. **Ghosts**: Displays multiple ghosts whose eyes follow the mouse
3. **Grid**: A simple grid visualization

## Development Notes

- The project uses Vue 3 with Composition API
- p5.js is used for canvas rendering
- Vite is the build tool
- ESLint and Prettier are configured for code quality

## Troubleshooting

- Ensure Node.js version matches the engines requirement
- Clear node_modules and reinstall if issues occur
- Check browser console for errors
