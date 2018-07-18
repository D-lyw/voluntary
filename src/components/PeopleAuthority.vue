<template>
	<div class="content-wrapper" style="height:400px;overflow-y:auto;overflow-x:hidden;">	
		<span class="layui-breadcrumb navigoto "  style="">
		  <i class="fa fa-home" style="opacity:0.8;color:#333;font-size:16px;"></i>&nbsp;
		  <router-link to="/">&nbsp;&nbsp;主页</router-link>
		  <router-link to="">系统操作</router-link>
		  <router-link to=""><cite>人员权限</cite></router-link>
		</span>

		<div class="contenter panel panel-default">
			<div class="panel-heading" style="background:#e8edf0;bordre:1px solid #e8edf0;">
				<em>计算机学院 院队负责人</em>
				<p>dkj dskfajidsajfdsjfkdjs dsfaj;d</p>     
			</div>
			<div class="panel-body">
				<div class="btn_group">
					<button class="btn btn-sm btn_refresh" style="background:#1a242f;" title="刷新" @click="refresh" >
						<i class="fa fa-refresh" aria-hidden="true" style="color:white;"></i> 
					</button>
					<button class="btn btn-sm" style="background:#18bc9c; color:white;" @click='addManager'>
						<i class="fa fa-plus" aria-hidden="true"></i> 
						添加
					</button>
					<button class="btn btn-sm" style="background:#ef8b81; color:white;">
						<i class="fa fa-trash" aria-hidden="true"></i> 
						删除
					</button>
					<div style="display:inline-block;float:right;">
						<el-input v-model="input_search" placeholder="请输入内容" size="small" clearable style="width:50%;display:inline-block;border-radius:0px;" class="input-with-select">
						</el-input>

						<el-button type="info" size="small"><i class="fa fa-search" title="搜索"></i></el-button>
						&nbsp;&nbsp;
						&nbsp;&nbsp;	

						<!-- Split button -->
						<div class="btn-group" style="display:inline-block;margin-top:-1px;">
						  <button type="button" class="btn btn-sm"><i class="glyphicon glyphicon-export icon-share"></i>导出</button>
						  <button type="button" class="btn btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						    <span class="caret"></span>
						    <span class="sr-only">Toggle Dropdown</span>
						  </button>
						  <ul class="dropdown-menu">
						    <li><a href="#">JSON</a></li>
						    <li><a href="#">XLSX</a></li>
						    <li><a href="#">TXT</a></li>
						  </ul>
						</div>
					</div>
				</div>
				<table class="table table-bordered table-hover">
					<thead>
						<tr>
							<td><input type="checkbox"></td>
							<td>ID</td>
							<td>姓名</td>
							<td>学号</td>
							<td>联系方式</td>
							<td>权限</td>
							<td>上次操作</td>
							<td>状态</td>
							<td>操作</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><input type="checkbox"></td>
							<td>1</td>
							<td>李四</td>
							<td>201613136023</td>
							<td>liuyuanwang4321@gmail.com</td>
							<td>2018/07/18 12:00:00 </td>
							<td>学院管理员</td>
							<td><span class="layui-badge-dot layui-bg-green" size="big"></span><span style="color:green;">&nbsp;正常</span></td>
							<td>
								<span class="layui-badge layui-bg-green">
									<i class="el-icon-edit"></i>
								</span>

								<span class="layui-badge layiui-bg-red">
									<i class="el-icon-delete"></i>
								</span>
							</td>
						</tr>
						<tr>
							<td><input type="checkbox"></td>
							<td>1</td>
							<td>李四</td>
							<td>201613136023</td>
							<td>liuyuanwang4321@gmail.com</td>
							<td>2018/07/18 12:00:00 </td>
							<td>学院管理员</td>
							<td><span class="layui-badge-dot layui-bg-green" size="big"></span><span style="color:green;">&nbsp;正常</span></td>
							<td>
								<span class="layui-badge layui-bg-green">
									<i class="el-icon-edit"></i>
								</span>

								<span class="layui-badge layiui-bg-red">
									<i class="el-icon-delete"></i>
								</span>
							</td>
						</tr>
						<tr>
							<td><input type="checkbox"></td>
							<td>1</td>
							<td>李四</td>
							<td>201613136023</td>
							<td>liuyuanwang4321@gmail.com</td>
							<td>2018/07/18 12:00:00 </td>
							<td>学院管理员</td>
							<td><span class="layui-badge-dot layui-bg-green" size="big"></span><span style="color:green;">&nbsp;正常</span></td>
							<td>
								<span class="layui-badge layui-bg-green">
									<i class="el-icon-edit"></i>
								</span>

								<span class="layui-badge layiui-bg-red">
									<i class="el-icon-delete"></i>
								</span>
							</td>
						</tr>
						<tr>
							<td><input type="checkbox"></td>
							<td>1</td>
							<td>李四</td>
							<td>201613136023</td>
							<td>liuyuanwang4321@gmail.com</td>
							<td>2018/07/18 12:00:00 </td>
							<td>学院管理员</td>
							<td><span class="layui-badge-dot layui-bg-green" size="big"></span><span style="color:green;">&nbsp;正常</span></td>
							<td>
								<span class="layui-badge layui-bg-green">
									<i class="el-icon-edit"></i>
								</span>

								<span class="layui-badge layiui-bg-red">
									<i class="el-icon-delete"></i>
								</span>
							</td>
						</tr>
						<tr>
							<td><input type="checkbox"></td>
							<td>1</td>
							<td>李四</td>
							<td>201613136023</td>
							<td>liuyuanwang4321@gmail.com</td>
							<td>2018/07/18 12:00:00 </td>
							<td>学院管理员</td>
							<td><span class="layui-badge-dot layui-bg-green" size="big"></span><span style="color:green;">&nbsp;正常</span></td>
							<td>
								<span class="layui-badge layui-bg-green">
									<i class="el-icon-edit"></i>
								</span>

								<span class="layui-badge layiui-bg-red">
									<i class="el-icon-delete"></i>
								</span>
							</td>
						</tr>
						<tr>
							<td><input type="checkbox"></td>
							<td>1</td>
							<td>李四</td>
							<td>201613136023</td>
							<td>liuyuanwang4321@gmail.com</td>
							<td>2018/07/18 12:00:00 </td>
							<td>学院管理员</td>
							<td><span class="layui-badge-dot layui-bg-green" size="big"></span><span style="color:green;">&nbsp;正常</span></td>
							<td>
								<span class="layui-badge layui-bg-green">
									<i class="el-icon-edit"></i>
								</span>

								<span class="layui-badge layiui-bg-red">
									<i class="el-icon-delete"></i>
								</span>
							</td>
						</tr>
					</tbody>
				</table>

				<span class="table_buttom_msg">
					显示第<span>1</span>到第<span>10</span>条记录，总共<span>17</span>记录
				</span>

			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		name: 'PeopleAuthority',
		data () {
			return {
				input_search:''
			}
		},
		methods:{
			addManager: function(){
				alert("show");
			},
			refresh: function(){
				// alert("refresh");
				// layer.msg('hello');
				// layer.open({
				// 	type: 0,
				// 	title: false,
				// 	content: '刷新成功',
				// 	offset: 'rt',
				// 	icon: 1
				// });
				// layer.alert("刷新成功",{icon: 1})
				this.$notify({
		          type: 'success',
		          message: '刷新成功！',
		          duration: 0,
		          customClass:'el-notification'
		        });
			}
		}
	}
</script>

<style type="text/css" scoped>
	@import '../../static/css/peopleauthority.css'
	.el-notification{
		color: red;
		top:40px !important;
		width: 200px;
		top: 52px;
	}
</style>