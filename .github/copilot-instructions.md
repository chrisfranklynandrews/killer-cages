# Copilot Instructions for Killer Sudoku Helper

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a Vue 3 application built with Vite and PrimeVue UI components. The application helps solve Killer Sudoku puzzles by finding possible number combinations for cages.

## Key Technologies
- **Vue 3** with Composition API (`<script setup>`)
- **PrimeVue** for UI components
- **Vite** for build tooling
- **JavaScript** (not TypeScript)

## Development Guidelines

### Vue 3 Patterns
- Use Composition API with `<script setup>` syntax
- Prefer `ref()` and `computed()` for reactivity
- Use `onMounted()` for lifecycle hooks
- Follow Vue 3 best practices for component structure

### PrimeVue Components
- Use PrimeVue components instead of HTML elements where possible
- Available components: Button, InputNumber, Select, Card, Panel, Chip, Message
- Follow PrimeVue naming conventions and props
- Use PrimeIcons for icons (`pi pi-*`)

### Styling
- Use scoped styles in Vue components
- Global styles are in `src/style.css`
- Mobile-first responsive design
- Color scheme: Primary gradient (#667eea to #764ba2)

### State Management
- No external state management (Vuex/Pinia)
- Component-level state with reactive refs
- Props and events for parent-child communication

### Code Style
- Use descriptive variable and function names
- Keep functions focused and small
- Add comments for complex algorithms
- Follow consistent indentation and formatting

### Application Logic
- Algorithm for finding number combinations uses recursive backtracking
- Input validation for cage sum and size constraints
- Number filtering system (include/exclude specific numbers)
- Grid size support for 4x4, 6x6, and 9x9 puzzles
