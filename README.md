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

2. Run development server:
```bash
npm run dev
```

3. Run tests:
```bash
npm test
```

4. Run tests with UI:
```bash
npm run test:ui
```

5. Build for production:
```bash
npm run build
```

6. Preview production build:
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

```
src/
  ├── components.tsx          # Preact components (Header, Stage, Footer)
  ├── game.ts                 # Game state management and retry logic
  ├── main.tsx                # Application entry point
  ├── questionGenerator.ts    # Question generation logic
  └── styles.css              # All CSS styling

test/
  ├── game.test.ts            # Tests for game logic
  └── questionGenerator.test.ts # Tests for question generation

poc/
  └── ...                     # Original proof of concept files
```

## License

ISC
