<script setup>
import Avatar from '@/components/Avatar.vue';
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router';
let pwd = ref('')
const router = useRouter();




function loginCheck() {
  console.log(pwd.value);

  if (pwd.value === '1234') {
    router.push('/home');
  } else {
    alert('error')
  }
}


</script>

<template>
  <div class="login" v-border-image>
    <Avatar></Avatar>
    <div v-border-image class="token">
      <input type="text" name="" id="" v-model="pwd" @keyup.enter="loginCheck">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  width: 600px;
  height: 450px;
  position: relative;
  margin: 100px auto;

  &.login::before {
    content: "";
  }

  .token {
    width: 400px;
    margin: 50px auto;
    height: 50px;
    position: relative;

    input {
      position: absolute;
      width: 380px;
      height: 42px;
      top: 4px;
      left: 10px;
      border: none;
      outline: none;
    }
  }
}
</style>