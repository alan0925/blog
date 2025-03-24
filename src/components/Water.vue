<script setup>
import { ref, computed } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['water']);
const emit = defineEmits(['removeWater']);

const icons = ref(['none', 'icon-jiaoshuifei', 'icon-liquidityProviding', 'icon-JFrog']);
let top = ref('-100px')
let currentIconIndex = ref(1);
let dropDistance = `${props.water.y + 100}px`;
let color = getRandomColor()
let dropDuration = computed(() => {
  return `${(props.water.y + 100) / 500}s`
})

console.log(props.water.x, props.water.y, dropDistance);


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16) + '80'
}

function switchIcon(e) {
  console.log(currentIconIndex.value);

  if (currentIconIndex.value == 1) {
    top.value = `${props.water.y}px`;
  }
  currentIconIndex.value++;
  if (currentIconIndex.value == icons.value.length) {
    console.log('remove', props.water.id);
    emit("removeWater", props.water.id)
  }
}
</script>

<template>
  <span :class="['iconfont', icons[currentIconIndex]]" @animationend="switchIcon" :style="{
    top: top,
    left: `${props.water.x}px`,
    color: color,
    '--drop-druation': dropDuration,
    '--drop-distance': dropDistance
  }"></span>
</template>

<style scoped>
.iconfont {
  font-size: 14px;
  position: fixed;
  pointer-events: none;
  z-index: 3;
}

.icon-jiaoshuifei {
  animation: rainDrop var(--drop-druation) ease-in forwards;
}

.icon-liquidityProviding {
  animation: hit 0.2s;
}

.icon-JFrog {
  animation: fly 0.3s;
}

/* 自由落体动画 */
@keyframes rainDrop {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(var(--drop-distance));
  }
}

/* 撞击动画 */
@keyframes hit {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0.6;
  }
}

/* 飞溅动画 */
@keyframes fly {
  0% {
    opacity: 0.6;
  }

  100% {
    opacity: 0;
  }
}
</style>