<template>
  <section id="team" class="relative py-16 bg-white dark:bg-gray-950 transition-colors duration-300">
    <!-- Particle background -->
    <div class="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
      <ParticleBackground />
    </div>
    
    <div class="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10">
      <!-- Header con Typewriter -->
      <div class="text-center mb-20">
        <TypewriterTitle
          :i18n-key="'sections.team.title'"
          :subtitle-i18n-key="'sections.team.subtitle'"
          :badge="{ 
            icon: `<svg class='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'/></svg>`, 
            i18nKey: 'sections.team.badge' 
          }"
          align="center"
          max-width="max-w-3xl"
          margin-bottom="mb-10"
          subtitle-margin-top="mt-6"
          subtitle-position="bottom"
        >
          <template #brand>
            <OnServiceAI />
          </template>
        </TypewriterTitle>
        
        <!-- Descripción adicional -->
        <template v-if="teamDescParts.length === 2">
          <p class="mt-8 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed md:leading-loose text-center">
            {{ teamDescParts[0] }}
          </p>
          <div class="flex justify-center my-2">
            <OnServiceAI />
          </div>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed md:leading-loose text-center">
            {{ teamDescParts[1] }}
          </p>
        </template>
        <template v-else>
          <p class="mt-8 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed md:leading-loose text-center">
            {{ t('teamBrandLine') }}
          </p>
        </template>
      </div>

      <!-- Grid de miembros del equipo -->
      <div class="flex flex-wrap justify-center mb-16">
        <div 
          v-for="(member, index) in teamMembers" 
          :key="member.name"
          class="group relative w-full md:w-1/2 lg:w-1/3 p-4"
          @click="userActive == member.name ? userActive = null : userActive = member.name"
        >
          <!-- Card del miembro -->
          <div class="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-xl border border-violet-100 dark:border-gray-800 transition-all duration-500 hover:shadow-2xl flex flex-col h-full">
            
            <!-- Imagen -->
            <div class="relative h-[260px] flex items-center justify-center duration-500">
              <img
                :src="member.image"
                :alt="member.name"
                class="w-full h-full object-cover rounded-t-3xl"
                @error="(e) => handleImageError(e, index)"
                @load="() => handleImageLoad(index)"
                :style="{ opacity: imageLoaded[index] ? 1 : 0, transition: 'opacity 0.7s cubic-bezier(0.4,0,0.2,1)' }"
              />
              <div class="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-violet-500 to-cyan-400 text-white text-sm font-semibold rounded-full shadow-lg">
                {{ t(member.position) }}
              </div>
            </div>

            <!-- Contenido -->
            <div class="flex flex-col flex-1 pb-6 px-6 pt-4 justify-start">
              <div class="flex items-center justify-between min-h-[32px] mb-1 gap-3">
                <h3 class="text-2xl font-bold text-violet-500 dark:text-violet-400 transition-colors flex-1 truncate h-[32px] flex items-center">
                  {{ member.name }}
                </h3>
              </div>
              <strong class="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-1" v-html="t(member.positionKey)"></strong>
              <div class="text-gray-600 dark:text-gray-300 text-base leading-relaxed" v-html="t(member.bioKey)" v-if="userActive == member.name"></div>
            </div>
          </div>

          <!-- Hover effect -->
          <div class="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-500/0 via-cyan-400/0 to-emerald-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>
        </div>
      </div>

      <!-- Footer con mensaje inspirador -->
      <div class="mt-16">
        <div class="w-full">
          <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed md:leading-loose pb-8 text-center mx-auto max-w-4xl">
            {{ t('sections.team.footer') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useI18n, I18nT } from 'vue-i18n';
import ParticleBackground from './ParticleBackground.vue';
import TypewriterTitle from './TypewriterTitle.vue';
import teamData from '../data/team.js';
import OnServiceAI from './OnServiceAI.vue';

const { t, locale } = useI18n();

const userActive = ref(null);

// Datos del equipo desde las traducciones, asegurando array y filtrando vacíos
const teamMembers = teamData;

// Estado de carga de imágenes por miembro
const imageLoaded = ref(Array(teamMembers.length).fill(false));

// Manejo de errores de imagen por índice
const handleImageError = (event, idx) => {
  event.target.src = `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face`;
  imageLoaded.value[idx] = true;
};

// Manejo de carga exitosa de imagen por índice
const handleImageLoad = (idx) => {
  imageLoaded.value[idx] = true;
};

// Función para acortar los textos de los tags si es necesario
const tagKeyShort = (tagKey) => {
  const shortMap = {
    'sections.team.members.0.tag1': 'AI & NLP',
    'sections.team.members.0.tag2': 'Leadership',
    'sections.team.members.0.tag3': 'Aviation',
    'sections.team.members.1.tag1': 'Cloud',
    'sections.team.members.1.tag2': 'Integration',
    'sections.team.members.1.tag3': 'Aviation',
    'sections.team.members.2.tag1': 'UX/UI',
    'sections.team.members.2.tag2': 'Bots',
    'sections.team.members.2.tag3': 'Platforms',
  };
  return shortMap[tagKey] || t(tagKey);
};

const teamDescParts = computed(() => t('teamBrandLine').split('{brand}'));
</script>

<style scoped>
/* Animaciones adicionales */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.group:hover .group-hover\:scale-\[1\.02\] {
  animation: float 3s ease-in-out infinite;
}

/* Efecto de brillo en las cards */
.group:hover .bg-gradient-to-r {
  animation: shimmer 2s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.2; }
}

/* Transiciones suaves para las imágenes */
img {
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease-in-out;
}

/* Animación de carga */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Efecto de hover en los iconos de redes sociales */
.w-8.h-8:hover {
  transform: scale(1.1);
  transition: transform 0.2s ease-in-out;
}

/* Animación para los tags */
@keyframes tagPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Efecto de entrada para las cards */
@keyframes cardEntrance {
  0% { 
    opacity: 0; 
    transform: translateY(30px) scale(0.95); 
  }
  100% { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
}

.group {
  animation: cardEntrance 0.6s ease-out;
}

.group:nth-child(1) { animation-delay: 0.1s; }
.group:nth-child(2) { animation-delay: 0.2s; }
.group:nth-child(3) { animation-delay: 0.3s; }

/* Mejora en el hover de las cards */
.group:hover .relative {
  transform: translateY(-8px);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Estilos para el carrusel */
.overflow-hidden {
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

/* Animación de transición suave */
.transition-transform {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Efectos hover para los controles */
button:not(:disabled):hover {
  transform: scale(1.05);
}

button:not(:disabled):active {
  transform: scale(0.95);
}

/* Indicadores activos */
button.bg-violet-500 {
  box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
}
</style> 