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
					<button class="btn btn-sm" style="background:#18bc9c; color:white;" @click="dialogFormVisible = true">
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
				
				<!-- 添加管理员对话框 -->
				<el-dialog title="添加用户角色" :visible.sync="dialogFormVisible" style="width:80%;margin:auto;" @closed="savePerson">
				  <el-form :model="form">
					<div style="display:inline-block; width:100%;">
					    <el-input placeholder="请根据姓名或学号查询" v-model="input_key" class="input-with-select" >
						    <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:100px;">
						      <el-option label="学号" value="1"></el-option>
						      <el-option label="姓名" value="2"></el-option>
						    </el-select>
						    <el-button slot="append" icon="el-icon-search" @click="search_person_toadd"></el-button>
						</el-input>
					</div>
					<table class="find_person_msg table table-condensed table-hover ">
						<tbody v-if="show_search_result">
							<tr>
								<td><el-checkbox v-model="find_person_checked"></el-checkbox></td>
								<td>
									<el-tag
									  type="success" size="mini" color="#f1f4f5" >
									  20161316023
									</el-tag>
								</td>
								<td>刘元旺</td>
								<td>网络1601</td>
								<td>计算机科学与技术学院</td>
							</tr>
						</tbody>
					</table>
				    <el-form-item label="授予权限" :label-width="formLabelWidth">
				      <el-select v-model="form.region" placeholder="请选择授予权限类别">
				        <el-option label="学院管理员" value="1" disabled></el-option>
				        <el-option label="工时管理员" value="2"></el-option>
				      </el-select>
				    </el-form-item>

				  </el-form>
				  <div slot="footer" class="dialog-footer">
				    <el-button @click="dialogFormVisible = false">取 消</el-button>
				    <el-button type="primary" @click="dialogFormVisible = false" >确 定</el-button>
				  </div>
				</el-dialog>

				<table class="table table-bordered table-hover">
					<thead>
						<tr>
							<td><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox></td>
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
							<td><el-checkbox></el-checkbox></td>
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
							<td><el-checkbox></el-checkbox></td>
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
							<td><el-checkbox></el-checkbox></td>
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
							<td><el-checkbox></el-checkbox></td>
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
							<td><el-checkbox></el-checkbox></td>
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
							<td><el-checkbox></el-checkbox></td>
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
				input_search:'',
				dialogTableVisible: false,
		        dialogFormVisible: false,
		        form: {
		          name: '',
		          region: '',
		          date1: '',
		          date2: '',
		          delivery: false,
		          type: [],
		          resource: '',
		          desc: ''
				},
				select:"",
				input_key:'',

				checkAll: false,
				find_person_checked: false,

				formLabelWidth:'14%',

				isIndeterminate: "",
				change:"",

				show_search_result:false,
			}
		},
		methods:{
			addManager: function(){
				alert("show");
			},
			refresh: function(){
				this.$notify({      			//刷新提示框
		          type: 'success',
		          message: '刷新成功！',
		          duration: 2000,
		          customClass:'el-notification',
		          offset:40
		        });
			},
			savePerson: function(){			 // 在赋予人员权限，点击确实后触发
				this.$message({
		          message: '<i class="fa fa-check"></i>&nbsp;添加管理员操作成功！',
		          dangerouslyUseHTMLString: true,
		          iconClass: 'fa fa-right',
		          duration: 2000,
		          showClose: true,
		          customClass: 'user_style_savePerson'
		        });
			},
			handleCheckAllChange: function(){

			},
			search_person_toadd: function(){		// 显示搜索出的结果
				this.show_search_result = true;
			}
		}
	}
</script>
<style>
	@import '../../static/css/peopleauthority.css'
</style>