<template>
  <img :src="SmartEnergyNight" alt="Night" class="image-container" />
  </template>


  <script setup lang="ts">

import SmartEnergyNight from '../assets/SmartEnergyNight.svg?url'
</script>

  
  <style scoped lang="scss">
  .image-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -2;
  }
  
  </style>
  