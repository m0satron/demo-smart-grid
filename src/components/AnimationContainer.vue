<template>
  <div ref="lottieContainer" class="lottie-container"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import lottie from 'lottie-web';
import type { AnimationItem } from 'lottie-web';


const props = defineProps<{
  animationData: Object;
}>();

const lottieContainer = ref<HTMLElement | null>(null);

onMounted(() => 
  (lottieContainer.value && props.animationData) && 
    lottie.loadAnimation({
      container: lottieContainer.value,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: props.animationData,
    })
);
</script>

<style scoped lang="scss">
// .lottie-container {
//   width: 1920px;
//   height: 1080px;
//   background-color: #f0f0f0; /* Optional: set a background color */
//   background-image: url('@/assets/SmartEnergy_BG.svg');
//   background-size: cover; /* Cover the entire area of the container */
//   background-position: center; /* Center the background image */
//   position: fixed; /* Make the container fixed to cover the exact size */
//   left: 50%;
//   top: 50%;
//   transform: translate(-50%, -50%);
// }

.lottie-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
  z-index: -1; /* Ensure the animation stays in the background */
  background-image: url('@/assets/SmartEnergy_BG.svg');  background-size: cover;
  background-position: center;
}
</style>
