<template>
  <div ref="container" class="circuit-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';

const container = ref(null);
let scene, renderer, camera;
let circuitLines = [];
let circuitNodes = [];
let chips = [];
let pulseObjs = [];
let rays = [];
let animationId;

// Configuración
const COLORS = [
  0x7c3aed, // Violeta
  0x38bdf8, // Azul
  0x06b6d4, // Cian
  0xa78bfa, // Violeta claro
];
const WIDTH = 1200;
const HEIGHT = 600;
const NODE_COUNT = 32;
const CHIP_COUNT = 8;
const RAY_COUNT = 4;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createOrganicCircuit() {
  circuitLines = [];
  circuitNodes = [];
  chips = [];
  pulseObjs = [];
  // Nodos principales
  for (let i = 0; i < NODE_COUNT; i++) {
    circuitNodes.push({
      x: randomBetween(-WIDTH/2 + 60, WIDTH/2 - 60),
      y: randomBetween(-HEIGHT/2 + 60, HEIGHT/2 - 60),
      z: 0,
      pulse: Math.random() > 0.7 // Algunos nodos pulsan
    });
  }
  // Chips (rectángulos)
  for (let i = 0; i < CHIP_COUNT; i++) {
    chips.push({
      x: randomBetween(-WIDTH/2 + 100, WIDTH/2 - 100),
      y: randomBetween(-HEIGHT/2 + 100, HEIGHT/2 - 100),
      w: randomBetween(24, 38),
      h: randomBetween(12, 20),
      pulse: Math.random() > 0.5 // Algunos chips pulsan
    });
  }
  // Conexiones: unir nodos cercanos y chips
  for (let i = 0; i < circuitNodes.length; i++) {
    for (let j = i + 1; j < circuitNodes.length; j++) {
      const a = circuitNodes[i], b = circuitNodes[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 260 && Math.random() > 0.25) {
        // Trayectoria con ángulos de 90° (tipo PCB), a veces con más de 3 segmentos
        let path = [{ x: a.x, y: a.y, z: 0 }];
        if (Math.random() > 0.5) {
          // L
          path.push({ x: b.x, y: a.y, z: 0 });
        } else {
          // L invertida
          path.push({ x: a.x, y: b.y, z: 0 });
        }
        if (Math.random() > 0.7) {
          // Agregar un segmento extra
          path.push({ x: randomBetween(-WIDTH/2 + 60, WIDTH/2 - 60), y: randomBetween(-HEIGHT/2 + 60, HEIGHT/2 - 60), z: 0 });
        }
        path.push({ x: b.x, y: b.y, z: 0 });
        circuitLines.push(path);
      }
    }
    // Conectar nodos a chips cercanos
    for (let c = 0; c < chips.length; c++) {
      const chip = chips[c];
      const dist = Math.hypot(circuitNodes[i].x - chip.x, circuitNodes[i].y - chip.y);
      if (dist < 180 && Math.random() > 0.5) {
        let path = [
          { x: circuitNodes[i].x, y: circuitNodes[i].y, z: 0 },
          { x: chip.x, y: circuitNodes[i].y, z: 0 },
          { x: chip.x, y: chip.y, z: 0 }
        ];
        circuitLines.push(path);
      }
    }
  }
}

function addCircuitToScene() {
  // Líneas
  for (let i = 0; i < circuitLines.length; i++) {
    const points = circuitLines[i].map(p => new THREE.Vector3(p.x, p.y, p.z));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: COLORS[0],
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending
    });
    const line = new THREE.Line(geometry, material);
    scene.add(line);
  }
  // Nodos
  for (let i = 0; i < circuitNodes.length; i++) {
    const { x, y, z, pulse } = circuitNodes[i];
    const geometry = new THREE.CircleGeometry(5, 18);
    const material = new THREE.MeshBasicMaterial({
      color: COLORS[0],
      transparent: true,
      opacity: 0.5
    });
    const circle = new THREE.Mesh(geometry, material);
    circle.position.set(x, y, z + 1);
    scene.add(circle);
    if (pulse) pulseObjs.push(circle);
  }
  // Chips
  for (let i = 0; i < chips.length; i++) {
    const { x, y, w, h, pulse } = chips[i];
    const geometry = new THREE.BoxGeometry(w, h, 4);
    const material = new THREE.MeshBasicMaterial({
      color: COLORS[1],
      transparent: true,
      opacity: 0.32
    });
    const box = new THREE.Mesh(geometry, material);
    box.position.set(x, y, 2);
    scene.add(box);
    if (pulse) pulseObjs.push(box);
  }
}

function addRays() {
  rays = [];
  for (let i = 0; i < RAY_COUNT; i++) {
    const path = circuitLines[Math.floor(Math.random() * circuitLines.length)];
    if (!path) continue;
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(path[0].x, path[0].y, 3),
      new THREE.Vector3(path[0].x, path[0].y, 3)
    ]);
    const color = COLORS[i % COLORS.length];
    const material = new THREE.LineBasicMaterial({
      color,
      linewidth: 7,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });
    const ray = new THREE.Line(geometry, material);
    ray.userData.path = path;
    ray.userData.color = color;
    ray.userData.offset = Math.random() * 1000; // Para animación desfasada
    scene.add(ray);
    rays.push(ray);
  }
}

function animate() {
  // Pulsos de luz en nodos y chips
  const t = Date.now() * 0.002;
  for (let i = 0; i < pulseObjs.length; i++) {
    const obj = pulseObjs[i];
    obj.material.opacity = 0.5 + 0.35 * Math.abs(Math.sin(t + i));
    obj.material.needsUpdate = true;
  }
  // Animar rayos recorriendo caminos
  for (let i = 0; i < rays.length; i++) {
    const ray = rays[i];
    const path = ray.userData.path;
    if (!path) continue;
    const segs = path.length - 1;
    const total = segs * 70; // frames
    const frame = Math.floor(((Date.now() + ray.userData.offset * 1000) / 10) % total);
    const seg = Math.floor(frame / 70);
    const tSeg = (frame % 70) / 70;
    if (seg < segs) {
      const a = path[seg], b = path[seg + 1];
      const x = a.x + (b.x - a.x) * tSeg;
      const y = a.y + (b.y - a.y) * tSeg;
      ray.geometry.setFromPoints([
        new THREE.Vector3(a.x, a.y, 3),
        new THREE.Vector3(x, y, 3)
      ]);
      ray.visible = true;
    } else {
      // Cuando termina el camino, elige uno nuevo
      const newPath = circuitLines[Math.floor(Math.random() * circuitLines.length)];
      ray.userData.path = newPath;
      ray.visible = false;
    }
  }
  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

function onWindowResize() {
  const w = window.innerWidth, h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

onMounted(() => {
  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-WIDTH/2, WIDTH/2, HEIGHT/2, -HEIGHT/2, 1, 1000);
  camera.position.z = 100;
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.value.appendChild(renderer.domElement);
  createOrganicCircuit();
  addCircuitToScene();
  addRays();
  window.addEventListener('resize', onWindowResize);
  animate();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('resize', onWindowResize);
  if (renderer) {
    renderer.dispose();
  }
});
</script>

<style scoped>
.circuit-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}
.circuit-container canvas {
  display: block;
}
</style> 