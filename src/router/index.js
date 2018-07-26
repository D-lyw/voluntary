import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/page/Login_page'
import Home from '@/page/Home'

import Index from '@/components/Index'
import Mainheader from '@/components/MainHeader'
import OperationRecord from '@/components/OperationRecord'
import PeopleAuthority from '@/components/PeopleAuthority'
import ActivityList from '@/components/ActivityList'
import Volunteerlist from '@/components/Volunteerlist'
import VolunteerOperation from '@/components/VolunteerOperation'
import PersonerCenter from '@/components/PersonerCenter'


Vue.use(Router)

export default new Router({
  routes: [
  	
    {                                     // 登陆界面
      path: '/login',
      name: "Login",
      component: Login
    },
    {
      path: '/home',                      /////////////////暂定 home 代表院队部分/////////////
      name: 'home',
      component: Home,
      children: [{
         path: 'operationrecord',         // 操作记录
         name: 'operationRecord',
         component: OperationRecord
      },{
         path: 'peopleauthority',         // 管理员权限
         name: 'peopleauthority',
         component: PeopleAuthority
      },{
         path: 'activitylist',            // 志愿活动信息列表
         name: 'activitylist',
         component: ActivityList
      },{
         path: 'volunteerlist',           //志愿者信息列表
         name: 'volunteerlist',
         component: Volunteerlist
      },{
         path: 'volunteeroperation',      // 志愿者信息操作
         name: 'volunteeroperation',
         component: VolunteerOperation
      },{
         path: 'personercenter',          // 个人中心
         name: 'personercenter',
         component: PersonerCenter
      },{
         path: 'index',                   // 平台首页
         name: 'index',
         component: Index
      }]
    }
  ]
})
