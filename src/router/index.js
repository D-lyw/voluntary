import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/Index'
import List from '@/components/List'
import Login from '@/components/Login'
import Mainheader from '@/components/MainHeader'
import Learn from '@/page/learn'
import OperationRecord from '@/page/OperationRecord_page'

Vue.use(Router)

export default new Router({
  routes: [

  	{
      path: '/',
      name: 'Index',
      component:Index
    },
    {
      path: '/login',
      name: "Login",
      component: Login
    },
    {
      path: '/operationrecord',
      name: 'operationRecord',
      component: OperationRecord
    }

  ]
})
