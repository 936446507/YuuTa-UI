<template>
  <button
    :disabled="disabled"
    :class="[
      'yt-button',
      'yt-button--' + type,
      'yt-button--' + size,
      { 'is-plain': plain },
      { 'is-round': round },
      { 'is-circle': circle },
      { 'is-disabled': disabled }
    ]"
    @click="click">
    <i v-if="icon" :class="icon"></i>
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
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: String,
    icon: String
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>
