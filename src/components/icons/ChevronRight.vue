<template>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.70078 2.78516L16.3008 12.0012L6.70078 21.2172"
      stroke="white"
      stroke-width="2.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  color?: string
}>()
</script>

<style scoped lang="scss">
svg {
  cursor: pointer;
  path {
    transition: fill 0.2s;
  }
}
</style>
