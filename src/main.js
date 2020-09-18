import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局css样式引入
import "./assets/css/common.css";
import "./assets/css/eleme.css";

// 引入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import global_ from './components/Global'; //引用文件
Vue.prototype.nyy = global_; //挂载到Vue实例上面

// 引入面包屑组件
import crumb from './components/crumb';
Vue.use(crumb);
// 引入头部组件
import divbar from './components/divbar';
Vue.use(divbar);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
