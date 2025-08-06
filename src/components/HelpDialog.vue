<template>
  <Dialog 
    v-model:visible="isVisible" 
    modal 
    header="Help & Rules"
    :style="{ width: '90vw', maxWidth: '800px' }"
    class="help-dialog"
  >
    <div class="help-content">
      <TabView>
        <TabPanel header="Quick Start">
          <div class="tab-content">
            <h3>Getting Started</h3>
            <ol class="help-list">
              <li><strong>Choose Grid Size:</strong> Select 4x4, 6x6, or 9x9 to match your puzzle</li>
              <li><strong>Enter Cage Sum:</strong> The target number that cells must add up to</li>
              <li><strong>Set Cage Size:</strong> How many cells are in the cage</li>
              <li><strong>Apply Filters:</strong> Include (green) or exclude (red) specific numbers</li>
              <li><strong>View Results:</strong> All possible combinations appear automatically</li>
            </ol>
            
            <div class="example-box">
              <h4>Example:</h4>
              <p>For a 3-cell cage with sum 15 in a 9x9 grid:</p>
              <ul>
                <li>Grid Size: 9x9</li>
                <li>Cage Sum: 15</li>
                <li>Cage Size: 3</li>
                <li>Results: 1+5+9, 1+6+8, 2+4+9, 2+5+8, 2+6+7, 3+4+8, 3+5+7, 4+5+6</li>
              </ul>
            </div>
          </div>
        </TabPanel>

        <TabPanel header="Killer Sudoku Rules">
          <div class="tab-content">
            <h3>What is Killer Sudoku?</h3>
            <p>Killer Sudoku combines traditional Sudoku with mathematical cages:</p>
            
            <h4>Basic Rules:</h4>
            <ul class="help-list">
              <li>Fill the grid so each row, column, and region contains all numbers (1-4 for 4x4, 1-6 for 6x6, 1-9 for 9x9)</li>
              <li>Numbers in each cage (outlined area) must add up to the given sum</li>
              <li>No number can repeat within a cage</li>
              <li>Use logic and math to find the solution</li>
            </ul>

            <h4>Cage Types:</h4>
            <ul class="help-list">
              <li><strong>Small cages (2-3 cells):</strong> Usually have fewer possible combinations</li>
              <li><strong>Large cages (4+ cells):</strong> More combinations, but easier to eliminate possibilities</li>
              <li><strong>Single cells:</strong> The number is given directly</li>
            </ul>
          </div>
        </TabPanel>

        <TabPanel header="Using Filters">
          <div class="tab-content">
            <h3>Number Filtering System</h3>
            
            <div class="filter-demo">
              <div class="filter-example">
                <span class="demo-number neutral">5</span>
                <span class="arrow">→</span>
                <span class="demo-number included">5</span>
                <span class="arrow">→</span>
                <span class="demo-number excluded">5</span>
                <span class="arrow">→</span>
                <span class="demo-number neutral">5</span>
              </div>
              <p class="filter-description">Click: Neutral → Must Include → Must Exclude → Neutral</p>
            </div>

            <h4>When to Use Filters:</h4>
            <ul class="help-list">
              <li><strong>Include (Green):</strong> When you know a number must be in the cage</li>
              <li><strong>Exclude (Red):</strong> When a number cannot be in the cage due to Sudoku rules</li>
              <li><strong>Combinations:</strong> Use multiple filters to find very specific solutions</li>
            </ul>

            <div class="example-box">
              <h4>Example Scenario:</h4>
              <p>You have a 3-cell cage with sum 15, and you know:</p>
              <ul>
                <li>The number 7 is already used in this row, so exclude it (red)</li>
                <li>You found a 2 in one cell, so include it (green)</li>
                <li>Results will show only combinations with 2 and without 7</li>
              </ul>
            </div>
          </div>
        </TabPanel>

        <TabPanel header="Tips & Strategies">
          <div class="tab-content">
            <h3>Solving Strategies</h3>
            
            <h4>For Beginners:</h4>
            <ul class="help-list">
              <li>Start with small cages (2-3 cells) - they have fewer possibilities</li>
              <li>Look for cages with extreme sums (very high or very low)</li>
              <li>Use the process of elimination with filters</li>
              <li>Focus on one cage at a time</li>
            </ul>

            <h4>Advanced Techniques:</h4>
            <ul class="help-list">
              <li>Cross-reference multiple cages that share cells</li>
              <li>Use Sudoku rules to eliminate numbers from cages</li>
              <li>Look for "naked" and "hidden" combinations</li>
              <li>Work backwards from completed areas</li>
            </ul>

            <h4>Common Combinations to Remember:</h4>
            <div class="combinations-grid">
              <div class="combo-item">
                <strong>Sum 3, Size 2:</strong> 1+2
              </div>
              <div class="combo-item">
                <strong>Sum 4, Size 2:</strong> 1+3
              </div>
              <div class="combo-item">
                <strong>Sum 17, Size 2:</strong> 8+9
              </div>
              <div class="combo-item">
                <strong>Sum 16, Size 2:</strong> 7+9
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel header="About">
          <div class="tab-content">
            <h3>About Killer Cages</h3>
            <p>This app is designed to help you solve Killer Sudoku and Kakuro puzzles by finding all possible number combinations for any cage.</p>
            
            <h4>Features:</h4>
            <ul class="help-list">
              <li>Support for 4x4, 6x6, and 9x9 grids</li>
              <li>Advanced number filtering system</li>
              <li>Instant combination calculation</li>
              <li>Offline functionality</li>
              <li>Settings persistence across sessions</li>
              <li>Responsive design for mobile and desktop</li>
            </ul>

            <h4>Privacy:</h4>
            <p>This app stores your preferences locally on your device. No data is sent to external servers.</p>
            
            <div class="app-info">
              <p><strong>Version:</strong> 1.0.0</p>
              <p><strong>Developer:</strong> Chris Franklyn</p>
              <p><strong>Website:</strong> <a href="https://chrisfranklyn.app" target="_blank">chrisfranklyn.app</a></p>
            </div>
          </div>
        </TabPanel>
      </TabView>
    </div>

    <template #footer>
      <div class="help-footer">
        <Button 
          label="Start Tutorial" 
          @click="startTutorial"
          severity="primary"
          icon="pi pi-play"
        />
        <Button 
          label="Close" 
          @click="closeHelp"
          severity="secondary"
          outlined
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { computed, defineEmits } from 'vue'

const emit = defineEmits(['close', 'start-tutorial'])

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

const closeHelp = () => {
  emit('close')
}

const startTutorial = () => {
  emit('start-tutorial')
}
</script>

<style scoped>
.help-dialog {
  font-family: var(--font-family);
}

.help-content {
  padding: 1rem 0;
}

.tab-content {
  padding: 1rem 0;
}

.tab-content h3 {
  color: var(--text-color);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.tab-content h4 {
  color: var(--text-color);
  margin: 1.5rem 0 0.5rem 0;
  font-size: 1.25rem;
}

.help-list {
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.help-list li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
  color: var(--text-color);
}

.example-box {
  background-color: var(--surface-100);
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #667eea;
  margin: 1.5rem 0;
}

.example-box h4 {
  margin-top: 0;
  color: #667eea;
}

.filter-demo {
  text-align: center;
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: var(--surface-50);
  border-radius: 8px;
}

.filter-example {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.demo-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.1rem;
  border: 2px solid;
}

.demo-number.neutral {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.demo-number.included {
  background-color: #28a745;
  border-color: #28a745;
  color: white;
}

.demo-number.excluded {
  background-color: #dc3545;
  border-color: #dc3545;
  color: white;
}

.arrow {
  font-size: 1.2rem;
  color: var(--text-color-secondary);
}

.filter-description {
  font-style: italic;
  color: var(--text-color-secondary);
  margin: 0;
}

.combinations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.combo-item {
  padding: 1rem;
  background-color: var(--surface-100);
  border-radius: 8px;
  text-align: center;
  border: 1px solid var(--surface-200);
}

.app-info {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: var(--surface-100);
  border-radius: 8px;
}

.app-info p {
  margin: 0.5rem 0;
  color: var(--text-color);
}

.app-info a {
  color: #667eea;
  text-decoration: none;
}

.app-info a:hover {
  text-decoration: underline;
}

.help-footer {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding: 1rem 0 0 0;
}

@media (max-width: 768px) {
  .filter-example {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .combinations-grid {
    grid-template-columns: 1fr;
  }
  
  .help-footer {
    flex-direction: column-reverse;
    gap: 0.5rem;
  }

  .demo-number {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
}
</style>
