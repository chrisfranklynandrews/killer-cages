import { ref, onMounted } from 'vue'

export function usePWA() {
  const isInstallable = ref(false)
  const isInstalled = ref(false)
  const isOnline = ref(navigator.onLine)
  const updateAvailable = ref(false)
  
  let deferredPrompt = null
  let registration = null

  // Check if app is already installed
  const checkIfInstalled = () => {
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      isInstalled.value = true
    }
    
    // Check for iOS standalone mode
    if (window.navigator.standalone === true) {
      isInstalled.value = true
    }
  }

  // Register service worker
  const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        registration = await navigator.serviceWorker.register('/sw.js')
        console.log('Service Worker registered successfully:', registration)
        
        // Listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                updateAvailable.value = true
              }
            })
          }
        })
        
        return registration
      } catch (error) {
        console.error('Service Worker registration failed:', error)
      }
    }
  }

  // Install app
  const installApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const result = await deferredPrompt.userChoice
      
      if (result.outcome === 'accepted') {
        console.log('App installed successfully')
        isInstalled.value = true
      }
      
      deferredPrompt = null
      isInstallable.value = false
    }
  }

  // Update app
  const updateApp = () => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      window.location.reload()
    }
  }

  // Setup event listeners
  const setupEventListeners = () => {
    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt = e
      isInstallable.value = true
    })

    // Listen for successful app install
    window.addEventListener('appinstalled', () => {
      console.log('App installed successfully')
      isInstalled.value = true
      isInstallable.value = false
    })

    // Listen for online/offline status
    window.addEventListener('online', () => {
      isOnline.value = true
      console.log('App is online')
    })

    window.addEventListener('offline', () => {
      isOnline.value = false
      console.log('App is offline')
    })

    // Listen for service worker messages
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'NEW_VERSION_AVAILABLE') {
          updateAvailable.value = true
        }
      })
    }
  }

  // Initialize PWA
  const initializePWA = async () => {
    checkIfInstalled()
    setupEventListeners()
    await registerServiceWorker()
  }

  // Auto-initialize on mount
  onMounted(() => {
    initializePWA()
  })

  return {
    isInstallable,
    isInstalled,
    isOnline,
    updateAvailable,
    installApp,
    updateApp,
    initializePWA
  }
}
