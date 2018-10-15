<!-- MainSidebar 模块 -->

<template>

	<!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">

	    <!-- sidebar: style can be found in sidebar.less -->
	    <section class="sidebar">


	      <!-- Sidebar Menu -->
	      <ul class="sidebar-menu " >

	        <li class="treeview active">
	          <a href="#">
	              <i class="fa fa-university" aria-hidden="true"></i>
	            <span>控制台</span>
	            <span class="pull-right-container">
	              <i class="fa fa-angle-left pull-right"></i>
	            </span>
	          </a>
	          <ul class="treeview-menu">
	          	<li ><router-link to="/general/index"><span class="glyphicon glyphicon-home" aria-hidden="true" ></span>  &nbsp;&nbsp;首页</router-link></li>
	            <li><router-link to="/general/activitylist"><span class="glyphicon glyphicon-fire" aria-hidden="true" ></span> &nbsp;&nbsp;总队志愿活动</router-link></li>
							<li><router-link to="/general/activityall"><span class="glyphicon glyphicon-fire" aria-hidden="true" ></span> &nbsp;&nbsp;全体志愿活动</router-link></li>
							<li><router-link to="/general/certification"><span class="glyphicon glyphicon-user" aria-hidden="true" ></span> &nbsp;&nbsp;认证活动</router-link></li>
							
	          </ul>

	        </li>

	        <li class="treeview">
		          <a href="#">
			            <i class="glyphicon glyphicon-stats" aria-hidden="true" ></i>
			            <span>志愿者概览</span>
			            <span class="pull-right-container">
			              <i class="fa fa-angle-left pull-right"></i>
			            </span>
		          </a>
		          <ul class="treeview-menu">
			            <li><router-link to="/general/volunteerlist"><i class="fa fa-address-book" aria-hidden="true"></i> &nbsp;&nbsp;志愿者信息</router-link></li>
			            <li><router-link to="/general/volunteeroperation"><i class="fa fa-odnoklassniki" aria-hidden="true"></i> &nbsp;&nbsp;志愿者操作</router-link></li>
		          </ul>
	        </li>

	        <li class="treeview">
	          <a href="#">
	              <i class="fa fa-cog" aria-hidden="true"></i>
	            <span>用户管理</span>
	            <span class="pull-right-container">
	              <i class="fa fa-angle-left pull-right"></i>
	            </span>
	          </a>
	          <ul class="treeview-menu">
	            <li class="active"><router-link to="/general/peopleauthority"><i class="fa fa-users"></i> &nbsp;&nbsp;人员权限</router-link></li>
	            <li><router-link to="/general/memberlist"><i class="fa fa-hand-spock-o" aria-hidden="true"></i>&nbsp;&nbsp; 委员列表</router-link></li>
	            <li><router-link to="/general/personercenter"><span class="glyphicon glyphicon-user" aria-hidden="true" ></span> &nbsp;&nbsp;个人中心</router-link></li>
	          </ul>
	        </li>
					<li class="treeview">
	          <a href="#">
	              <i class="fa fa-cog" aria-hidden="true"></i>
	            <span>系统记录</span>
	            <span class="pull-right-container">
	              <i class="fa fa-angle-left pull-right"></i>
	            </span>
	          </a>
	          <ul class="treeview-menu">
	            <li><router-link to="/general/announcement"><i class="fa fa-commenting" aria-hidden="true"></i> &nbsp;&nbsp;消息公告</router-link></li>
							<li><router-link to="/general/organizationlist"><span class="glyphicon glyphicon-fire" aria-hidden="true" ></span> &nbsp;&nbsp;组织信息</router-link></li>
							<li><router-link to="/general/chargelist"><i class="fa fa-hand-spock-o" aria-hidden="true"></i>&nbsp;&nbsp; 组织管理</router-link></li>
	            <li><router-link to="/general/operationrecord"><i class="fa fa-list-alt" aria-hidden="true"></i>&nbsp;&nbsp; 操作日志</router-link></li>
	          </ul>
	        </li>
	      </ul>
	      <!-- /.sidebar-menu -->
	    </section>
	    <!-- /.sidebar -->

  </aside>

</template>

<script >
	export default {
		name: 'MainSidebar'
	}
</script>

