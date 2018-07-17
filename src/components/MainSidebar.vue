<!-- MainSidebar 模块 -->

<template>

	<!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">

	    <!-- sidebar: style can be found in sidebar.less -->
	    <section class="sidebar">

	      <!-- Sidebar Menu -->
	      <ul class="sidebar-menu">

	        <li class="treeview">
	          <a href="#">
	              <i class="fa fa-university" aria-hidden="true"></i>
	            <span>志愿活动</span>
	            <span class="pull-right-container">
	              <i class="fa fa-angle-left pull-right"></i>
	            </span>
	          </a>
	          <ul class="treeview-menu">
	            <li><a href="../index.html"><span class="glyphicon glyphicon-fire" aria-hidden="true" ></span> 活动信息</a></li>
	            <li><a href="VolunteerDetail.html"><i class="fa fa-odnoklassniki" aria-hidden="true"></i> 志愿者信息</a></li>
	          </ul>
	        </li>
	        <li class="treeview  active">
	          <a href="#">
	              <i class="fa fa-cog" aria-hidden="true"></i>
	            <span>系统记录</span>
	            <span class="pull-right-container">
	              <i class="fa fa-angle-left pull-right"></i>
	            </span>
	          </a>
	          <ul class="treeview-menu">
	            <li class="active"><a href="ManagerList.html"><i class="fa fa-users"></i> 人员权限</a></li>
	            <li><a href="Record.html"><i class="fa fa-list-alt" aria-hidden="true"></i> 操作日志</a></li>
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