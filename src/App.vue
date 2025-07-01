<script setup>
import Header from './components/Header.vue';
import HeroSection from './components/HeroSection.vue';
import UseCasesSection from './components/UseCasesSection.vue';
import TeamSection from './components/TeamSection.vue';
import FaqSection from './components/FaqSection.vue';
import DemoSection from './components/DemoSection.vue';
import FooterSection from './components/FooterSection.vue';
</script>

<template>
  <div class="min-h-screen w-full bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
    <Header />
    <main>
      <HeroSection />
      <UseCasesSection />
      <TeamSection />
      <FaqSection />
      <DemoSection />
    </main>
    <FooterSection />
  </div>
</template>
