<template>
  <header class="fixed top-0 left-0 w-full z-50 flex justify-center pt-5 md:pt-7 pointer-events-none">
    <nav class="relative z-10 flex items-center px-2 py-1.5 md:px-4 md:py-2 rounded-full bg-black/50 backdrop-blur-xl shadow-lg border border-white/10 pointer-events-auto floating-nav">
      <!-- Logo dentro del fondo flotante, alineado a la izquierda -->
      <a href="#hero" class="flex items-center h-10 md:h-12 pr-4 mr-2 md:mr-6 border-r border-white/10 focus:outline-none" aria-label="OnService Home">
        <img src="/logo.png" alt="OnService logo" class="h-9 md:h-11 w-auto transition-all duration-200" />
      </a>
      <ul class="flex gap-4 lg:gap-8 text-white/90 text-base font-medium">
        <li v-for="item in navItems" :key="item.label" class="relative group">
          <a :href="item.href"
             :class="[
               'px-4 py-2 rounded-xl transition focus:outline-none focus:ring-2 focus:ring-violet-400 font-semibold flex flex-col items-center',
               isActive(item.href) ? 'active-link' : 'nav-hover'
             ]"
             @click.prevent="setActive(item.href)">
            <span class="relative z-10">{{ item.label }}</span>
            <span v-if="isActive(item.href)" class="active-underline"></span>
            <span v-else class="hover-underline group-hover:opacity-100"></span>
          </a>
        </li>
      </ul>
      <div class="flex-1"></div>
      <a href="#contact" class="ml-4 px-6 py-2 rounded-xl font-semibold shadow-lg border-0 focus:outline-none focus:ring-2 focus:ring-violet-400 btn-contacto-gradient">
        Contacto
      </a>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

const navItems = [
  { label: 'Clientes', href: '#clients', section: 'clients' },
  { label: 'IA Tech', href: '#ai-tech', section: 'ai-tech' },
  { label: 'Casos de uso', href: '#usecases', section: 'usecases' },
  { label: 'Métricas', href: '#metrics', section: 'metrics' },
  { label: 'Planes', href: '#pricing', section: 'pricing' },
  { label: 'Equipo', href: '#team', section: 'team' },
];

const activeSection = ref(null);
const atTop = ref(true);

function setActive(href) {
  activeSection.value = href;
  window.location.hash = href;
}

function onHashChange() {
  activeSection.value = window.location.hash || null;
}

function isActive(href) {
  return activeSection.value === href;
}

function onScroll() {
  const scrollY = window.scrollY;
  atTop.value = scrollY < 80;
  let found = false;
  for (let i = navItems.length - 1; i >= 0; i--) {
    const section = document.querySelector(navItems[i].href);
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120) {
        activeSection.value = navItems[i].href;
        found = true;
        break;
      }
    }
  }
  if (!found && scrollY < 120) {
    activeSection.value = null;
  }
}

onMounted(() => {
  window.addEventListener('hashchange', onHashChange);
  window.addEventListener('scroll', onScroll, { passive: true });
  nextTick(onScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener('hashchange', onHashChange);
  window.removeEventListener('scroll', onScroll);
});
</script>

<style scoped>
.floating-nav {
  box-shadow: 0 4px 24px 0 rgba(30, 41, 59, 0.12);
  border-radius: 2.5rem;
  background: rgba(17, 24, 39, 0.50);
  backdrop-filter: blur(18px);
  border: 1.5px solid rgba(139, 92, 246, 0.10);
  margin-top: 0;
  transition: box-shadow 0.3s, background 0.3s, border 0.3s;
  align-items: center;
  min-width: 0;
}
@media (max-width: 768px) {
  .floating-nav {
    padding-left: 0.15rem;
    padding-right: 0.15rem;
    border-radius: 1.2rem;
  }
}
.active-link {
  background: transparent !important;
  color: #fff !important;
  font-weight: 700;
  position: relative;
  z-index: 1;
}
.active-underline {
  display: block;
  position: absolute;
  left: 18%;
  right: 18%;
  bottom: 4px;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg, #7c3aed 0%, #38bdf8 100%);
  opacity: 1;
  transform: scaleX(0.7);
  animation: underlineFadeIn 0.25s cubic-bezier(.68,-0.55,.27,1.55);
  transition: opacity 0.2s, transform 0.2s;
}
@keyframes underlineFadeIn {
  from { opacity: 0; transform: scaleX(0.3); }
  to { opacity: 1; transform: scaleX(0.7); }
}
.hover-underline {
  display: block;
  position: absolute;
  left: 25%;
  right: 25%;
  bottom: 4px;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(90deg, #a78bfa88 0%, #38bdf888 100%);
  opacity: 0;
  transition: opacity 0.18s;
  pointer-events: none;
}
.nav-hover {
  background: transparent;
  color: #fff;
  transition: background 0.2s, color 0.2s;
  position: relative;
}
.nav-hover:hover, .nav-hover:focus {
  background: transparent;
  color: #c7bfff;
}
.group:hover .hover-underline {
  opacity: 1 !important;
}
.btn-contacto-gradient {
  background: linear-gradient(90deg, #7c3aed 0%, #38bdf8 100%);
  color: #fff;
  font-weight: 700;
  box-shadow: 0 2px 16px 0 rgba(139, 92, 246, 0.18);
  border: none;
  transition: box-shadow 0.18s, filter 0.18s;
  filter: brightness(1);
}
.btn-contacto-gradient:hover, .btn-contacto-gradient:focus {
  filter: brightness(1.08) saturate(1.2);
  box-shadow: 0 4px 32px 0 rgba(56, 189, 248, 0.18);
}
img[alt="OnService logo"] {
  border-radius: 0.6rem;
  box-shadow: none;
  padding: 0;
  margin-left: 0;
}
</style> 