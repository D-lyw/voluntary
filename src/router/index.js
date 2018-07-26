import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/Index'
import List from '@/components/List'
import Mainheader from '@/components/MainHeader'
import Learn from '@/page/learn'
import OperationRecord from '@/page/OperationRecord_page'
import PeopleAuthority from '@/page/PeopleAuthority_page'
import ActivityList from '@/page/ActivityList_page'
import Volunteerlist from '@/page/Volunteerlist_page'
import VolunteerOperation from '@/page/VolunteerOperation_page'
import PersonerCenter from '@/page/PersonerCenter_page'
import Login from '@/page/Login_page'


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
    },
    {
      path: '/peopleauthority',
      name: 'peopleauthority',
      component: PeopleAuthority
    },
    {
      path: '/activitylist',
      name: 'activitylist',
      component: ActivityList
    },
    {
      path: '/volunteerlist',
      name: 'volunteerlist',
      component: Volunteerlist
    },
    {
      path: '/volunteeroperation',
      name: 'volunteeroperation',
      component: VolunteerOperation
    },
    {
      path: '/personercenter',
      name: 'personercenter',
      component: PersonerCenter
    }

  ]
})
