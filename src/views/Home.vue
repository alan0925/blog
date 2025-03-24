<script setup>
import ChinaMap from '@/components/ChinaMap.vue';
</script>

<template>
  <div v-border-image class="main">
    <ChinaMap class="map"></ChinaMap>
    <!-- <img src="@/assets/img/001.png" alt=""> -->
    <div v-border-image class="ad">广告位招租</div>
  </div>


</template>

<style lang="scss" scoped>
.main {
  width: 1200px;
  margin: 20px auto;

  .map {
    padding-top: 30px;
  }

  .ad {
    width: 900px;
    height: 300px;
    text-align: center;
    line-height: 300px;
    font-size: 100px;
    margin: 100px auto;
  }
}
</style>