<template>
  <svg width="73" height="73" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M30.9345 40.8657L49.3756 22.4247L35.7634 8.8125L8.53906 36.0368L36.5239 64.0216L68.5391 31.3981"
      stroke="#00E676"
      stroke-width="12"
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
