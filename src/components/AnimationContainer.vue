<template>
  <div class="animation-wrapper">
    <div ref="lottieContainer" class="lottie-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, onBeforeUnmount } from 'vue'
import lottie, { AnimationItem } from 'lottie-web'

const props = defineProps<{
  animationData: Object;
  dark?: boolean;
}>()

const lottieContainer = ref<HTMLElement | null>(null)
let animationInstance: AnimationItem | null = null

function init({ container, animationData }: { container: HTMLElement; animationData: Object }) {
  if (animationInstance) {
    animationInstance.destroy();
  }
  animationInstance = lottie.loadAnimation({
    container,
    renderer: 'canvas',
    loop: true,
    autoplay: true,
    animationData
  })
}

onMounted(() => {
  if (lottieContainer.value && props.animationData) {
    init({
      container: lottieContainer.value,
      animationData: props.animationData
    })
  }
})

watch(() => props.animationData, (newVal) => {
  if (lottieContainer.value && newVal) {
    init({
      container: lottieContainer.value,
      animationData: newVal
    })
  }
}, { deep: true })

onBeforeUnmount(() => {
  if (animationInstance) {
    animationInstance.destroy();
  }
})
</script>

<style scoped lang="scss">
.animation-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.lottie-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
  z-index: -1;
  background-size: cover;
  background-position: center;
  will-change: transform, opacity;
  transition: background-image 1s;
}
</style>
