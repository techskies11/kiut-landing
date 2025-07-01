<template>
  <section id="faq" class="py-16 px-4 max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold mb-8 text-center dark:text-white">Preguntas Frecuentes</h2>
    <div class="space-y-4">
      <details class="group border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-colors bg-white dark:bg-gray-900">
        <summary class="font-semibold cursor-pointer text-lg text-gray-800 dark:text-gray-100 flex items-center justify-between">
          ¿Qué es Kiut y cómo puede ayudar a mi empresa?
          <span class="ml-2 transition-transform group-open:rotate-180">▼</span>
        </summary>
        <p class="mt-2 text-gray-600 dark:text-gray-300">Kiut es una plataforma de IA especializada en aviación que optimiza la atención al cliente, automatiza procesos y mejora la eficiencia operativa.</p>
      </details>
      <details class="group border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-colors bg-white dark:bg-gray-900">
        <summary class="font-semibold cursor-pointer text-lg text-gray-800 dark:text-gray-100 flex items-center justify-between">
          ¿Cómo se integra Kiut con mis sistemas actuales?
          <span class="ml-2 transition-transform group-open:rotate-180">▼</span>
        </summary>
        <p class="mt-2 text-gray-600 dark:text-gray-300">La integración es sencilla mediante API y conectores listos para los principales sistemas de la industria.</p>
      </details>
      <details class="group border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-colors bg-white dark:bg-gray-900">
        <summary class="font-semibold cursor-pointer text-lg text-gray-800 dark:text-gray-100 flex items-center justify-between">
          ¿Ofrecen soporte y capacitación?
          <span class="ml-2 transition-transform group-open:rotate-180">▼</span>
        </summary>
        <p class="mt-2 text-gray-600 dark:text-gray-300">Sí, brindamos soporte 24/7 y capacitaciones personalizadas para tu equipo.</p>
      </details>
    </div>
  </section>
</template>

<script setup>
// No props por ahora
</script>

<!--
SEO: FAQPage schema (puedes agregarlo en el futuro para rich snippets)
-->

<style scoped>
/* Animación para el icono de flecha */
details[open] summary span {
  transform: rotate(180deg);
}
</style> 