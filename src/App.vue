<template>
  <div class="layout">
    <Transition :name="transitionName">
      <StartScreen v-if="startScreenVisible" @start-demo="startDemo" />
      <InteractiveScreen v-else @exit-demo="exitDemo" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { StartScreen, InteractiveScreen } from './views/index'

const startScreenVisible = ref(true)
const transitionName = ref('slide-left')

const startDemo = () => {
  transitionName.value = 'slide-left'
  startScreenVisible.value = false
}

const exitDemo = () => {
  transitionName.value = 'slide-right'
  startScreenVisible.value = true
}
</script>

<style scoped lang="scss">
.layout {
  width: 100vw;
  height: 100vh;
}

.slide-left-leave-active {
  transition: transform 400ms ease-in-out;
}

.slide-right-leave-active {
  transition: transform 400ms ease-in-out;
}

.slide-left-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

.slide-left-leave-to,
.slide-right-enter-from {
  transform: translateX(-100%);
}
</style>
