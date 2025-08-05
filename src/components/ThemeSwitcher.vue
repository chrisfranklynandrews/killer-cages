<template>
  <div class="theme-switcher">
    <Button
      icon="pi pi-sun"
      :class="{ active: theme === 'light' }"
      @click="toggleTheme('light')"
      aria-label="Light Mode"
      text
      rounded
      size="small"
    />
    <Button
      icon="pi pi-moon"
      :class="{ active: theme === 'dark' }"
      @click="toggleTheme('dark')"
      aria-label="Dark Mode"
      text
      rounded
      size="small"
    />
    <Button
      icon="pi pi-palette"
      :class="{ active: theme === 'high-contrast' }"
      @click="toggleTheme('high-contrast')"
      aria-label="High Contrast Mode"
      text
      rounded
      size="small"
    />
  </div>
</template>

<script setup>
import { useTheme } from '../composables/useTheme.js'

const { theme, toggleTheme } = useTheme()
</script>

<style scoped>
.theme-switcher {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  align-items: center;
}

.theme-switcher .p-button {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  transition: all 0.3s ease;
}

.theme-switcher .p-button:hover {
  background: var(--hover-color);
}

.theme-switcher .p-button.active {
  background: var(--primary-color) !important;
  color: var(--button-text-color) !important;
  border-color: var(--primary-color) !important;
}
</style>
