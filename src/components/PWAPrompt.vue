<template>
  <div v-if="showInstallPrompt" class="install-prompt">
    <Card class="install-card">
      <template #content>
        <div class="install-content">
          <div class="install-icon">
            <i class="pi pi-download"></i>
          </div>
          <div class="install-text">
            <h3>Install Killer Cages</h3>
            <p>Get quick access and use offline!</p>
          </div>
          <div class="install-actions">
            <Button 
              label="Install" 
              @click="handleInstall"
              severity="primary"
              icon="pi pi-download"
            />
            <Button 
              label="Later" 
              @click="dismissPrompt"
              severity="secondary"
              text
            />
          </div>
        </div>
      </template>
    </Card>
  </div>

  <!-- Update notification -->
  <div v-if="updateAvailable" class="update-prompt">
    <Card class="update-card">
      <template #content>
        <div class="update-content">
          <div class="update-icon">
            <i class="pi pi-refresh"></i>
          </div>
          <div class="update-text">
            <h4>Update Available</h4>
            <p>A new version is ready!</p>
          </div>
          <div class="update-actions">
            <Button 
              label="Update" 
              @click="handleUpdate"
              severity="primary"
              icon="pi pi-refresh"
              size="small"
            />
            <Button 
              label="Later" 
              @click="dismissUpdate"
              severity="secondary"
              text
              size="small"
            />
          </div>
        </div>
      </template>
    </Card>
  </div>

  <!-- Offline indicator -->
  <div v-if="!isOnline" class="offline-indicator">
    <Chip 
      label="Offline Mode" 
      icon="pi pi-wifi-slash"
      class="offline-chip"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePWA } from '../composables/usePWA.js'

const { isInstallable, isInstalled, isOnline, updateAvailable, installApp, updateApp } = usePWA()

const promptDismissed = ref(false)
const updateDismissed = ref(false)

const showInstallPrompt = computed(() => {
  return isInstallable.value && !isInstalled.value && !promptDismissed.value
})

const handleInstall = async () => {
  await installApp()
  promptDismissed.value = true
}

const dismissPrompt = () => {
  promptDismissed.value = true
  // Remember dismissal for this session
  sessionStorage.setItem('installPromptDismissed', 'true')
}

const handleUpdate = () => {
  updateApp()
}

const dismissUpdate = () => {
  updateDismissed.value = true
}

// Check if prompt was already dismissed this session
if (sessionStorage.getItem('installPromptDismissed')) {
  promptDismissed.value = true
}
</script>

<style scoped>
.install-prompt {
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  z-index: 1000;
  max-width: 400px;
  margin: 0 auto;
}

.install-card {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-color);
}

.install-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
}

.install-icon {
  color: var(--primary-color);
  font-size: 1.5rem;
}

.install-text {
  flex: 1;
}

.install-text h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  color: var(--text-color);
}

.install-text p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-color-secondary);
}

.install-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.update-prompt {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  max-width: 300px;
}

.update-card {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-color);
}

.update-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
}

.update-icon {
  color: var(--primary-color);
  font-size: 1.25rem;
}

.update-text {
  flex: 1;
}

.update-text h4 {
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;
  color: var(--text-color);
}

.update-text p {
  margin: 0;
  font-size: 0.75rem;
  color: var(--text-color-secondary);
}

.update-actions {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.offline-indicator {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
}

.offline-chip {
  background-color: #f44336;
  color: white;
  border: none;
}

@media (max-width: 768px) {
  .install-prompt {
    bottom: 0.5rem;
    left: 0.5rem;
    right: 0.5rem;
  }
  
  .update-prompt {
    top: 0.5rem;
    right: 0.5rem;
    left: 0.5rem;
    max-width: none;
  }
  
  .offline-indicator {
    top: 0.5rem;
    left: 0.5rem;
  }
}
</style>
