<template>
  <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.278 37.392C8.238 37.392 4.75 34.08 4.75 29.44C4.75 25.92 6.942 23.024 10.366 21.92C11.166 15.376 16.542 10.608 23.038 10.608C28.094 10.608 32.062 13.04 34.27 17.376C40.286 17.376 44.75 21.712 44.75 27.408C44.75 33.024 40.302 37.392 34.558 37.392H13.278Z"
      fill="white"
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
