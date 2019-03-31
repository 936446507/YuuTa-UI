<template>
  <div id="app">
    <yt-radio></yt-radio>
  </div>
</template>

<script>
import YTRadio from './packages/radio/radio'
export default {
  name: 'app',
  components: {
    'yt-radio': YTRadio
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>

</style>
