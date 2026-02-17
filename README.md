# Advaitahyginie - React + Vite Project

A modern React application built with Vite for fast development and optimized production builds.

## Prerequisites

**Important:** This project requires Node.js version 20.19+ or 22.12+

Your current Node.js version is v16.20.2, which needs to be upgraded.

### Upgrading Node.js

You can upgrade Node.js using one of these methods:

**Using nvm (Node Version Manager) - Recommended:**

```bash
# Install nvm if you haven't already
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node.js 20
nvm install 20
nvm use 20
```

**Or download directly from [nodejs.org](https://nodejs.org/)**

## Getting Started

Once you've upgraded Node.js, you can run the following commands:

### Development

```bash
npm run dev
```

Starts the development server with hot module replacement (HMR).

### Build

```bash
npm run build
```

Creates an optimized production build.

### Preview

```bash
npm run preview
```

Preview the production build locally.

### Lint

```bash
npm run lint
```

Run ESLint to check code quality.

## Project Structure

```
advaitahyginie/
├── public/          # Static assets
├── src/             # Source files
│   ├── assets/      # Images, fonts, etc.
│   ├── App.jsx      # Main App component
│   ├── App.css      # App styles
│   ├── main.jsx     # Application entry point
│   └── index.css    # Global styles
├── index.html       # HTML template
├── vite.config.js   # Vite configuration
└── package.json     # Project dependencies
```

## Tech Stack

- **React 18.3.1** - UI library
- **Vite 6.0.5** - Build tool and dev server
- **ESLint** - Code linting
- **@vitejs/plugin-react** - Fast Refresh with Babel

## Learn More

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [ESLint Documentation](https://eslint.org/)
