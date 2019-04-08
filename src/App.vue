<template>
  <div id="app">
    <yt-radio></yt-radio>
    <div>
      <yt-button>默认按钮</yt-button>
      <yt-button type="primary">主要按钮</yt-button>
      <yt-button type="success">成功按钮</yt-button>
      <yt-button type="info">信息按钮</yt-button>
      <yt-button type="warning">警告按钮</yt-button>
      <yt-button type="danger">危险按钮</yt-button>
    </div>

    <div>
      <yt-button plain>朴素按钮</yt-button>
      <yt-button type="primary" plain>主要按钮</yt-button>
      <yt-button type="success" plain>成功按钮</yt-button>
      <yt-button type="info" plain>信息按钮</yt-button>
      <yt-button type="warning" plain>警告按钮</yt-button>
      <yt-button type="danger" plain>危险按钮</yt-button>
    </div>

    <div>
      <yt-button round>圆角按钮</yt-button>
      <yt-button type="primary" round>主要按钮</yt-button>
      <yt-button type="success" round>成功按钮</yt-button>
      <yt-button type="info" round>信息按钮</yt-button>
      <yt-button type="warning" round>警告按钮</yt-button>
      <yt-button type="danger" round>危险按钮</yt-button>
    </div>

    <div>
      <yt-button icon="yt-icon-search" circle></yt-button>
      <yt-button type="primary" icon="yt-icon-edit" circle></yt-button>
      <yt-button type="success" icon="yt-icon-check" circle></yt-button>
      <yt-button type="info" icon="yt-icon-message" circle></yt-button>
      <yt-button type="warning" icon="yt-icon-star-off" circle></yt-button>
      <yt-button type="danger" icon="yt-icon-dytete" circle></yt-button>
    </div>

    <div>
      <yt-button-group>
        <yt-button type="primary" icon="el-icon-arrow-left">上一页</yt-button>
        <yt-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></yt-button>
        <yt-button type="primary" icon="el-icon-arrow-left">上一页</yt-button>
        <yt-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></yt-button>
      </yt-button-group>
    </div>

    <div class="swiper-wrapper" style="width: 500px; height: 300px;">
      <yt-swiper :options="{isLoop: true, isVertical: false, isAutoPlay: true}">
          <yt-swiper-item v-for="n in 6" :key="n" :name="`name${n}`">
            <div style="width: 100%; height: 100%; border: 1px solid #ccc; box-sizing: border-box;">{{ n }}</div>
          </yt-swiper-item>
      </yt-swiper>
    </div>
  </div>
</template>

<script>
import YTRadio from './packages/radio/radio'
import YTButton from './packages/button/button'
import YTButtonGroup from './packages/button/button-group'
import YTSwiper from './packages/swiper/swiper'
import YTSwiperItem from './packages/swiper/swiper-item'
export default {
  name: 'app',
  components: {
    'yt-radio': YTRadio,
    'yt-button': YTButton,
    'yt-button-group': YTButtonGroup,
    'yt-swiper': YTSwiper,
    'yt-swiper-item': YTSwiperItem
  },
  data () {
    return {
      msg: 'Wytcome to Your Vue.js App'
    }
  }
}
</script>

<style>

</style>
