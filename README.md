# Frontend Project Setup

## Project Structure

```
project-root/
│
├── assets/
│   ├── img/
│   ├── css/
│   ├── fonts/
│   ├── js/
│   │   └── app.js
│   └── scss/
│       ├── base/
│       │   ├── _base.scss
│       │   ├── _settings.scss
│       │   ├── _tools.scss
│       │   ├── _reset.scss
│       │   └── _fonts.scss
│       ├── blocks/
│       │   ├── _blocks.scss
│       │   ├── _header.scss
│       │   ├── _main.scss
│       │   ├── _footer.scss
│       │   └── _page.scss
│       └── style.scss
│
├── gulpfile.js
└── index.html
```

## Project Setup

### Prerequisites
- Node.js (version 14+ recommended)
- npm or Yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

### Development

Run the development server:
```bash
npm run dev
# or
yarn dev
```

### Build for Production

Create production build:
```bash
npm run build
# or
yarn build
```

## Project Architecture

### SCSS Structure
- `base/`: Global settings, variables, mixins
  - `_settings.scss`: Project-wide variables and config
  - `_tools.scss`: Mixins and functions
  - `_reset.scss`: CSS reset styles
  - `_fonts.scss`: Font declarations
- `blocks/`: Component-specific styles
  - Modular SCSS files for different page components

### JavaScript
- `assets/js/app.js`: Main JavaScript entry point

### HTML
- Semantic HTML5 structure
- BEM-like class naming convention
- Responsive meta viewport tag

## Key Features
- Gulp-based build system
- SCSS preprocessing
- Modular CSS architecture
- Responsive design preparation

## Usage
### Development Mode
Start a local development server with live reload:

```bash
npm run dev
# or
yarn dev
```

### Production Build
Generate a minified CSS build:

```bash
npm run build
# or
yarn build
```

Gulp Tasks
1. Clean Output Directory
   Deletes the assets/css/ folder to ensure a fresh build - `gulp reset`

2. Compile SCSS
   Processes SCSS files into CSS, applies auto-prefixing, and minifies the output - `gulp scss`

3. Start Local Server
   Runs a live-reloading development server using BrowserSync - `gulp server`


4. Watch Files
   Monitors changes in SCSS files and automatically recompiles them - `gulp watcher`

5. Development Workflow
   Combines all tasks for development (clean, compile SCSS, watch files, and start server)- `gulp`

6. Production Workflow
   Builds the project for production (clean and compile SCSS) - `gulp build`

## Recommended Extensions
- PHPStorm, Zed or Visual Studio Code
- Sass/SCSS language support
- ESLint
- Prettier

## Troubleshooting
- Ensure all dependencies are installed correctly
- Check Node.js and npm versions
- Verify Gulp CLI is installed globally
