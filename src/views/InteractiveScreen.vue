<template>
  <div class="view">
    <ToolBar>
      <template #left>
        <div class="container-left">
          <ChevronLeft @click="$emit('exit-demo')" />
          <div>
            <span class="color-blue-light title">
              <strong>Smartgrid</strong>&nbsp;007820 <br />
              Brussels - Park Royale
            </span>
          </div>
        </div>
      </template>

      <template #center>
        <ToolbarValues :demand="currentDemand" :supply="currentSupply" />
      </template>

      <template #right>
        <div class="container-right">
          <div class="weather-indicator">
            <Transition name="fade" mode="out-in">
              <component :is="weatherIcon" />
            </Transition>

            {{ currentTemperature }}°C
          </div>
          <div class="time-indicator">
            {{ currentTime.toLocaleTimeString('fr-BE', { hour: '2-digit', minute: '2-digit' }) }}
          </div>
          <ToolbarSettings ref="settings" />
        </div>
      </template>
    </ToolBar>
    <AnimationContainer
      :animation-data="animationData"
      :dark="!settings?.dayTime"
      :key="animationKey"
      class="animation"
    />
    <Transition name="fade" mode="in-out">
      <component :is="!settings?.dayTime ? BackgroundNight : BackgroundDay" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import 'fari-component-library/style'
import ToolBar from '@/components/ToolBar.vue'
import { ref, computed, onBeforeUnmount, onMounted, watch } from 'vue'
import AnimationContainer from '@/components/AnimationContainer.vue'
import SunIcon from '@/components/icons/SunIcon.vue'
import MoonIcon from '@/components/icons/MoonIcon.vue'
import PartCloudIcon from '@/components/icons/PartCloudIcon.vue'
import CloudIcon from '@/components/icons/CloudIcon.vue'
import ChevronLeft from '@/components/icons/ChevronLeft.vue'
import ToolbarSettings from '@/components/ToolbarSettings.vue'
import ToolbarValues from '@/components/ToolbarValues.vue'
import energyFast from '@/assets/energyAgentFast24fpsv2.json'
import energyMedium from '@/assets/energyAgentMedium24fpsv2.json'
import energySlow from '@/assets/energyAgentSlow24fpsv2.json'
import BackgroundDay from '@/components/BackgroundDay.vue'
import BackgroundNight from '@/components/BackgroundNight.vue'
import { useCsvData } from '@/composables/useCsvData'

const settings = ref<{
  temperature: number
  dayTime: boolean
  weather: 'sunny' | 'cloudy' | 'cloudy_sunny'
  season: 'autumn' | 'winter' | 'spring' | 'summer'
}>({
  season: 'autumn',
  temperature: 20,
  dayTime: true,
  weather: 'sunny'
})

const weatherIcon = computed(() => {
  if (!settings.value) return null
  if (!settings.value.dayTime) return MoonIcon
  if (settings.value.weather === 'sunny') return SunIcon
  if (settings.value.weather === 'cloudy') return CloudIcon
  if (settings.value.weather === 'cloudy_sunny') return PartCloudIcon
  return null
})

const currentTime = ref(new Date('2024-01-01T13:00:00'))
const currentTemperature = ref(settings.value.temperature)
const currentSupply = ref(0)
const currentDemand = ref(0)
const supplyMoreThanDemand = ref<boolean | null>(null)
const animationKey = ref(0)
const animationData = ref(energySlow)

const { parsedData, loadCSVFile } = useCsvData()

const file = computed(
  () =>
    `simulation_results_${settings.value.season || 'autumn'}_${settings.value.weather || 'sunny'}.csv`
)

const columnsToExtract = ['time', 'global_demand', 'local_supply', 'temperature']

watch(
  file,
  async (newFile) => {
    await loadCSVFile(newFile, columnsToExtract)
    updateLocalValues(currentTime.value)
  },
  { immediate: true }
)

const interval = setInterval(updateTime, 2083)
onBeforeUnmount(() => clearInterval(interval))

watch(currentTime, (newTime) => {
  const { supply, demand } = updateLocalValues(newTime)

  if (supply > demand === supplyMoreThanDemand.value) return
  supplyMoreThanDemand.value = supply > demand

  animationData.value = updateAnimationData(supply, demand)
})

function updateTime() {
  const now = new Date(currentTime.value.getTime() + 10 * 60 * 1000) // 10 minutes

  currentTime.value = now

  if (now.getHours() === 0 && now.getMinutes() === 0)
    currentTime.value = new Date('2024-01-01T00:00:00')

  const hours = now.getHours()
  settings.value.dayTime = hours >= 6 && hours < 18
}

function updateParsedData(now: Date) {
  const time = now.toLocaleTimeString('fr-BE', { hour: '2-digit', minute: '2-digit' })

  const rowData = parsedData.value.find((row) => row.time === time)

  const supply = Number(parseFloat(rowData?.local_supply).toFixed(3)) ?? 0
  const demand = Number(parseFloat(rowData?.global_demand).toFixed(3)) ?? 0
  const temperature = Number(parseInt(rowData?.temperature).toFixed(3)) ?? 0

  return {
    supply,
    demand,
    temperature
  }
}

function updateAnimationData(supply: number, demand: number) {
  if (!supply || !demand) return

  animationKey.value += 1
  if (supply > demand) return energySlow
  if (supply < demand) return energyFast
  return energyMedium
}

/**
 * This function updates currentSupply, currentDemand and currentTemperature.
 * @param time - The current time (type Date)
 */
function updateLocalValues(time: Date) {
  const { supply = 0, demand = 0, temperature = 0 } = updateParsedData(time)

  ;[currentSupply.value, currentDemand.value, currentTemperature.value] = [
    supply,
    demand,
    temperature
  ]
  return { supply, demand, temperature }
}
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
  font-size: 2rem;
  font-weight: 600;
  position: absolute;
  right: 16rem;
  display: flex;
  align-items: center;
  gap: 1.1rem;
}

.time-indicator {
  font-size: 2rem;
  font-weight: 600;
  position: absolute;
  right: 8rem;
  display: flex;
  align-items: center;
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
