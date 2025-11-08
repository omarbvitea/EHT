<script setup lang="ts">
import Header from '@/components/Header.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
</script>

<template>
  <div class="grid h-screen w-screen grid-cols-1 grid-rows-[auto_1fr]">
    <Header />
    <router-view />
    <Toast />
    <LoadingOverlay />
  </div>
</template>
