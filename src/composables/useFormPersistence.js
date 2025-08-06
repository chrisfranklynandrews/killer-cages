import { watch } from 'vue'

export function useFormPersistence() {
  const saveToLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn('Failed to save to localStorage:', error)
    }
  }

  const loadFromLocalStorage = (key, defaultValue) => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : defaultValue
    } catch (error) {
      console.warn('Failed to load from localStorage:', error)
      return defaultValue
    }
  }

  const saveSetToLocalStorage = (key, setValue) => {
    try {
      localStorage.setItem(key, JSON.stringify(Array.from(setValue)))
    } catch (error) {
      console.warn('Failed to save Set to localStorage:', error)
    }
  }

  const loadSetFromLocalStorage = (key) => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? new Set(JSON.parse(saved)) : new Set()
    } catch (error) {
      console.warn('Failed to load Set from localStorage:', error)
      return new Set()
    }
  }

  const setupPersistence = (ref, key, options = {}) => {
    const { isSet = false } = options
    
    watch(ref, (newValue) => {
      if (isSet) {
        saveSetToLocalStorage(key, newValue)
      } else {
        saveToLocalStorage(key, newValue)
      }
    }, { deep: true })
  }

  return {
    saveToLocalStorage,
    loadFromLocalStorage,
    saveSetToLocalStorage,
    loadSetFromLocalStorage,
    setupPersistence
  }
}
