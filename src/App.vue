<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Water from './components/Water.vue';

let waters = ref([])
let rain = ref(false)

const handleClick = (event) => {
  // 将点击位置的坐标作为对象添加到 waters 数组中
  if (rain.value) {
    waters.value.push({
      x: event.clientX,
      y: event.clientY,
      id: Date.now()
    });
  }
}
const toggleRain = () => {
  waters.value = []
  rain.value = !rain.value
}
onMounted(() => {
  window.addEventListener('click', handleClick);
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClick);
})

const removeWater = (id) => {
  waters.value = waters.value.filter(water => water.id !== id);
}

</script>

<template>
  <div class="page" @click="handleClick">
    <NavBar :rain="rain" @toggleRain="toggleRain"></NavBar>
    <RouterView></RouterView>
    <div v-if="rain">
      <Water v-for="item in waters" :key="item.id" :water="item" @remove="removeWater"></Water>
    </div>
  </div>

</template>

<style scoped>
.page {
  width: 100%;
  min-width: 1250px;
}
</style>
