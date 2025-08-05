import { createApp } from 'vue'
import App from './App.vue'

// PrimeVue imports
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'

// Import Inter font (standard CSS files)
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'

// PrimeVue components
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import Card from 'primevue/card'
import Panel from 'primevue/panel'
import Chip from 'primevue/chip'
import Message from 'primevue/message'

import './style.css'

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '[data-theme="dark"]',
            cssLayer: {
                name: 'primevue',
                order: 'tailwind-base, primevue, tailwind-utilities'
            }
        }
    }
})

// Register PrimeVue components
app.component('Button', Button)
app.component('InputNumber', InputNumber)
app.component('Select', Select)
app.component('Card', Card)
app.component('Panel', Panel)
app.component('Chip', Chip)
app.component('Message', Message)

app.mount('#app')
