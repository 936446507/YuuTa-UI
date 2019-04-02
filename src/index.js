import YTButton from './packages/button'
import YTButtonGroup from './packages/button-group'
import YTRadio from './packages/radio'

const components = [
  YTRadio,
  YTButton,
  YTButtonGroup
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
