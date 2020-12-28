import Vue from 'vue';
import Router from 'vue-router';
import Index from '../components/Index.vue';
import Stinformation from '../components/St_information.vue';
import Teinformation from '../components/Te_information.vue';
import Registration from '../components/Registration_St.vue';
import Updata_st_inform from '../components/Updata_st_inform.vue';
import Updata_te_inform from '../components/Updata_te_inform.vue';
import Registration_Te from '../components/Registration_Te.vue';
import Welcome from '../components/Welcome.vue';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: '注册',
      show: true,
      component: Index,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          name: '欢迎',
          component: Welcome
        },
        {
          path: '/registion',
          name: '学生注册',
          component: Registration
        },
        {
          path: '/registion_te',
          name: '教师注册',
          component: Registration_Te
        }
      ]
    },
    {
      path: '/adimins',
      name: '管理员',
      show: true,
      component: Index,
      children: [
        {
          path: '/st_information',
          name: '查看学生信息',
          component: Stinformation
        },
        {
          path: '/te_information',
          name: '查看教师信息',
          component: Teinformation
        }
      ]
    },
    {
      path: '/updata_st_inform',
      show: false,
      component: Updata_st_inform
    },
    {
      path: '/updata_te_inform',
      show: false,
      component: Updata_te_inform
    }
  ]
});
