import { ref, watch, onMounted } from 'vue'

const currentTheme = ref('light')

export function useTheme() {
  const toggleTheme = (newTheme) => {
    currentTheme.value = newTheme
  }

  // Watch for theme changes and update DOM and localStorage
  watch(currentTheme, (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }, { immediate: true })

  // Initialize theme from localStorage on first load
  onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      currentTheme.value = savedTheme
    }
  })

  return {
    theme: currentTheme,
    toggleTheme
  }
}
