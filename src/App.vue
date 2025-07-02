<script setup>
import Header from './components/Header.vue';
import HeroSection from './components/HeroSection.vue';
import DemoSection from './components/DemoSection.vue';
import UseCasesSection from './components/UseCasesSection.vue';
import TeamSection from './components/TeamSection.vue';
import FooterSection from './components/FooterSection.vue';
</script>

<template>
  <div class="min-h-screen w-full bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
    <Header />
    <main>
      <HeroSection />
      <DemoSection />
      <section id="about" class="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div class="max-w-4xl mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-5xl font-extrabold mb-6">Quiénes Somos</h1>
          <p class="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
            Somos <span class="font-bold text-blue-600 dark:text-blue-400">OnService</span>, los primeros en la intersección de la inteligencia artificial, aviación y atención al cliente. Nuestra misión es transformar la atención al cliente y optimizar procesos críticos para aerolíneas, agencias y empresas de aviación a nivel global.<br><br>
            Nuestra visión es simple: hacer que la interacción entre las aerolíneas y sus pasajeros sea más fluida, personalizada y eficaz que nunca. Lo logramos desarrollando e implementando agentes de IA avanzados que operan a través de los canales de comunicación preferidos de los usuarios, desde WhatsApp e Instagram hasta Facebook Messenger y el chat web.<br><br>
            Entendemos los desafíos únicos de la industria aérea –la necesidad de respuestas rápidas, información precisa y escalabilidad global– y hemos diseñado nuestras soluciones para superar estas expectativas.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href="#demo" class="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">Demo en vivo</a>
            <a href="#contact" class="px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 hover:text-white dark:hover:text-gray-900 transition-all duration-300">Contacto</a>
          </div>
        </div>
      </section>
      <UseCasesSection />
      <TeamSection />
    </main>
    <FooterSection />
  </div>
</template>
