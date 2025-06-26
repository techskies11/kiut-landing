<template>
  <div ref="root" class="text-center mb-16 relative">
    <h2 ref="title" class="section-title text-3xl md:text-4xl font-semibold mb-2 text-white">
      <slot name="title" />
    </h2>
    <div ref="underline" class="mx-auto mt-1 h-1 w-24 bg-violet-600 origin-left section-underline"></div>
    <p v-if="$slots.subtitle" ref="subtitle" class="section-subtitle text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
      <slot name="subtitle" />
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const root = ref(null);
const title = ref(null);
const underline = ref(null);
const subtitle = ref(null);
let trigger;

onMounted(() => {
  trigger = ScrollTrigger.create({
    trigger: root.value,
    start: 'top 80%',
    end: 'bottom 20%',
    onEnter: () => {
      gsap.to(underline.value, {
        opacity: 1,
        y: 0,
        scaleX: 1,
        duration: 0.3,
        ease: 'power3.out',
      });
      gsap.to([title.value, subtitle.value], {
        opacity: 1,
        y: 0,
        scaleX: 1,
        duration: 0.7,
        delay: 0.08,
        stagger: 0.08,
        ease: 'power3.out',
      });
    },
    onLeaveBack: () => {
      gsap.to(underline.value, {
        opacity: 0,
        y: 40,
        scaleX: 0.7,
        duration: 0.3,
        ease: 'power3.in',
      });
      gsap.to([title.value, subtitle.value], {
        opacity: 0,
        y: 40,
        scaleX: 0.7,
        duration: 0.6,
        delay: 0.05,
        stagger: 0.08,
        ease: 'power3.in',
      });
    },
  });
  // Estado inicial
  gsap.set([title.value, underline.value, subtitle.value], { opacity: 0, y: 40, scaleX: 0.7 });
});

onBeforeUnmount(() => {
  if (trigger) trigger.kill();
});
</script>

<style scoped>
.section-title {
  letter-spacing: -0.01em;
}
.section-underline {
  transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
}
.section-subtitle {
  color: #a1a1aa; /* text-muted-foreground */
  font-weight: 400;
}
</style> 