import storeSetup from './store/store'
import { createApp } from 'vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as vuetifyComponents from 'vuetify/components'
import * as vuetifyDirectives from 'vuetify/directives'
import {createPinia} from 'pinia'
import App from './App.vue'

const app = createApp(App)
// Pinia
const pinia = createPinia()
// Vuetify
const vuetify = createVuetify({
  vuetifyComponents,
  vuetifyDirectives,
})

app.use(pinia)
app.use(storeSetup)
app.use(vuetify)
app.mount('#app')
const store = app.config.globalProperties.$store
export { app, store }
