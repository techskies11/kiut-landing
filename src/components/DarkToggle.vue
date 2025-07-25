<template>
  <button 
    @click="toggleDark" 
    class="relative p-2 rounded-lg transition-all duration-300 focus:outline-none border shadow-sm"
    :class="[
      'bg-white/80 dark:bg-gray-900/80',
      'border-gray-300 dark:border-gray-700',
      'hover:shadow-md',
      'backdrop-blur-md'
    ]"
    aria-label="Toggle dark mode"
  >
    <!-- Sun icon for light mode -->
    <svg 
      v-if="!isDark" 
      class="w-5 h-5 transition-transform duration-300 text-gray-700" 
      fill="currentColor" 
      viewBox="0 0 20 20"
    >
      <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
    </svg>
    
    <!-- Moon icon for dark mode -->
    <svg 
      v-else 
      class="w-5 h-5 transition-transform duration-300 text-yellow-300" 
      fill="currentColor" 
      viewBox="0 0 20 20"
    >
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
    
    <!-- Tooltip -->
    <span 
      class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
    >
      {{ isDark ? 'Modo claro' : 'Modo oscuro' }}
    </span>
  </button>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'

const isDark = ref(false)
const isMounted = ref(false)

// Computed para verificar si tiene la clase dark
const hasDarkClass = computed(() => {
  if (!isMounted.value) return false
  return document.documentElement.classList.contains('dark')
})

// Función para obtener el tema inicial
function getInitialTheme() {
  
  // Verificar localStorage primero
  if (localStorage.theme === 'dark' || localStorage.theme === 'light') {
    return localStorage.theme === 'dark'
  }
  
  // Si no hay preferencia guardada, usar la preferencia del sistema
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

// Función para aplicar el tema
function applyTheme(dark) {
  if (dark) {
    document.documentElement.classList.add('dark')
    localStorage.theme = 'dark'
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.theme = 'light'
  }
}

// Función para alternar el tema
function toggleDark() {
  isDark.value = !isDark.value
  applyTheme(isDark.value)
}

// Observar cambios en el tema
watch(isDark, (newValue) => {
  if (isMounted.value) {
    applyTheme(newValue)
  }
})

// Escuchar cambios en la preferencia del sistema
function handleSystemThemeChange(e) {
  if (!localStorage.theme) {
    isDark.value = e.matches
    if (isMounted.value) {
      applyTheme(isDark.value)
    }
  }
}

onMounted(() => {
  isMounted.value = true
  
  // Inicializar el tema
  isDark.value = getInitialTheme()
  applyTheme(isDark.value)
  
  // Escuchar cambios en la preferencia del sistema
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', handleSystemThemeChange)
})
</script> 