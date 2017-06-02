import Vue from 'vue'
import Router from 'vue-router'
import LiveDetail from '@/components/live-detail'


Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'LiveDetail',
      component: LiveDetail
    }
  ],
  mode: 'history'
});
