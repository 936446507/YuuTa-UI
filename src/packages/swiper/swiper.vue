<template>
  <div class="yt-swiper" ref="swiper">
    <ul
      class="yt-swiper__list"
      ref="swiperList"
      :style="{
        ...listStyle,
        transform: options.isVertical ? `translateY(${translate}px)` : `translateX(${translate}px)`,
        transitionDuration: isTransitionRunning && isUseTransition ? options.duration + 'ms' : '0ms',
        transitionTimingFunction: options.transitionTimingFunc
    }">
      <slot></slot>
    </ul>
    <slot name="prev-btn">
      <button
        class="yt-swiper__button yt-swiper__button--left yt-icon-font  yt-icon-left"
        v-if="options.isShowBtn && !options.isVertical"
        :disabled="!options.isLoop && curIndex === 0"
        @click="play(curIndex - 1)">
      </button>
    </slot>
    <slot name="next-btn">
      <button
        class="yt-swiper__button yt-swiper__button--right yt-icon-font yt-icon-right"
        v-if="options.isShowBtn && !options.isVertical"
        :disabled="!options.isLoop && curIndex === items.length - 1"
        @click="play(curIndex + 1)">
      </button>
    </slot>
    <div
      :class="['yt-swiper-dots', options.isVertical ? 'is-vertical': 'is-align' ]"
      v-if="options.isShowDots">
      <slot name="dots">
        <ul class="yt-swiper-dots__list">
          <li
            :class="['yt-swiper-dots__item', {active: curIndex === index}]"
            v-for="(item, index) in dotLength"
            :key="index"
            @click="play(index)">
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>

<script>
let translateMultiplier = 0
let timer = null
export default {
  name: 'yt-swiper',
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      items: [],
      listStyle: null,
      translate: 0,
      curIndex: 0,
      dotLength: 0,
      isTransitionRunning: false,
      isUseTransition: true
    }
  },
  computed: {
    translateUnit() {
      const swiperStyle = this.getSwiperStyle()
      const { isVertical, duration } = this.options
      return isVertical ? swiperStyle.height : swiperStyle.width
    },
    // 无限循环时是否切换到边界
    isLoopBoundary() {
      const { isLoop } = this.options
      const { translate, translateUnit } = this;
      const itemLength = this.items.length
      const isLoopBoundary = isLoop &&
        (
          translate > - translateUnit ||
          translate < (-(itemLength - 2) * translateUnit)
        )

      return isLoopBoundary
    }
  },
  watch: {
    isTransitionRunning(newVal, oldVal) {
      if (newVal !== oldVal && !newVal && this.isLoopBoundary) {
        const { translate, translateUnit } = this;
        const itemLength = this.items.length
        this.translate = translate - translateMultiplier * translateUnit * (itemLength - 2)
      }
    }
  },
  methods: {
    play(index) {
      if (this.isTransitionRunning) return false
      const { isLoop } = this.options
      const itemLength = this.items.length
      const minIndex = isLoop ? -1 : 0
      const maxIndex = isLoop ? itemLength - 2 : itemLength

      if (index > maxIndex || index < minIndex) return false
      clearTimeout(timer)
      this.calculateTranslate(index)
      this.setAutoPlay()
      this.isUseTransition = true
    },
    calculateTranslate(index) {
      const { curIndex, translate, translateUnit } = this
      const itemLength = this.items.length
      // 是否为一个一个切换
      const isPlayOne = index - curIndex === 1
      // 无限循环并指定索引切换时索引需加1
      const playOneIndexMultiplier = this.options.isLoop ? index + 1 : index
      // index > curIndex => right direction
      translateMultiplier = index > curIndex ? -1 : 1

      this.isTransitionRunning = true
      // 1: 一个一个切换时当前偏移量+-偏移单位量
      // 2: 指定 index切换时偏移单位量 * 索引
      this.translate = isPlayOne ?
        translate + translateMultiplier * translateUnit :
        - playOneIndexMultiplier * translateUnit
      this.curIndex = this.isLoopBoundary ?
        index + translateMultiplier * (itemLength - 2) :
        index
    },
    setAutoPlay() {
      const { options } = this
      if (!options.isAutoPlay) return false

      timer = window.setTimeout(() => {
        this.play(this.curIndex + 1)
      }, options.interval);
    },
    handleTransition() {
      const swiperList = this.$refs.swiperList
      swiperList.addEventListener('transitionend', () => {
        this.isTransitionRunning = false
        this.$emit('afterChange', this.curIndex)
      })
    },
    getSwiperStyle() {
      const swiper = this.$refs.swiper
      const width = swiper.offsetWidth
      const height = swiper.offsetHeight

      return { width, height }
    },
    // 复制第一个与最后一个节点
    cloneItemDom() {
      if (!this.options.isLoop) return false
      const listDom = this.$refs.swiperList
      const itemsDom = listDom.querySelectorAll('.yt-swiper__item')
      const itemsDomLength = itemsDom.length

      if (itemsDomLength > 1) {
        const firstDom = itemsDom[0].cloneNode(true)
        const lastDom = itemsDom[itemsDomLength - 1].cloneNode(true)

        this.$refs.swiperList.insertBefore(lastDom, itemsDom[0])
        this.$refs.swiperList.appendChild(firstDom)
      }
    },
    updateItems() {
      this.items = this.$refs.swiper.querySelectorAll('.yt-swiper__item')
      this.dotLength = this.options.isLoop && this.items.length > 0 ? this.items.length - 2 : this.items.length
    },
    setListStyle() {
      const style = {}
      const swiperStyle = this.getSwiperStyle()
      const options = this.options
      const itemLength = this.items.length

      if (!options.isVertical) {
        style.width = swiperStyle.width * itemLength + 'px'
      }

      this.listStyle = style
    },
    setItemStyle() {
      const swiperStyle = this.getSwiperStyle()
      for (let item of this.items) {
        Object.assign(
          item.style,
          {
            width: swiperStyle.width + 'px',
            heigth: swiperStyle.height + 'px'
          }
        )
      }

    },
    // 初始化swiper配置选项
    initOptions() {
      const defaultOptions = {
        isShowBtn: true,
        isShowDots: true,
        isAutoPlay: false,
        isLoop: false,
        isVertical: false, // 是否垂直切换
        initialIndex: 0,
        duration: 500,
        interval: 2500,
        transitionTimingFunc: 'ease-in' // linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);
      }
      Object.assign(this.options, { ...defaultOptions, ...this.options })
    },
    initTranslate() {
      const { isLoop, initialIndex } = this.options
      const indexMultiplier = isLoop ? initialIndex + 1 : initialIndex

      this.translate = - indexMultiplier * this.translateUnit
    },
    // 暴露方法
    goTo(activeItem, isUseTransition) {
      // activeItem： string || number
      // string时为子组件props name 属性值
      // number 为索引
      let activeIndex = activeItem
      if (typeof activeItem === 'string') {
        const items = this.$children.filter(child => child.$options.name === 'swiper-item')
        for (let [index, item] of items.entries()) {
          if (item.name === activeItem) {
            activeIndex = index
          }
        }
      }
      this.play(activeIndex)
      // isUseTransition为false时不使用过渡效果切换
      if (typeof isUseTransition === 'boolean') {
        this.isUseTransition = isUseTransition
      }
    },
    next() {
      this.play(this.curIndex + 1)
    },
    prev() {
      this.play(this.curIndex - 1)
    }
  },
  created() {
    this.initOptions()
  },
  mounted() {
    const { options } = this
    this.handleTransition()
    this.initTranslate()
    options.isLoop && this.cloneItemDom()
    this.updateItems()

    this.setListStyle()
    this.setItemStyle()

    options.isAutoPlay && this.setAutoPlay()
  },
  beforeDestroy() {
    window.clearTimeout(timer)
  }
}
</script>

<style lang="scss">
.yt-swiper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  &__list {
    width: 100%;
    height: 100%;
    transition-property: transform;
    // transition: transform 1s ease-in;
  }
  &__button {
    position: absolute;
    top: 50%;
    width: 24px;
    height: 24px;
    transform: translateY(-50%);
    background-color: transparent;
    font-size: 24px;
    padding: 0;
    border: none;
    outline: none;
    cursor: pointer;
    &--left {
      left: 0;
    }
    &--right {
      right: 0;
    }
  }
  &-dots {
    position: absolute;
    &__item {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #ccc;
      cursor: pointer;
      &.active {
        background: #007aff;
      }
      &:first-child {
        margin-left: 0;
      }
    }
    &.is-align {
      left: 50%;
      bottom: 25px;
      transform: translate(-50%, 0);
      .yt-swiper-dots__item {
        display: inline-block;
        vertical-align: middle;
        margin-left: 6px;
      }
    }
    &.is-vertical {
      right: 25px;
      top: 50%;
      transform: translate(0, -50%);
      .yt-swiper-dots__item {
        margin-top: 6px;
        &:first-child {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
