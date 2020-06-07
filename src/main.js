import Vue from 'vue';
import App from './App.vue';
import router from './router';

import './plugins/bootstrap-vue';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    document.title = to.name;
    next();
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
