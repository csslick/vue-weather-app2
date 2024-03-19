<script setup>
  import Navbar from './components/Navbar.vue';
  import MainComp from './components/MainComp.vue';
  import About from './components/About.vue';
  import { ref, onMounted } from 'vue';
  // import { useStore } from 'vuex';
  import { useStore } from './store/store';
  import { storeToRefs } from 'pinia';
  const store = useStore();
  const { weatherData, toggle } = storeToRefs(store); // state만 가져옴(action은 불가)

  // 앱이 실행되면 날씨 데이터 가져오기
  onMounted(() => {
    // store.dispatch('getWeather');
    store.getWeather(); // action 실행(메소드는 store객체로 호출 가능)
  })

  // const onSearchCity = (city) => {
  //   weatherData.value.city = city;
  //   getWeather();
  // }
</script>

<template>
  <Navbar/>
  <!-- <div v-if="!$store.state.toggle"> -->
  <div v-if="!toggle">
    <MainComp/>
  </div>
  <div v-else>
    <About/>
  </div>
</template>

