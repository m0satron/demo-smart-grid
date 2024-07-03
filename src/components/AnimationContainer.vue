<template>
  <div class="animation-wrapper">
    <div ref="lottieContainer" class="lottie-container"></div>
  
    <!-- <img src="../assets/SmartEnergy_BG.svg" alt="Smart Energy Logo" class="image-container"  :class="{hidden: props.dark}"/> -->
    <!-- <Transition name="fade" mode="out-in">
      <component :is="props.dark ? BackgroundNight : BackgroundDay" />
    </Transition> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import lottie from 'lottie-web'
import BackgroundDay from './BackgroundDay.vue'
import BackgroundNight from './BackgroundNight.vue'

const props = defineProps<{
  animationData: Object;
  dark?: boolean;
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

watch(() => props.animationData, (newVal) => {
  if (lottieContainer.value && newVal)
    init({
      container: lottieContainer.value,
      animationData: newVal
    })
}, { deep: true})
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
  z-index: -1; /* Ensure the animation stays in the background */
  background-size: cover;
  background-position: center;
  will-change: transform, opacity; 
  transition: background-image 1s;
}

// .bg {
//   // background: url('@/assets/SmartEnergy_BG.svg');
//   transition: all 1s ease-in-out;
  
// &-dark {
//   // background: url('@/assets/SmartEnergyNight.svg');
//   transition: all 1s ease-in-out;
// }
// }

.image-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
  // opacity: 1;
  // transition: all 400ms ease-in-out;

  &-night {
    position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
  }
}

// .hidden {
//   opacity: 0;
//   transition: all 400ms ease-in-out

// }


.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}



</style>
