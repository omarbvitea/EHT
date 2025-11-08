<script setup lang="ts">
import { useOverlay } from '@/composables/use-overlay'

const { isLoading } = useOverlay()
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isLoading"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      >
        <div class="flex items-center justify-center">
          <img src="/EHT/E.svg" alt="E" class="letter letter-e" />
          <img src="/EHT/H.svg" alt="H" class="letter letter-h" />
          <img src="/EHT/T.svg" alt="T" class="letter letter-t" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.letter {
  height: 60px;
  width: auto;
  filter: drop-shadow(0 0 15px rgba(218, 3, 45, 0.6));
}

.letter-e {
  animation: bounce-pulse 1.8s ease-in-out infinite;
  animation-delay: 0s;
}

.letter-h {
  animation: bounce-pulse 1.8s ease-in-out infinite;
  animation-delay: 0.3s;
}

.letter-t {
  animation: bounce-pulse 1.8s ease-in-out infinite;
  animation-delay: 0.6s;
}

@keyframes bounce-pulse {
  0%,
  100% {
    transform: translateY(0) scale(1);
    filter: drop-shadow(0 0 10px rgba(218, 3, 45, 0.4));
    opacity: 0.7;
  }
  50% {
    transform: translateY(-10px) scale(1.05);
    filter: drop-shadow(0 0 25px rgba(218, 3, 45, 0.9));
    opacity: 1;
  }
}
</style>
