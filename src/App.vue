<template>
  <div class="layout">
    <FButtonIcon type="tooltip" class="tooltip" @click="toggleCard" />
    <div class="heading">
      <div class="title">
        <FTitle class="title"> Smart energy</FTitle>
        <FTitle class="title"> communities</FTitle>
      </div>
      <FSubTitle class="subtitle"> Energy / Resource optimization </FSubTitle>
    </div>

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
    <FFooter class="footer" />
    <AnimationContainer :animation-data="animationData" />
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
  FSlideTransition
} from 'fari-component-library'
import AnimationContainer from './components/AnimationContainer.vue'
import animationData from './assets/smartgridNoTitle24fps.json'
import { useDataStore } from './stores/dataStore'
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const showCard = ref(false)

// const Animation = () => import('./assets/smartgridNoTitle24fps.json');

const { data, loading, error, locale } = storeToRefs(useDataStore())
const { getData, setLocale } = useDataStore()

onMounted(getData)

const toggleCard = () => (showCard.value = !showCard.value)
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
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
</style>
