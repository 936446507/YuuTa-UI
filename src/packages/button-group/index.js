import YTButtonGroup from '../button/button-group';

YTButtonGroup.install = function(Vue) {
  Vue.component(YTButtonGroup.name, YTRadio);
};

export default YTButtonGroup;
