import Vue from 'vue';
import VueJwtDecode from 'vue-jwt-decode';
import App from './App.vue';
import router from './router';
import store from './store';

import './plugins/bootstrap-vue';

Vue.config.productionTip = false;

Vue.use(VueJwtDecode);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
