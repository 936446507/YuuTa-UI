import YTButton from './packages/button'
import YTButtonGroup from './packages/button-group'
import YTRadio from './packages/radio'
import YTSwiper from './packages/swiper'
import YTSwiperItem from './packages/swiper-item'

import './assets/font/iconfont.css';

const components = [
  YTButton,
  YTButtonGroup,
  YTRadio,
  YTSwiper,
  YTSwiperItem
]

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  YTRadio,
  YTButton,
  YTButtonGroup
}
