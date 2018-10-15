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
	          	<li ><router-link to="/home/introduce"><span class="glyphicon glyphicon-home" aria-hidden="true" ></span> 首页</router-link></li>
	            <li><router-link to="/home/activitylist"><span class="glyphicon glyphicon-fire" aria-hidden="true" ></span> 志愿活动</router-link></li>
	            <li><router-link to="/home/personercenter"><span class="glyphicon glyphicon-user" aria-hidden="true" ></span> 个人中心</router-link></li>
	          </ul>

	        </li>

	        <li class="treeview">
		          <a href="#">
			            <i class="glyphicon glyphicon-stats" aria-hidden="true" ></i>
			            <span>志愿者管理</span>
			            <span class="pull-right-container">
			              <i class="fa fa-angle-left pull-right"></i>
			            </span>
		          </a>
		          <ul class="treeview-menu">
			            <li><router-link to="/home/volunteerlist"><span class="glyphicon glyphicon-book" aria-hidden="true" ></span> 志愿者信息</router-link></li>
			            <li><router-link to="/home/volunteeroperation"><i class="fa fa-odnoklassniki" aria-hidden="true"></i> 志愿者操作</router-link></li>
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
	            <li class="active"><router-link to="/home/peopleauthority"><i class="fa fa-users"></i> 人员权限</router-link></li>
	            <li ><router-link to="/home/memberlist"><i class="fa fa-hand-spock-o" aria-hidden="true"></i>委员列表</router-link></li>
	            <li><router-link to="/home/operationrecord"><i class="fa fa-list-alt" aria-hidden="true"></i> 操作日志</router-link></li>
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

<style>
	@import '../../static/bootstrap-3.3.7/css/bootstrap.min.css'
    @import '../../static/font-awesome-4.7.0/css/font-awesome.min.css'
    @import '../../static/layui/css/layui.css'
    @import '../../static/css/all_skins.css'
    @import '../../static/css/AdminLTE.css'
</style>