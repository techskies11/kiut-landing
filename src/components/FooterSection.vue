<template>
  <footer class="py-8 bg-black text-center text-gray-600 dark:text-gray-300">
    <div class="w-full p-6 md:px-10 flex justify-between items-center flex-col md:flex-row gap-2 md:items-end">
      <div class="flex flex-col gap-2">
        <figure class="flex items-center gap-2">
          <img src="/logo.png" alt="OnService.AI" class="w-10 invert dark:invert-0">
          <strong class="text-xl font-bold">OnService.AI</strong>
        </figure>
        <p class="opacity-70">
          16192 Coastal Highway <br>
          Lewes, Delaware 19958
        </p>
      </div>
      <p class="opacity-70">The next generation of AI chat assistants, designed to help you achieve more.</p>
    </div>
    <hr class="my-2 border-gray-200 dark:border-gray-700">
    <div class="w-full px-6 md:px-10 flex justify-between items-center py-2 flex-col md:flex-row gap-2">
      <p>
        {{ $t('footer_copyright') }}
      </p>
      <p>
        {{ $t('footer_sponsor') }}
      </p>
    </div>
  </footer>
</template>

<script setup>
// No props por ahora
</script> 