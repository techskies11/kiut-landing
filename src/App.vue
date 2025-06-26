<script setup>
import { onMounted, onBeforeUnmount, ref, nextTick, computed } from "vue";
import ButtonAnimate from "./components/ButtonAnimate.vue";
import ParticleBackground from "./components/ParticleBackground.vue";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "./components/SectionTitle.vue";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const words = [
  "customer support",
  "flight reservations",
  "e-commerce",
  "travel assistance",
  "ticket changes",
  "AI chat agents",
  "boarding services",
  "flight check-ins",
  "24/7 support",
  "loyalty programs",
  "baggage queries",
];

const questions = ref({
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
});
const loading = ref({
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
});

const features = [
  {
    icon: "/bot.png",
    title: "Virtual Agent",
    desc: "Friendly AI chat agent on your favorite platforms.",
  },
  {
    icon: "/conversation.png",
    title: "Quick Answers",
    desc: "Instant responses to FAQs, boosting satisfaction.",
  },
  {
    icon: "/upselling.png",
    title: "Smart Upselling",
    desc: "Suggest relevant ancillaries at the perfect moment.",
  },
  {
    icon: "/speech-bubble.png",
    title: "Natural Conversations",
    desc: "Context-aware, free-form chat—no rigid trees here.",
  },
  {
    icon: "/customer-support.png",
    title: "24/7 Support",
    desc: "Around-the-clock service in multiple languages.",
  },
  {
    icon: "/clipboard.png",
    title: "Task Automation",
    desc: "Automate FAQs and free your staff for complex cases.",
  },
];

const team = [
  {
    name: "Sofía Torres",
    role: "AI Lead",
    desc: "Leads the AI strategy and model development for all our products.",
  },
  {
    name: "Lucas Fernández",
    role: "Frontend Developer",
    desc: "Builds beautiful and performant user interfaces for our clients.",
  },
  {
    name: "Martina Gómez",
    role: "Backend Developer",
    desc: "Designs and maintains robust, scalable backend systems.",
  },
  {
    name: "Julián Rivas",
    role: "Prompt Engineer",
    desc: "Crafts and optimizes prompts for our AI models to maximize performance.",
  },
  {
    name: "Valentina Ruiz",
    role: "UX/UI Designer",
    desc: "Ensures our products are intuitive, accessible, and visually stunning.",
  },
  {
    name: "Tomás Herrera",
    role: "DevOps Engineer",
    desc: "Automates deployments and keeps our infrastructure running smoothly.",
  },
  {
    name: "Camila Duarte",
    role: "Data Scientist",
    desc: "Analyzes data and extracts insights to drive product improvements.",
  },
  {
    name: "Ignacio Pérez",
    role: "QA Engineer",
    desc: "Guarantees the quality and reliability of our software releases.",
  },
  {
    name: "Florencia Vidal",
    role: "Product Manager",
    desc: "Coordinates the team and aligns product vision with business goals.",
  },
  {
    name: "Emilia Castro",
    role: "Full Stack Developer",
    desc: "Bridges frontend and backend to deliver seamless experiences.",
  },
  {
    name: "Ramiro López",
    role: "AI Researcher",
    desc: "Explores new AI techniques and keeps us at the cutting edge.",
  },
  {
    name: "Gabriela Molina",
    role: "Customer Success",
    desc: "Ensures our clients get the most value from our solutions.",
  },
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typing = ref("");
const cursor = ref(null);
const showScrollTop = ref(false);
const scrollBtn = ref(null);
const underline = ref(null);
const cards = ref([]);

const teamTrack = ref(null);
let teamScrollTrigger = null;

const visibleTeam = computed(() => team.slice(0, 8));

function typeEffect() {
  const current = words[wordIndex];
  charIndex += isDeleting ? -1 : 1;
  typing.value = current.substring(0, charIndex);

  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => (isDeleting = true), 1000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

function hoverIn(i) {
  gsap.to(cards.value[i], {
    scale: 1.05,
    rotation: 1,
    duration: 0.4,
    ease: "power2.out",
  });
  
  // Agregar efecto de brillo
  gsap.to(cards.value[i].querySelector('.feature-glow'), {
    opacity: 1,
    duration: 0.3,
    ease: "power2.out",
  });
  
  // Animar el icono
  gsap.to(cards.value[i].querySelector('.feature-icon'), {
    scale: 1.1,
    rotation: 5,
    duration: 0.3,
    ease: "back.out(1.7)",
  });
}

function hoverOut(i) {
  gsap.to(cards.value[i], {
    scale: 1,
    rotation: 0,
    duration: 0.4,
    ease: "power2.inOut",
  });
  
  // Quitar efecto de brillo
  gsap.to(cards.value[i].querySelector('.feature-glow'), {
    opacity: 0,
    duration: 0.3,
    ease: "power2.in",
  });
  
  // Resetear el icono
  gsap.to(cards.value[i].querySelector('.feature-icon'), {
    scale: 1,
    rotation: 0,
    duration: 0.3,
    ease: "power2.inOut",
  });
}

function handleScroll() {
  if (window.scrollY > 300 && !showScrollTop.value) {
    showScrollTop.value = true;
  } else if (window.scrollY <= 300 && showScrollTop.value) {
    showScrollTop.value = false;
  }
}

function scrollToTop() {
  gsap.to(window, { duration: 0.3, scrollTo: { y: 0 }, ease: "power2.out" });
}

const openLink = (url) => {
  window.open(url, "_blank");
};

function faqEnter(el, done) {
  // Asegúrate de ocultar overflow
  el.style.overflow = "hidden";
  // Capturamos la altura y paddings finales
  const finalHeight = el.scrollHeight;
  const style = getComputedStyle(el);
  const padTop = parseFloat(style.paddingTop);
  const padBot = parseFloat(style.paddingBottom);

  gsap.fromTo(
    el,
    {
      height: 0,
      opacity: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    {
      height: finalHeight,
      opacity: 1,
      paddingTop: padTop,
      paddingBottom: padBot,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        // limpiamos estilos para que sea responsivo
        el.style.height = "auto";
        el.style.overflow = "";
        el.style.paddingTop = "";
        el.style.paddingBottom = "";
        done();
      },
    }
  );
}

function faqLeave(el, done) {
  el.style.overflow = "hidden";
  // Animamos de vuelta a 0
  gsap.to(el, {
    height: 0,
    opacity: 0,
    paddingTop: 0,
    paddingBottom: 0,
    duration: 0.4,
    ease: "power2.in",
    onComplete: done,
  });
}

function toggleFAQ(n) {
  if (questions.value[n]) {
    // si ya estaba abierto, cerramos sin loader
    questions.value[n] = false;
    return;
  }
  loading.value[n] = true;
  // esperamos 800ms simulando "pensar"
  setTimeout(async () => {
    loading.value[n] = false;
    // dejamos que Vue renderice el <p> antes de animar
    await nextTick();
    questions.value[n] = true;
  }, 800);
}

// Utilidad para dividir el array de team en slides de 3 (web) o 1 (mobile)
function getTeamSlides() {
  const isMobile = window.innerWidth < 768;
  const perSlide = isMobile ? 1 : 3;
  const slides = [];
  for (let i = 0; i < team.length; i += perSlide) {
    slides.push(team.slice(i, i + perSlide));
  }
  return slides;
}

const teamSlides = ref(getTeamSlides());

window.addEventListener('resize', () => {
  teamSlides.value = getTeamSlides();
});

function updateTeamScrollTrigger() {
  const track = teamTrack.value;
  const section = document.getElementById('team');
  if (track && section) {
    const container = track.parentElement;
    const totalScroll = track.scrollWidth - container.clientWidth;
    if (teamScrollTrigger) teamScrollTrigger.kill();
    teamScrollTrigger = gsap.to(track, {
      x: () => `-${totalScroll}px`,
      ease: 'none',
      scrollTrigger: {
        id: 'teamPin',
        trigger: section,
        start: 'top top',
        end: () => `+=${totalScroll * 1.3}`,
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    setTimeout(() => { window.ScrollTrigger && window.ScrollTrigger.refresh && window.ScrollTrigger.refresh(); }, 100);
  }
}

onMounted(async () => {
  typeEffect();
  gsap.to(cursor.value, {
    opacity: 1,
    duration: 0.6,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true,
  });
  gsap.to(underline.value, { scaleX: 1, duration: 0.6, ease: "power3.out" });

  await nextTick();

  gsap.from(".feature-ball", {
    scrollTrigger: {
      trigger: "#features",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    y: -40,
    opacity: 0,
    duration: 0.9,
    ease: "back.out(1.7)",
    stagger: 0.12,
    clearProps: "all",
  });

  // Animación del video con parallax
  gsap.from(".video-container", {
    scrollTrigger: {
      trigger: ".video-container",
      start: "top center+=100",
      end: "bottom center-=100",
      scrub: 1,
    },
    y: 100,
    opacity: 0,
    scale: 0.95,
    duration: 1,
    ease: "power2.out",
  });

  // Timeline para animar el Hero completo
  const tl = gsap.timeline();
  tl.from(".gsap-hero span.block", {
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out",
  })
    .from(
      ".hero-desc",
      { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    )
    .from(
      ".hero-cta",
      {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "back.out(1.4)",
        stagger: 0.2,
      },
      "-=0.4"
    )
    .from(
      ".arrow",
      { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    );
  gsap.to(".arrow", {
    y: -8,
    duration: 1.2,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    delay: 1.5,
  });

  window.addEventListener("scroll", handleScroll);

  // Animación del título y subtítulo del FAQ mejorada
  gsap.from("#faq .text-center > *", {
    scrollTrigger: {
      trigger: "#faq .text-center",
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out",
  });

  // Animación de cada pregunta (fade-in + slide) mejorada
  gsap.utils.toArray("#faq .faq-item").forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 95%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: index * 0.1,
      ease: "power3.out",
    });
  });

  // Animación del CTA section con parallax
  gsap.from(".cta-section", {
    scrollTrigger: {
      trigger: ".cta-section",
      start: "top center+=100",
      end: "bottom center-=100",
      scrub: 1,
    },
    y: 50,
    opacity: 0,
    scale: 0.98,
    duration: 1,
    ease: "power2.out",
  });

  gsap.from(".gsap-hero", {
    opacity: 0,
    y: 60,
    duration: 1.2,
    ease: "power3.out",
  });

  gsap.from("header", {
    y: -80,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  const container = document.querySelector(".panel-track");

  if (container) {
    console.log(container, "container");
  } else {
    console.warn("⚠️ .panel-track no encontrado en el DOM");
  }

  updateTeamScrollTrigger();
  window.addEventListener('resize', updateTeamScrollTrigger);
  setTimeout(() => { window.ScrollTrigger && window.ScrollTrigger.refresh && window.ScrollTrigger.refresh(); }, 200);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  ScrollTrigger.getAll().forEach((t) => t.kill());
  window.removeEventListener('resize', updateTeamScrollTrigger);
  if (teamScrollTrigger) teamScrollTrigger.kill();
});

function backToTopEnter(el, done) {
  gsap.fromTo(
    el,
    { opacity: 0, scale: 0.3, y: 40 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.5,
      ease: "back.out(1.7)",
      onComplete: done,
    }
  );
  // Animación flotante
  gsap.to(el, {
    y: -8,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.5,
  });
}

function backToTopLeave(el, done) {
  gsap.killTweensOf(el); // Limpia animaciones previas
  gsap.to(el, {
    opacity: 0,
    scale: 0.3,
    y: 40,
    duration: 0.4,
    ease: "back.in(1.7)",
    onComplete: done,
  });
}

function scrollTeamToStart() {
  const st = window.ScrollTrigger && window.ScrollTrigger.getById && window.ScrollTrigger.getById('teamPin');
  if (st) {
    window.scrollTo({ top: st.start, behavior: 'smooth' });
  } else {
    const section = document.getElementById('team');
    if (section) window.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
  }
}

function scrollTeamToEnd() {
  const st = window.ScrollTrigger && window.ScrollTrigger.getById && window.ScrollTrigger.getById('teamPin');
  if (st) {
    window.scrollTo({ top: st.end, behavior: 'smooth' });
  } else {
    const section = document.getElementById('team');
    if (section) window.scrollTo({ top: section.offsetTop + section.offsetHeight - window.innerHeight, behavior: 'smooth' });
  }
}

function sectionEnter(el, done) {
  gsap.fromTo(
    el,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", onComplete: done }
  );
}
function sectionLeave(el, done) {
  gsap.to(el, { opacity: 0, y: 40, duration: 0.5, ease: "power2.in", onComplete: done });
}

function featuresEnter(el, done) {
  gsap.fromTo(
    el,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", onComplete: done }
  );
}
function featuresLeave(el, done) {
  gsap.to(el, { opacity: 0, y: 40, duration: 0.5, ease: "power2.in", onComplete: done });
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-black">
    <!-- Header -->
    <header
      class="fixed top-0 left-0 w-full z-50 glass-header transition-all duration-300"
    >
      <div class="flex h-20 items-center justify-between px-4 md:px-6">
        <img src="/logo.png" alt="OnService" class="h-10 hover:scale-105 transition-transform duration-300" />
      </div>
    </header>

    <main class="flex-1 bg-black">
      <!-- Hero Section -->
      <transition @enter="sectionEnter" @leave="sectionLeave">
        <section
          class="bg-black text-white pt-24 md:py-28 px-4 sm:px-6 text-center flex flex-col items-center justify-center min-h-[90vh] w-full overflow-hidden relative"
        >
          <!-- Efectos de partículas flotantes -->
          <ParticleBackground />
          
          <!-- Gradiente animado de fondo -->
          <div class="absolute inset-0 bg-gradient-radial from-violet-500/10 via-transparent to-transparent animate-pulse"></div>
          
          <div class="w-full max-w-screen-md px-4 relative z-10">
            <h1
              class="gsap-hero text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-4"
            >
              <span class="block">The new evolution of</span>

              <!-- Typing con cursor -->
              <span class="inline-block min-w-[11ch] text-violet-500 typing">
                {{ typing
                }}<span ref="cursor" class="inline-block opacity-0">|</span>
              </span>

              <span class="block">for airlines.</span>
            </h1>
          </div>

          <p
            class="hero-desc text-gray-400 text-xl md:text-[1.25rem] leading-relaxed tracking-wide max-w-2xl mx-auto mt-6 sm:mt-8 mb-10 px-4 sm:px-0 relative z-10"
          >
            Our AI solution transforms customer experiences and boosts sales
            through <strong class="text-white font-medium">WhatsApp</strong> —
            soon expanding to
            <strong class="text-white font-medium">Telegram</strong>,
            <strong class="text-white font-medium">WeChat</strong>, and
            <strong class="text-white font-medium">iMessage</strong>.
          </p>

          <div
            class="hero-cta flex flex-col sm:flex-row gap-4 px-4 justify-center mt-6 relative z-10"
          >
            <a
              href="https://wa.me/5491130261625"
              target="_blank"
              class="px-8 py-3.5 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-all duration-300 text-base font-semibold shadow-lg hover:shadow-violet-500/25 h-12 flex items-center justify-center min-w-[200px] transform hover:scale-105"
            >
              Chat with Agent AI
            </a>
            <ButtonAnimate />
          </div>

          <div class="arrow mt-16 text-gray-500 relative z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </section>
      </transition>

      <!-- Video Section (sin título, solo video, responsivo) -->
      <transition @enter="sectionEnter" @leave="sectionLeave">
        <section class="pb-32 pt-20 relative w-full flex justify-center bg-black">
          <div class="video-container rounded-lg border bg-card shadow-xl overflow-hidden w-full max-w-4xl aspect-video flex items-center justify-center">
            <iframe class="w-full h-full aspect-video" src="https://www.youtube.com/embed/sX2DjnrrJYM" title="Meet OnService.AI Concierge, the First AI Solution for Airlines' E-Commerce and Customer Service" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </section>
      </transition>

      <!-- Features Section (sin animación de entrada/salida) -->
      <section id="features" class="py-20 bg-black overflow-hidden">
        <div class="container mx-auto px-4">
          <SectionTitle>
            <template #title>Powerful Features</template>
            <template #subtitle>
              OnService.AI comes packed with features designed to make your life easier and more productive.
            </template>
          </SectionTitle>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="(feature, i) in features" :key="i" class="feature-card relative rounded-2xl p-20 pt-24 mt-12 bg-[#111] !text-white cursor-pointer group transition-all duration-300 hover:scale-105" @mouseenter="hoverIn(i)" @mouseleave="hoverOut(i)">
              <div class="feature-glow absolute inset-0 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-violet-500/20 opacity-0 transition-opacity duration-300"></div>
              <div class="feature-ball absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-full bg-gradient-to-br from-violet-700 to-purple-500 opacity-20 pointer-events-none"></div>
              <div class="feature-icon absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-full bg-gradient-to-br from-violet-700 to-purple-500 flex items-center justify-center pointer-events-none transition-all duration-300">
                <img :src="feature.icon" :alt="feature.title" class="h-10 w-10 filter brightness-0 invert-100" />
              </div>
              <h3 class="relative z-10 text-xl font-semibold mb-2 group-hover:text-violet-300 transition-colors duration-300">{{ feature.title }}</h3>
              <p class="relative z-10 text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Clients/Companies Section: scroll horizontal automático tipo diapositivas -->
      <section class="py-20 md:py-28">
        <div class="container flex flex-col items-center text-center">
          <SectionTitle>
            <template #title>Trusted by Leading Companies</template>
            <template #subtitle>Elevating customer service for top brands.</template>
          </SectionTitle>
          <div class="relative w-full max-w-5xl overflow-x-hidden">
            <div class="scroll-content flex items-center gap-12 animate-scroll-x px-8">
              <template v-for="repeat in 2">
                <img v-for="(logo, idx) in [
                  {src: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Aeromexico_logo.svg', alt: 'Aeromexico', url: 'https://www.aeromexico.com'},
                  {src: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Avianca_Logo_2021.svg', alt: 'Avianca', url: 'https://www.avianca.com'},
                  {src: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Delta_logo.svg', alt: 'Delta', url: 'https://www.delta.com'},
                  {src: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Lufthansa_Logo_2018.svg', alt: 'Lufthansa', url: 'https://www.lufthansa.com'},
                  {src: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/United_Airlines_Logo.svg', alt: 'United', url: 'https://www.united.com'},
                  {src: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/American_Airlines_logo_2013.svg', alt: 'American Airlines', url: 'https://www.aa.com'},
                ]" :key="logo.alt + idx + '-' + repeat" :src="logo.src" :alt="logo.alt" class="h-16 md:h-20 opacity-80 hover:opacity-100 transition-all cursor-pointer bg-white rounded-xl shadow-md px-8 py-3 object-contain" @click="openLink(logo.url)" />
              </template>
            </div>
          </div>
        </div>
      </section>

      <!-- Team Section con scroll horizontal GSAP hijack -->
      <section id="team" class="relative w-full overflow-x-hidden py-24 bg-black">
        <div class="container mx-auto px-4">
          <SectionTitle>
            <template #title>Meet the Team</template>
            <template #subtitle>The minds behind our AI solutions.</template>
          </SectionTitle>
        </div>
        <div class="relative max-w-full">
          <button @click="() => {}" class="team-nav-btn left-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button @click="() => {}" class="team-nav-btn right-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
          </button>
          <div class="team-horizontal-scroll relative w-full min-h-[500px]">
            <div class="team-panel-track flex gap-10" ref="teamTrack">
              <div class="hidden md:block" style="width: 96px;"></div>
              <div class="block md:hidden" style="width: 48px;"></div>
              <div v-for="(member, idx) in visibleTeam" :key="member.name"
                :class="[
                  'team-member-card bg-[#18181b] rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 relative mx-auto min-w-[320px] max-w-sm w-[380px] flex-shrink-0',
                  idx === 0 ? 'pl-0' : '',
                  idx === team.length - 1 ? 'pr-0' : ''
                ]"
              >
                <div class="avatar mb-6">
                  <img :src="`https://randomuser.me/api/portraits/men/${Math.floor(Math.random()*50)}.jpg`" alt="avatar" class="w-28 h-28 rounded-full object-cover border-4 border-violet-500 shadow-lg" />
                </div>
                <h3 class="text-2xl font-bold text-white mb-1 team-name">{{ member.name }}</h3>
                <p class="text-violet-400 font-semibold mb-2 team-role">{{ member.role }}</p>
                <p class="text-gray-200 text-center text-base mb-2 team-desc max-w-xs md:max-w-sm">{{ member.desc }}</p>
              </div>
              <div class="hidden md:block" style="width: 96px;"></div>
              <div class="block md:hidden" style="width: 48px;"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <transition @enter="sectionEnter" @leave="sectionLeave">
        <section id="faq" class="py-20 bg-black">
          <div class="container mx-auto px-4">
            <SectionTitle>
              <template #title>Frequently Asked Questions</template>
              <template #subtitle>Got questions? We've got answers.</template>
            </SectionTitle>
            <div class="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
              <div
                v-for="n in 6"
                :key="n"
                class="faq-item border rounded-lg p-6 shadow-violet-700 hover:shadow-sm transition-all duration-300 cursor-pointer"
                @click="toggleFAQ(n)"
              >
                <header class="flex justify-between items-center">
                  <h3 class="text-lg font-medium text-white">
                    {{
                      [
                        "How does OnService.AI differ from other AI assistants?",
                        "Can I integrate OnService.AI with my existing tools?",
                        "Is my data secure with OnService.AI?",
                        "What happens if I exceed my message limit?",
                        "Can I use OnService.AI offline?",
                        "How do I cancel my subscription?",
                      ][n - 1]
                    }}
                  </h3>
                  <img
                    src="/arrow.svg"
                    alt="Toggle"
                    class="w-5 h-5 text-white transition-transform duration-300"
                    :class="{ 'rotate-180': questions[n] }"
                  />
                </header>

                <!-- loader de 3 puntitos -->
                <div
                  v-if="loading[n]"
                  class="faq-loader flex items-center justify-center mt-4 h-6"
                >
                  <span
                    class="dot mx-1 inline-block w-2 h-2 bg-white rounded-full"
                  ></span>
                  <span
                    class="dot mx-1 inline-block w-2 h-2 bg-white rounded-full"
                  ></span>
                  <span
                    class="dot mx-1 inline-block w-2 h-2 bg-white rounded-full"
                  ></span>
                </div>

                <!-- Transition GSAP -->
                <transition @enter="faqEnter" @leave="faqLeave">
                  <p
                    v-show="questions[n]"
                    class="text-muted-foreground mt-4 overflow-hidden"
                  >
                    {{
                      [
                        "OnService.AI uses a proprietary language model specifically trained to understand context better and provide more natural, helpful responses. It also learns from your interactions to become more personalized over time.",
                        "Yes! OnService.AI offers API access on our Enterprise plan, allowing you to integrate it with your existing workflows, apps, and services. We also offer pre-built integrations with popular platforms.",
                        "Absolutely. We use end-to-end encryption for all conversations, and your data is never used to train our models without your explicit permission. We also offer enterprise-grade security features for businesses.",
                        "On the Free plan, once you reach your daily limit, you'll need to wait until the next day to send more messages. You can also upgrade to the Pro plan for unlimited messages at any time.",
                        "The Pro and Enterprise plans include desktop and mobile apps that can function with limited capabilities while offline. Full functionality requires an internet connection.",
                        "You can cancel your subscription at any time from your account settings. If you cancel, you'll still have access to your plan until the end of your current billing period.",
                      ][n - 1]
                    }}
                  </p>
                </transition>
              </div>
            </div>
          </div>
        </section>
      </transition>

      <!-- CTA Section -->
      <transition @enter="sectionEnter" @leave="sectionLeave">
        <section
          class="cta-section relative overflow-hidden bg-gradient-to-br from-[#1b0c34] via-[#2d0e59] to-[#381171] px-8 py-24 md:py-32 text-center"
        >
          <div
            class="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-purple-500/40 blur-3xl"
          ></div>
          <div
            class="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-violet-600/30 blur-3xl"
          ></div>
          <SectionTitle>
            <template #title>Ready to experience the future of AI chat?</template>
            <template #subtitle>
              Join thousands of users already boosting their customer service with OnService.AI.
            </template>
          </SectionTitle>
          <div class="mt-8 inline-block">
            <ButtonAnimate />
          </div>
        </section>
      </transition>
    </main>
    <!-- back to top -->
    <transition
      @enter="backToTopEnter"
      @leave="backToTopLeave"
    >
      <div
        v-if="showScrollTop"
        ref="scrollBtn"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-violet-600 shadow-xl hover:bg-violet-700 scroll-to-top-btn transition-all duration-300 hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </div>
    </transition>

    <footer class="bg-[#09090b] text-gray-400 pt-16 pb-10">
      <div class="container mx-auto px-4">
        <!-- 3 columnas: Logo/Descripción – Quick Links – Contacto -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Columna 1: Logo + Descripción + Terminos/Privacidad -->
          <div class="flex flex-col items-center md:items-start">
            <img src="/logo.png" alt="OnService.AI" class="h-10 mb-4" />
            <p class="text-sm text-center md:text-left mb-4">
              The next generation of AI chat assistants, designed to help you
              achieve more.
            </p>
            <div
              class="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4"
            >
              <a href="/privacy" class="hover:text-white text-sm"
                >Privacy Policy</a
              >
              <a href="/terms" class="hover:text-white text-sm"
                >Terms of Service</a
              >
            </div>
          </div>

          <!-- Columna 2: Quick Links -->
          <div class="flex flex-col items-center">
            <h4 class="text-white font-semibold mb-4">Quick Links</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#features" class="hover:text-white">Features</a></li>
              <li><a href="#faq" class="hover:text-white">FAQ</a></li>
              <li><a href="#pricing" class="hover:text-white">Pricing</a></li>
              <li>
                <a href="#demo" class="hover:text-white">Schedule a Demo</a>
              </li>
            </ul>
          </div>

          <!-- Columna 3: Contacto -->
          <div class="flex flex-col items-center md:items-end">
            <h4 class="text-white font-semibold mb-4">Contact Us</h4>
            <p class="text-sm mb-2">
              Email:
              <a href="mailto:hello@onservice.ai" class="hover:text-white">
                hello@onservice.ai
              </a>
            </p>
            <p class="text-sm mb-2">
              Phone:
              <a href="tel:+5491130261625" class="hover:text-white">
                +54 9 11 3026 1625
              </a>
            </p>
            <p class="text-sm text-center md:text-right">
              16192 Coastal Highway<br />
              Lewes, DE 19958
            </p>
          </div>
        </div>

        <!-- Divider -->
        <div class="mt-12 border-t border-white/10"></div>

        <!-- Bottom row: copyright + compañía + redes -->
        <div
          class="mt-6 flex flex-col md:flex-row items-center justify-between text-xs space-y-2 md:space-y-0"
        >
          <p>
            © {{ new Date().getFullYear() }} OnService.AI. All rights reserved.
          </p>
          <p>AI Travel Technologies Inc.</p>
          <div class="flex space-x-4">
            <a
              href="https://linkedin.com/company/onservice"
              class="hover:text-white"
              >LinkedIn</a
            >
            <a href="https://twitter.com/onservice" class="hover:text-white"
              >Twitter</a
            >
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script></script>

<style>
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;

  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;

  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;

  --primary: 262.1 83.3% 57.8%;
  --primary-foreground: 210 40% 98%;

  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;

  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;

  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;

  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;

  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;

  --radius: 0.5rem;
}

.dark {
  --background: 0 0 0;
  --foreground: 210 40% 98%;

  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;

  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;

  --primary: 262.1 83.3% 57.8%;
  --primary-foreground: 210 40% 98%;

  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;

  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;

  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;

  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;

  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 212.7 26.8% 83.9%;
}

* {
  border-color: hsl(var(--border));
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  font-feature-settings: "rlig" 1, "calt" 1;
}

.bg-background {
  background-color: hsl(var(--background));
}

.bg-card {
  background-color: hsl(var(--card));
}

.bg-primary {
  background-color: hsl(var(--primary));
}

.bg-muted {
  background-color: hsl(var(--muted));
}

.text-primary {
  color: hsl(var(--primary));
}

.text-primary-foreground {
  color: hsl(var(--primary-foreground));
}

.text-muted-foreground {
  color: hsl(var(--muted-foreground));
}

.border-primary {
  border-color: hsl(var(--primary));
}

.container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
}

@media (min-width: 1400px) {
  .container {
    max-width: 1400px;
  }
}

html {
  scroll-behavior: smooth;
}

section {
  position: relative;
}
section:not(:first-child):not(:last-child)::before {
  content: "";
  height: 1px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: linear-gradient(
    90deg,
    #1e1e1e 0%,
    #7c3aed 60%,
    #1e1e1e 100%
  );
}

@keyframes blink {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
}

.faq-loader .dot {
  opacity: 0.2;
  animation: blink 1s infinite ease-in-out;
}

.faq-loader .dot:nth-child(1) {
  animation-delay: 0s;
}
.faq-loader .dot:nth-child(2) {
  animation-delay: 0.2s;
}
.faq-loader .dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-1220px);
  }
}

.scroll-container {
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
}

.scroll-content {
  display: flex;
  animation: scroll 10s linear infinite;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.feature-card {
  transition: all 0.3s ease;
  border: 1px solid rgba(139, 92, 246, 0.1);
}

.feature-card:hover {
  border-color: rgba(139, 92, 246, 0.3);
  box-shadow: 
    0 4px 20px rgba(124, 58, 237, 0.3),
    0 0 0 1px rgba(139, 92, 246, 0.1);
}

.faq-loader .dot {
  opacity: 0.2;
}

/* Partículas flotantes */
.floating-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: linear-gradient(45deg, #8b5cf6, #a855f7);
  border-radius: 50%;
  opacity: 0.6;
  animation: float 6s ease-in-out infinite;
}

.particle-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
  animation-duration: 8s;
}

.particle-2 {
  top: 60%;
  left: 80%;
  animation-delay: 2s;
  animation-duration: 10s;
}

.particle-3 {
  top: 80%;
  left: 20%;
  animation-delay: 4s;
  animation-duration: 7s;
}

.particle-4 {
  top: 30%;
  left: 70%;
  animation-delay: 1s;
  animation-duration: 9s;
}

.particle-5 {
  top: 70%;
  left: 60%;
  animation-delay: 3s;
  animation-duration: 6s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
    opacity: 0.6;
  }
  25% {
    transform: translateY(-20px) translateX(10px);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-10px) translateX(-5px);
    opacity: 0.4;
  }
  75% {
    transform: translateY(-30px) translateX(15px);
    opacity: 0.9;
  }
}

/* Gradiente radial */
.bg-gradient-radial {
  background: radial-gradient(circle at center, var(--tw-gradient-stops));
}

/* Efecto de typing mejorado */
.typing {
  position: relative;
}

/* Mejoras en el scroll to top */
.scroll-to-top-btn {
  backdrop-filter: blur(10px);
  border: 1px solid rgba(139, 92, 246, 0.2);
  background-color: #7c3aed; /* bg-violet-600 */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, box-shadow;
}
.scroll-to-top-btn:hover {
  background-color: #6d28d9; /* bg-violet-700 */
  box-shadow: 0 12px 40px rgba(139, 92, 246, 0.4);
  transform: translateY(-2px) scale(1.05);
}
.scroll-to-top-btn:active {
  transform: translateY(0) scale(0.95);
  transition: all 0.1s ease;
}

/* Efecto de pulso sutil */
.scroll-to-top-btn::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(168, 85, 247, 0.3));
  border-radius: 50%;
  z-index: -1;
  opacity: 0;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.1);
  }
  100% {
    opacity: 0;
    transform: scale(1.2);
  }
}

/* Animaciones de entrada mejoradas */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-in-up {
  animation: slideInUp 0.6s ease-out;
}

/* Efecto de glassmorphism para el header */
.glass-header {
  backdrop-filter: blur(20px);
  background: rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid rgba(139, 92, 246, 0.1);
}

/* Team horizontal scroll styles */
.team-horizontal-scroll {
  position: relative;
  width: 100vw;
  max-width: 100vw;
  overflow-x: hidden;
  min-height: 500px;
}
.team-panel-track {
  display: flex;
  will-change: transform;
}
.team-panel-slide {
  min-width: 100vw;
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: visible;
}
.team-panel-slide::-webkit-scrollbar {
  display: none;
}
.team-panel-slide {
  scrollbar-width: none;
}
.avatar svg {
  animation: avatar-bounce 2.2s infinite cubic-bezier(.68,-0.55,.27,1.55);
}
@keyframes avatar-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

/* Team member card styles */
.team-member-card {
  background: rgba(24, 24, 27, 0.95);
  box-shadow: 0 4px 32px 0 rgba(124, 58, 237, 0.08);
  border: 1.5px solid rgba(139, 92, 246, 0.15);
  min-height: 420px;
  min-width: 0;
  transition: box-shadow 0.3s, border 0.3s;
}
.team-member-card:hover {
  box-shadow: 0 8px 40px 0 rgba(124, 58, 237, 0.18);
  border-color: #a78bfa;
}
@media (min-width: 768px) {
  .team-panel-slide > .flex {
    flex-direction: row;
    gap: 2rem;
  }
}
@media (max-width: 767px) {
  .team-panel-slide > .flex {
    flex-direction: column;
    gap: 2rem;
  }
  .team-member-card {
    max-width: 90vw;
    min-width: 0;
  }
}

@keyframes scroll-x {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-scroll-x {
  animation: scroll-x 24s linear infinite;
}

.team-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  background: rgba(124, 58, 237, 0.18);
  color: #fff;
  border: none;
  border-radius: 9999px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px 0 rgba(124, 58, 237, 0.12);
  opacity: 0.5;
  transition: opacity 0.2s, background 0.2s, box-shadow 0.2s;
}
.team-nav-btn:hover {
  opacity: 1;
  background: rgba(124, 58, 237, 0.35);
  box-shadow: 0 4px 24px 0 rgba(124, 58, 237, 0.18);
}
</style>
