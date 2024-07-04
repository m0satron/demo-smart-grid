<template>
  <div class="view">
    <ToolBar>
      <template #left>
        <div class="container-left">
          <ChevronLeft @click="$emit('exit-demo')"/>
          <div>
            <span class="color-blue-light title">
              <strong>Smartgrid</strong>&nbsp;007820 <br />
              Brussels - Park Royale
            </span>
          </div>

        </div>

      </template>

      <template #center>
        <ToolbarValues :demand="demand" :supply="supply" />
      </template>

      <template #right>
        <div class="container-right">
          
          <div class="weather-indicator">

            <Transition name="fade" mode="out-in">
              <component :is="weatherIcon" />
            </Transition>

            {{ settings?.temperature }}°C
          </div>
          <ToolbarSettings ref="settings" />
        </div>
      </template>

    </ToolBar>
    <AnimationContainer :animation-data="animationData" :key="key" :dark="!settings?.dayTime" class="animation"/>
        <Transition name="fade" mode="in-out">
      <component :is="!settings?.dayTime ? BackgroundNight : BackgroundDay" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import 'fari-component-library/style'
import ToolBar from '@/components/ToolBar.vue'
import { ref, computed, watch } from 'vue'
import AnimationContainer from '@/components/AnimationContainer.vue'
import SunIcon from '@/components/icons/SunIcon.vue'
import MoonIcon from '@/components/icons/MoonIcon.vue'
import PartCloudIcon from '@/components/icons/PartCloudIcon.vue'
import CloudIcon from '@/components/icons/CloudIcon.vue'
import ChevronLeft from '@/components/icons/ChevronLeft.vue'
import ToolbarSettings from '@/components/ToolbarSettings.vue'
import ToolbarValues from '@/components/ToolbarValues.vue'
import energyFast from '@/assets/energyFast.json'
import energyMedium from '@/assets/energyMedium.json'
import energySlow from '@/assets/energySlow.json'
import BackgroundDay from '@/components/BackgroundDay.vue'
import BackgroundNight from '@/components/BackgroundNight.vue'
import type { Ref  } from 'vue'

const settings = ref<{
  temperature: number;
  dayTime: boolean;
  weather: 'sunny' | 'cloudy' | 'overcast';
}>()


const weatherIcon = computed(() => {
  if (!settings.value) return null
  if (!settings.value.dayTime) return MoonIcon
  if (settings.value.weather === 'sunny') return SunIcon
  if (settings.value.weather === 'cloudy') return CloudIcon
  if (settings.value.weather === 'overcast') return PartCloudIcon
  return null
}
)

const supply = computed(() => {
  if(!settings.value) return 0;

  const weatherValues = {
    sunny: 98,
    overcast: 65,
    cloudy: 57
  }

  const dayTimeValues = {
    true: 100,
    false: 4
  }
  return (weatherValues[settings.value.weather] * dayTimeValues[`${settings.value.dayTime}`]) / 10
})

const demand = computed(() => {
  if(!settings.value) return 0;
  const weatherValues = {
    sunny: 100,
    overcast: 70,
    cloudy: 60
  }

  const dayTimeValues = {
    true: 100,
    false: 4
  }
  return Math.round(
    (weatherValues[settings.value?.weather] *
      dayTimeValues[`${settings.value?.dayTime}`] *
      (settings.value?.temperature / 11)) /
      10
  )
})

const animationData = computed(() => {
    if(supply.value > demand.value) return energyFast
    else if(supply.value < demand.value) return energySlow
    else return energyMedium
})

const key = ref(0)
watch([supply, demand], () => key.value++)
</script>

<style scoped lang="scss">
.view {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  position: relative;
}

.toolbar {
  position: absolute;
  top: 0;
  .center-toolbar {
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: space-evenly;
  }
}
.title {
  strong {
    font-size: 20px;
  }
  font-size: 18px;
}


.container-left {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1.1rem;
}
.container-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}

.weather-indicator {
  font-size: 3.5rem;
  font-weight: 600;
  position: absolute;
  right: 10rem;
  display: flex;
  align-items: center;
  gap: 1.1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


</style>
