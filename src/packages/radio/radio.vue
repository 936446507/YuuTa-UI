<template>
  <label class="yt-radio">
    <span class="yt-radio__input">
      <span class="yt-radio__inner"></span>
      <input type="radio" class="yt-radio__original">
    </span>
    <span class="yt-radio__label">radio</span>
  </label>
</template>

<script>
export default {
  name: 'yt-radio'
}
</script>

<style lang="scss">
@import '../../assets/scss/radio.scss';
</style>
