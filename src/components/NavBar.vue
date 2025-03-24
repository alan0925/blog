<script setup>
import { onMounted, ref, defineProps, defineEmits } from 'vue'
const props = defineProps(['rain']);
const emit = defineEmits(['toggleRain']);


const pages = ['/home', '/article', '/board']
let index = ref(0)
let rain = props.rain
let play = ref(false)
const audio = ref(null)
function getIndex() {
  for (let i = 0; i < pages.length; i++) { // 使用标准的for循环语法
    if (window.location.pathname.startsWith(pages[i])) { // 使用正确的字符串方法
      return i;
    }
  }
  return 0; // 如果没有匹配，默认返回0或其他值
}
function togglePlay() {
  console.log('click');
  if (play.value) {
    audio.value.pause()
    play.value = !play.value
  } else {
    audio.value.volume = 0.05;
    audio.value.play()
    play.value = !play.value
  }
}
function toggleRain() {
  emit('toggleRain')
}
onMounted(() => {
  index.value = getIndex()
})
</script>
<template>
  <div v-border-image class="nav">
    <div v-border-image :class="['home', { 'active': index == 0 }]" @click="index = 0">
      <router-link to="/home">主页</router-link>
    </div>
    <div v-border-image :class="['article', { 'active': index == 1 }]" @click="index = 1">
      <router-link to="/article">文章</router-link>
    </div>
    <div v-border-image :class="['message', { 'active': index == 2 }]" @click="index = 2">
      <router-link to="/board">吐槽</router-link>
    </div>
    <div class="blank"></div>
    <div :class="['iconfont', play ? 'icon-bofanganniuxhdpi' : 'icon-zantinganniu']" @click="togglePlay"></div>
    <div class="iconfont icon-a-shuangweianniukongzhideanruzhuangtai" @click="toggleRain"></div>
    <div class="iconfont icon-tuichu"></div>
  </div>
  <audio ref="audio" loop autoplay>
    <source src="@/assets/audio/gee.mp3" />
  </audio>
</template>
<style lang="scss" scoped>
.nav {
  width: 1250px;
  height: 100px;
  margin: 10px auto;
  display: flex;

  .blank {
    flex: 1;
  }

  .home,
  .article,
  .message {
    margin: 10px 10px;

    a {
      width: 200px;
      display: block;
      text-decoration: none;
      color: black;
      padding: 15px 10px;
      height: 70px;
      line-height: 50px;
      text-align: center;
    }


    // &:hover {
    //   cursor: pointer;
    // }

    &:not(.active):hover {
      background-color: #eee;
    }
  }

  .iconfont {
    line-height: 80px;
    width: 50px;
    height: 80px;
    font-size: 30px;
    color: #aaa;
    text-align: center;
    margin: 10px 10px;

    &:hover {
      cursor: pointer;
      color: #777;
    }

    &.icon-a-shuangweianniukongzhideanruzhuangtai {
      font-size: 40px;
    }

    &.icon-tuichu {
      font-size: 25px;
    }

    &.icon-bofanganniuxhdpi {
      animation: rotate 6s linear infinite;
    }
  }

  .active {
    background-color: #ddd;
  }

  @keyframes rotate {
    0% {
      rotate: 0deg;
    }

    100% {
      rotate: 360deg;
    }
  }
}
</style>