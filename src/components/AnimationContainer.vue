<template>
  <div ref="lottieContainer" class="lottie-container"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import lottie from 'lottie-web'

const props = defineProps<{
  animationData: Object
}>()

const lottieContainer = ref<HTMLElement | null>(null)

function init({ container, animationData }: { container: HTMLElement; animationData: Object }) {
  lottie.loadAnimation({
    container,
    renderer: 'canvas',
    loop: true,
    autoplay: true,
    animationData
  })

}

onMounted(() => {
  if (lottieContainer.value && props.animationData)
    init({
      container: lottieContainer.value,
      animationData: props.animationData
    })
})

</script>

<style scoped lang="scss">
.lottie-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
  z-index: -1; /* Ensure the animation stays in the background */
  background-image: url('@/assets/SmartEnergy_BG.svg');
  background-size: cover;
  background-position: center;
  will-change: transform, opacity;
}
</style>
