<template>
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.5391 8.37109L13.4482 17.462L7.99361 12.0075L2.53906 17.4615"
      stroke="white"
      stroke-width="2.3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.7207 8.37109H22.5389V15.1888"
      stroke="white"
      stroke-width="2.3"
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
