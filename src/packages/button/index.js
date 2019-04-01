import YTButton from './button';

YTButton.install = function(Vue) {
  Vue.component(YTButton.name, YTRadio);
};

export default YTButton;
