import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import http from './http'
import axios from 'axios'
import 'vant/lib/index.css';
import 'lib-flexible/flexible.js'
import FastClick from 'fastclick'
import { Lazyload } from 'vant';
import { ImagePreview } from 'vant';
import { Field } from 'vant';
import { Toast } from 'vant';

Vue.use(Toast);
Vue.use(Field);
Vue.use(ImagePreview);
Vue.prototype.$axios = http
import { TreeSelect } from 'vant';

Vue.use(TreeSelect);
import {
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn
} from 'vant';

Vue
    .use(GoodsAction)
    .use(GoodsActionBigBtn)
    .use(GoodsActionMiniBtn);
Vue.use(Lazyload);
Vue.config.productionTip = false
Vue.use(Vant);
FastClick.attach(document.body);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
