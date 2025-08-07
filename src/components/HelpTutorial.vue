<template>
  <Dialog 
    v-model:visible="isVisible" 
    modal 
    :header="currentStep.title"
    :style="{ width: '90vw', maxWidth: '600px' }"
    :closable="false"
    class="help-dialog"
  >
    <div class="tutorial-content">
      <!-- Progress indicator -->
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
      </div>
      <div class="step-counter">{{ currentStepIndex + 1 }} of {{ tutorialSteps.length }}</div>

      <!-- Step content -->
      <div class="step-content">
        <div class="step-icon">
          <i :class="currentStep.icon"></i>
        </div>
        <div class="step-description">
          <p>{{ currentStep.description }}</p>
          <div v-if="currentStep.example" class="step-example">
            <strong>Example:</strong> {{ currentStep.example }}
          </div>
        </div>
        <div v-if="currentStep.image" class="step-image">
          <img :src="currentStep.image" :alt="currentStep.title" />
        </div>
      </div>

      <!-- Interactive demo for specific steps -->
      <div v-if="currentStep.demo" class="demo-section">
        <h4>Try it yourself:</h4>
        <component :is="currentStep.demo" />
      </div>
    </div>

    <template #footer>
      <div class="tutorial-footer">
        <Button 
          v-if="currentStepIndex > 0"
          label="Previous" 
          @click="previousStep"
          severity="secondary"
          outlined
        />
        <div class="spacer"></div>
        <Button 
          v-if="currentStepIndex < tutorialSteps.length - 1"
          label="Next" 
          @click="nextStep"
          severity="primary"
        />
        <Button 
          v-else
          label="Get Started!" 
          @click="finishTutorial"
          severity="primary"
        />
        <Button 
          label="Skip" 
          @click="skipTutorial"
          severity="secondary"
          text
          class="ml-2"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue'

const emit = defineEmits(['close', 'finish'])

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const isVisible = computed({
  get: () => props.visible,
  set: (value) => {
    if (!value) emit('close')
  }
})

const currentStepIndex = ref(0)

const tutorialSteps = [
  {
    title: "Welcome to Killer Cages!",
    icon: "pi pi-star",
    description: "This app helps you solve Killer Sudoku and Kakuro puzzles by finding all possible number combinations for cages.",
    example: "If you have a cage with sum 15 and size 3, we'll show you all combinations like 1+5+9, 2+4+9, etc."
  },
  {
    title: "What is a Killer Sudoku?",
    icon: "pi pi-table",
    description: "Killer Sudoku combines regular Sudoku rules with maths. Numbers in outlined 'cages' must add up to the given sum, and no number can repeat within a cage.",
    example: "A 3-cell cage with sum 15 might contain the numbers 1, 5, and 9."
  },
  {
    title: "Choose Your Grid Size",
    icon: "pi pi-th-large",
    description: "Select the grid size that matches your puzzle. Different sizes use different number ranges.",
    example: "4x4 grid uses numbers 1-4, 6x6 uses 1-6, and 9x9 uses 1-9."
  },
  {
    title: "Set Cage Sum",
    icon: "pi pi-calculator",
    description: "Enter the target sum for your cage. You can type the number or use the +/- buttons.",
    example: "If your cage should add up to 23, enter 23 in the Cage Sum field."
  },
  {
    title: "Set Cage Size",
    icon: "pi pi-clone",
    description: "Enter how many cells are in your cage. This determines how many numbers need to add up to your sum.",
    example: "If your cage has 4 cells, set Cage Size to 4."
  },
  {
    title: "Filter Numbers",
    icon: "pi pi-filter",
    description: "Click numbers to include (green) or exclude (red) them from combinations. This helps when you already know some numbers.",
    example: "If you know the cage must contain a 7, click 7 to turn it green. If it cannot contain a 2, click 2 twice to turn it red."
  },
  {
    title: "View Results",
    icon: "pi pi-list",
    description: "All possible combinations appear instantly! Each card shows one valid combination of numbers.",
    example: "For sum 15, size 3, you might see combinations like '1 + 5 + 9' and '2 + 4 + 9'."
  },
  {
    title: "Pro Tips",
    icon: "pi pi-lightbulb",
    description: "Your settings are saved automatically. Use filters to narrow down possibilities as you solve your puzzle. The app works offline too!",
    example: "Start with the cage sum and size, then add filters as you discover more clues in your puzzle."
  }
]

const currentStep = computed(() => tutorialSteps[currentStepIndex.value])
const progressPercentage = computed(() => ((currentStepIndex.value + 1) / tutorialSteps.length) * 100)

const nextStep = () => {
  if (currentStepIndex.value < tutorialSteps.length - 1) {
    currentStepIndex.value++
  }
}

const previousStep = () => {
  if (currentStepIndex.value > 0) {
    currentStepIndex.value--
  }
}

const finishTutorial = () => {
  // Mark tutorial as completed
  localStorage.setItem('killer-cages-tutorial-completed', 'true')
  emit('finish')
}

const skipTutorial = () => {
  // Mark tutorial as completed but skipped
  localStorage.setItem('killer-cages-tutorial-completed', 'true')
  emit('close')
}
</script>

<style scoped>
.help-dialog {
  font-family: var(--font-family);
}

.tutorial-content {
  padding: 1rem 0;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background-color: var(--surface-200);
  border-radius: 2px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary-color);
  transition: width 0.3s ease;
}

.step-counter {
  text-align: center;
  font-size: 0.875rem;
  color: var(--text-color-secondary);
  margin-bottom: 1.5rem;
}

.step-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.step-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--button-text-color);
  font-size: 1.5rem;
}

.step-description p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.step-example {
  background-color: var(--surface-100);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid var(--primary-color);
  text-align: left;
  font-style: italic;
  color: var(--text-color-secondary);
}

.step-image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.demo-section {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: var(--surface-50);
  border-radius: 8px;
  border: 1px solid var(--surface-200);
}

.demo-section h4 {
  margin: 0 0 1rem 0;
  color: var(--text-color);
}

.tutorial-footer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0 0 0;
}

.spacer {
  flex: 1;
}

@media (max-width: 768px) {
  .step-content {
    text-align: left;
  }
  
  .step-description p {
    font-size: 1rem;
  }
  
  .step-icon {
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
  }
  
  .tutorial-footer {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}

/* High contrast theme specific improvements */
:root[data-theme="high-contrast"] .step-example {
  background-color: var(--surface-100);
  border: 2px solid var(--border-color);
  color: var(--text-color);
}

:root[data-theme="high-contrast"] .demo-section {
  background-color: var(--surface-100);
  border: 2px solid var(--border-color);
}

:root[data-theme="high-contrast"] .step-icon {
  border: 2px solid var(--border-color);
}
</style>
