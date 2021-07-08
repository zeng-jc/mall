import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from "components/content/toast";//会默认找到index文件
import VueLazyLoad from "vue-lazyload";

Vue.config.productionTip = false
Vue.config.devtools = true;

//安装toast插件，这里会自动执行toast的install方法
Vue.use(toast);

Vue.use(VueLazyLoad,{
  error: require('./assets/img/common/placeholder.png'),
  loading: require('./assets/img/common/placeholder.png')
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
