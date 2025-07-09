<template>
  <section id="usecases" class="relative py-20 bg-white dark:bg-gray-950 transition-colors duration-300 overflow-hidden">
    <!-- Particle background -->
    <div class="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
      <ParticleBackground />
    </div>
    <div class="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10">
      <!-- Header mejorado -->
      <div class="text-center mb-20">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-semibold mb-6">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          {{ t('usecases.badge') }}
        </div>
        <h2 class="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
          {{ t('usecases.title') }}
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
          {{ t('usecases.description_pre') }}
          <span class="font-bold text-violet-600">{{ t('usecases.description_highlight') }}</span>
          {{ t('usecases.description_post') }}
        </p>
      </div>

      <!-- Métricas -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
        <div class="text-center p-8 rounded-3xl bg-white/80 dark:bg-white/10 backdrop-blur-lg border border-gray-200 dark:border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div class="text-3xl md:text-4xl font-bold text-violet-600 dark:text-violet-400 mb-2">70%</div>
          <div class="text-sm text-gray-800 dark:text-gray-300">{{ t('usecases.metrics.cost_reduction') }}</div>
        </div>
        <div class="text-center p-8 rounded-3xl bg-white/80 dark:bg-white/10 backdrop-blur-lg border border-gray-200 dark:border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div class="text-3xl md:text-4xl font-bold text-violet-600 dark:text-violet-400 mb-2">24/7</div>
          <div class="text-sm text-gray-800 dark:text-gray-300">{{ t('usecases.metrics.availability') }}</div>
        </div>
        <div class="text-center p-8 rounded-3xl bg-white/80 dark:bg-white/10 backdrop-blur-lg border border-gray-200 dark:border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div class="text-3xl md:text-4xl font-bold text-violet-600 dark:text-violet-400 mb-2">95%</div>
          <div class="text-sm text-gray-800 dark:text-gray-300">{{ t('usecases.metrics.satisfaction') }}</div>
        </div>
        <div class="text-center p-8 rounded-3xl bg-white/80 dark:bg-white/10 backdrop-blur-lg border border-gray-200 dark:border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div class="text-3xl md:text-4xl font-bold text-violet-600 dark:text-violet-400 mb-2">3s</div>
          <div class="text-sm text-gray-800 dark:text-gray-300">{{ t('usecases.metrics.response_time') }}</div>
        </div>
      </div>

      <!-- Canales de comunicación -->
      <div class="mb-20">
        <h3 class="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          {{ t('usecases.channels_title') }}
        </h3>
        <div class="flex flex-wrap justify-center gap-4">
          <div v-for="([key, label], idx) in Object.entries(tm('usecases.channels'))" :key="key"
            :class="[
              'flex items-center gap-3 px-6 py-3 rounded-xl font-semibold border shadow-sm transition-all duration-200',
              channelStyles[key]?.bg || 'bg-gray-100 dark:bg-gray-900/30',
              channelStyles[key]?.text || 'text-gray-700 dark:text-gray-300',
              channelStyles[key]?.border || 'border-gray-200 dark:border-gray-700/30'
            ]">
            <span v-if="channelStyles[key] && channelStyles[key].icon" v-html="channelStyles[key].icon" class="w-6 h-6"></span>
            <span>{{ label }}</span>
          </div>
        </div>
      </div>

      <!-- Casos de uso -->
      <div class="grid lg:grid-cols-2 gap-8">
        <div v-for="(item, idx) in tm('usecases.cases')" :key="item.title" class="group relative overflow-hidden rounded-3xl bg-white/80 dark:bg-white/10 backdrop-blur-lg border border-gray-200 dark:border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-8 md:p-10">
          <h3 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{{ item.title }}</h3>
          <p class="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{{ item.desc }}</p>
          <div class="space-y-3 mb-6">
            <div v-for="(bullet, bidx) in item.bullets" :key="bidx" class="flex items-center gap-3">
              <div class="w-2 h-2 bg-violet-500 rounded-full"></div>
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ bullet }}</span>
            </div>
          </div>
          <div class="inline-flex items-center gap-2 text-violet-600 dark:text-violet-400 font-semibold">
            <span>{{ item.cta }}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- CTA final -->
      <div class="text-center mt-16">
        <div class="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          {{ t('usecases.cta') }}
        </div>
        <p class="text-gray-600 dark:text-gray-300 mt-4 text-sm">
          {{ t('usecases.cta_desc').split('OnService.IA')[0] }}
          <span class="font-bold">{{ t('brand') }}</span><span class="text-violet-500 font-bold">{{ t('brand_ia') }}</span>
          {{ t('usecases.cta_desc').split('OnService.IA')[1] }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import ParticleBackground from './ParticleBackground.vue'

const { t, tm } = useI18n()

// Colores e iconos de marca para los canales
const channelStyles = {
  whatsapp: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-300',
    border: 'border-green-200 dark:border-green-700/30',
    icon: `<svg fill='none' viewBox='0 0 24 24' class='w-6 h-6'><path fill='#25D366' d='M12 2C6.477 2 2 6.477 2 12c0 1.993.583 3.85 1.59 5.41L2 22l4.707-1.553A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Z'/><path fill='#fff' d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.21-.242-.58-.487-.5-.67-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.1 3.21 5.077 4.374.71.306 1.263.489 1.695.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347Z'/></svg>`
  },
  instagram: {
    bg: 'bg-pink-100 dark:bg-pink-900/30',
    text: 'text-pink-700 dark:text-pink-300',
    border: 'border-pink-200 dark:border-pink-700/30',
    icon: `<svg fill='none' viewBox='0 0 24 24' class='w-6 h-6'><rect width='20' height='20' x='2' y='2' rx='5' fill='url(#ig-gradient)'/><defs><linearGradient id='ig-gradient' x1='2' x2='22' y1='2' y2='22' gradientUnits='userSpaceOnUse'><stop stop-color='#F58529'/><stop offset='0.5' stop-color='#DD2A7B'/><stop offset='1' stop-color='#515BD4'/></linearGradient></defs><circle cx='12' cy='12' r='5' fill='#fff'/><circle cx='17.5' cy='6.5' r='1.5' fill='#fff'/></svg>`
  },
  facebook: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-700/30',
    icon: `<svg fill='none' viewBox='0 0 24 24' class='w-6 h-6'><rect width='20' height='20' x='2' y='2' rx='5' fill='#1877F3'/><path fill='#fff' d='M15.5 12H13v8h-3v-8H8v-3h2V7.5A3.5 3.5 0 0 1 13.5 4h2.5v3h-2.5A.5.5 0 0 0 13 7.5V9h3l-.5 3Z'/></svg>`
  },
  webchat: {
    bg: 'bg-violet-100 dark:bg-violet-900/30',
    text: 'text-violet-700 dark:text-violet-300',
    border: 'border-violet-200 dark:border-violet-700/30',
    icon: `<svg fill='none' viewBox='0 0 24 24' class='w-6 h-6'><rect width='20' height='20' x='2' y='2' rx='5' fill='#7C3AED'/><path fill='#fff' d='M8 10h8v2H8zm0 4h5v2H8z'/></svg>`
  },
  telegram: {
    bg: 'bg-cyan-100 dark:bg-cyan-900/30',
    text: 'text-cyan-700 dark:text-cyan-300',
    border: 'border-cyan-200 dark:border-cyan-700/30',
    icon: `<svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6"><circle cx="120" cy="120" r="120" fill="#229ED9"/><path d="M180.5 72.5L157.5 180.5C155.5 188.5 150.5 190.5 143.5 186.5L110.5 162.5L94.5 177.5C92.5 179.5 91 181 87.5 181L90.5 146.5L157.5 85.5C160.5 82.5 157 81 153.5 84L77.5 143.5L43.5 132.5C36 130.5 36 125.5 44.5 122.5L170.5 74.5C176.5 72.5 181.5 76.5 180.5 72.5Z" fill="white"/></svg>`
  }
}
</script> 