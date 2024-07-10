<template>
  <div class="settings">
    <FDropdown
      v-model="settingsOpen"
      location="bottom-left"
      icon="settings"
      class="bg-color-blue mt-l"
      on-dark
      small
    >
      <div class="weather-menu rounded-s">
        <span class="font-weight-medium font-size-body"> Temperature </span>
        <FSlider v-model="temperature" min="0" max="40" step="1" icon="temperature" />

        <span class="font-weight-medium font-size-body"> Weather </span>
        <div class="weather-selector">
          <label class="button-container">
            <div
              class="weather-button"
              :class="weather === 'sunny' ? 'bg-color-blue' : 'bg-color-blue-light'"
            >
              <SunOutline />
              <input type="radio" v-model="weather" value="sunny" />
            </div>
            Sunny
          </label>
          <label class="button-container">
            <div
              class="weather-button"
              :class="weather === 'cloudy' ? 'bg-color-blue' : 'bg-color-blue-light'"
            >
              <CloudOutline />
              <input type="radio" v-model="weather" value="cloudy" />
            </div>
            Cloudy
          </label>

          <label class="button-container">
            <div
              class="weather-button"
              :class="weather === 'overcast' ? 'bg-color-blue' : 'bg-color-blue-light'"
            >
              <PartCloud />
              <input type="radio" v-model="weather" value="overcast" />
            </div>
            Cloud/Sun
          </label>
        </div>
      </div>
      <!-- <Transition name="slide-left">
      <div 
        v-if="settingsView === 'main'" 
        class="rounded-s main-menu"
      >
        <div class="dropdown-item rounded-s">
          <span class="font-weight-medium font-size-body"> Daytime </span>
          <FSwitch v-model="dayTime" />
        </div>
        <div class="dropdown-item rounded-s" @click="settingsView = 'temperature'">
          <span class="font-weight-medium font-size-body"> Weather / Temperature </span>
          <ChevronRight />
        </div>
      </div>
      </Transition>

      <Transition name="slide-right">
        <div 
          v-if="settingsView === 'temperature'" 
          class="weather-menu rounded-s"
        >
        <span class="font-weight-medium font-size-body"> Temperature </span>
        <FSlider v-model="temperature" min="0" max="40" step="1" icon="temperature" />

        <span class="font-weight-medium font-size-body"> Weather </span>
        <div class="weather-selector">
          <label class="button-container">
            <div
              class="weather-button"
              :class="weather === 'sunny' ? 'bg-color-blue' : 'bg-color-blue-light'"
            >
              <SunOutline />
              <input type="radio" v-model="weather" value="sunny" />
            </div>
            Sunny
          </label>
          <label class="button-container">
            <div
              class="weather-button"
              :class="weather === 'cloudy' ? 'bg-color-blue' : 'bg-color-blue-light'"
            >
              <CloudOutline />
              <input type="radio" v-model="weather" value="cloudy" />
            </div>
            Cloudy
          </label>

          <label class="button-container">
            <div
              class="weather-button"
              :class="weather === 'overcast' ? 'bg-color-blue' : 'bg-color-blue-light'"
            >
              <PartCloud />
              <input type="radio" v-model="weather" value="overcast" />
            </div>
            Cloud/Sun
          </label>
        </div>

        <FDivider class="bg-color-blue-light" />
        <div role="button" class="back-button" @click="settingsView = 'main'">
          <ChevronLeft />
          <span class="color-blue-light font-weight-medium"> Back </span>
        </div>
      </div>
    </Transition> -->
    </FDropdown>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FDropdown, FSlider, FDivider, FSwitch } from 'fari-component-library'
import SunOutline from '@/components/icons/SunOutline.vue'
import CloudOutline from '@/components/icons/CloudOutline.vue'
import PartCloud from '@/components/icons/PartCloud.vue'
// import ChevronLeft from '@/components/icons/ChevronLeft.vue'
// import ChevronRight from '@/components/icons/ChevronRight.vue'

type Weather = 'sunny' | 'cloudy' | 'overcast'

const temperature = ref(21)
const dayTime = ref(true)
const weather = ref<Weather>('sunny')
const settingsOpen = ref(false)
// const settingsView = ref<'main' | 'temperature'>('main')

defineExpose({
  temperature,
  dayTime,
  weather
})
</script>

<style scoped lang="scss">
.settings {
  margin-left: 2rem;
}

:deep() {
  .dropdown-menu {
    width: fit-content;
    height: fit-content;
    .content {
      width: 400px;
      padding: 1rem;
      transition: 400ms ease-in-out;
      overflow: hidden;
      display: flex;
    }
  }
}

.main-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 136px;
}

.weather-menu {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  // height: 230px;

  .dropdown-text {
    color: white;
    font-size: 1.25rem;
    font-weight: 500;
  }
}

.dropdown-item {
  border-radius: 12px;
  background: #2f519c;
  display: flex;
  padding: 8px 16px;
  justify-content: flex-end;
  align-items: center;
  gap: 220px;
}

.weather-selector {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.weather-button {
  border-radius: 999px;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;

  input[type='radio'] {
    -webkit-appearance: none;
    appearance: none;
    position: absolute;
  }
}

.back-button {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.6rem;
}

.weather-indicator {
  font-size: 3.5rem;
  font-weight: 600;
  position: absolute;
  right: 10rem;
}

.title {
  strong {
    font-size: 20px;
  }
  font-size: 18px;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.25s ease-out;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(-10rem);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-10rem);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.2s ease-out;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.25s ease-out;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(10rem);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(10rem);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.2s ease-out;
}
</style>
