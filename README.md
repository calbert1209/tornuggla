# Tornuggla - Math Game for Kids

A game to help children memorize simple facts like addition, subtraction or multiplication of single-digit numbers.

## Technologies

- **TypeScript** - Type-safe code
- **Preact** - Lightweight React alternative
- **Vite** - Fast build tool
- **Vitest** - Unit testing framework
- **CSS** - Styling in a single file

## Development

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Getting Started

1. Install dependencies:

```bash
npm install
```

1. Run development server:

```bash
npm run dev
```

1. Run tests:

```bash
npm test
```

1. Run tests with UI:

```bash
npm run test:ui
```

1. Build for production:

```bash
npm run build
```

1. Preview production build:

```bash
npm run preview
```

## Game Play

Each session of the game is a sequence of 10 questions that competitors need to answer. In response to each student answer, the teacher can click:

- **NG (x)** - if the answer was incorrect or not fast enough
- **OK (c)** - if the answer was correct and timely

Each time a question is answered correctly, a cartoon character appears at the top of the screen. Once the target number of questions are answered correctly, the characters dance on screen.

### Keyboard Shortcuts

- `x` - NG button
- `c` - OK button  
- `r` - Reset game
- `-` - Toggle operator (+/-)

## Deployment to GitHub Pages

The project is configured to automatically deploy to GitHub Pages when code is pushed to the `main` branch.

### Setup

1. Go to your GitHub repository Settings
2. Navigate to Pages
3. Under "Build and deployment", select "GitHub Actions" as the source
4. Push to the `main` branch to trigger deployment

The site will be available at: `https://[your-username].github.io/tornuggla/`

## Project Structure

```text
src/
  ├── components/
  │   ├── main.tsx                # Application entry point
  │   └── components.tsx          # Preact components (Header, Stage, Footer)
  ├── models/
  │   ├── game.ts                 # Game state management and retry logic
  │   └── questionGenerator.ts    # Question generation logic
  ├── styles.css                  # All CSS styling
  └── vite-env.d.ts               # Vite type definitions

test/
  ├── game.test.ts                # Tests for game logic
  └── questionGenerator.test.ts   # Tests for question generation

public/
  └── assets/                     # Game assets (GIFs, images)

poc/
  └── ...                         # Original proof of concept files

.github/
  └── workflows/
      └── deploy.yml              # GitHub Actions workflow for automatic deployment
```

## Code Style

- All functions use arrow function syntax
- TypeScript with strict mode enabled
- Preact hooks for state management

## Testing

The project includes comprehensive unit tests for core game logic:

- `State` class - game state management and question progression
- `Retries` class - retry queue management
- Question generation functions

Run tests with:

```bash
npm test                # Run tests in watch mode
npm test -- --run       # Run tests once
npm run test:ui         # Run tests with visual UI
```

## Git Workflow

This project uses feature branches for development:

1. Create a new branch: `git checkout -b feature-name`
2. Make your changes and commit: `git commit -m "description"`
3. Push to remote: `git push -u origin feature-name`
4. Open a pull request on GitHub

## Contributing

When contributing:

- Ensure all tests pass: `npm test -- --run`
- Build the project: `npm run build`
- Follow the existing code style (arrow functions, TypeScript strict mode)
- Update tests if you modify game logic

## License

ISC
