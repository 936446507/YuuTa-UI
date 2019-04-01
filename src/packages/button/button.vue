<template>
  <button
    :class="[
      'yt-button',
      'yt-button--' + type,
      { 'is-plain': plain },
      { 'is-round': round },
      { 'is-circle': circle }
    ]"
    @click="click">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'yt-button',
  props: {
    type: {
      type: String,
      default : 'default'
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    }
  },
  click() {
    this.$emit('click')
  }
}
</script>
