# Killer Sudoku Helper

A Vue 3 application built with PrimeVue that helps solve Killer Sudoku puzzles by finding possible number combinations for cages.

## Features

- **Multiple Grid Sizes**: Support for 4x4, 6x6, and 9x9 grids
- **Cage Configuration**: Set cage sum and size with intuitive controls
- **Number Filtering**: Include or exclude specific numbers from combinations
- **Real-time Results**: Find all possible combinations instantly
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean interface using PrimeVue components

## Technology Stack

- **Vue 3** with Composition API
- **PrimeVue** for UI components
- **Vite** for fast development and building
- **PrimeIcons** for icons

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Building for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## How to Use

1. **Set Grid Size**: Choose between 4x4, 6x6, or 9x9 grid
2. **Configure Cage**: Set the target sum and number of cells in the cage
3. **Filter Numbers** (optional): 
   - Click numbers to include them (green) - these numbers must be in the result
   - Click again to exclude them (red) - these numbers will be avoided
   - Click a third time to reset to neutral
4. **Find Combinations**: Click the search button or change any setting to see results

## Algorithm

The application uses a recursive backtracking algorithm to find all valid combinations of numbers that:
- Sum to the target value
- Use the specified number of digits
- Include all "included" numbers
- Exclude all "excluded" numbers
- Use only numbers valid for the selected grid size (1-4, 1-6, or 1-9)

## Project Structure

```
src/
├── App.vue              # Main application component
├── main.js              # Application entry point and PrimeVue setup
├── style.css            # Global styles and PrimeVue customizations
└── assets/              # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
