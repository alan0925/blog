<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
// const mouseX = ref(0);
// const mouseY = ref(0);
const leftEyeBall = ref(null)
const rightEyeBall = ref(null)

//文档宽高
let docWidth = document.documentElement.scrollWidth;
let docHeight = document.documentElement.scrollHeight;
//各个标签大小
let eyeSize = 100
let faceSize = 300
let eyeballSize = 2
let eyeballActiveDistance = eyeSize / 2 - 10 - eyeballSize / 2 - 12
//face 边界距离
let borderLeftX = docWidth / 2 - faceSize / 2
let borderRightX = docWidth / 2 + faceSize / 2
let borderTopY = 220
let borderBottomY = 520
//eyeBall初始坐标
let pointLeftX = docWidth / 2 - eyeSize
let pointRightX = docWidth / 2 + eyeSize
let pointY = borderTopY + eyeSize / 2

function updateMousePosition(event) {
  let mouseX = event.pageX;
  let mouseY = event.pageY;
  //在face内部，eyeBall不移动
  if (mouseX > borderLeftX &&
    mouseX < borderRightX &&
    mouseY > borderTopY &&
    mouseY < borderBottomY) {
    leftEyeBall.value.style.left = 38 + 'px'
    rightEyeBall.value.style.left = 38 + 'px'
    leftEyeBall.value.style.top = 38 + 'px'
    rightEyeBall.value.style.top = 38 + 'px'
    return
  }

  let isLeft = mouseX < docWidth / 2
  let isTop = mouseY < borderTopY
  let leftHorDis = Math.abs(pointLeftX - mouseX)
  let rightHorDis = Math.abs(pointRightX - mouseX)
  let verDis = Math.abs(pointY - mouseY)

  //计算距离百分比
  let leftMov = isLeft ? -leftHorDis / pointLeftX : leftHorDis / (docWidth - pointLeftX)
  let rightMov = isLeft ? -rightHorDis / pointRightX : rightHorDis / (docWidth - pointRightX)
  let verMov = isTop ? - verDis / pointY : verDis / (docHeight - pointY)
  leftMov = leftMov / Math.sqrt(leftMov * leftMov + verMov * verMov)
  rightMov = rightMov / Math.sqrt(rightMov * rightMov + verMov * verMov)
  let leftverMov = verMov / Math.sqrt(leftMov * leftMov + verMov * verMov)
  let rightverMov = verMov / Math.sqrt(rightMov * rightMov + verMov * verMov)

  leftEyeBall.value.style.left = 38 + eyeballActiveDistance * leftMov + 'px'
  rightEyeBall.value.style.left = 38 + eyeballActiveDistance * rightMov + 'px'
  leftEyeBall.value.style.top = 38 + eyeballActiveDistance * leftverMov + 'px'
  rightEyeBall.value.style.top = 38 + eyeballActiveDistance * rightverMov + 'px'
  // console.log(leftEyeBall.value.style.left, rightEyeBall.value.style.left);
}

function throttle(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  }
}

const throttledUpdateMousePosition = throttle(updateMousePosition, 100); // 例如每100ms触发一次
onMounted(() => {
  window.addEventListener('mousemove', throttledUpdateMousePosition);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', throttledUpdateMousePosition);
});
</script>

<template>
  <div v-border-image class="face">
    <div class="eyes">
      <div class="left">
        <div ref='leftEyeBall' class="iconfont icon-yuan eyeball"></div>
      </div>
      <div class="blank"></div>
      <div class="right">
        <div ref='rightEyeBall' class="iconfont icon-yuan eyeball"></div>
      </div>
    </div>
    <input type="text" name="" id="" class="mouse cancle">
  </div>
  <button ref="btn1"></button><button ref="btn2"></button><button ref="btn3"></button>
</template>

<style lang="scss" scoped>
.face {
  width: 300px;
  height: 300px;
  position: relative;
  margin: 0 auto;
  top: 10px;

  .eyes {
    display: flex;

    .left,
    .right {
      text-align: center;
      color: #666;
      width: 80px;
      height: 80px;
      margin: 10px;
      background-size: contain;
      background-position: center;
      position: relative;
      background-image: url('../assets/iconfont/circle.svg');

      .eyeball {
        font-size: 4px;
        color: black;
        position: absolute;
        left: 38px;
        top: 38px;
        line-height: 4px;
        transition: all 0.1s ease;
      }
    }

    .blank {
      flex: 1;
    }
  }

  .mouse {
    margin: 50px auto;
    border-bottom-left-radius: 100px;
    border-bottom-right-radius: 100px;

    display: block;
    outline: none;
    width: 200px;
    height: 100px;
    border: 1px solid black;
    transition: 0.5s;

    &.exit {
      margin-top: 50px;
      border-top-left-radius: 100px;
      border-top-right-radius: 100px;
    }

    &.cancle {
      margin-top: 50px;
      border-bottom-left-radius: 100px;
      border-bottom-right-radius: 100px;
    }
  }

  &:hover {
    .mouse {
      height: 30px;
      margin-top: 85px;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }
  }
}
</style>
