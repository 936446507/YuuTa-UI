<template>
  <li
    :class="[
      'yt-swiper__item',
      { 'is-vertical': $parent.options.isVertical }
    ]">
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: 'yt-swiper-item',
  props: {
    name: String  // 幻灯片的名字，可用作 goTo 的参数
  }
}
</script>

<style lang="scss">
.yt-swiper__item {
  display: inline-block;
  vertical-align: top;
  height: 100%;
  &.is-vertical {
    display: block;
  }
}
</style>