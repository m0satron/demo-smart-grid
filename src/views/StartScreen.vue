<template>
  <div class="view">
    <FButtonIcon name="tooltip" class="tooltip" color="blue-light" small @click="toggleCard" />
    <div class="heading">
      <div class="title">
        <FTitle class="title"> Smart energy</FTitle>
        <FTitle class="title"> communities</FTitle>
      </div>
      <FSubTitle class="subtitle"> Energy / Resource optimization </FSubTitle>
    </div>

    <FButton
      label="Start"
      type="primary"
      class="start-button"
      on-dark
      @click="$emit('start-demo')"
    />

    <FSlideTransition :show="showCard">
      <FCard v-if="showCard" @close="toggleCard" @update:locale="setLocale" class="card">
        {{ data.explanation_short[locale] }}

        <div class="researchers-container">
          <span class="researchers">
            research head: <span class="research-head color-black"> {{ data.research_head }} </span>
          </span>
          <span class="researchers">
            research lead: <span class="research-lead color-black"> {{ data.research_lead }} </span>
          </span>
        </div>
        <template #footer> <div v-if="data.logo" v-html="data.logo"></div> </template>
      </FCard>
    </FSlideTransition>
    <div class="backdrop" :class="{ 'backdrop-active': showCard }"></div>
    <FFooter class="footer" />
    <AnimationContainer :animation-data="animationData" />
    <BackgroundDay />
  </div>
</template>

<script setup lang="ts">
import 'fari-component-library/style'
import {
  FTitle,
  FSubTitle,
  FFooter,
  FButtonIcon,
  FCard,
  FSlideTransition,
  FButton
} from 'fari-component-library'
import AnimationContainer from '@/components/AnimationContainer.vue'
import animationData from '@/assets/smartgridNoTitle24fpsRedux.json'
import { useDataStore } from '@/stores/dataStore'
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import BackgroundDay from '@/components/BackgroundDay.vue'

const showCard = ref(false)

const { data, loading, error, locale } = storeToRefs(useDataStore())
const { getData, setLocale } = useDataStore()

onMounted(getData)

const toggleCard = () => (showCard.value = !showCard.value)
</script>

<style scoped lang="scss">
.view {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  width: 100%;
}

.heading {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space;
  margin-top: 6rem;
  .title {
    gap: 1rem;
    display: flex;
    flex-direction: column;
  }
}

.start-button {
  display: inline-block;
  width: auto;
  max-width: 200px;
  margin: auto;
}

.tooltip {
  position: absolute;
  top: 5rem;
  right: 37rem;
}

.footer {
  margin-top: auto;
  margin-bottom: 1.8rem;
}

.subtitle {
  font-family: 'Rhetorik';
  color: #64d8bf;
}

.card {
  position: absolute;
  top: 25%;
  left: 20%;
  z-index: 2;
}

.researchers-container {
  margin-top: auto;
  display: flex;
  flex-direction: column;
}

.researchers {
  color: #888;
  text-transform: uppercase;
}

.research-head,
.research-lead {
  text-transform: none;
}

.backdrop {
  visibility: hidden;
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(0);
  z-index: 1;
  transition: all 100ms;

  &-active {
    visibility: visible;
    opacity: 1;
    backdrop-filter: blur(2px);
    transition: all 300ms;
  }
}
</style>
