

<template>
<div class="layout">

  <div class="heading">
    <FTitle class="title"> Smart energy communities </FTitle>
    <FSubTitle class="subtitle"> Energy / Resource optimization </FSubTitle>
  </div>
  <!-- <FButton label="START DEMO"  class="button "/> -->
  <FFooter class="footer"/>
    <!-- <div class="wrapper bg-color-gray">
    </div> -->
  <AnimationContainer :animation-data="animationData" />
    </div>
</template>

<script setup lang="ts">
import 'fari-component-library/style';
import { FTitle, FSubTitle, FFooter  } from 'fari-component-library'
import AnimationContainer from './components/AnimationContainer.vue';
import animationData from './assets/smartgridNoTitle.json'
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
  margin-top: 140px;
}

.footer {
  margin-top: auto;
  margin-bottom: 1.8rem;
}

.subtitle {
  font-family: 'Rhetorik';
}

.button {
width: 14rem;
}

</style>
