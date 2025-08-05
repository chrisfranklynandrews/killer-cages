<template>
  <div class="app">
    <header class="app-header">
      <div class="header-content">
        <div class="title-section">
          <h1>Killer Sudoku Helper</h1>
          <p>Find possible number combinations for your killer sudoku cages</p>
        </div>
        <ThemeSwitcher />
      </div>
    </header>

    <main class="container">
      <Card class="main-card">
        <!-- Controls Section -->
        <template #content>
          <Panel header="Cage Configuration" class="mb-4">
            <div class="controls">
              <div class="control-group">
                <label for="grid-size">Grid Size:</label>
                <Select 
                  id="grid-size"
                  v-model="gridSize" 
                  :options="gridSizeOptions" 
                  option-label="label" 
                  option-value="value"
                  @change="updateGridSize"
                />
              </div>

              <div class="control-group">
                <label for="cage-sum">Cage Sum:</label>
                <div class="input-with-buttons">
                  <InputNumber 
                    id="cage-sum"
                    v-model="cageSum" 
                    :min="1" 
                    :max="maxSum"
                    @input="findCombinations"
                  />
                  <Button 
                    icon="pi pi-minus" 
                    @click="decrementSum" 
                    :disabled="cageSum <= 1"
                    severity="primary"
                    size="small"
                  />
                  <Button 
                    icon="pi pi-plus" 
                    @click="incrementSum" 
                    :disabled="cageSum >= maxSum"
                    severity="secondary"
                    size="small"
                  />
                </div>
              </div>

              <div class="control-group">
                <label for="cage-size">Cage Size:</label>
                <div class="input-with-buttons">
                  <InputNumber 
                    id="cage-size"
                    v-model="cageSize" 
                    :min="1" 
                    :max="maxNumbers"
                    @input="findCombinations"
                  />
                  <Button 
                    icon="pi pi-minus" 
                    @click="decrementCageSize" 
                    :disabled="cageSize <= 1"
                    severity="secondary"
                    size="small"
                  />
                  <Button 
                    icon="pi pi-plus" 
                    @click="incrementCageSize" 
                    :disabled="cageSize >= maxNumbers"
                    severity="secondary"
                    size="small"
                  />
                </div>
              </div>

              <div class="control-group">
                <Button 
                  label="Find Combinations" 
                  @click="findCombinations"
                  icon="pi pi-search"
                />
              </div>
            </div>
          </Panel>

          <!-- Filters Section -->
          <Panel header="Number Filters" class="mb-4">
            <div class="filter-help">
              <p>Click numbers to include (green) or exclude (red) them from combinations:</p>
            </div>
            <div class="number-grid">
              <Button
                v-for="num in maxNumbers"
                :key="num"
                :label="num.toString()"
                @click="toggleNumber(num)"
                :class="getNumberClass(num)"
                class="number-btn"
                :severity="getNumberSeverity(num)"
              />
            </div>
            <div class="mt-3">
              <Button 
                label="Clear Filters" 
                @click="clearFilters"
                severity="secondary"
                outlined
              />
            </div>
          </Panel>

          <!-- Results Section -->
          <Panel header="Results" class="mb-4">
            <div v-if="error" class="mb-3">
              <Message severity="error" :closable="false">{{ error }}</Message>
            </div>
            
            <div v-if="!error && combinations.length > 0">
              <div class="count mb-3">
                <strong>{{ combinations.length }} combination{{ combinations.length !== 1 ? 's' : '' }} found</strong>
              </div>
              <div class="combinations-list">
                <Card v-for="(combo, index) in combinations" :key="index" class="combination-card">
                  <template #content>
                    <div class="combination-content">
                      <div class="numbers">{{ combo.numbers.join(' + ') }}</div>
                    </div>
                  </template>
                </Card>
              </div>
            </div>

            <div v-else-if="!error && hasSearched" class="empty-state">
              <p>No combinations found for the given criteria.</p>
            </div>

            <div v-else-if="!hasSearched" class="empty-state">
              <p>Configure your cage and click "Find Combinations" to see results.</p>
            </div>
          </Panel>
        </template>
      </Card>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'

// Reactive data
const gridSize = ref(9)
const cageSum = ref(15)
const cageSize = ref(3)
const includedNumbers = ref(new Set())
const excludedNumbers = ref(new Set())
const combinations = ref([])
const error = ref('')
const hasSearched = ref(false)

// Computed properties
const gridSizeOptions = [
  { label: '4x4', value: 4 },
  { label: '6x6', value: 6 },
  { label: '9x9', value: 9 }
]

const maxNumbers = computed(() => gridSize.value)
const maxSum = computed(() => {
  let sum = 0
  for (let i = 1; i <= maxNumbers.value; i++) {
    sum += i
  }
  return sum
})

// Methods
const updateGridSize = () => {
  clearFilters()
  if (cageSize.value > maxNumbers.value) {
    cageSize.value = maxNumbers.value
  }
  if (cageSum.value > maxSum.value) {
    cageSum.value = maxSum.value
  }
  findCombinations()
}

const incrementSum = () => {
  if (cageSum.value < maxSum.value) {
    cageSum.value++
    findCombinations()
  }
}

const decrementSum = () => {
  if (cageSum.value > 1) {
    cageSum.value--
    findCombinations()
  }
}

const incrementCageSize = () => {
  if (cageSize.value < maxNumbers.value) {
    cageSize.value++
    findCombinations()
  }
}

const decrementCageSize = () => {
  if (cageSize.value > 1) {
    cageSize.value--
    findCombinations()
  }
}

const toggleNumber = (num) => {
  if (includedNumbers.value.has(num)) {
    includedNumbers.value.delete(num)
    excludedNumbers.value.add(num)
  } else if (excludedNumbers.value.has(num)) {
    excludedNumbers.value.delete(num)
  } else {
    includedNumbers.value.add(num)
  }
  findCombinations()
}

const getNumberClass = (num) => {
  if (includedNumbers.value.has(num)) return 'included'
  if (excludedNumbers.value.has(num)) return 'excluded'
  return ''
}

const getNumberSeverity = (num) => {
  if (includedNumbers.value.has(num)) return 'success'
  if (excludedNumbers.value.has(num)) return 'danger'
  return 'secondary'
}

const clearFilters = () => {
  includedNumbers.value.clear()
  excludedNumbers.value.clear()
  findCombinations()
}

const findCombinations = () => {
  error.value = ''
  hasSearched.value = true

  try {
    // Validation
    if (cageSum.value < cageSize.value) {
      error.value = 'Cage sum cannot be smaller than cage size'
      combinations.value = []
      return
    }

    if (cageSize.value > maxNumbers.value) {
      error.value = `Cage size cannot be larger than ${maxNumbers.value} for a ${gridSize.value}x${gridSize.value} grid`
      combinations.value = []
      return
    }

    // Check if minimum possible sum exceeds cage sum
    let minSum = 0
    for (let i = 1; i <= cageSize.value; i++) {
      minSum += i
    }
    if (cageSum.value < minSum) {
      error.value = `Minimum possible sum for ${cageSize.value} numbers is ${minSum}`
      combinations.value = []
      return
    }

    // Check if maximum possible sum is less than cage sum
    let maxSumPossible = 0
    for (let i = maxNumbers.value; i > maxNumbers.value - cageSize.value; i--) {
      maxSumPossible += i
    }
    if (cageSum.value > maxSumPossible) {
      error.value = `Maximum possible sum for ${cageSize.value} numbers is ${maxSumPossible}`
      combinations.value = []
      return
    }

    // Generate available numbers
    const availableNumbers = []
    for (let i = 1; i <= maxNumbers.value; i++) {
      if (!excludedNumbers.value.has(i)) {
        availableNumbers.push(i)
      }
    }

    // Check if we have enough numbers
    if (availableNumbers.length < cageSize.value) {
      error.value = 'Not enough available numbers for the cage size'
      combinations.value = []
      return
    }

    // Find combinations
    const result = []
    const findCombos = (start, currentCombo, currentSum, remaining) => {
      if (remaining === 0) {
        if (currentSum === cageSum.value) {
          // Check if all included numbers are present
          let hasAllIncluded = true
          for (const num of includedNumbers.value) {
            if (!currentCombo.includes(num)) {
              hasAllIncluded = false
              break
            }
          }
          if (hasAllIncluded) {
            result.push({
              numbers: [...currentCombo],
              sum: currentSum
            })
          }
        }
        return
      }

      for (let i = start; i < availableNumbers.length; i++) {
        const num = availableNumbers[i]
        if (currentSum + num <= cageSum.value) {
          currentCombo.push(num)
          findCombos(i + 1, currentCombo, currentSum + num, remaining - 1)
          currentCombo.pop()
        }
      }
    }

    findCombos(0, [], 0, cageSize.value)
    combinations.value = result
  } catch (err) {
    error.value = 'An error occurred while finding combinations'
    combinations.value = []
  }
}

// Initialize on mount
onMounted(() => {
  findCombinations()
})
</script>

<style scoped>
.app {
  min-height: 100vh;
}

.app-header {
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 0;
  margin-bottom: 2rem;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-section h1 {
  font-size: 2.5em;
  margin-bottom: 0.5rem;
  color: var(--text-color)
}

.title-section p {
  font-size: 1.2em;
  color: var(--text-color)
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.main-card {
  margin-top: -2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: end;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 120px;
}

.control-group label {
  font-weight: 600;
  color: #555;
}

.input-with-buttons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.input-with-buttons .p-inputnumber {
  flex: 1;
  max-width: 100px;
}

.number-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.number-btn {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-weight: 600;
}

/* Ensure PrimeVue severity classes work on number buttons */
.number-btn.p-button-success {
  background-color: #28a745 !important;
  border-color: #28a745 !important;
  color: #ffffff !important;
}

.number-btn.p-button-success:hover {
  background-color: #218838 !important;
  border-color: #1e7e34 !important;
  transform: scale(1.05);
}

.number-btn.p-button-danger {
  background-color: #dc3545 !important;
  border-color: #dc3545 !important;
  color: #ffffff !important;
}

.number-btn.p-button-danger:hover {
  background-color: #c82333 !important;
  border-color: #bd2130 !important;
  transform: scale(1.05);
}

.number-btn.p-button-secondary {
  background-color: var(--primary-color) !important;
  border-color: var(--primary-color) !important;
  color: var(--button-text-color) !important;
}

.number-btn.p-button-secondary:hover {
  background-color: var(--primary-color) !important;
  border-color: var(--primary-color) !important;
  opacity: 0.9;
  transform: scale(1.05);
}

.combinations-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.combination-card {
  border-left: 4px solid #667eea;
}

.combination-content .numbers {
  font-weight: 600;
  font-family: monospace;
  font-size: 1.1em;
  margin-bottom: 0.5rem;
}

.combination-content .sum {
  color: #666;
  font-size: 0.9em;
}

.count {
  font-weight: 600;
  color: #667eea;
  font-size: 1.1em;
}

.empty-state {
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 2rem;
}

.filter-help p {
  color: #666;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .title-section h1 {
    font-size: 2em;
  }
  
  .controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .control-group {
    width: 100%;
  }
  
  .combinations-list {
    grid-template-columns: 1fr;
  }

  .number-btn {
    width: 60px;
    height: 60px;
  }

  .input-with-buttons .p-inputnumber {
    max-width: 120px;
  }
}
</style>
