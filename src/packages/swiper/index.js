import YTSwiper from '../swiper/swiper'

YTSwiper.install = function(Vue) {
  Vue.component(YTSwiper.name, YTRadio);
};

export default YTSwiper;
