import YTSwiperItem from '../swiper/swiper-item'

YTSwiperItem.install = function(Vue) {
  Vue.component(YTSwiperItem.name, YTRadio);
};

export default YTSwiperItem;
