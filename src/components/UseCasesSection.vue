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
          <i18n-t keypath="usecases.description">
            <strong class="font-bold text-violet-600" place="strong"></strong>
          </i18n-t>
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
          <div v-for="([key, label], idx) in Object.entries(tm('usecases.channels'))" :key="key" class="flex items-center gap-3 px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700/30 font-semibold">
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
          {{ t('usecases.cta_desc') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import ParticleBackground from './ParticleBackground.vue'

const { t, tm } = useI18n()

// Eliminar accesos directos incorrectos
// const usecases = t('usecases')
// const metrics = t('usecases.metrics')
// const channels = t('usecases.channels')
// const cases = t('usecases.cases')
</script> 