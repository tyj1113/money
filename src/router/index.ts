import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/views/NotFound.vue';
import AddLabel from '@/views/AddLabel.vue';
import Detailed from '@/views/Detailed.vue'

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/money'
  },
  {
    path: '/money',
    component: Money,
  },
  {
    path: '/labels',
    component: Labels,
  },

  {
    path: '/detailed',
    component:Detailed,
  },
  {
    path: '/statistics',
    component: Statistics,
  },
  {
    path: '/labels/add',
    component: AddLabel
  },
  {
    path: '*',
    component: NotFound,
  },
];

const router = new VueRouter({
  routes
});

export default router;
