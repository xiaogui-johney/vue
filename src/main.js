// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import AMap from 'vue-amap';
Vue.use(ElementUI);
Vue.use(AMap);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: 'b5c01ba69981f753a6f469bbfa16937e',
  // 插件集合 （插件按需引入）
  // plugin: ['AMap.Geolocation', 'AMap.MouseTool']
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder'],
  v: '1.4.4',
  uiVersion: '1.0'
});
