import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/page/Login_page'
import Home from '@/page/Home'
import General from '@/page/General'

// 院队
import Index from '@/components/Index'
import OperationRecord from '@/components/OperationRecord'
import PeopleAuthority from '@/components/PeopleAuthority'
import ActivityList from '@/components/ActivityList'
import Volunteerlist from '@/components/Volunteerlist'
import VolunteerOperation from '@/components/VolunteerOperation'
import PersonerCenter from '@/components/PersonerCenter'
import MemberList from '@/components/MemberList'

// 总队
import Index_G from '@/components_gen/Index';
import ActivityList_G from '@/components_gen/ActivityList';
import OperationRecord_G from '@/components_gen/OperationRecord';
import PersonerCenter_G from '@/components_gen/PersonerCenter';
import Volunteerlist_G from '@/components_gen/Volunteerlist';
import VolunteerOperation_G from '@/components_gen/VolunteerOperation';
import MemberList_G from '@/components_gen/MemberList';
import PeopleAuthority_G from '@/components_gen/PeopleAuthority';
import ActivityAll from '@/components_gen/ActivityAll';
import OrganizationList from '@/components_gen/OrganizationList';
import Announcement from '@/components_gen/Announcement';
import ChargeList from '@/components_gen/ChargeList';
import Certification from '@/components_gen/Certification';

Vue.use(Router)

export default new Router({
  routes: [
  	
    {                                     // 登陆界面
      path: '/login',
      name: "Login",
      component: Login
    },{
      path: '/',
      name: 'login',
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
         path: 'memberlist',
         name: 'memberlist',
         component: MemberList
      },{
         path: 'introduce',                   // 平台首页
         name: 'introduce',
         component: Index
      }]
    },{
      path: '/general',                       // 总队模块
      name: '/general',
      component: General,
      children: [
        {
          path: 'index',
          name: 'index_g',
          component: Index_G
        },{
          path: 'activitylist',
          name: 'activitylist_g',
          component: ActivityList_G 
        },{
          path: 'operationrecord',
          name: 'operationrecord_g',
          component: OperationRecord_G
        },{
          path: 'personercenter',
          name: 'personcenter_g',
          component: PersonerCenter_G
        },{
          path: 'volunteerlist',
          name: 'volunteerlist_g',
          component: Volunteerlist_G
        },{
          path: 'volunteeroperation',
          name: 'volunteeroperation_g',
          component: VolunteerOperation_G 
        },{
          path: 'memberlist',
          name: 'memberlist_g',
          component: MemberList_G
        },{
          path: 'peopleauthority',
          name: 'personauthority_g',
          component: PeopleAuthority_G
        },{
          path: 'activityall',
          name: 'activityall',
          component: ActivityAll
        },{
          path: 'organizationlist',
          name: 'organizationlist',
          component: OrganizationList
        },{
          path: 'announcement',
          name: 'announcement',
          component: Announcement
        },{
          path: 'chargelist',
          name: 'chargelist',
          component: ChargeList
        },{
          path: 'certification',
          name: 'certification',
          component: Certification
        }
      ]
    }
  ]
})
