<template>
  <section
    id="about"
    ref="aboutSection"
    class="relative w-full min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 overflow-hidden"
  >
    <div
      class="absolute inset-0 w-full h-full z-0 pointer-events-none select-none"
    >
      <ParticleBackground />
    </div>

    <!-- Desktop Layout (md y superior) -->
    <div class="hidden md:flex flex-row w-full min-h-screen items-start">
      <!-- Stepper y contenido (izquierda) -->
      <div
        class="w-1/2 flex flex-col items-start justify-start px-12 py-16 gap-8"
      >
        <!-- Título con Typewriter -->
        <div class="w-full mb-8">
          <TypewriterTitle
            i18nKey="about.title"
            subtitleI18nKey="about.subtitle"
            :badge="{
              icon: `<svg class='w-4 h-4' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'/></svg>`,
              text: 'Pioneros en IA y Aviación',
            }"
          />
        </div>
        <div class="relative w-full h-full flex flex-col items-start">
          <!-- Línea base y línea de progreso -->
          <div
            class="absolute left-6 top-0 bottom-0 w-2 flex flex-col items-center z-0"
          >
            <!-- Línea base -->
            <div class="stepper-line-base w-full h-full rounded-full"></div>
            <!-- Línea de progreso -->
            <div
              class="stepper-line-progress w-full rounded-full"
              :style="{
                height: progressHeight + '%',
                top: 0,
                bottom: 'auto',
                transition: 'height 0.5s cubic-bezier(.4,0,.2,1)',
              }"
            ></div>
            <!-- Círculo inicio -->
            <div class="stepper-dot start"></div>
            <!-- Círculo fin -->
            <div class="stepper-dot end"></div>
          </div>
          <ol
            class="relative z-10 w-full flex flex-col justify-between min-h-[520px]"
            style="min-height: calc(100vh-300px)"
          >
            <!-- Círculo 1 absolutamente posicionado sobre el inicio de la línea -->
            <span
              class="stepper-circle flex items-center justify-center rounded-full border-4 transition-all duration-300 text-2xl font-bold absolute z-20 bg-white border-violet-500 text-violet-600 shadow-lg"
              :class="[activeStep === 0 ? 'active' : '']"
              style="width:48px;height:48px;left:6px;top:-11px;transform:none;"
            >
              1
            </span>
            <li
              v-for="(step, idx) in steps"
              :key="step.key"
              :class="[
                'group relative',
                idx === 0 ? 'mb-36 pl-0' : idx === steps.length - 1 ? 'mb-[240px] pl-0' : 'mb-36 pl-0'
              ]"
              style="scroll-snap-align: center"
            >
              <div
                :class="[
                  'flex items-center cursor-pointer',
                  idx === activeStep
                    ? 'font-extrabold text-violet-600 dark:text-cyan-400' : 'text-gray-700 dark:text-gray-300',
                  'ml-14'
                ]"
                @click="scrollToStep(idx)"
                style="position:relative;"
              >
                <span
                  v-if="idx !== 0 && idx !== steps.length - 1"
                  :class="[
                    'stepper-circle flex items-center justify-center rounded-full border-4 transition-all duration-300 text-2xl font-bold z-10 relative',
                    idx === activeStep ? 'active' : '',
                  ]"
                  :style="{ transform: 'none', marginLeft: '2px' }"
                >
                  {{ idx + 1 }}
                </span>
                <span
                  :class="[
                    'text-2xl font-bold transition-all duration-500',
                    idx === activeStep ? 'grow-title' : '',
                    'group-hover:scale-[1.03] group-hover:translate-x-1',
                  ]"
                  >{{ step.title }}</span
                >
              </div>
              <div
                :ref="(el) => (stepRefs[idx] = el)"
                :class="[
                  'mt-4 max-w-xl transition-all duration-500',
                  idx === activeStep ? 'grow-desc' : 'shrink-desc',
                  'ml-14'
                ]"
              >
                {{ step.description }}
              </div>
              <!-- Círculo con el número 4 absolutamente posicionado sobre el dot final -->
              <transition name="fade-bounce-dot" mode="out-in">
                <span
                  v-if="idx === steps.length - 1"
                  class="stepper-circle flex items-center justify-center rounded-full border-4 transition-all duration-300 text-2xl font-bold absolute z-20 bg-white border-cyan-400 text-cyan-500 shadow-lg animate-bounce-in"
                  :class="[idx === activeStep ? 'active' : '']"
                  style="width:48px;height:48px;left:6px;bottom:-28px;transform:none;"
                >
                  {{ idx + 1 }}
                </span>
              </transition>
            </li>
          </ol>
        </div>
      </div>
      <!-- Imagen fija (derecha) solo visible cuando la sección está en viewport -->
      <transition name="fade-slide-scale-bg" mode="out-in">
        <div v-if="showImage" class="relative w-2/5 flex items-center justify-center ml-0 z-0">
          <div ref="imageBlockRef"
            class="image-block relative rounded-3xl shadow-2xl overflow-visible"
            :class="[imageLoaded ? 'border-4 border-violet-200 dark:border-cyan-700 bg-white/70 dark:bg-gray-900/70' : 'border-0 bg-transparent']"
            :style="{width: '520px', height: '520px', opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.5s'}">
            <transition name="fade-slide-up-image-smooth" mode="out-in">
              <img
                :key="steps[activeStep].image"
                :src="steps[activeStep].image"
                :alt="steps[activeStep].title"
                class="w-full h-full object-cover rounded-3xl transition-all duration-500"
                @load="imageLoaded = true"
                @before-enter="imageLoaded = false"
              />
            </transition>
            <!-- Círculos decorativos con iconos -->
            <div class="decorative-circles pointer-events-none">
              <div v-for="(icon, i) in stepIcons[activeStep]" :key="i" class="circle-icon" :style="circleIconStyle(i)">
                <span v-html="icon"></span>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <!-- Mobile Layout (menor a md) restaurado -->
    <div class="md:hidden flex flex-col w-full min-h-screen">
      <!-- Título con Typewriter -->
      <div class="w-full px-6 pt-12 pb-8">
        <TypewriterTitle
          i18nKey="about.title"
          subtitleI18nKey="about.subtitle"
          :badge="{
            icon: `<svg class='w-4 h-4' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'/></svg>`,
            text: 'Pioneros en IA y Aviación'
          }"
        />
      </div>
      <!-- Cards horizontales con scroll -->
      <div class="flex-1 px-6 pb-8">
        <div class="relative">
          <!-- Scroll horizontal container -->
          <div 
            ref="mobileScrollContainer"
            class="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            @scroll="handleMobileScroll"
          >
            <div 
              v-for="(step, idx) in steps" 
              :key="step.key"
              :ref="el => mobileStepRefs[idx] = el"
              class="flex-shrink-0 w-[85vw] max-w-sm snap-center"
            >
              <!-- Card individual -->
              <div class="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-violet-100 dark:border-gray-800 overflow-hidden transition-all duration-500 hover:scale-[1.02]">
                <!-- Imagen superior -->
                <div class="relative h-48 overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-cyan-400/20 z-10"></div>
                  <img
                    :src="step.image"
                    :alt="step.title"
                    class="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <!-- Badge del número -->
                  <div class="absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-white text-lg font-bold shadow-lg">
                    {{ idx + 1 }}
                  </div>
                </div>
                <!-- Contenido -->
                <div class="p-6">
                  <h3 class="text-xl font-bold mb-3 text-violet-700 dark:text-cyan-300">
                    {{ step.title }}
                  </h3>
                  <p class="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                    {{ step.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- Indicadores de progreso -->
          <div class="flex justify-center items-center gap-2 mt-6">
            <div 
              v-for="(step, idx) in steps" 
              :key="`indicator-${idx}`"
              :class="[
                'w-3 h-3 rounded-full transition-all duration-300 cursor-pointer',
                idx === mobileActiveStep 
                  ? 'bg-gradient-to-r from-violet-500 to-cyan-400 scale-125' 
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-violet-300 dark:hover:bg-cyan-600'
              ]"
              @click="scrollToMobileStep(idx)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import ParticleBackground from "./ParticleBackground.vue";
import TypewriterTitle from "./TypewriterTitle.vue";
import { computed } from "vue";

const aboutSection = ref(null);
const mobileScrollContainer = ref(null);
const showImage = ref(false);
const imageBlockRef = ref(null);
const steps = [
  {
    key: "historia",
    title: "Nuestra Historia",
    description:
      "Somos OnService, pioneros en la intersección de IA, aviación y atención al cliente. Nuestro equipo combina experiencia tecnológica y conocimiento profundo del sector aéreo.",
    image: "/mision-stepper2.png",
  },
  {
    key: "mision",
    title: "Nuestra Misión",
    description:
      "Transformar la atención al cliente y optimizar procesos críticos para aerolíneas, agencias y empresas de aviación a nivel global.",
    image: "/ia-generated-02.png",
  },
  {
    key: "vision",
    title: "Nuestra Visión",
    description:
      "Hacer que la interacción entre aerolíneas y pasajeros sea más fluida, personalizada y eficaz que nunca, superando los desafíos de la industria aérea.",
    image: "/vision-stepper3.png",
  },
  {
    key: "valores",
    title: "Nuestros Valores",
    description:
      "Innovación continua, seguridad de los datos y entrega de valor medible. Construimos el futuro de la atención al cliente en la aviación.",
    image: "/ia-generated-04.png",
  },
];
const activeStep = ref(0);
const mobileActiveStep = ref(0);
const stepRefs = [];
const mobileStepRefs = [];

// Calcula el porcentaje de altura de la línea de progreso según el paso activo
const progressHeight = computed(() => {
  if (steps.length <= 1) return 0;
  return ((activeStep.value + 1) * (100 / steps.length));
});

// Offset visual explícito para la imagen sticky (ajustable)
const IMAGE_VISUAL_OFFSET = 350;

// Posiciones de los iconos decorativos por step (puedes tunear y agregar más)
const stepIconPositions = [
  // Historia
  [
    { top: '10%', left: '-12%' },
    { top: '80%', left: '-8%' },
    { top: '15%', right: '-10%' }
  ],
  // Misión
  [
    { top: '12%', left: '-10%' },
    { top: '70%', right: '-12%' },
    { top: '60%', left: '-8%' },
    { top: '20%', right: '-8%' }
  ],
  // Visión
  [
    { top: '8%', left: '-10%' },
    { top: '60%', right: '-14%' }
  ],
  // Valores
  [
    { top: '18%', left: '-14%' },
    { top: '75%', right: '-10%' },
    { top: '40%', left: '-10%' },
    { top: '10%', right: '-12%' },
    { top: '60%', right: '-8%' }
  ]
];

// Iconos SVG para cada step (puedes tunear y agregar más)
const stepIcons = [
  // Historia
  [
    `<svg class='w-7 h-7 text-violet-500' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M2.5 19.5l19-7-7 7-2 4-2-4-7-7z'/></svg>`,
    `<svg class='w-7 h-7 text-blue-400' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10'/><path d='M8 12h8'/><path d='M12 8v8'/></svg>`,
    `<svg class='w-7 h-7 text-amber-400' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M12 8v4l3 3'/></svg>`
  ],
  // Misión
  [
    `<svg class='w-7 h-7 text-emerald-500' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10'/><path d='M12 8v4l3 3'/></svg>`,
    `<svg class='w-7 h-7 text-pink-500' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M12 2v20m10-10H2'/></svg>`,
    `<svg class='w-7 h-7 text-cyan-500' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2'/></svg>`,
    `<svg class='w-7 h-7 text-yellow-400' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M5 13l4 4L19 7'/></svg>`
  ],
  // Visión
  [
    `<svg class='w-7 h-7 text-indigo-500' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10'/><path d='M12 8v4l3 3'/></svg>`,
    `<svg class='w-7 h-7 text-yellow-400' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M12 2v20m10-10H2'/></svg>`
  ],
  // Valores
  [
    `<svg class='w-7 h-7 text-green-500' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10'/><path d='M12 8v4l3 3'/></svg>`,
    `<svg class='w-7 h-7 text-rose-400' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M12 2v20m10-10H2'/></svg>`,
    `<svg class='w-7 h-7 text-blue-400' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2'/></svg>`,
    `<svg class='w-7 h-7 text-orange-400' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10'/><path d='M8 12h8'/></svg>`,
    `<svg class='w-7 h-7 text-cyan-400' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M5 13l4 4L19 7'/></svg>`
  ]
];

function circleIconStyle(i) {
  // Usa las posiciones específicas del step activo, si existen
  const positions = stepIconPositions[activeStep.value] || [];
  return positions[i] ? { ...positions[i], animationDelay: `${i * 0.2}s` } : { top: '10%', left: '-12%' };
}

function handleDesktopScroll() {
  if (window.innerWidth < 768) return;
  // 1. Visibilidad de la imagen (ajustado para aparecer/desaparecer más tarde)
  const viewportCenter = window.scrollY + window.innerHeight / 2;
  if (aboutSection.value) {
    const sectionRect = aboutSection.value.getBoundingClientRect();
    const sectionTop = window.scrollY + sectionRect.top;
    const sectionBottom = sectionTop + sectionRect.height;
    const sectionHeight = sectionRect.height;
    const min = sectionTop + sectionHeight * 0.25;
    const max = sectionTop + sectionHeight * 0.98;
    showImage.value = viewportCenter > min && viewportCenter < max;
  }
  // 2. Step activo según scroll
  let minDist = Infinity;
  let closestIdx = 0;
  for (let i = 0; i < stepRefs.length; i++) {
    const el = stepRefs[i];
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    const elCenter = window.scrollY + rect.top + rect.height / 2;
    const dist = Math.abs(viewportCenter - elCenter);
    if (dist < minDist) {
      minDist = dist;
      closestIdx = i;
    }
  }
  activeStep.value = closestIdx;
  // 3. Imagen sticky sigue el step activo, pero nunca sube más allá del primer círculo, y suma offset visual explícito
  if (imageBlockRef.value && stepRefs[activeStep.value] && stepRefs[0]) {
    // Centro del círculo activo
    const stepEl = stepRefs[activeStep.value];
    const circle = stepEl.parentElement.querySelector('.stepper-circle.active');
    let circleCenter = stepEl.getBoundingClientRect().top + stepEl.getBoundingClientRect().height / 2;
    if (circle) {
      const circleRect = circle.getBoundingClientRect();
      circleCenter = circleRect.top + circleRect.height / 2;
    }
    // Centro del primer círculo (offset mínimo)
    const firstStepEl = stepRefs[0];
    const firstCircle = firstStepEl.parentElement.querySelector('.stepper-circle');
    let firstCircleCenter = firstStepEl.getBoundingClientRect().top + firstStepEl.getBoundingClientRect().height / 2;
    if (firstCircle) {
      const firstCircleRect = firstCircle.getBoundingClientRect();
      firstCircleCenter = firstCircleRect.top + firstCircleRect.height / 2;
    }
    const parentRect = imageBlockRef.value.parentElement.getBoundingClientRect();
    const imageHeight = imageBlockRef.value.offsetHeight || 520;
    // Sumo el offset visual explícito
    let offsetActual = circleCenter - parentRect.top - imageHeight / 2 + IMAGE_VISUAL_OFFSET;
    let offsetMinimo = firstCircleCenter - parentRect.top - imageHeight / 2 + IMAGE_VISUAL_OFFSET;
    // --- Limitar para que la imagen nunca se corte por abajo, pero nunca desaparezca ---
    const parentBottom = parentRect.top + parentRect.height;
    let maxOffset = parentBottom - parentRect.top - imageHeight;
    // Solo limitar si hay espacio suficiente
    if (maxOffset > offsetMinimo) {
      if (offsetActual > maxOffset) offsetActual = maxOffset;
      if (offsetMinimo > maxOffset) offsetMinimo = maxOffset;
    }
    const offset = Math.max(offsetActual, offsetMinimo);
    imageBlockRef.value.style.transform = `translateY(${offset}px)`;
  }
}

function scrollToStep(idx) {
  if (stepRefs[idx]) {
    stepRefs[idx].scrollIntoView({ behavior: "smooth", block: "center" });
    activeStep.value = idx;
    // Actualizo imagen sticky
    setTimeout(handleDesktopScroll, 400);
  }
}

function scrollToMobileStep(idx) {
  if (mobileStepRefs[idx] && mobileScrollContainer.value) {
    mobileStepRefs[idx].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    mobileActiveStep.value = idx;
  }
}

function handleMobileScroll() {
  if (!mobileScrollContainer.value) return;
  const container = mobileScrollContainer.value;
  const scrollLeft = container.scrollLeft;
  const containerWidth = container.offsetWidth;
  const cardWidth = containerWidth * 0.85; // 85vw
  // Calcular qué card está más centrada
  const centerPosition = scrollLeft + containerWidth / 2;
  const activeIndex = Math.round(centerPosition / cardWidth);
  mobileActiveStep.value = Math.max(0, Math.min(activeIndex, steps.length - 1));
}

onMounted(() => {
  window.addEventListener('scroll', handleDesktopScroll, { passive: true });
  handleDesktopScroll();
});
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleDesktopScroll);
});

// Imagen sticky: animación más suave y borde violeta solo visible cuando la imagen está cargada
const imageLoaded = ref(false);
</script>

<style scoped>
.fade-slide-up-image-smooth-enter-active,
.fade-slide-up-image-smooth-leave-active {
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-up-image-smooth-enter-from,
.fade-slide-up-image-smooth-leave-to {
  opacity: 0;
  transform: translateY(120px) scale(0.88);
}
.fade-slide-up-image-smooth-enter-to,
.fade-slide-up-image-smooth-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.fade-slide-scale-bg-enter-active,
.fade-slide-scale-bg-leave-active {
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-scale-bg-enter-from,
.fade-slide-scale-bg-leave-to {
  opacity: 0;
  transform: translateY(60px) scale(0.95);
}
.fade-slide-scale-bg-enter-to,
.fade-slide-scale-bg-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.grow-title {
  animation: growFontTitle 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 2.1rem !important;
}
@keyframes growFontTitle {
  0% {
    font-size: 1.2rem;
  }
  100% {
    font-size: 2.1rem;
  }
}
.grow-desc {
  animation: growFontDesc 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1.35rem !important;
  opacity: 1;
}
.shrink-desc {
  font-size: 1.1rem;
  opacity: 0.7;
  transition: font-size 0.5s, opacity 0.5s;
}
@keyframes growFontDesc {
  0% {
    font-size: 1.1rem;
    opacity: 0.7;
  }
  100% {
    font-size: 1.35rem;
    opacity: 1;
  }
}

/* Línea gradiente simple del stepper */
.stepper-gradient-line {
  border-image: linear-gradient(180deg, #7c3aed 0%, #38bdf8 100%) 1;
}

/* Stepper línea base y progreso */
.stepper-line-base {
  position: absolute;
  left: 0;
  top: 0;
  width: 8px;
  height: 100%;
  background: #e5e7eb; /* gray-200 */
  z-index: 0;
}
.stepper-line-progress {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 8px;
  background: linear-gradient(180deg, #7c3aed 0%, #38bdf8 100%);
  z-index: 1;
  pointer-events: none;
}
.stepper-dot {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
  border: 4px solid #7c3aed;
  z-index: 2;
  box-shadow: 0 2px 8px 0 rgba(124, 58, 237, 0.1);
}
.stepper-dot.start {
  top: -11px;
  border-color: #7c3aed;
  background: linear-gradient(135deg, #7c3aed 60%, #38bdf8 100%);
}
.stepper-dot.end {
  bottom: -11px;
  border-color: #38bdf8;
  background: linear-gradient(135deg, #38bdf8 60%, #7c3aed 100%);
}
.stepper-circle {
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  background: #fff;
  color: #7c3aed;
  font-size: 1.5rem;
  box-shadow: 0 2px 8px 0 rgba(124, 58, 237, 0.08);
  transition: border 0.3s, box-shadow 0.3s, background 0.3s, color 0.3s;
}
.stepper-circle.active {
  border: 4px solid #7c3aed;
  background: linear-gradient(135deg, #7c3aed 60%, #38bdf8 100%);
  color: #fff;
  box-shadow: 0 4px 16px 0 rgba(56, 189, 248, 0.18),
    0 0 0 6px rgba(124, 58, 237, 0.1);
  animation: glowStep 1s cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes glowStep {
  0% {
    box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.18);
  }
  100% {
    box-shadow: 0 4px 16px 0 rgba(56, 189, 248, 0.18),
      0 0 0 6px rgba(124, 58, 237, 0.1);
  }
}

/* Ocultar scrollbar en mobile */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.decorative-circles {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none;
  z-index: 2;
}
.circle-icon {
  position: absolute;
  width: 54px;
  height: 54px;
  background: linear-gradient(135deg, #f3f4f6 60%, #e0e7ff 100%);
  border-radius: 50%;
  box-shadow: 0 2px 12px 0 rgba(56,189,248,0.10);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: floatCircle 3.5s ease-in-out infinite alternate;
  transition: box-shadow 0.3s;
}
.circle-icon svg {
  filter: drop-shadow(0 1px 2px rgba(124,58,237,0.10));
}
@keyframes floatCircle {
  0% { transform: scale(1) translateY(0); }
  100% { transform: scale(1.08) translateY(-12px); }
}
.image-block {
  position: absolute;
  left: 0; right: 0;
  margin: auto;
  transition: transform 0.6s cubic-bezier(.4,0,.2,1);
}

.fade-bounce-dot-enter-active {
  animation: bounceInDot 0.5s cubic-bezier(.4,0,.2,1);
}
@keyframes bounceInDot {
  0% { opacity: 0; transform: scale(0.7) translateY(40px); }
  60% { opacity: 1; transform: scale(1.1) translateY(-8px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}

.fade-slide-up-image-fast-enter-active,
.fade-slide-up-image-fast-leave-active {
  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-up-image-fast-enter-from,
.fade-slide-up-image-fast-leave-to {
  opacity: 0;
  transform: translateY(120px) scale(0.88);
}
.fade-slide-up-image-fast-enter-to,
.fade-slide-up-image-fast-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
