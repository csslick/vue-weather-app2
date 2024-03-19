import { defineStore } from 'pinia'

// store 만들기
export const useStore = defineStore('main', {
  state: () => ({
    // initial state
    count: 0,
    weatherData: {
      icon: 'icon',
      temp: 0,
      text: 'text',
      location: 'location',
      city: 'Seoul',
    },
    toggle: false, // true일때 about을 보여주기
  }),
  actions: {
    addCount(palyload) { 
      this.count += 1 + palyload;
    },
    updateWeather(payload) {
      this.weatherData.icon = payload.weather[0].icon;
      this.weatherData.temp = payload.main.temp;
      this.weatherData.text = payload.weather[0].description;
      this.weatherData.location = payload.sys.country;
      this.weatherData.city = payload.name;
    },
    onSearchCity(payload) {
      this.weatherData.city = payload;
    },
    toggleButton () {
      this.toggle = !this.toggle
    },
    async getWeather() {
      const API_KEY = import.meta.env.VITE_API_KEY;
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.weatherData.city}&appid=${API_KEY}`
      await fetch(API_URL)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          // 날씨 정보 업데이트
          this.updateWeather(data); // 날씨 정보 업데이트
        })
        .catch(err => {
          alert('에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        })
    }
  }
})