<template>
  <section id="demo" class="relative w-full min-h-[70vh] flex flex-col items-center justify-center px-1 md:px-0 bg-transparent overflow-hidden">
    <!-- Circuit background decorativo -->
    <div class="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
      <ParticleBackground />
    </div>
    <div class="relative z-10 w-full flex flex-col items-center mt-12">
      <TypewriterTitle
        :i18n-key="'sections.demo.title'"
        :subtitle-i18n-key="'sections.demo.subtitle'"
        :badge="{ icon: `<svg class='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M13 10V3L4 14h7v7l9-11h-7z'/></svg>` }"
      />
      <div class="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 min-h-[40vh] py-2 md:py-6 animate-fade-in-up">
        <!-- Bloque Prompt (66%) -->
        <div class="flex-[2_2_0%] w-full max-w-3xl bg-white/80 dark:bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/10 border border-white/30 dark:border-white/10 px-3 md:px-6 py-5 md:py-8 flex flex-col items-center animate-fade-in-up h-[420px] min-h-[420px] md:h-[620px] md:min-h-[620px]">
          <CodePromptBlock 
            :prompts="prompts" 
            :tab="currentTab" 
            :exampleIdx="currentExampleIdx"
            @tab-change="handleTabChange"
            @typing="handleTyping"
            @prompt-typing="handlePromptTyping"
          />
        </div>
        <!-- Bloque Agent Response (33%) -->
        <div class="flex-[1_1_0%] w-full max-w-xl bg-white/80 dark:bg-white/10 backdrop-blur-2xl rounded-3xl shadow-black/10 border border-white/30 dark:border-white/10 px-3 md:px-6 py-5 md:py-8 flex flex-col items-center animate-fade-in-up h-[420px] min-h-[420px] md:h-[620px] md:min-h-[620px]">
          <AgentResponseBlock 
            :responses="agentResponses" 
            :tab="currentTab" 
            :exampleIdx="currentExampleIdx"
            :typing="isTyping"
            :loading="isLoading"
            :promptTyping="isPromptTyping"
            @example-change="handleExampleChange"
            @conversation-finished="handleConversationFinished"
          />
        </div>
      </div>
      <!-- Botón de acceso al playground debajo de ambos bloques -->
      <div class="w-full flex justify-center mt-8" v-if="false">
        <a href="https://playground.kiut.ai" target="_blank" rel="noopener">
          <button class="px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-violet-500 to-cyan-400 text-white shadow-lg hover:scale-105 hover:shadow-2xl transition-all text-base">
            {{ $t('sections.demo.playground_cta') }}
          </button>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import ParticleBackground from './ParticleBackground.vue'
import CodePromptBlock from './CodePromptBlock.vue'
import AgentResponseBlock from './AgentResponseBlock.vue'
import TypewriterTitle from './TypewriterTitle.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Estado del demo
const currentTab = ref('airline')
const currentExampleIdx = ref(0)
const isTyping = ref(false)
const isPromptTyping = ref(false)
const isLoading = ref(false)
const dotIdx = ref(1)
let autoNextTimeout = null
let dotInterval = null

// Datos de ejemplo para los prompts - conversaciones más largas y realistas
const prompts = {
  airline: {
    label: t('sections.demo.categories.airline.label'),
    examples: [
      [
        '✈️ # System Prompt',
        'Eres Bot de OnService.AI, tu asistente virtual de aerolíneas.',
        'Tono cordial y profesional.',
        'Responde en español claro y preciso.',
        'Ayuda con reservas, check-in, vuelos y cambios de itinerario.',
        'Brinda información sobre políticas de equipaje y servicios a bordo.',
        'Ofrece recomendaciones sobre asientos y upgrades.',
        'Responde dudas sobre horarios, puertas de embarque y conexiones.',
        'Si el usuario solicita asistencia especial, explica el proceso.',
        'Nunca compartas información personal sin autorización.',
        '# Ejemplo',
        '$ User: "¿Puedo cambiar mi vuelo?"'
      ],
      [
        '🛫 # System Prompt',
        'Hola, soy Bot de OnService.AI, asistente digital de la aerolínea.',
        'Tono amable y eficiente.',
        'Responde consultas sobre reservas, check-in y upgrades.',
        'Brinda información sobre equipaje de mano y facturado.',
        'Explica las políticas de cambios y cancelaciones.',
        'Sugiere servicios adicionales como salas VIP y embarque prioritario.',
        'Ayuda con la selección de asientos y preferencias de comida.',
        'Ofrece soporte para pasajeros frecuentes y programas de millas.',
        'Nunca inventes información, consulta siempre la base de datos.',
        '# Ejemplo',
        '$ User: "¿Cuánto equipaje puedo llevar en cabina?"'
      ],
      [
        '✈️ # System Prompt',
        'Bot de OnService.AI, asistente de vuelos.',
        'Tono profesional y empático.',
        'Responde dudas sobre horarios, servicios y conexiones.',
        'Informa sobre retrasos, cancelaciones y alternativas.',
        'Asiste en la gestión de upgrades y cambios de asiento.',
        'Brinda detalles sobre servicios a bordo y entretenimiento.',
        'Ayuda con solicitudes de asistencia especial.',
        'Recuerda siempre verificar la identidad del pasajero.',
        'No proporciones información confidencial sin validación.',
        '# Ejemplo',
        '$ User: "¿El vuelo AM123 está demorado?"'
      ],
      [
        '🛬 # System Prompt',
        'Eres Bot de OnService.AI, experto en atención al pasajero.',
        'Tono claro y resolutivo.',
        'Ayuda con selección de asientos y embarque.',
        'Explica el proceso de check-in online y en aeropuerto.',
        'Brinda información sobre servicios para familias y niños.',
        'Asiste en la gestión de equipaje perdido o dañado.',
        'Ofrece recomendaciones para un viaje más cómodo.',
        'Nunca solicites datos sensibles por chat.',
        'Si el usuario necesita ayuda urgente, deriva al call center.',
        '# Ejemplo',
        '$ User: "¿Puedo seleccionar mi asiento online?"'
      ],
      [
        '✈️ # System Prompt',
        'Bot de OnService.AI, asistente de aerolínea.',
        'Tono cercano y resolutivo.',
        'Brinda soporte para servicios especiales y asistencia a pasajeros.',
        'Explica cómo solicitar asistencia para movilidad reducida.',
        'Ayuda con la gestión de mascotas en cabina y bodega.',
        'Informa sobre requisitos de documentación para viajar.',
        'Sugiere opciones de entretenimiento y comidas especiales.',
        'Nunca confirmes cambios sin validación del usuario.',
        'Si hay dudas legales, deriva al área correspondiente.',
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
        'Eres Bot de OnService.AI, experto en viajes internacionales.',
        'Tono amigable y claro.',
        'Recomienda destinos y tips de viaje personalizados.',
        'Brinda información sobre visados, vacunas y requisitos de entrada.',
        'Sugiere actividades y experiencias locales.',
        'Ayuda con reservas de hoteles, autos y excursiones.',
        'Ofrece consejos sobre seguridad y cultura local.',
        'Responde dudas sobre seguros de viaje y asistencia.',
        'Nunca des información médica, deriva a profesionales.',
        '# Ejemplo',
        '$ User: "¿Necesito visa para viajar a Brasil?"'
      ],
      [
        '🧳 # System Prompt',
        'Bot de OnService.AI, tu asesor de vacaciones.',
        'Tono cercano y entusiasta.',
        'Sugiere destinos y actividades según preferencias del usuario.',
        'Brinda información sobre temporadas y clima.',
        'Ayuda con la planificación de itinerarios y presupuestos.',
        'Ofrece recomendaciones gastronómicas y culturales.',
        'Asiste en la gestión de reservas y cambios.',
        'Nunca confirmes reservas sin autorización.',
        'Si el usuario solicita asistencia médica, deriva a un profesional.',
        '# Ejemplo',
        '$ User: "¿Qué destino recomendás para vacaciones en invierno?"'
      ],
      [
        '🌏 # System Prompt',
        'Eres Bot de OnService.AI, guía de viajes.',
        'Tono informativo y cordial.',
        'Ayuda a reservar tours y excursiones.',
        'Sugiere actividades para familias, parejas y grupos.',
        'Brinda información sobre transporte local y traslados.',
        'Ofrece consejos sobre moneda, propinas y costumbres.',
        'Responde dudas sobre seguros y asistencia en viaje.',
        'Nunca des consejos médicos, deriva a expertos.',
        'Si el usuario tiene una emergencia, indica el número local de emergencias.',
        '# Ejemplo',
        '$ User: "¿Cómo reservo un tour en París?"'
      ],
      [
        '🗾 # System Prompt',
        'Bot de OnService.AI, experto en cultura y turismo.',
        'Tono claro y detallista.',
        'Responde sobre mejores épocas para viajar y festividades.',
        'Sugiere rutas y circuitos turísticos.',
        'Brinda información sobre transporte y alojamiento.',
        'Ofrece recomendaciones para viajeros con necesidades especiales.',
        'Ayuda con la gestión de reservas y cambios.',
        'Nunca confirmes información sin verificar.',
        'Si el usuario pregunta por salud, deriva a un profesional.',
        '# Ejemplo',
        '$ User: "¿Cuál es la mejor época para visitar Japón?"'
      ],
      [
        '🚗 # System Prompt',
        'Eres Bot de OnService.AI, asistente de viajes.',
        'Tono práctico y directo.',
        'Brinda información sobre alquiler de autos y requisitos.',
        'Ayuda con la gestión de seguros y coberturas.',
        'Sugiere rutas y consejos para conducir en el extranjero.',
        'Ofrece asistencia en caso de accidentes o emergencias.',
        'Nunca confirmes reservas sin validación.',
        'Si el usuario tiene un accidente, indica el número de emergencias.',
        'No des consejos legales, deriva a expertos.',
        '# Ejemplo',
        '$ User: "¿Qué documentos necesito para alquilar un auto en Europa?"'
      ]
    ]
  }
};

// Datos de ejemplo para las respuestas - conversaciones más largas y realistas
const agentResponses = {
  airline: [
    [
      'User: "¿Puedo cambiar mi vuelo?"',
      'Agent: "¡Por supuesto! ¿Podrías indicarme tu número de reserva?"',
      'User: "Es XY48326."',
      'Agent: "Gracias. Verificando... Tu tarifa permite un cambio con costo adicional. ¿Deseas continuar?"'
    ],
    [
      'User: "¿Cuánto equipaje puedo llevar en cabina?"',
      'Agent: "Puedes llevar una pieza de hasta 10kg en cabina. ¿Te gustaría saber sobre equipaje en bodega?"',
      'User: "¿Y en bodega?"',
      'Agent: "En bodega puedes llevar hasta 23kg por pieza, según tu tarifa. ¿Necesitás ayuda con algo más?"'
    ],
    [
      'User: "¿El vuelo AM123 está demorado?"',
      'Agent: "Déjame verificar... El vuelo AM123 está programado para salir a horario. ¿Te gustaría recibir notificaciones de cambios?"',
      'User: "Sí, por favor."',
      'Agent: "Listo, te avisaré ante cualquier novedad. ¿Algo más en lo que pueda ayudarte?"'
    ],
    [
      'User: "¿Puedo seleccionar mi asiento online?"',
      'Agent: "Sí, puedes seleccionar tu asiento desde la web o la app. ¿Te gustaría que te envíe el enlace?"',
      'User: "Sí, envíamelo."',
      'Agent: "Aquí tienes: www.aerolinea.com/seleccionar-asiento. ¿Algo más?"'
    ],
    [
      'User: "¿Cómo solicito asistencia especial para mi vuelo?"',
      'Agent: "Puedes solicitar asistencia especial durante la reserva o llamando a nuestro call center. ¿Te gustaría que te ayude a gestionarlo?"',
      'User: "Sí, por favor."',
      'Agent: "Perfecto, ¿me indicas tu número de reserva?"'
    ]
  ],
  travel: [
    [
      'User: "¿Necesito visa para viajar a Brasil?"',
      'Agent: "Si eres ciudadano argentino, no necesitas visa para turismo en Brasil. ¿Te gustaría saber sobre otros países?"',
      'User: "¿Y para Estados Unidos?"',
      'Agent: "Para Estados Unidos sí necesitas visa. ¿Te ayudo con el proceso?"'
    ],
    [
      'User: "¿Qué destino recomendás para vacaciones en invierno?"',
      'Agent: "Bariloche y Ushuaia son excelentes opciones en Argentina. ¿Prefieres playa o nieve?"',
      'User: "Nieve."',
      'Agent: "Entonces Ushuaia es ideal. ¿Te gustaría ver paquetes?"'
    ],
    [
      'User: "¿Cómo reservo un tour en París?"',
      'Agent: "Puedes reservar tours en París desde nuestra web o app. ¿Te envío el enlace?"',
      'User: "Sí, por favor."',
      'Agent: "Aquí tienes: www.tours.com/paris. ¿Algo más?"'
    ],
    [
      'User: "¿Cuál es la mejor época para visitar Japón?"',
      'Agent: "La primavera (marzo-abril) es ideal por los cerezos en flor. ¿Te gustaría recomendaciones de itinerario?"',
      'User: "Sí, por favor."',
      'Agent: "Te armo un itinerario personalizado. ¿Cuántos días planeas viajar?"'
    ],
    [
      'User: "¿Qué documentos necesito para alquilar un auto en Europa?"',
      'Agent: "Necesitás licencia internacional y pasaporte vigente. ¿Te ayudo a gestionar la licencia?"',
      'User: "Sí, por favor."',
      'Agent: "Perfecto, te envío los requisitos por email. ¿Algo más?"'
    ]
  ],
};

// Handlers para la comunicación entre componentes
function handleTabChange(tab) {
  currentTab.value = tab
  currentExampleIdx.value = 0
  clearTimeout(autoNextTimeout)
  startNewConversation()
}

function handleTyping(typing) {
  isTyping.value = typing
  if (typing) isPromptTyping.value = false
}

function handlePromptTyping(val) {
  isPromptTyping.value = val
}

function handleExampleChange(exampleIdx) {
  currentExampleIdx.value = exampleIdx
  clearTimeout(autoNextTimeout)
}

function handleConversationFinished() {
  clearTimeout(autoNextTimeout)
  autoNextTimeout = setTimeout(() => {
    const examples = prompts[currentTab.value].examples
    const nextIdx = (currentExampleIdx.value + 1) % examples.length
    currentExampleIdx.value = nextIdx
    startNewConversation()
  }, 1000) // 1 segundo de delay antes de pasar al siguiente ejemplo
}

function startNewConversation() {
  isLoading.value = true
  clearTimeout(autoNextTimeout)
  setTimeout(() => {
    isLoading.value = false
  }, 1200)
}

function startDotAnimation() {
  clearInterval(dotInterval)
  dotInterval = setInterval(() => {
    dotIdx.value = dotIdx.value === 3 ? 1 : dotIdx.value + 1
  }, 400)
}

watch(isTyping, (val) => {
  if (val) startDotAnimation()
  else clearInterval(dotInterval)
})

onMounted(() => {
  startNewConversation()
})

onBeforeUnmount(() => {
  clearTimeout(autoNextTimeout)
})
</script>

<style scoped>
@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 0.9s cubic-bezier(.4,0,.2,1) both;
}
.animate-fade-in-up.delay-150 {
  animation-delay: 0.15s;
}
.prompt-thinking-block {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1.2rem;
}
.prompt-thinking-bubble {
  background: linear-gradient(90deg, #23272e 0%, #444950 100%);
  color: #e5e7eb;
  border-radius: 1.1rem;
  padding: 0.6rem 1.5rem;
  font-size: 1.1rem;
  font-family: 'Fira Mono', 'Menlo', 'Consolas', monospace;
  box-shadow: 0 0 16px 2px #a78bfa44, 0 2px 16px 0 #7c3aed33;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  animation: promptGlow 2.2s infinite alternate;
}
@keyframes promptGlow {
  0% { box-shadow: 0 0 16px 2px #a78bfa44, 0 2px 16px 0 #7c3aed33; }
  100% { box-shadow: 0 0 32px 6px #7c3aed66, 0 2px 24px 0 #38bdf866; }
}
.thinking-dots {
  display: inline-block;
  margin-left: 0.2em;
}
.dot {
  opacity: 0.2;
  font-size: 1.2em;
  transition: opacity 0.18s, color 0.18s;
  color: #a78bfa;
}
.dot.active {
  opacity: 1;
  color: #7c3aed;
}
.fadeInMsgSeq-enter-active {
  transition: opacity 0.45s cubic-bezier(.4,1.6,.6,1), transform 0.45s cubic-bezier(.4,1.6,.6,1);
}
.fadeInMsgSeq-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
.fadeInMsgSeq-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style> 