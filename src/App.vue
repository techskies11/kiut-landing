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
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <!-- Header -->
    <header class="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="flex w-full h-16 items-center justify-between">
        <div class="flex items-center gap-2">
          <h1 class="title font-extralight text-3xl">
            <strong>O</strong>n<strong>S</strong>ervice.<strong>AI</strong>
          </h1>
        </div>
      </div>
    </header>
    
    <main class="flex-1">
      <!-- Hero Section -->
      <section class="py-20 md:py-28">
        <div class="container flex flex-col items-center text-center">
          <div class="flex flex-col items-center">
            <h1 class="text-4xl md:text-6xl font-bold tracking-tight max-w-4xl">
              The new evolution of
            </h1>
            <h1 class="text-4xl md:text-6xl font-bold tracking-tight max-w-4xl text-violet-500 min-h-[40px] md:min-h-[60px]">
              {{ typing }}
            </h1>
            <h1 class="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl">
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

      <section class="py-20 md:py-28">
        <div class="container flex flex-col items-center text-center">
          <h1 class="text-3xl md:text-6xl font-bold tracking-tight mb-8 max-w-4xl">
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
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
              OnService.AI comes packed with features designed to make your life easier and more productive.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="rounded-lg border bg-card p-6 h-full shadow-violet-700 hover:shadow-sm transition-all duration-300 cursor-pointer">
              <div class="mb-2 flex justify-center opacity-70">
                <img src="/bot.png" alt="Virtual Agent" class="h-10 w-10 invert-100" />
              </div>
              <h3 class="text-xl font-bold mb-2">Virtual Agent</h3>
              <p class="text-muted-foreground">Virtual agent available via the most popular chat platforms, with a friendly interface for conversations in a natural language.</p>
            </div>
            <div class="rounded-lg border bg-card p-6 h-full shadow-violet-700 hover:shadow-sm transition-all duration-300 cursor-pointer">
              <div class="mb-2 flex justify-center opacity-70">
                <img src="/conversation.png" alt="Virtual Agent" class="h-10 w-10 invert-100" />
              </div>
              <h3 class="text-xl font-bold mb-2">Quick Answers</h3>
              <p class="text-muted-foreground">Answers the most frequent questions about fares and reservations efficiently, optimizing response times.</p>
            </div>
            <div class="rounded-lg border bg-card p-6 h-full shadow-violet-700 hover:shadow-sm transition-all duration-300 cursor-pointer">
              <div class="mb-2 flex justify-center opacity-70">
                <img src="/upselling.png" alt="Virtual Agent" class="h-10 w-10 invert-100" />
              </div>
              <h3 class="text-xl font-bold mb-2">Smart Upselling</h3>
              <p class="text-muted-foreground">Smart upsell of relevant ancillary services for the customer in queries for flight availability, fares, reservation, check-in.</p>
            </div>

            <div class="rounded-lg border bg-card p-6 h-full shadow-violet-700 hover:shadow-sm transition-all duration-300 cursor-pointer">
              <div class="mb-2 flex justify-center opacity-70">
                <img src="/speech-bubble.png" alt="Virtual Agent" class="h-10 w-10 invert-100" />
              </div>
              <h3 class="text-xl font-bold mb-2">Natural Conversations</h3>
              <p class="text-muted-foreground">It is designed to provide a seamless experience. It is not limited to a set decision tree, the customer can make specific queries.</p>
            </div>
            <div class="rounded-lg border bg-card p-6 h-full shadow-violet-700 hover:shadow-sm transition-all duration-300 cursor-pointer">
              <div class="mb-2 flex justify-center opacity-70">
                <img src="/customer-support.png" alt="Virtual Agent" class="h-10 w-10 invert-100" />
              </div>
              <h3 class="text-xl font-bold mb-2">24/7 Support</h3>
              <p class="text-muted-foreground">Expands customer service beyond business hours. Also, multiple languages are available based on your markets.</p>
            </div>
            <div class="rounded-lg border bg-card p-6 h-full shadow-violet-700 hover:shadow-sm transition-all duration-300 cursor-pointer">
              <div class="mb-2 flex justify-center opacity-70">
                <img src="/clipboard.png" alt="Virtual Agent" class="h-10 w-10 invert-100" />
              </div>
              <h3 class="text-xl font-bold mb-2">Task Automation</h3>
              <p class="text-muted-foreground">Allows the automation of frequently asked questions so that your most qualified staff deals with complex cases.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section id="faq" class="py-20">
        <div class="container">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
              Got questions? We've got answers.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div class="border rounded-lg p-6 shadow-violet-700 hover:shadow-sm transition-all duration-300 cursor-pointer">
              <h3 class="text-lg font-medium mb-2">How does OnService.AI differ from other AI assistants?</h3>
              <p class="text-muted-foreground">OnService.AI uses a proprietary language model specifically trained to understand context better and provide more natural, helpful responses. It also learns from your interactions to become more personalized over time.</p>
            </div>
            <div class="border rounded-lg p-6 shadow-violet-700 hover:shadow-sm transition-all duration-300 cursor-pointer">
              <h3 class="text-lg font-medium mb-2">Can I integrate OnService.AI with my existing tools?</h3>
              <p class="text-muted-foreground">Yes! OnService.AI offers API access on our Enterprise plan, allowing you to integrate it with your existing workflows, apps, and services. We also offer pre-built integrations with popular platforms.</p>
            </div>
            <div class="border rounded-lg p-6 shadow-violet-700 hover:shadow-sm transition-all duration-300 cursor-pointer">
              <h3 class="text-lg font-medium mb-2">Is my data secure with OnService.AI?</h3>
              <p class="text-muted-foreground">Absolutely. We use end-to-end encryption for all conversations, and your data is never used to train our models without your explicit permission. We also offer enterprise-grade security features for businesses.</p>
            </div>
            <div class="border rounded-lg p-6 shadow-violet-700 hover:shadow-sm transition-all duration-300 cursor-pointer">
              <h3 class="text-lg font-medium mb-2">What happens if I exceed my message limit?</h3>
              <p class="text-muted-foreground">On the Free plan, once you reach your daily limit, you'll need to wait until the next day to send more messages. You can also upgrade to the Pro plan for unlimited messages at any time.</p>
            </div>
            <div class="border rounded-lg p-6 shadow-violet-700 hover:shadow-sm transition-all duration-300 cursor-pointer">
              <h3 class="text-lg font-medium mb-2">Can I use OnService.AI offline?</h3>
              <p class="text-muted-foreground">The Pro and Enterprise plans include desktop and mobile apps that can function with limited capabilities while offline. Full functionality requires an internet connection.</p>
            </div>
            <div class="border rounded-lg p-6 shadow-violet-700 hover:shadow-sm transition-all duration-300 cursor-pointer">
              <h3 class="text-lg font-medium mb-2">How do I cancel my subscription?</h3>
              <p class="text-muted-foreground">You can cancel your subscription at any time from your account settings. If you cancel, you'll still have access to your plan until the end of your current billing period.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 bg-primary text-primary-foreground">
        <div class="container text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to experience the future of AI chat?</h2>
          <p class="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Join thousands of users who are already using OnService.AI to be more productive, creative, and effective.
          </p>
          <div>
            <button class="px-8 py-3 text-base font-medium rounded-md text-violet-500">
              Schedule a demo
            </button>
          </div>
        </div>
      </section>
    </main>

    <footer class="border-t py-12 md:py-16">
      <div class="container">
        <div class="flex flex-col gap-2 items-center">
          <span class="text-xl font-bold">OnService.AI</span>
          <p class="text-muted-foreground mb-4">
            The next generation of AI chat assistants, designed to help you achieve more.
          </p>
        </div>
        <div class="mt-12 pt-8 border-t text-center text-muted-foreground">
          <p>© {{ new Date().getFullYear() }} OnService.AI. All rights reserved.</p>
          <p>AI Travel Technologies Inc.</p>
          <p>16192 Coastal Highway, Lewes, Delaware 19958</p>
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
  --background: 222.2 84% 4.9%;
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
</style>
