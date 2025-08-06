import { ref, watch } from 'vue'

// Initialize theme from localStorage immediately
const savedTheme = localStorage.getItem('theme') || 'light'
const currentTheme = ref(savedTheme)

export function useTheme() {
  const toggleTheme = (newTheme) => {
    currentTheme.value = newTheme
  }

  // Watch for theme changes and update DOM and localStorage
  watch(currentTheme, (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }, { immediate: true })

  return {
    theme: currentTheme,
    toggleTheme
  }
}
