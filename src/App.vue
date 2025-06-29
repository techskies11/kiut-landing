<script setup>
import { ref, nextTick, computed, Transition, watch, onMounted, onBeforeUnmount } from "vue";
import Header from "./components/Header.vue";
import CircuitBackground from "./components/CircuitBackground.vue";
import CodePromptBlock from "./components/CodePromptBlock.vue";
import AgentResponseBlock from "./components/AgentResponseBlock.vue";

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

// Ejemplos sincronizados para prompts y respuestas
const prompts = {
  airline: {
    label: 'Aerolínea',
    examples: [
      [
        '✈️ # System Prompt',
        'Eres AeroBot, tu asistente virtual de aerolíneas.',
        'Tono cordial y profesional.',
        'Responde en español claro.',
        'Ayuda con reservas, check-in y vuelos.',
        '# Ejemplo',
        '$ User: "¿Puedo cambiar mi vuelo?"'
      ],
      [
        '🛫 # System Prompt',
        'Hola, soy AeroBot, asistente digital de la aerolínea.',
        'Responde con amabilidad y precisión.',
        'Brinda información sobre equipaje y reservas.',
        '# Ejemplo',
        '$ User: "¿Cuánto equipaje puedo llevar en cabina?"'
      ],
      [
        '✈️ # System Prompt',
        'AeroBot, asistente de vuelos.',
        'Tono profesional y empático.',
        'Responde dudas sobre horarios y servicios.',
        '# Ejemplo',
        '$ User: "¿El vuelo AM123 está demorado?"'
      ],
      [
        '🛬 # System Prompt',
        'Eres AeroBot, experto en atención al pasajero.',
        'Responde en español neutro.',
        'Ayuda con selección de asientos y embarque.',
        '# Ejemplo',
        '$ User: "¿Puedo seleccionar mi asiento online?"'
      ],
      [
        '✈️ # System Prompt',
        'AeroBot, asistente de aerolínea.',
        'Tono cercano y resolutivo.',
        'Brinda soporte para servicios especiales.',
        '# Ejemplo',
        '$ User: "¿Cómo solicito asistencia especial para mi vuelo?"'
      ]
    ]
  },
  travel: {
    label: 'Viajes',
    examples: [
      [
        '🌍 # System Prompt',
        'Eres TravelGuru, experto en viajes internacionales.',
        'Tono amigable y claro.',
        'Recomienda destinos y tips de viaje.',
        '# Ejemplo',
        '$ User: "¿Necesito visa para viajar a Brasil?"'
      ],
      [
        '🧳 # System Prompt',
        'TravelGuru, tu asesor de vacaciones.',
        'Tono cercano y entusiasta.',
        'Sugiere destinos y actividades.',
        '# Ejemplo',
        '$ User: "¿Qué destino recomendás para vacaciones en invierno?"'
      ],
      [
        '🌏 # System Prompt',
        'Eres TravelGuru, guía de viajes.',
        'Tono informativo y cordial.',
        'Ayuda a reservar tours y excursiones.',
        '# Ejemplo',
        '$ User: "¿Cómo reservo un tour en París?"'
      ],
      [
        '🗾 # System Prompt',
        'TravelGuru, experto en cultura y turismo.',
        'Tono claro y detallista.',
        'Responde sobre mejores épocas para viajar.',
        '# Ejemplo',
        '$ User: "¿Cuál es la mejor época para visitar Japón?"'
      ],
      [
        '🚗 # System Prompt',
        'Eres TravelGuru, asistente de viajes.',
        'Tono práctico y directo.',
        'Brinda información sobre alquiler de autos.',
        '# Ejemplo',
        '$ User: "¿Qué documentos necesito para alquilar un auto en Europa?"'
      ]
    ]
  },
  it: {
    label: 'Soporte IT',
    examples: [
      [
        '💻 # System Prompt',
        'Eres ITBot, soporte técnico de la empresa.',
        'Tono técnico y resolutivo.',
        'Ayuda con acceso a sistemas y correo.',
        '# Ejemplo',
        '$ User: "No puedo acceder a mi correo corporativo."'
      ],
      [
        '🔒 # System Prompt',
        'ITBot, tu asistente de tecnología.',
        'Tono profesional y paciente.',
        'Guía para configurar VPN y acceso remoto.',
        '# Ejemplo',
        '$ User: "¿Cómo configuro la VPN en mi laptop?"'
      ],
      [
        '🖥️ # System Prompt',
        'Eres ITBot, experto en soporte digital.',
        'Tono claro y directo.',
        'Responde sobre sistemas y tickets.',
        '# Ejemplo',
        '$ User: "¿El sistema de tickets está caído?"'
      ],
      [
        '🔑 # System Prompt',
        'ITBot, asistente de soporte.',
        'Tono resolutivo y cordial.',
        'Ayuda a restablecer contraseñas.',
        '# Ejemplo',
        '$ User: "¿Cómo restablezco mi contraseña?"'
      ],
      [
        '💾 # System Prompt',
        'Eres ITBot, soporte informático.',
        'Tono técnico y claro.',
        'Brinda ayuda sobre instalaciones de software.',
        '# Ejemplo',
        '$ User: "¿Puedo instalar software en mi equipo?"'
      ]
    ]
  }
};

const agentResponses = {
  airline: [
    [
      'User: "¿Puedo cambiar mi vuelo?"',
      'Agent: "¡Por supuesto! ¿Podrías indicarme tu número de reserva?"',
      'User: "Es 123456."',
      'Agent: "Gracias. Verificando... Tu tarifa permite un cambio con costo adicional. ¿Deseas continuar?"'
    ],
    [
      'User: "¿Cuánto equipaje puedo llevar en cabina?"',
      'Agent: "Puedes llevar una pieza de hasta 10kg en cabina. ¿Te gustaría saber sobre equipaje en bodega?"'
    ],
    [
      'User: "¿El vuelo AM123 está demorado?"',
      'Agent: "El vuelo AM123 está programado para salir a tiempo. ¿Necesitas información de la puerta de embarque?"'
    ],
    [
      'User: "¿Puedo seleccionar mi asiento online?"',
      'Agent: "Sí, puedes seleccionar tu asiento desde la web o la app hasta 24h antes del vuelo."'
    ],
    [
      'User: "¿Cómo solicito asistencia especial para mi vuelo?"',
      'Agent: "Claro, puedo ayudarte a solicitar asistencia especial. ¿Requieres silla de ruedas o asistencia en el embarque?"'
    ]
  ],
  travel: [
    [
      'User: "¿Necesito visa para viajar a Brasil?"',
      'Agent: "No necesitas visa para viajes turísticos menores a 90 días si eres ciudadano argentino."'
    ],
    [
      'User: "¿Qué destino recomendás para vacaciones en invierno?"',
      'Agent: "Bariloche es ideal para esquí y paisajes nevados. ¿Te gustaría info de hoteles o actividades?"'
    ],
    [
      'User: "¿Cómo reservo un tour en París?"',
      'Agent: "Puedo ayudarte a reservar tours en París. ¿Prefieres museos, gastronomía o paseos guiados?"'
    ],
    [
      'User: "¿Cuál es la mejor época para visitar Japón?"',
      'Agent: "La primavera (marzo-abril) es famosa por los cerezos en flor. ¿Te gustaría recomendaciones de ciudades?"'
    ],
    [
      'User: "¿Qué documentos necesito para alquilar un auto en Europa?"',
      'Agent: "Necesitarás tu pasaporte, licencia de conducir internacional y una tarjeta de crédito."'
    ]
  ],
  it: [
    [
      'User: "No puedo acceder a mi correo corporativo."',
      'Agent: "¿Recibes algún mensaje de error al intentar ingresar?"',
      'User: "Sí, dice contraseña incorrecta."',
      'Agent: "Te ayudo a restablecerla. ¿Prefieres recibir el enlace por email o SMS?"'
    ],
    [
      'User: "¿Cómo configuro la VPN en mi laptop?"',
      'Agent: "Debes descargar el cliente VPN desde el portal interno y seguir la guía paso a paso. ¿Te la envío?"'
    ],
    [
      'User: "¿El sistema de tickets está caído?"',
      'Agent: "No se reportan incidentes. ¿Qué error ves al intentar ingresar?"'
    ],
    [
      'User: "¿Cómo restablezco mi contraseña?"',
      'Agent: "Puedes restablecerla desde el portal de autoservicio o te envío un enlace. ¿Qué prefieres?"'
    ],
    [
      'User: "¿Puedo instalar software en mi equipo?"',
      'Agent: "Depende del software. ¿Cuál necesitas instalar? Te ayudo con el proceso o la autorización."'
    ]
  ]
};

const agentTab = ref('airline');
const promptTyping = ref(true);
const responseTyping = ref(true);
const currentExampleIdx = ref(0);

// --- AUTOAVANCE DE EJEMPLO ---
const autoAdvanceTimeout = ref(null);
const showPromptAndResponse = ref(true);

watch([
  promptTyping,
  responseTyping,
  agentTab,
  currentExampleIdx
], ([isPromptTyping, isResponseTyping, tab, idx], [oldPrompt, oldResponse, oldTab, oldIdx]) => {
  clearTimeout(autoAdvanceTimeout.value);
  // Solo avanza si ambas animaciones terminaron y hay más ejemplos
  if (!isPromptTyping && !isResponseTyping && prompts[tab].examples.length > 1) {
    autoAdvanceTimeout.value = setTimeout(() => {
      if (!promptTyping.value && !responseTyping.value && agentTab.value === tab) {
        // No ocultar los bloques antes del cambio, solo avanzar el ejemplo
        currentExampleIdx.value = (currentExampleIdx.value + 1) % prompts[tab].examples.length;
      }
    }, 4000); // 4 segundos de espera
  }
});

function onPromptTyping(val) {
  promptTyping.value = val;
}

function onResponseTyping(val) {
  responseTyping.value = val;
}

function onTabChange(tab) {
  agentTab.value = tab;
  currentExampleIdx.value = 0;
}

const promptBlockHeight = ref(null);
const promptBlockRef = ref(null);

function updatePromptBlockHeight() {
  if (promptBlockRef.value) {
    promptBlockHeight.value = promptBlockRef.value.offsetHeight;
  }
}

onMounted(() => {
  // typeEffect(); // Si no se usa, eliminar también esta línea
  // Elimino gsap y cualquier animación vieja
});

watch([
  () => agentTab.value,
  () => currentExampleIdx.value,
  promptTyping,
], () => {
  nextTick(() => {
    updatePromptBlockHeight();
  });
});

onMounted(() => {
  // typeEffect(); // Si no se usa, eliminar también esta línea
  // Elimino gsap y cualquier animación vieja
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
    <Header />
    <main class="flex-1 bg-black pt-24 md:pt-28">
      <!-- HERO con fondo animado tipo circuito -->
      <section id="hero" class="relative w-full flex flex-col md:flex-row items-start justify-center px-4 md:px-10 py-28 gap-8 bg-black overflow-hidden min-h-[600px]">
        <CircuitBackground class="absolute inset-0 w-full h-full pointer-events-none z-0" />
        <div class="flex-1 flex flex-col items-start justify-center max-w-2xl z-10 min-w-[320px] md:min-w-[420px]">
          <div class="glass-hero-panel mx-auto px-6 py-8 md:px-10 md:py-10 rounded-2xl shadow-lg border border-white/10 backdrop-blur-md bg-black/40 w-full max-w-xl flex flex-col items-center text-center">
            <h1 class="text-4xl md:text-6xl font-bold text-white leading-tight">
              La nueva generación de <span class="text-violet-400">IA</span> para tu empresa
            </h1>
            <p class="text-lg md:text-xl text-gray-300 my-14">
              Soluciones de inteligencia artificial para potenciar ventas, soporte y operaciones.
            </p>
            <div class="flex gap-4 mb-2 justify-center w-full">
              <a href="#contact" class="px-8 py-3.5 rounded-xl font-semibold shadow-lg border-0 focus:outline-none focus:ring-2 focus:ring-violet-400 btn-contacto-gradient text-base min-w-[170px] text-center">Solicitar demo</a>
              <a href="https://playground.kiut.ai" target="_blank" rel="noopener" class="px-8 py-3.5 rounded-xl font-semibold border border-violet-500 text-violet-200 bg-black/60 hover:bg-violet-900/20 transition text-base min-w-[170px] text-center">Probar playground</a>
            </div>
          </div>
        </div>
        <div class="flex-1 flex flex-col items-start justify-center w-full max-w-xl z-10 min-w-[320px] md:min-w-[420px]">
          <div class="prompt-chat-stack" style="gap: 2rem; align-items: stretch; width: 100%; max-width: 560px; margin: 0 auto;">
            <div ref="promptBlockRef" style="width: 100%;">
              <CodePromptBlock
                :tab="agentTab"
                :example-idx="currentExampleIdx"
                :prompts="prompts"
                @tab-change="onTabChange"
                @typing="onPromptTyping"
              />
            </div>
            <Transition name="fade-slide">
              <AgentResponseBlock
                v-if="!promptTyping"
                class="w-full"
                :responses="agentResponses[agentTab]"
                :typing="true"
                :tab="agentTab"
                :example-idx="currentExampleIdx"
                @typing="onResponseTyping"
                :sync-height="promptBlockHeight"
              />
            </Transition>
          </div>
        </div>
      </section>

      <!-- Clientes -->
      <section id="clients" class="py-20 bg-black">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-8">Confían en nosotros</h2>
          <!-- Logos de clientes (dummy) -->
          <div class="flex flex-wrap justify-center items-center gap-10 opacity-80">
            <img src="/aeromexico.png" alt="Aeromexico" class="h-12" />
            <img src="/avianca.png" alt="Avianca" class="h-12" />
            <img src="/clic.png" alt="Clic" class="h-12" />
            <img src="/vite.svg" alt="Vite" class="h-12" />
            <img src="/logo.png" alt="OnService" class="h-12" />
          </div>
        </div>
      </section>

      <!-- Tecnologías IA -->
      <section id="ai-tech" class="py-20 bg-gradient-to-b from-black via-[#18181b] to-black">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-8">Tecnologías de IA</h2>
          <div class="flex flex-wrap justify-center gap-6">
            <span class="px-6 py-3 rounded-xl bg-violet-700/20 text-violet-300 font-semibold text-lg">GPT-4</span>
            <span class="px-6 py-3 rounded-xl bg-violet-700/20 text-violet-300 font-semibold text-lg">Stable Diffusion</span>
            <span class="px-6 py-3 rounded-xl bg-violet-700/20 text-violet-300 font-semibold text-lg">LangChain</span>
            <span class="px-6 py-3 rounded-xl bg-violet-700/20 text-violet-300 font-semibold text-lg">RAG</span>
            <span class="px-6 py-3 rounded-xl bg-violet-700/20 text-violet-300 font-semibold text-lg">Whisper</span>
          </div>
        </div>
      </section>

      <!-- Casos de uso -->
      <section id="usecases" class="py-20 bg-black">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Casos de uso</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="rounded-2xl bg-[#18181b] p-8 shadow-lg text-white">
              <h3 class="text-xl font-semibold mb-2">Soporte automatizado 24/7</h3>
              <p class="text-gray-300">Responde consultas de clientes en tiempo real, en cualquier canal.</p>
            </div>
            <div class="rounded-2xl bg-[#18181b] p-8 shadow-lg text-white">
              <h3 class="text-xl font-semibold mb-2">Ventas asistidas por IA</h3>
              <p class="text-gray-300">Detecta oportunidades y sugiere productos en el momento justo.</p>
            </div>
            <div class="rounded-2xl bg-[#18181b] p-8 shadow-lg text-white">
              <h3 class="text-xl font-semibold mb-2">Automatización de procesos</h3>
              <p class="text-gray-300">Reduce tareas repetitivas y mejora la eficiencia operativa.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Métricas -->
      <section id="metrics" class="py-20 bg-gradient-to-b from-black via-[#18181b] to-black">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-8">Resultados en números</h2>
          <div class="flex flex-wrap justify-center gap-12">
            <div class="flex flex-col items-center">
              <span class="text-5xl font-bold text-violet-400">+98%</span>
              <span class="text-gray-300 mt-2">Satisfacción de clientes</span>
            </div>
            <div class="flex flex-col items-center">
              <span class="text-5xl font-bold text-violet-400">-40%</span>
              <span class="text-gray-300 mt-2">Costos operativos</span>
            </div>
            <div class="flex flex-col items-center">
              <span class="text-5xl font-bold text-violet-400">+3x</span>
              <span class="text-gray-300 mt-2">Ventas por canal digital</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Pricing (sin precios) -->
      <section id="pricing" class="py-20 bg-black">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-8">Planes y características</h2>
          <div class="flex flex-wrap justify-center gap-8">
            <div class="rounded-2xl bg-[#18181b] p-10 shadow-lg text-white max-w-xs w-full flex flex-col items-center">
              <h3 class="text-xl font-semibold mb-4">Starter</h3>
              <ul class="text-gray-300 text-left mb-6 space-y-2">
                <li>✔️ Chatbot IA multicanal</li>
                <li>✔️ Integración básica</li>
                <li>✔️ Soporte por email</li>
              </ul>
              <button class="px-6 py-2 rounded-xl bg-violet-600 text-white font-semibold shadow-lg hover:bg-violet-700 transition-all duration-300">Solicitar info</button>
            </div>
            <div class="rounded-2xl bg-[#18181b] p-10 shadow-lg text-white max-w-xs w-full flex flex-col items-center border-2 border-violet-600">
              <h3 class="text-xl font-semibold mb-4">Pro</h3>
              <ul class="text-gray-300 text-left mb-6 space-y-2">
                <li>✔️ Todo lo de Starter</li>
                <li>✔️ Integraciones avanzadas</li>
                <li>✔️ Soporte prioritario</li>
                <li>✔️ Analítica avanzada</li>
              </ul>
              <button class="px-6 py-2 rounded-xl bg-violet-600 text-white font-semibold shadow-lg hover:bg-violet-700 transition-all duration-300">Solicitar info</button>
            </div>
            <div class="rounded-2xl bg-[#18181b] p-10 shadow-lg text-white max-w-xs w-full flex flex-col items-center">
              <h3 class="text-xl font-semibold mb-4">Enterprise</h3>
              <ul class="text-gray-300 text-left mb-6 space-y-2">
                <li>✔️ Todo lo de Pro</li>
                <li>✔️ Integraciones personalizadas</li>
                <li>✔️ SLA dedicado</li>
                <li>✔️ Consultoría IA</li>
              </ul>
              <button class="px-6 py-2 rounded-xl bg-violet-600 text-white font-semibold shadow-lg hover:bg-violet-700 transition-all duration-300">Solicitar info</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Equipo (dummy, como antes) -->
      <section id="team" class="py-20 bg-gradient-to-b from-black via-[#18181b] to-black">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-8">Nuestro equipo</h2>
          <div class="flex flex-wrap justify-center gap-8">
            <div v-for="i in 6" :key="i" class="rounded-2xl bg-[#18181b] p-8 shadow-lg text-white max-w-xs w-full flex flex-col items-center">
              <div class="w-24 h-24 rounded-full bg-violet-700 mb-4"></div>
              <h3 class="text-xl font-semibold mb-1">Nombre Apellido</h3>
              <p class="text-violet-400 font-semibold mb-2">Rol</p>
              <p class="text-gray-300 text-center">Breve descripción del integrante del equipo y su aporte.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Imágenes IA (dummy) -->
      <section id="ia-images" class="py-20 bg-black">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-8">Imágenes generadas por IA</h2>
          <div class="flex flex-wrap justify-center gap-8">
            <img src="https://placehold.co/400x300?text=IA+Image+1" alt="IA 1" class="rounded-2xl shadow-lg w-64 h-40 object-cover" />
            <img src="https://placehold.co/400x300?text=IA+Image+2" alt="IA 2" class="rounded-2xl shadow-lg w-64 h-40 object-cover" />
            <img src="https://placehold.co/400x300?text=IA+Image+3" alt="IA 3" class="rounded-2xl shadow-lg w-64 h-40 object-cover" />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

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

.glass-hero-panel {
  background: rgba(17, 18, 28, 0.40);
  backdrop-filter: blur(8px) saturate(1.1);
  -webkit-backdrop-filter: blur(8px) saturate(1.1);
  border: 1.5px solid rgba(139, 92, 246, 0.10);
  box-shadow: 0 4px 24px 0 rgba(124, 58, 237, 0.08);
  z-index: 10;
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.4s, transform 0.4s;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(24px);
}
.fade-slide-enter-to, .fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.prompt-chat-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
}
.code-block-container,
.agent-chat-outer-glass {
  min-width: 320px;
  max-width: 520px;
  width: 100%;
  min-height: 340px;
  height: 340px;
  margin: 0;
  padding: 0;
}
.agent-chat-glass.glass-hero-panel {
  justify-content: flex-start !important;
  padding-bottom: 1.1rem !important;
}
</style>
