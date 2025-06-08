# Project Structure

This document provides an overview of the project's directory structure and organization.

```
juice-fuel/
├── .git/                      # Git repository data
├── .husky/                    # Git hooks configuration
├── .next/                     # Next.js build output
├── node_modules/              # Project dependencies
├── public/                    # Static files
├── src/                       # Source code
│   ├── app/                   # Next.js app directory
│   ├── components/            # Reusable UI components
│   ├── constants/             # Application constants
│   ├── hooks/                 # Custom React hooks
│   ├── i18n/                  # Internationalization
│   ├── _layouts/              # Layout components
│   ├── schema/                # Data schemas
│   ├── services/              # API and external services
│   ├── stores/                # State management
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions
│   └── views/                 # Page-specific components
├── .gitignore                 # Git ignore rules
├── .prettierrc.json           # Prettier configuration
├── eslint.config.mjs          # ESLint configuration
├── global.ts                  # Global TypeScript declarations
├── next-env.d.ts             # Next.js TypeScript declarations
├── next.config.ts            # Next.js configuration
├── package.json              # Project dependencies and scripts
├── pnpm-lock.yaml            # PNPM lock file
├── pnpm-workspace.yaml       # PNPM workspace configuration
├── postcss.config.mjs        # PostCSS configuration
├── README.md                 # Project documentation
├── tsconfig.json             # TypeScript configuration
└── tsconfig.tsbuildinfo      # TypeScript build info

```

## Directory Descriptions

### Root Directory

- `.git/`: Contains all Git repository data
- `.husky/`: Git hooks configuration for pre-commit and other Git operations
- `.next/`: Next.js build output directory
- `node_modules/`: Contains all project dependencies
- `public/`: Static files that are served directly

### Source Code (`src/`)

- `app/`: Next.js app directory containing pages and routing
- `components/`: Reusable UI components used across the application
- `constants/`: Application-wide constants and configuration values
- `hooks/`: Custom React hooks for shared logic
- `i18n/`: Internationalization files and translations
- `_layouts/`: Layout components for consistent page structure
- `schema/`: Data schemas and validation rules
- `services/`: API clients and external service integrations
- `stores/`: State management logic and stores
- `types/`: TypeScript type definitions and interfaces
- `utils/`: Utility functions and helper methods
- `views/`: Page-specific components and views

### Configuration Files

- `.gitignore`: Specifies files and directories to be ignored by Git
- `.prettierrc.json`: Code formatting rules
- `eslint.config.mjs`: Code linting rules
- `global.ts`: Global TypeScript declarations
- `next.config.ts`: Next.js framework configuration
- `package.json`: Project metadata, dependencies, and scripts
- `pnpm-lock.yaml`: PNPM package manager lock file
- `pnpm-workspace.yaml`: PNPM workspace configuration
- `postcss.config.mjs`: PostCSS configuration for CSS processing
- `tsconfig.json`: TypeScript compiler configuration
- `tsconfig.tsbuildinfo`: TypeScript incremental build information
