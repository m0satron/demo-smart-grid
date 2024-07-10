<template>
  <div class="center-toolbar">
    <div class="supply-demand">
      <span class="color-blue-light">
        Demand: <span class="color-white demand"> &nbsp;&nbsp;{{ $props.demand }} KWh </span></span
      >
      <br />
      <span class="color-blue-light">
        Supply: <span class="color-white supply"> &nbsp;&nbsp;{{ $props.supply }} KWh</span></span
      >
      <br />
    </div>
    <EnergyCoin />
    <div class="coin-value">
      <TrendUp /> <span class="color-white"> + 7.00 EUR </span> <br />
      <span> + 0.36%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import EnergyCoin from '@/components/icons/EnergyCoin.vue'
import TrendUp from '@/components/icons/TrendUp.vue'

defineProps<{
  demand: number
  supply: number
}>()
</script>

<style scoped lang="scss">
.center-toolbar {
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
  width: 37.5rem;
}

.supply-demand {
  width: 300px;
  position: relative;
  left: -10rem;
  text-align: right;
}

.coin-value {
  width: 300px;
  position: relative;
  right: 0;
  text-align: right;
}

.demand,
.supply {
  position: absolute;
  right: -6rem;
}
</style>
