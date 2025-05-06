<script setup>
import { onMounted, ref } from 'vue';
import ButtonAnimate from './components/ButtonAnimate.vue';
const words = ["e-commerce", "customer support"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typing = ref('');

const typeEffect = () => {
  let currentWord = words[wordIndex];
  if (isDeleting) {
      charIndex--;
  } else {
      charIndex++;
  }

  typing.value = currentWord.substring(0, charIndex);

  if (!isDeleting && charIndex === currentWord.length) {
    setTimeout(() => (isDeleting = true), 1000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

const openLink = (url) => {
  window.open(url, '_blank');
}

onMounted(() => {
  typeEffect();
});

// Questions
const questions = ref({
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <!-- Header -->
    <header class="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="flex w-full h-20 items-center justify-between">
        <img src="/logo.png" alt="OnService.AI" class="w-auto max-w-50 m-auto md:m-0">
      </div>
    </header>
    
    <main class="flex-1">
      <!-- Hero Section -->
      <section class="py-20 md:py-28">
        <div class="container flex flex-col items-center text-center">
          <div class="flex flex-col items-center">
            <h1 class="text-4xl md:text-6xl font-semibold tracking-tight max-w-4xl">
              The new evolution of
            </h1>
            <h1 class="text-4xl md:text-6xl font-semibold tracking-tight max-w-4xl text-violet-500 min-h-[40px] md:min-h-[60px]">
              {{ typing }}
            </h1>
            <h1 class="text-4xl md:text-6xl font-semibold tracking-tight mb-6 max-w-4xl">
              for airlines.
            </h1>
          </div>
          <p class="text-xl text-muted-foreground mb-10 max-w-2xl">
            A solution powered by artificial intelligence that optimizes sales and customer service via WhatsApp, and soon will be extended to Telegram, WeChat, and iMessage.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/5491130261625" target="_blank">
              <button class="!bg-violet-500 text-white">Chat with Agent AI</button>
            </a>
            <ButtonAnimate></ButtonAnimate>
          </div>
          <div class="mt-16 relative w-full flex justify-center">
            <div class="rounded-lg border bg-card shadow-xl overflow-hidden w-full max-w-4xl">
              <div class="aspect-video">
                <iframe class="w-full h-full" src="https://www.youtube.com/embed/sX2DjnrrJYM" 
                  title="Meet OnService.AI Concierge, the First AI Solution for Airlines' E-Commerce and Customer Service" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerpolicy="strict-origin-when-cross-origin" 
                  allowfullscreen>
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-20 md:py-28" v-if="false">
        <div class="container flex flex-col items-center text-center">
          <h1 class="text-3xl md:text-6xl font-semibold tracking-tight mb-8 max-w-4xl">
            Trusted by leading companies to elevate customer service.
          </h1>
          <div class="flex gap-4 items-center mt-4">
            <div class="scroll-container w-full max-w-5xl">
              <div class="scroll-content">
                <img class="h-28 mr-8 opacity-50 hover:opacity-100 transition-all cursor-pointer" src="/aeromexico.png" alt="Aeromexico" @click="openLink('https://www.aeromexico.com')" />
                <img class="h-28 mr-8 opacity-50 hover:opacity-100 transition-all cursor-pointer" src="/avianca.png" alt="Avianca" @click="openLink('https://www.avianca.com')" />
                <img class="h-28 mr-8 opacity-50 hover:opacity-100 transition-all cursor-pointer" src="/clic.png" alt="Clic" @click="openLink('https://clicair.co/')" />
                <img class="h-28 mr-8 opacity-50 hover:opacity-100 transition-all cursor-pointer" src="/aeromexico.png" alt="Aeromexico" @click="openLink('https://www.aeromexico.com')" />
                <img class="h-28 mr-8 opacity-50 hover:opacity-100 transition-all cursor-pointer" src="/avianca.png" alt="Avianca" @click="openLink('https://www.avianca.com')" />
                <img class="h-28 mr-8 opacity-50 hover:opacity-100 transition-all cursor-pointer" src="/clic.png" alt="Clic" @click="openLink('https://clicair.co/')" />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="py-20 bg-muted/50">
        <div class="container">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-semibold mb-4">Powerful Features</h2>
            <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
              OnService.AI comes packed with features designed to make your life easier and more productive.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="relative rounded-xl p-6 bg-[#0f0f0f] text-white overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-transparent opacity-70 pointer-events-none"></div>
              <div class="relative z-10 flex flex-col items-center">
                <div class="mb-4">
                  <img src="/bot.png" alt="Virtual Agent" class="h-10 w-10 invert-100" />
                </div>
                <h3 class="text-xl font-semibold">Virtual Agent</h3>
                <p class="mt-2 text-gray-300">
                  A virtual agent available on the most popular chat platforms, featuring a user-friendly interface for natural language conversations.
                </p>
              </div>
            </div>
            <div class="relative rounded-xl p-6 bg-[#0f0f0f] text-white overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-transparent opacity-70 pointer-events-none"></div>
              <div class="relative z-10 flex flex-col items-center">
                <div class="mb-4">
                  <img src="/conversation.png" alt="Quick Answers" class="h-10 w-10 invert-100" />
                </div>
                <h3 class="text-xl font-semibold">Quick Answers</h3>
                <p class="mt-2 text-gray-300">
                  Efficiently answers the most frequent questions about fares and reservations, optimizing response times.
                </p>
              </div>
            </div>

            <div class="relative rounded-xl p-6 bg-[#0f0f0f] text-white overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-transparent opacity-70 pointer-events-none"></div>
              <div class="relative z-10 flex flex-col items-center">
                <div class="mb-4">
                  <img src="/upselling.png" alt="Smart Upselling" class="h-10 w-10 invert-100" />
                </div>
                <h3 class="text-xl font-semibold">Smart Upselling</h3>
                <p class="mt-2 text-gray-300">
                  Intelligently upsells relevant ancillary services during customer inquiries about flight availability, fares, reservations, and check-in.
                </p>
              </div>
            </div>

            <div class="relative rounded-xl p-6 bg-[#0f0f0f] text-white overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-transparent opacity-70 pointer-events-none"></div>
              <div class="relative z-10 flex flex-col items-center">
                <div class="mb-4">
                  <img src="/speech-bubble.png" alt="Natural Conversations" class="h-10 w-10 invert-100" />
                </div>
                <h3 class="text-xl font-semibold">Natural Conversations</h3>
                <p class="mt-2 text-gray-300">
                  It is designed to provide a seamless experience. It is not limited to a set decision tree, the customer can make specific queries.
                </p>
              </div>
            </div>

            <div class="relative rounded-xl p-6 bg-[#0f0f0f] text-white overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-transparent opacity-70 pointer-events-none"></div>
              <div class="relative z-10 flex flex-col items-center">
                <div class="mb-4">
                  <img src="/customer-support.png" alt="24/7 Support" class="h-10 w-10 invert-100" />
                </div>
                <h3 class="text-xl font-semibold">24/7 Support</h3>
                <p class="mt-2 text-gray-300">
                  Expands customer service beyond business hours. Supports multiple languages, catering to a diverse customer base.
                </p>
              </div>
            </div>

            <div class="relative rounded-xl p-6 bg-[#0f0f0f] text-white overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-transparent opacity-70 pointer-events-none"></div>
              <div class="relative z-10 flex flex-col items-center">
                <div class="mb-4">
                  <img src="/clipboard.png" alt="Task Automation" class="h-10 w-10 invert-100" />
                </div>
                <h3 class="text-xl font-semibold">Task Automation</h3>
                <p class="mt-2 text-gray-300">
                  Provides a seamless experience through integration with existing airline systems and platforms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section id="faq" class="py-20">
        <div class="container">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-semibold mb-4">Frequently Asked Questions</h2>
            <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
              Got questions? We've got answers.
            </p>
          </div>
          <div class="grid grid-cols-1 gap-2 max-w-4xl mx-auto">
            <div class="border rounded-lg p-6 shadow-violet-700 hover:shadow-sm transition-all duration-300 cursor-pointer text-left" @click="questions[1] = !questions[1]">
              <header class="flex justify-between items-center">
                <h3 class="text-lg font-medium">How does OnService.AI differ from other AI assistants?</h3>
                <img src="/arrow.svg" alt="Arrow" class="w-4 h-4 transition-all duration-300" :class="{ 'rotate-180': questions[1] }" />
              </header>
              <p v-if="questions[1]" class="text-muted-foreground mt-4">OnService.AI uses a proprietary language model specifically trained to understand context better and provide more natural, helpful responses. It also learns from your interactions to become more personalized over time.</p>
            </div>

            <div class="border rounded-lg p-6 shadow-violet-700 hover:shadow-sm transition-all duration-300 cursor-pointer text-left" @click="questions[2] = !questions[2]">
              <header class="flex justify-between items-center">
                <h3 class="text-lg font-medium">Can I integrate OnService.AI with my existing tools?</h3>
                <img src="/arrow.svg" alt="Arrow" class="w-4 h-4 transition-all duration-300" :class="{ 'rotate-180': questions[2] }" />
              </header>
              <p v-if="questions[2]" class="text-muted-foreground mt-4">Yes! OnService.AI offers API access on our Enterprise plan, allowing you to integrate it with your existing workflows, apps, and services. We also offer pre-built integrations with popular platforms.</p>
            </div>
            <div class="border rounded-lg p-6 shadow-violet-700 hover:shadow-sm transition-all duration-300 cursor-pointer text-left" @click="questions[3] = !questions[3]">
              <header class="flex justify-between items-center">
                <h3 class="text-lg font-medium">Is my data secure with OnService.AI?</h3>
                <img src="/arrow.svg" alt="Arrow" class="w-4 h-4 transition-all duration-300" :class="{ 'rotate-180': questions[3] }" />
              </header>
              <p v-if="questions[3]" class="text-muted-foreground mt-4">Absolutely. We use end-to-end encryption for all conversations, and your data is never used to train our models without your explicit permission. We also offer enterprise-grade security features for businesses.</p>
            </div>
            <div class="border rounded-lg p-6 shadow-violet-700 hover:shadow-sm transition-all duration-300 cursor-pointer text-left" @click="questions[4] = !questions[4]">
              <header class="flex justify-between items-center">
                <h3 class="text-lg font-medium">What happens if I exceed my message limit?</h3>
                <img src="/arrow.svg" alt="Arrow" class="w-4 h-4 transition-all duration-300" :class="{ 'rotate-180': questions[4] }" />
              </header>
              <p v-if="questions[4]" class="text-muted-foreground mt-4">On the Free plan, once you reach your daily limit, you'll need to wait until the next day to send more messages. You can also upgrade to the Pro plan for unlimited messages at any time.</p>
            </div>
            <div class="border rounded-lg p-6 shadow-violet-700 hover:shadow-sm transition-all duration-300 cursor-pointer text-left" @click="questions[5] = !questions[5]">
              <header class="flex justify-between items-center">
                <h3 class="text-lg font-medium">Can I use OnService.AI offline?</h3>
                <img src="/arrow.svg" alt="Arrow" class="w-4 h-4 transition-all duration-300" :class="{ 'rotate-180': questions[5] }" />
              </header>
              <p v-if="questions[5]" class="text-muted-foreground mt-4">The Pro and Enterprise plans include desktop and mobile apps that can function with limited capabilities while offline. Full functionality requires an internet connection.</p>
            </div>
            <div class="border rounded-lg p-6 shadow-violet-700 hover:shadow-sm transition-all duration-300 cursor-pointer text-left" @click="questions[6] = !questions[6]">
              <header class="flex justify-between items-center">
                <h3 class="text-lg font-medium">How do I cancel my subscription?</h3>
                <img src="/arrow.svg" alt="Arrow" class="w-4 h-4 transition-all duration-300" :class="{ 'rotate-180': questions[6] }" />
              </header>
              <p v-if="questions[6]" class="text-muted-foreground mt-4">You can cancel your subscription at any time from your account settings. If you cancel, you'll still have access to your plan until the end of your current billing period.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <div class="relative bg-black text-white rounded-2xl p-12 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] opacity-60 z-0"></div>
        <div class="relative z-10 text-center">
          <h1 class="text-4xl md:text-5xl font-semibold leading-tight">
            Ready to experience the future of AI chat?
          </h1>
          <p class="mt-4 text-gray-300">
            Join thousands of users who are already using OnService.AI to be more productive, creative, and effective.
          </p>
          <a href="mailto:jrestrepo@kiusys.com"
            class="inline-block mt-6 px-6 py-3 bg-purple-600 text-white no-underline rounded-lg hover:bg-purple-700 transition font-medium">
            Schedule a demo
          </a>
        </div>
      </div>
    </main>

    <footer class="py-12 md:py-16">
      <div class="container">
        <div class="flex gap-2 justify-between md:items-end flex-col md:flex-row">
          <div class="flex flex-col items-center md:items-start">
            <img src="/logo.png" alt="OnService.AI" class="w-auto max-w-40">
            <p class="text-muted-foreground mx-1 mt-2">16192 Coastal Highway<br>Lewes, Delaware 19958</p>
          </div>
          <p class="text-muted-foreground mb-4">
            The next generation of AI chat assistants, designed to help you achieve more.
          </p>
        </div>
        <div class="mt-12 pt-8 border-t text-center text-muted-foreground flex justify-between flex-col md:flex-row">
          <p>© {{ new Date().getFullYear() }} OnService.AI. All rights reserved.</p>
          <p>AI Travel Technologies Inc.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
</script>

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
  background-image: linear-gradient(90deg, #1e1e1e 0%, #7c3aed 60%, #1e1e1e 100%);
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
</style>
